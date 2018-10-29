import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import PropTypes from 'prop-types';
import './index.scss'
import iconBookSvg from '../../img/icon-book.svg';

class Word extends Component {
  goUsage(cn) {
    console.log(cn)
    Taro.navigateTo({
      url: `/pages/usage/index?word=${cn}`,
    })
  }
  render() {
    const { hiragana, cn } = this.props;
    return (
      <View className='word'  onClick={this.goUsage.bind(this, cn)}>
        <Image src={iconBookSvg} className='word-icon' />
        <View className='word-content'>
          <Text className='word-cn'>{ cn }</Text>
          { hiragana && <Text className='word-hiragana'>【 { hiragana } 】</Text> }
        </View>
      </View>
    )
  }
}

Word.propTypes = {
  hiragana: PropTypes.string,
  cn: PropTypes.string,
};

export default Word;