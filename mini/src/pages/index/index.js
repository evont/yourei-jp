import Taro, { Component, navigateTo } from '@tarojs/taro'
import { View, Icon, Input, Text, ScrollView } from '@tarojs/components'
import './index.scss'
import Api from '../../utils/api';

import WordBlock from './wordblock';

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
    // Taro.showLoading({
    //   title: '数据加载中',
    // })
    // Api.request({
    //   action: 'hot',
    //   cb: (res) => {
    //     const data = res.data
    //     const relativeData = data.list
    //     this.setState({
    //       relativeData,
    //       isLoading: false,
    //     })
    //     Taro.hideLoading()
    //   }
    // })
    const list = [
      {"category":"yojijyukugo","list":[{"link":"/遠慮会釈","cn":"遠慮会釈","hiragana":"えんりょえしゃく"},{"link":"/周章狼狽","cn":"周章狼狽","hiragana":"しゅうしょうろうばい"},{"link":"/千変万化","cn":"千変万化","hiragana":"せんぺんばんか"},{"link":"/美辞麗句","cn":"美辞麗句","hiragana":"びじれいく"},{"link":"/無味乾燥","cn":"無味乾燥","hiragana":"むみかんそう"},{"link":"/勧善懲悪","cn":"勧善懲悪","hiragana":"かんぜんちょうあく"},{"link":"/巧言令色","cn":"巧言令色","hiragana":"こうげんれいしょく"},{"link":"/五里霧中","cn":"五里霧中","hiragana":"ごりむちゅう"},{"link":"/雲散霧消","cn":"雲散霧消","hiragana":"うんさんむしょう"},{"link":"/広大無辺","cn":"広大無辺","hiragana":"こうだいむへん"},{"link":"/毀誉褒貶","cn":"毀誉褒貶","hiragana":"きよほうへん"},{"link":"/栄枯盛衰","cn":"栄枯盛衰","hiragana":"えいこせいすい"},{"link":"/青天白日","cn":"青天白日","hiragana":"せいてんはくじつ"},{"link":"/有象無象","cn":"有象無象","hiragana":"うぞうむぞう"},{"link":"/縦横無尽","cn":"縦横無尽","hiragana":"じゅうおうむじん"},{"link":"/大言壮語","cn":"大言壮語","hiragana":"たいげんそうご"},{"link":"/遮二無二","cn":"遮二無二","hiragana":"しゃにむに"},{"link":"/容貌魁偉","cn":"容貌魁偉","hiragana":"ようぼうかいい"},{"link":"/空前絶後","cn":"空前絶後","hiragana":"くうぜんぜつご"},{"link":"/平穏無事","cn":"平穏無事","hiragana":"へいおんぶじ"},{"link":"/東奔西走","cn":"東奔西走","hiragana":"とうほんせいそう"},{"link":"/猪突猛進","cn":"猪突猛進","hiragana":"ちょとつもうしん"},{"link":"/一気呵成","cn":"一気呵成","hiragana":"いっきかせい"},{"link":"/千差万別","cn":"千差万別","hiragana":"せんさばんべつ"},{"link":"/衆人環視","cn":"衆人環視","hiragana":"しゅうじんかんし"},{"link":"/孤軍奮闘","cn":"孤軍奮闘","hiragana":"こぐんふんとう"},{"link":"/無二無三","cn":"無二無三","hiragana":"むにむさん"},{"link":"/海千山千","cn":"海千山千","hiragana":"うみせんやません"},{"link":"/当意即妙","cn":"当意即妙","hiragana":"とういそくみょう"},{"link":"/五臓六腑","cn":"五臓六腑","hiragana":"ごぞうろっぷ"},{"link":"/牽強付会","cn":"牽強付会","hiragana":"けんきょうふかい"},{"link":"/悪口雑言","cn":"悪口雑言","hiragana":"あっこうぞうごん"},{"link":"/有名無実","cn":"有名無実","hiragana":"ゆうめいむじつ"},{"link":"/深山幽谷","cn":"深山幽谷","hiragana":"しんざんゆうこく"},{"link":"/人事不省","cn":"人事不省","hiragana":"じんじふせい"},{"link":"/大同小異","cn":"大同小異","hiragana":"だいどうしょうい"},{"link":"/天変地異","cn":"天変地異","hiragana":"てんぺんちい"},{"link":"/獅子奮迅","cn":"獅子奮迅","hiragana":"ししふんじん"},{"link":"/茫然自失","cn":"茫然自失","hiragana":"ぼうぜんじしつ"},{"link":"/粒々辛苦","cn":"粒々辛苦","hiragana":"りゅうりゅうしんく"},{"link":"/自縄自縛","cn":"自縄自縛","hiragana":"じじょうじばく"},{"link":"/荒唐無稽","cn":"荒唐無稽","hiragana":"こうとうむけい"},{"link":"/物見遊山","cn":"物見遊山","hiragana":"ものみゆさん"},{"link":"/沈思黙考","cn":"沈思黙考","hiragana":"ちんしもっこう"},{"link":"/和洋折衷","cn":"和洋折衷","hiragana":"わようせっちゅう"},{"link":"/抱腹絶倒","cn":"抱腹絶倒","hiragana":"ほうふくぜっとう"},{"link":"/公明正大","cn":"公明正大","hiragana":"こうめいせいだい"},{"link":"/厚顔無恥","cn":"厚顔無恥","hiragana":"こうがんむち"},{"link":"/不言実行","cn":"不言実行","hiragana":"ふげんじっこう"},{"link":"/質実剛健","cn":"質実剛健","hiragana":"しつじつごうけん"}]},
      {"category":"adverbs","list":[{"link":"/遠慮会釈","cn":"遠慮会釈","hiragana":"えんりょえしゃく"},{"link":"/周章狼狽","cn":"周章狼狽","hiragana":"しゅうしょうろうばい"},{"link":"/千変万化","cn":"千変万化","hiragana":"せんぺんばんか"},{"link":"/美辞麗句","cn":"美辞麗句","hiragana":"びじれいく"},{"link":"/無味乾燥","cn":"無味乾燥","hiragana":"むみかんそう"},{"link":"/勧善懲悪","cn":"勧善懲悪","hiragana":"かんぜんちょうあく"},{"link":"/巧言令色","cn":"巧言令色","hiragana":"こうげんれいしょく"},{"link":"/五里霧中","cn":"五里霧中","hiragana":"ごりむちゅう"},{"link":"/雲散霧消","cn":"雲散霧消","hiragana":"うんさんむしょう"},{"link":"/広大無辺","cn":"広大無辺","hiragana":"こうだいむへん"},{"link":"/毀誉褒貶","cn":"毀誉褒貶","hiragana":"きよほうへん"},{"link":"/栄枯盛衰","cn":"栄枯盛衰","hiragana":"えいこせいすい"},{"link":"/青天白日","cn":"青天白日","hiragana":"せいてんはくじつ"},{"link":"/有象無象","cn":"有象無象","hiragana":"うぞうむぞう"},{"link":"/縦横無尽","cn":"縦横無尽","hiragana":"じゅうおうむじん"},{"link":"/大言壮語","cn":"大言壮語","hiragana":"たいげんそうご"},{"link":"/遮二無二","cn":"遮二無二","hiragana":"しゃにむに"},{"link":"/容貌魁偉","cn":"容貌魁偉","hiragana":"ようぼうかいい"},{"link":"/空前絶後","cn":"空前絶後","hiragana":"くうぜんぜつご"},{"link":"/平穏無事","cn":"平穏無事","hiragana":"へいおんぶじ"},{"link":"/東奔西走","cn":"東奔西走","hiragana":"とうほんせいそう"},{"link":"/猪突猛進","cn":"猪突猛進","hiragana":"ちょとつもうしん"},{"link":"/一気呵成","cn":"一気呵成","hiragana":"いっきかせい"},{"link":"/千差万別","cn":"千差万別","hiragana":"せんさばんべつ"},{"link":"/衆人環視","cn":"衆人環視","hiragana":"しゅうじんかんし"},{"link":"/孤軍奮闘","cn":"孤軍奮闘","hiragana":"こぐんふんとう"},{"link":"/無二無三","cn":"無二無三","hiragana":"むにむさん"},{"link":"/海千山千","cn":"海千山千","hiragana":"うみせんやません"},{"link":"/当意即妙","cn":"当意即妙","hiragana":"とういそくみょう"},{"link":"/五臓六腑","cn":"五臓六腑","hiragana":"ごぞうろっぷ"},{"link":"/牽強付会","cn":"牽強付会","hiragana":"けんきょうふかい"},{"link":"/悪口雑言","cn":"悪口雑言","hiragana":"あっこうぞうごん"},{"link":"/有名無実","cn":"有名無実","hiragana":"ゆうめいむじつ"},{"link":"/深山幽谷","cn":"深山幽谷","hiragana":"しんざんゆうこく"},{"link":"/人事不省","cn":"人事不省","hiragana":"じんじふせい"},{"link":"/大同小異","cn":"大同小異","hiragana":"だいどうしょうい"},{"link":"/天変地異","cn":"天変地異","hiragana":"てんぺんちい"},{"link":"/獅子奮迅","cn":"獅子奮迅","hiragana":"ししふんじん"},{"link":"/茫然自失","cn":"茫然自失","hiragana":"ぼうぜんじしつ"},{"link":"/粒々辛苦","cn":"粒々辛苦","hiragana":"りゅうりゅうしんく"},{"link":"/自縄自縛","cn":"自縄自縛","hiragana":"じじょうじばく"},{"link":"/荒唐無稽","cn":"荒唐無稽","hiragana":"こうとうむけい"},{"link":"/物見遊山","cn":"物見遊山","hiragana":"ものみゆさん"},{"link":"/沈思黙考","cn":"沈思黙考","hiragana":"ちんしもっこう"},{"link":"/和洋折衷","cn":"和洋折衷","hiragana":"わようせっちゅう"},{"link":"/抱腹絶倒","cn":"抱腹絶倒","hiragana":"ほうふくぜっとう"},{"link":"/公明正大","cn":"公明正大","hiragana":"こうめいせいだい"},{"link":"/厚顔無恥","cn":"厚顔無恥","hiragana":"こうがんむち"},{"link":"/不言実行","cn":"不言実行","hiragana":"ふげんじっこう"},{"link":"/質実剛健","cn":"質実剛健","hiragana":"しつじつごうけん"}]}
    ]
    setTimeout(() => {
      this.setState({
        relativeData: list,
        isLoading: false,
      })
    }, 2000)
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
              <View className='holder'>
                <Text className='holder-text'>加载中...</Text>
              </View>
            :
              relativeData.length ?
                <ScrollView 
                  scrollX
                  scrollWithAnimation
                >
                  <View 
                    className='main-scroll'
                    style={{ 
                      width: `${relativeData.length * 350}px`
                    }}
                  >
                    {
                      relativeData.map((ele, ind) => {
                        return <View 
                          className='main-scroll-item' 
                          key={ind}
                          style={{ 
                            width: '310px'
                          }}
                        >
                          <WordBlock blockData={ele} />
                        </View>
                      })
                    }
                  </View>
                </ScrollView>
              :
              <View className='holder'>
                <Text className='holder-text'>暂无数据</Text>
              </View>
          }
        </View>
      </View>
    )
  }
}

