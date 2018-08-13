import React, { Component } from 'react';
import moment from 'moment';
import './Promotion.css';
import ContDownTimerSimple from "../component/ContDownTimerSimple";
import dsBridge from "dsbridge";

class Promotion extends Component {

  constructor(props) {
    super(props);
    this.state = { dookay: 'jsonString' }


    // this.state = {
    //     select : 2,
    //     preferentialList : [
    //       {
    //         startTime : '2018-07-03 09:00:00',
    //         endTime : '2018-07-04 09:00:00',
    //         commodityList : [

    //         ],
    //         timeSlotId : '67'
    //       },
    //       {
    //         startTime : '2018-07-03 10:00:00',
    //         endTime : '2018-07-04 10:00:00',
    //         commodityList : [

    //         ],
    //         timeSlotId : '67'
    //       },
    //       {
    //         startTime : '2018-07-03 09:00:00',
    //         endTime : '2018-07-04 09:00:00',
    //         commodityList : [
    //           {
    //             img : 'http:\/\/localhost:8080\/upload\/image\/91\/5e\/915e428838cb81a97028e05d4bbf5995.jpeg',
    //             id : '8',
    //             price : 0.01,
    //             originalPrice : 15,
    //             description : '海南西瓜',
    //             total : '2',
    //             sold : '0'
    //           },
    //           {
    //             img : 'http:\/\/localhost:8080\/upload\/image\/91\/5e\/915e428838cb81a97028e05d4bbf5995.jpeg',
    //             id : '8',
    //             price : 0.01,
    //             originalPrice : 15,
    //             description : '海南西瓜',
    //             total : '2',
    //             sold : '0'
    //           }
    //         ],
    //         timeSlotId : '67'
    //       },
    //       {
    //         startTime : '2018-07-08 09:00:00',
    //         endTime : '2018-07-09 09:00:00',
    //         commodityList : [

    //         ],
    //         timeSlotId : '67'
    //       },
    //     ]
    //   }

  }

  handleChangeSelect = (e, payload) => {
    const { value, timeSlotId } = payload;
    this.setState({ select: value })
    // console.log(timeSlotId);
    dsBridge.call("rusgTimeSlot", timeSlotId, (result) => {
      const list = JSON.parse(result);
      console.log(list);
      this.setState({ preferentialList: list.preferentialList })
    });
  };

  handleRushItem(e, rushItemId) {
    // console.log(rushItemId);
    dsBridge.call("rushDetail", rushItemId);
  }

  render() {
    const { select, preferentialList } = this.state;
    const currentPreferentialList = preferentialList.find((item, index) => index === select);
    return (
      <div className="preferential">
        <div className="nav">
          {preferentialList.map((item, index) => {
            let state = '';
            if (moment().isAfter(item.endTime)) {
              state = '已结束';
            } else if (moment().isAfter(item.startTime) && moment().isBefore(item.endTime)) {
              state = '特惠中';
            } else if (moment().isBefore(item.endTime) && moment().date() === moment(item.endTime).date()) {
              state = '即将开始';
            } else {
              state = '明天开始';
            }
            return (
              <div className="block" key={index} onClick={(e) => this.handleChangeSelect(e, { value: index, timeSlotId: item.timeSlotId })}>
                <div className={select === index ? 'select-time tag' : 'tag'}>
                  <div className="time">{moment(item.startTime).format('hh:mm')}</div>
                  <div className="state">{state}</div>
                </div>
              </div>
            )
          })}
        </div>
        <div className="count-down">
          <div>限时特惠，下手一定要快！</div>
          {moment().isAfter(currentPreferentialList.startTime) && moment().isBefore(currentPreferentialList.endTime) ?
            <ContDownTimerSimple preferentialEndTime={currentPreferentialList.endTime} /> : null}

        </div>
        {currentPreferentialList.commodityList.map((item, index) => (
          <div className="card" key={index}>
            <div className="banner">
              <img className="img" src={item.img} alt="加载中" />
            </div>
            <div className="detail">
              <div className="description">{item.description}</div>
              <div className="footer">
                <div className="price">
                  <div className="sale">¥ {item.price}</div>
                  <div className="origin-price">¥ {item.originalPrice}</div>
                </div>
                <div className="percent">
                  <div className="action">
                    {(item.total - item.sold) > 0 ?
                      <div className={"rush-to-buy"} onClick={(e) => this.handleRushItem(e, { rushItemId: item.id })}>去抢购</div> : <div className={"buy-out"}>已售罄</div>}
                  </div>
                  <div className={"progress"}>
                    <div>已售{(item.sold / item.total).toFixed(2) * 100}%</div>
                    <div className="progress-bar">
                      <div className="color" style={{ width: item.sold / item.total * 80 }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }
}

export default Promotion;