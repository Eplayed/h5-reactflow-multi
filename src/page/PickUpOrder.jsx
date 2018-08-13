import React, { Component } from 'react';
import './pickUpOrder.css';
import Icon from "../component/Icon";
import moment from 'moment';
import dsBridge from "dsbridge";

const emptyTimeList = { dookay: 'jsonString' }
// const emptyTimeList = [
//   [
//     "2018-07-12[周四]"
//   ],
//   [
//     "2018-07-13[周五]"
//   ],
//   [
//     "2018-07-14[周六]"
//   ],
//   [
//     "2018-07-15[周日]"
//   ],
//   [
//     "2018-07-16[周一]"
//   ],
//   [
//     "2018-07-17[周二]"
//   ],
//   [
//     "2018-07-18[周三]"
//   ],
//   [
//     "2018-07-19[周四]"
//   ],
//   [
//     "2018-07-20[周五]"
//   ],
//   [
//     "2018-07-21[周六]"
//   ],
//   [
//     "2018-07-22[周日]"
//   ],
//   [
//     "2018-07-23[周一]"
//   ],
//   [
//     "2018-07-24[周二]"
//   ],
//   [
//     "2018-07-25[周三]"
//   ],
//   [
//     "2018-07-26[周四]"
//   ]
// ];


/**
 * 自提订单弹出选择时间
 */
class PickUpOrder extends Component {

  constructor(props) {
    super(props);
    this.state = {
      select: {
        time: emptyTimeList[0],
      },
      timeList: emptyTimeList,
    }

  }

  componentDidMount() {
    const localTime = JSON.parse(window.localStorage.getItem('PickupTime'))
    const { select } = this.state;
    if (localTime) {
      select.time = localTime.time;
      this.setState({ select })
    }

    dsBridge.register("TimeCompleted", () => {
      window.localStorage.removeItem('PickupTime');
    })
  }

  handleChangeTime = (e, payload) => {
    const { select } = this.state;
    select.time = payload.time;
    this.setState({ select });
  };

  handleConfirm() {
    console.log(this.state.select)

    const time = JSON.stringify(this.state.select)
    window.localStorage.setItem('PickupTime', time);
    dsBridge.call("PickupTime", this.state.select);

  }

  render() {
    const { timeList, select } = this.state;
    return (
      <div className="pick-up">
        <div className="title">选择自提时间</div>
        <div className="day-and-time">

          <div className="time">
            {timeList.map((item, index) => (
              <p className={select.time === item ? 'select' : null} key={index}
                onClick={(e) => this.handleChangeTime(e, { time: item })}>
                <span>{item}</span>
                {select.time[0] === item[0] ?
                  <Icon type={'checkmark-circle'} color={'#FF7494'} width={16} height={16} /> : null}
              </p>
            ))}
          </div>
        </div>
        <div className={"confirm"} onClick={this.handleConfirm.bind(this)}>
          <span>确认</span>
        </div>
      </div>

    );
  }
}

export default PickUpOrder;
