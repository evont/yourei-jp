import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import PropTypes from 'prop-types';
import './index.scss'

class Holder extends Component {
  goUsage(cn) {
    Taro.navigateTo({
      url: `/pages/usage/index?word=${cn}`,
    })
  }
  render() {
    const { text } = this.props;
    return (
      <View className='holder'>
        <Text className='holder-text'>{ text }</Text>
      </View>
    )
  }
}

Holder.defaultProps = {
  text: '',
}

Holder.propTypes = {
  hiragana: PropTypes.string,
  cn: PropTypes.string,
};

export default Holder;