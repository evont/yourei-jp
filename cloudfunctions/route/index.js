const TcbRouter = require('tcb-router');
const request = require('request');
const cheerio = require('cheerio');
const superagent = require('superagent');
const apiUrl = 'http://yourei.jp/';

function crawler(url, cb) {
  return new Promise((resolve, reject) => {
    superagent.get(url).set({
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36'
    }).end(function (err, res) {
      // 抛错拦截
      if (err) {
        reject(err);
        return;
      }
      resolve(res);
    });
  });
}

function apiRequest(url) {
  const options = {
    method: 'GET',
    url,
    json: true,
  };
  return new Promise((resolve, reject) => {
    request(options, (err, res, data) => {
      if (res) {
        resolve(data);
      } else {
        reject(err);
      }
    });
  });
}

exports.main = (event, context) => {
  const app = new TcbRouter({ event });

  app.router('hot', async (ctx) => {
    const result = await crawler(apiUrl).then((res) => {
      const $ = cheerio.load(res.text);
      const categories = [];
      $('[data-toggle]').each((i, ele) => {
        const _self = $(ele);
        categories.push(_self.attr('href'));
      });
      const data = categories.map((ele) => {
        const list = [];
        const $paramLink = $(ele).find('.ngram-link');
        $paramLink.each((index, element) => {
          const link = $(element).attr('href');
          const content = $(element).text();
          const cn = content.split(' ')[0];
          const hiragana = content.split(' ')[1];
          list.push({
            link,
            cn,
            hiragana,
          })
        })
        return {
          category: ele.replace('#category-', ''),
          list,
        };
      })
      return {
        list: data,
      };
    });

    ctx.body = {
      code: 0,
      data: result,
    }
  });

  app.router('query', async (ctx) => {
    const { word, start = 1 } = ctx._req.event;
    let result = {};
    let info = {};
    if (start === 1) {
      info = await crawler(`${apiUrl}${encodeURIComponent(word)}`).then((res) => {
          const $ = cheerio.load(res.text);
          const list = [];
          const $relativeWord = $('#next-freq-ngrams').find('.ngram-link');
          $relativeWord.each((i, ele) => {
            const content = $(ele).text();
            const param = content.replace(/\(.+\)/, '');
            const percent = content.match(/\d+/)[0];
            list.push({
              word: param,
              percent,
            })
          });
        const numExp = $('#num-examples').text();
        return {
          numExp,
          list,
        }
      })
    }
    const queryStr = `n=5&start=${start}&match_type=lemma&ngram=${encodeURIComponent(word)}`;
    const list = await apiRequest(`${apiUrl}api/?action=getsentenceswithpropsourcetitle&${queryStr}`);
    if (info.err || list.err) {
      result = {
        code: 1,
        data: null,
        err: info.err || list.err,
      }
    } else {
      result = {
        code: 0,
        data: {
          numExp: info.numExp,
          relative: info.list,
          sentences: list.sentences,
        },
        err: info.err || list.err,
      }
    }
    ctx.body = result
  });

  return app.serve();
}