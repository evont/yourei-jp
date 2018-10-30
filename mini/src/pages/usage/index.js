import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.scss'
import Api from '../../utils/api';

import UsageItem from './usageitem';

class Usage extends Component {

  config = {
    navigationBarTitleText: '用例说明',
    navigationBarTextStyle: 'black',
    navigationBarBackgroundColor: '#ffffff',
    backgroundColor: '#f1f1f1',
  }

  constructor(props) {
    super(props);
    this.state = {
      data: {},
      sentences: [],
      start: 1,
      hasMore: true,
      isLoading: true,
    }
  }

  goUsage(cn) {
    Taro.redirectTo({
      url: `/pages/usage/index?word=${cn}`,
    })
  }

  request(start = 1) {
    Taro.showLoading({
      title: '数据加载中',
    })
    return new Promise((resolve) => {
      Api.request({
        action: 'query',
        data: {
          word: this.$router.params.word,
          start,
        },
        cb: (res) => {
          const data = res.data
          resolve(data);
          Taro.hideLoading()
        }
      }, () => {
        Taro.hideLoading()
        Taro.showModal({
          title: '服务器错误',
          content: '服务器君闹别扭了，请稍后再试～'
        })
      })
    })
  }
  loadMore() {
    let { start, sentences } = this.state;
    start = start + 5;
    
    this.request(start).then((data) => {
      if (data.sentences && data.sentences.length) {
        sentences = sentences.concat(data.sentences); 
        this.setState({
          start,
          sentences,
          isLoading: false,
        })
      } else {
        this.setState({
          hasMore: false,
          isLoading: false,
        })
      }
      
    })
  }

  componentWillMount () {
    wx.setNavigationBarTitle({
      title: this.$router.params.word,
    })
  }
  componentDidMount () {
    Taro.showLoading({
      title: '数据加载中',
    })
    this.request().then((data) => {
      this.setState({
        data,
        sentences: data.sentences,
        isLoading: false,
      })
    })
  }
  render() {
    const { data, sentences, hasMore, isLoading } = this.state;
    const { relative, numExp = 0 } = data;
    let list;
    if (sentences.length) {
      list = sentences.map((element, index) => {
        return <UsageItem key={index} index={index} data={element} word={this.$router.params.word} />
      })
    } else {
      list = <View className='holder'>
        <Text className='holder-text'>{ isLoading ? '加载中...' : '无相关用例' }</Text>
      </View>
    }
    return (
        <View className='usage'>
          <View className='usage-relative'>
              <View className='head'>
                <Text className='head-text'>相关单词</Text>
              </View>
              {
                relative.length ?
                  relative.map((ele, ind) => {
                    return <View key={ind} className='word' onClick={this.goUsage.bind(this, ele.word)}>
                      <Text className='word-text'>{ele.word}</Text>
                    </View>
                  })
                : 
                  <View className='holder'>
                    <Text className='holder-text'>{ isLoading ? '加载中...' : '无相关单词' }</Text>
                  </View>
              }
          </View>
          <View className='usage-sentence'>
              <View className='head'>
                <Text className='head-text'>用例{numExp ? `【共${numExp}条】` : ''}</Text>
              </View>
              <View className='usage-sentence-main'>
                { list }
              </View>
              {
                hasMore ?
                  <View className='loadbtn'>
                    <View className='loadbtn-contain' onClick={this.loadMore}>
                      <Text className='loadbtn-text'>更多</Text>
                    </View>
                  </View>
                :
                  <View className='holder'>
                    <Text className='holder-text'>没有更多了</Text>
                  </View>
              }
          </View>
      </View>
    )
  }
}

export default Usage