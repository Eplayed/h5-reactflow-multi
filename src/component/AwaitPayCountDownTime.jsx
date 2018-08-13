import React, { Component } from 'react';
import moment from "moment/moment";

class AwaitPayCountDownTime extends Component {
  static defaultProps = {
    onTimeOver: () => { }
  }

  constructor(props) {
    super(props);
    this.state = {
      ...props,
      countDownTime: {
        hour: '00',
        minute: '00',
        second: '00',
      },
    }
  }

  componentDidMount() {
    const { preferentialEndTime } = this.state;
    // console.log(preferentialEndTime.format('YYYY-MM-DD hh:mm:ss'));
    const totalSecond = moment(preferentialEndTime).diff(moment(), 'seconds');
    const payload = {
      countNumber: 0,
      preferentialEndTime,
      totalSecond,
    };
    this.countDownId = setInterval(() => {
      this.handleCountDown(payload);
    }, 1000);
  }

  handleCountDown = (payload) => {
    const { totalSecond, countNumber } = payload;
    const twoBit = (number) => (
      (number + '').length < 2 ? `0${number}` : number
    );
    const countDownTime = {
      hour: twoBit(Math.floor((totalSecond - countNumber) / 3600)),
      minute: twoBit(Math.floor((totalSecond - countNumber) % 3600 / 60)),
      second: twoBit((totalSecond - countNumber) % 60),
    };
    this.setState({ countDownTime });
    if (countNumber < totalSecond) {
      payload.countNumber += 1;
    }
    
    if (countDownTime.hour === '00' && countDownTime.minute === '00' && countDownTime.second === '00') {
      this.props.onTimeOver(this);
    }
  };

  render() {
    const { countDownTime } = this.state;
    return (
      <span>剩余：{countDownTime.minute}分钟{countDownTime.second}秒</span>
    )
  }
}

export default AwaitPayCountDownTime;