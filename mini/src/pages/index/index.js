import Taro, { Component } from '@tarojs/taro'
import { View, Icon, Input, Text } from '@tarojs/components'
import './index.scss'
import Api from '../../utils/api';

import Word from '../../components/word';

export default class Index extends Component {

  config = {
    navigationBarTitleText: '日语用例助手',
    enablePullDownRefresh: true,
  }

  constructor(props) {
    super(props)
    this.state = {
      categories: [],
      category: '',
      hotWords: {},
      categoryMap: {
        adjectives: '形容词',
        adverbs: '副词',
        yojijyukugo: '四字熟语',
        nouns: '名词',
        verbs: '动词'
      }
    }
  }

  componentWillMount () { }

  componentDidMount () {
    this.setState({
      categories: [
        'adjectives', 'adverbs', 'yojijyukugo', 'nouns', 'verbs',
      ],
      category: 'yojijyukugo',
    })
    // Taro.showLoading({
    //   title: '数据加载中',
    // })
    // Api.request({
    //   action: 'hot',
    //   cb: (res) => {
    //     const model = res.model;
    //     const data = model.list;
    //     const categories = [];
    //     let hotWords = {};
    //     for (let i = 0, len = data.length; i < len; i += 1) {
    //       const item = data[i];
    //       const { category, list } = item;
    //       categories.push(category);
    //       hotWords[category] = list; 
    //     }
    //     Taro.hideLoading()
    //     this.setState({
    //       categories,
    //       category: categories[0],
    //       hotWords,
    //     })
    //   }
    // })
   }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }
  
  onPullDownRefresh () {

  }
  
  toggleCategory(category) {
    this.setState({
      category,
    })
  }

  render () {
    
    const { categoryMap, categories, category, hotWords} = this.state;
    const hts = hotWords[category];

    return (
      <View>
        <View className='search'>
          <View className='search-contain'>
            <Icon size='20' type='search' className='search-icon' />
            <Input type='text' placeholder='请输入日语单词' className='search-input' />
          </View>
        </View>
        <View className='main'>
          <Text className='title'>常用词语</Text>
          <View className='tab'>
            {
              categories.map((ele, ind) => {
                return <View key={ind} className={['tab-item', ele === category ? 'tab-item-cur' : '' ].join(' ')} onClick={this.toggleCategory.bind(this, ele)}>
                  <Text>{ categoryMap[ele] }</Text>
                </View>
              })
            }
          </View>
          { hts && <View className='hot' >
              { hts.map((ele, ind) => {
                  return <Word key={ind} cn={ele.cn} hiragana={ele.hiragana} />
                })
              }
            </View>
          }
        </View>
      </View>
    )
  }
}

