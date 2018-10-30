import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import PropTypes from 'prop-types';
import './index.scss'

import Word from '../../../components/word';


class WordBlock extends Component {
  constructor(props) {
    super(props)
    this.state = {
      randomNum: 0,
      listContent: [],
      categoryMap: {
        adjectives: '形容词',
        adverbs: '副词',
        yojijyukugo: '四字熟语',
        nouns: '名词',
        verbs: '动词'
      }
    }
  }
  componentDidMount() {
    const { blockData } = this.props;
    const { list = [] } = blockData;
    let listContent = [];
    let start = 0;
    let step = 4;
    let slicePiece;
    if (list.length) {
      while (list.slice(start, start + step).length) {
        slicePiece = list.slice(start, start + step)
        listContent.push(slicePiece)
        start = start + step;
      }
    }
    this.setState({
      listContent,
    })
  }
  random() {
    const { listContent } = this.state;
    const randomNum = Math.round(Math.random() * listContent.length);
    this.setState({
      randomNum,
    })
  }
  render() {
    const { category } = this.props.blockData;
    const { listContent, randomNum } = this.state;
    return (
      <View className='block'>
        <View className='title'>
        <Text className='title-content'>{ this.state.categoryMap[category] }</Text>
          <View className='title-btn' onClick={this.random}>
            <Text className='title-btn-text'>换一批</Text>
          </View>
        </View>
        <View className='list'>
          {
            listContent[randomNum].map((element, index) => {
              return <Word key={index} cn={element.cn} hiragana={element.hiragana} />
            })
          }
        </View>
      </View>
    )
  }
}

WordBlock.defaultProps = {
  blockData: {
    category: '',
    list: [],
  }
}

WordBlock.propTypes = {
  blockData: PropTypes.object,
};

export default WordBlock;