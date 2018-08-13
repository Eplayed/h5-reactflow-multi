import React, { Component } from 'react';
import './distributionTime.css';
import Icon from "../component/Icon";
import dsBridge from "dsbridge";

/**
 * 配送时间弹窗
 */
class DistributionTime extends Component {

  constructor(props) {
    super(props);
    // this.state = { dookay: "jsonString" }
    this.state = {
      select: {
        current: '包裹1',
        packList: [
          {
            pack: '包裹1',
            day: '明天',
            timeSlot: ['13:00', '13:30'],
            id: 2
          }, {
            pack: '包裹2',
            day: '今天',
            timeSlot: ['12:00', '12:30'],
            id: 1
          },
        ],
      },
      packList: [{
        label: '包裹1',
        dayList: [
          {
            label: '今天', timeList: [
              { id: 1, timeSlot: ['12:00', '12:30'], state: '免运费' },
              { id: 2, timeSlot: ['12:30', '13:00'], state: '免运费' },
              { id: 3, timeSlot: ['13:00', '13:30'], state: '免运费' },
              { id: 4, timeSlot: ['13:30', '14:00'], state: '已约满' },
              { id: 5, timeSlot: ['14:00', '14:30'], state: '免运费' },
              { id: 6, timeSlot: ['14:30', '15:00'], state: '免运费' },
              { id: 7, timeSlot: ['15:00', '15:30'], state: '已约满' },
              { id: 8, timeSlot: ['15:30', '16:00'], state: '免运费' },
            ]
          }, {
            label: '明天', timeList: [
              { id: 1, timeSlot: ['12:00', '12:30'], state: '免运费' },
              { id: 2, timeSlot: ['12:30', '13:00'], state: '免运费' },
              { id: 3, timeSlot: ['13:00', '13:30'], state: '免运费' },
              { id: 4, timeSlot: ['13:30', '14:00'], state: '已约满' },
              { id: 5, timeSlot: ['14:00', '14:30'], state: '免运费' },
            ]
          }, {
            label: '后天', timeList: [
              { id: 11, timeSlot: ['12:00', '12:30'], state: '免运费' },
              { id: 12, timeSlot: ['12:30', '13:00'], state: '免运费' },
              { id: 13, timeSlot: ['13:00', '13:30'], state: '免运费' },
              { id: 14, timeSlot: ['13:30', '14:00'], state: '已约满' },
              { id: 15, timeSlot: ['14:00', '14:30'], state: '免运费' },
            ]
          }
        ],
      },
      {
        label: '包裹2',
        dayList: [
          {
            label: '今天', timeList: [
              { id: 1, timeSlot: ['12:00', '12:30'], state: '免运费' },
              { id: 2, timeSlot: ['12:30', '13:00'], state: '免运费' },
              { id: 3, timeSlot: ['13:00', '13:30'], state: '免运费' },
              { id: 4, timeSlot: ['13:30', '14:00'], state: '已约满' },
              { id: 5, timeSlot: ['14:00', '14:30'], state: '免运费' },
              { id: 6, timeSlot: ['14:30', '15:00'], state: '免运费' },
              { id: 7, timeSlot: ['15:00', '15:30'], state: '已约满' },
              { id: 8, timeSlot: ['15:30', '16:00'], state: '免运费' },
            ]
          }, {
            label: '明天', timeList: [
              { id: 1, timeSlot: ['12:00', '12:30'], state: '免运费' },
              { id: 2, timeSlot: ['12:30', '13:00'], state: '免运费' },
              { id: 3, timeSlot: ['13:00', '13:30'], state: '免运费' },
              { id: 4, timeSlot: ['13:30', '14:00'], state: '已约满' },
              { id: 5, timeSlot: ['14:00', '14:30'], state: '免运费' },
            ]
          }, {
            label: '后天', timeList: [
              { id: 11, timeSlot: ['12:00', '12:30'], state: '免运费' },
              { id: 12, timeSlot: ['12:30', '13:00'], state: '免运费' },
              { id: 13, timeSlot: ['13:00', '13:30'], state: '免运费' },
              { id: 14, timeSlot: ['13:30', '14:00'], state: '已约满' },
              { id: 15, timeSlot: ['14:00', '14:30'], state: '免运费' },
            ]
          }
        ],
      }],
    }
  }
  componentDidMount() {
    const selectedPayload = JSON.parse(window.localStorage.getItem('Payload'));
    if (selectedPayload) {
      this.setState({ select: selectedPayload })
    }

    dsBridge.register("TimeCompleted", () => {
      window.localStorage.removeItem('Payload');
    })
  }

  handleChangePack = (e, payload) => {
    const { select } = this.state;
    select.current = payload.pack;
    this.setState({
      select,
    })
  };

  handleChangeDay = (e, payload) => {
    const { select } = this.state;
    select.packList.forEach((item) => {
      if (item.pack === select.current) {
        item.day = payload.day
      }
    });
    this.setState({
      select,
    })
  };

  handleChangeTimeSlot = (e, payload) => {
    const { select } = this.state;
    select.packList.forEach((item) => {
      if (item.pack === select.current) {
        item.id = payload.id
        item.timeSlot = payload.timeSlot
      }
    });
    this.setState({
      select,
    })

  };

  handleConfirm() {
    const { select } = this.state;
    console.log(select)
    window.localStorage.setItem('Payload', JSON.stringify(select));
    dsBridge.call("changePayload", select)
  }

  render() {
    const { packList, select } = this.state;
    const currentPack = select.packList.find(item => item.pack === select.current);
    const targetPack = packList.find(item => item.label === select.current);
    const targetDayList = targetPack.dayList.find(item => item.label === currentPack.day);
    return (
      <div className="sheet">
        <div className="page">
          {packList.map((item, index) => (
            <div className={item.label === select.current ? 'select' : null} key={index}
              onClick={(e) => this.handleChangePack(e, { pack: item.label })}>{item.label}</div>
          ))}
        </div>
        <div className="content">
          <div className="side">
            {targetPack.dayList.map((item, index) => (
              <p className={item.label === currentPack.day ? 'select' : null} key={index}
                onClick={(e) => this.handleChangeDay(e, { day: item.label })}>{item.label}</p>
            ))}
          </div>
          <div className="container">
            {targetDayList.timeList.map((item, index) => (
              <div className="subscribe" key={index}
                onClick={(e) => this.handleChangeTimeSlot(e, { index: index, id: item.id, timeSlot: item.timeSlot })}>
                <div>
                  <span
                    className={`time ${item.id === currentPack.id ? 'select' : null}`}>{item.timeSlot.join('-')}</span>
                  <span
                    className={`state ${item.id === currentPack.id ? 'select' : null}`}>{item.state}</span>
                </div>
                {item.id === currentPack.id ?
                  <Icon type={'checkmark-circle'} height={18} width={18} color={'#FF7494'} /> : null}
              </div>
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

export default DistributionTime;
