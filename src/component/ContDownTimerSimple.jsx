import React, {Component} from 'react';
import moment from 'moment';

class ContDownTimerSimple extends Component {

  constructor(props) {
    super(props);
    this.state = {
      ...props,
    }
  }

  componentDidMount() {
    const {preferentialEndTime} = this.state;
    console.log(preferentialEndTime);
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
    const {countDownTime = { hour: '00', minute: '00', second: '00' }} = this.state;
    return (
      <div>
        <span className="end-text">距结束还剩:</span>
        <span className="end-time">
          <span className="remaining-time">{countDownTime.hour}</span>
          <span>:</span>
          <span className="remaining-time">{countDownTime.minute}</span>
          <span>:</span>
          <span className="remaining-time">{countDownTime.second}</span>
        </span>
      </div>
    )
  }
}

export default ContDownTimerSimple;