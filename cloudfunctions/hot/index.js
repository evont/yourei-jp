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
      cb(res, resolve);
    });
  }).then(result => {
    return {
      status: 0,
      model: result
    }
  });
}
// 云函数入口函数
exports.main = async (event, context) => {
  const result = await crawler(apiUrl, (response, resolve) => {
    const $ = cheerio.load(response.text);
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
    resolve({
      list: data,
    });
  });
  return result;
}