import Taro, { Component } from '@tarojs/taro'
import { View, Icon, Input, Text } from '@tarojs/components'
import './index.scss'
import Api from '../../utils/api';

import WordBlock from './wordblock';
import Holder from '../../components/holder';

export default class Index extends Component {

  config = {
    navigationBarTitleText: '日语用例助手',
    navigationBarTextStyle: 'white',
    navigationBarBackgroundColor: '#242424',
  }

  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      relativeData: [],
    }
  }

  componentWillMount () { }

  componentDidMount () {
    Api.request({
      action: 'hot',
      cb: (res) => {
        const data = res.data
        const relativeData = data.list
        this.setState({
          relativeData,
          isLoading: false,
        })
        Taro.hideLoading()
      }
    })
   }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }
  
  search (event) {
    const value = event.detail.value;
    Taro.navigateTo({
      url: `/pages/usage/index?word=${value}`,
    })
  }

  render () {
    
    const { relativeData, isLoading } = this.state;
    // const hts = hotWords[category];
    return (
      <View className='home'>
        <View className='search'>
          <View className='search-contain'>
            <Icon size='18' type='search' className='search-icon' color='#efefef' />
            <Input type='text' placeholder='请输入日语单词' className='search-input' placeholderClass='search-input-holder' onConfirm={this.search} />
          </View>
        </View>
        <View className='main'>
          <View className='main-title'>
            <Text>常用词语</Text>
          </View>
          {
            isLoading ?
              <Holder text='加载中...' />
            :
              relativeData.length ?
                  <View 
                    className='main-scroll'
                  >
                    {
                      relativeData.map((ele, ind) => {
                        return <View 
                          className='main-scroll-item' 
                          key={ind}
                        >
                          <WordBlock blockData={ele} />
                        </View>
                      })
                    }
                  </View>
              :
              <Holder text='暂无数据' />
          }
        </View>
      </View>
    )
  }
}

