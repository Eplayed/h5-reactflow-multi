import React, {Component} from 'react';
import moment from 'moment';

class CountDownTime extends Component {

  constructor(props) {
    super(props);
    this.state = {
      ...props,
      countDownTime: {},
    }
  }

  componentDidMount() {
    const {preferentialEndTime} = this.state;
    const totalSecond = moment(preferentialEndTime).diff(moment(), 'seconds');
    const payload = {
      countNumber: 0,
      preferentialEndTime,
      totalSecond,
    };
    console.log(payload);
    this.countDownId = setInterval(() => {
      this.handleCountDown(payload);
    }, 1000);
  }

  handleCountDown = (payload) => {
    const {totalSecond, countNumber} = payload;
    const twoBit = (number) => (
      (number + '').length < 2 ? `0${number}` : number
    );
    const countDownTime = {
      hour: twoBit(Math.floor((totalSecond - countNumber) / 3600)),
      minute: twoBit(Math.floor((totalSecond - countNumber) % 3600 / 60)),
      second: twoBit((totalSecond - countNumber) % 60),
    };
    this.setState({countDownTime});
    if (countNumber < totalSecond) {
      payload.countNumber += 1;
    }
  };


  render() {
    const {countDownTime} = this.state;
    return (
      <div className="time">
        <p className="title">距结束还剩:</p>
        <p className="remaining">
          <span className="remaining-time">{countDownTime.hour}</span>
          <span>:</span>
          <span className="remaining-time">{countDownTime.minute}</span>
          <span>:</span>
          <span className="remaining-time">{countDownTime.second}</span>
        </p>
      </div>
    )
  }
}

export default CountDownTime;