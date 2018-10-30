import Taro, { Component } from '@tarojs/taro'
import { View, RichText, Text } from '@tarojs/components'
import PropTypes from 'prop-types';
import './index.scss'

class UsageItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sentence: '',
    }
  }
  componentDidMount() {
    this.setState({
      sentence: this.props.data.sentence,
    })
  }
  getFullSentence() {
    const { data } = this.props;
    const sentence = `${data.properties.prev_sentence || ''}${data.sentence}${data.properties.next_sentence || ''}`;
    this.setState({
      sentence,
    })
  }
  render() {
    const { data, word, index } = this.props;
    // console.log(data);
    const { sentence } = this.state;
    let trimWord = word.trim();
    const arr = sentence.split(new RegExp(`(${trimWord})`));
    const rtx = arr.map((ele) => {
      const node = {
        name: 'span',
        children: [{
          type: 'text',
          text: ele,
        }],
      }
      if (ele === trimWord) {
        node.attrs = {
          style: 'color: #358baf'
        }
      }
      return node;
    })
    const node = [
      {
        name: 'p',
        attrs: {
          style: 'color: #666',
        },
        children: rtx,
      }
    ]
    return (
      <View className='usage' onClick={this.getFullSentence}>
        <View className='usage-sentence'>
          <Text className='usage-sentence-index'>{ index + 1 }. </Text>
          <RichText nodes={node}  className='usage-sentence-node' />
        </View>
        <View className='usage-title'>
          <Text>{data.title}</Text>
        </View>
      </View>
    )
  }
}

UsageItem.defaultProps = {
  data: {},
  word: '',
  index: 0,
}

UsageItem.propTypes = {
  data: PropTypes.object,
};

export default UsageItem;