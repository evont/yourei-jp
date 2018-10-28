import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import PropTypes from 'prop-types';
import './index.scss'

class Word extends Component {
  render() {
    const { hiragana, cn } = this.props;
    return (
      <View className='word'>
        { hiragana && <Text className='word-hiragana'>{ hiragana }</Text> }
        <Text className='word-cn'>{ cn }</Text>
      </View>
    )
  }
}

Word.propTypes = {
  hiragana: PropTypes.string,
  cn: PropTypes.string,
};

export default Word;