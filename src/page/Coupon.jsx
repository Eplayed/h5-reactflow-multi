import React, { Component } from 'react';
import moment from 'moment';
import './coupon.css';
import dsBridge from "dsbridge";
import Icon from "../component/Icon";

const getColor = (type) => {
  return ([
    { type: "限品类", color: "#358DFF" },
    { type: "全品类", color: "#FF6893" }
    // { type: '新人专享', color: '#FF6893' },
    // { type: '周末专享', color: '#FFC600' },
    // { type: '满减专享', color: '#358DFF' },
    // { type: '满减券', color: '#999999' },
  ].find(item => item.type === type) || {}).color
};

// const getWeek = (number) => {
//   return ([
//     { label: 1, text: '周一' },
//     { label: 2, text: '周二' },
//     { label: 3, text: '周三' },
//     { label: 4, text: '周四' },
//     { label: 5, text: '周五' },
//     { label: 6, text: '周六' },
//     { label: 7, text: '周七' },
//   ].find(item => item.label === number) || {}).text
// };

class Coupon extends Component {

  constructor(props) {
    super(props);
    // this.state = { dookay: "jsonString" }
    this.state = {
      couponList: [
        {
          id: 1,
          type: '新人专享',
          price: 30,
          title: '鲜趣新手专享30元优惠券',
          restrictiveness: 90,
          expiredAt: moment().add(20, 'days')
        },
        {
          id: 2,
          type: '周末专享',
          price: 30,
          title: '鲜趣新手专享30元优惠券',
          restrictiveness: 90,
          expiredAt: moment().add(20, 'days')
        },
        {
          id: 3,
          type: '满减专享',
          price: 30,
          title: '鲜趣新手专享30元优惠券',
          restrictiveness: 90,
          expiredAt: moment().add(20, 'days')
        },
        {
          id: 4,
          type: '满减券',
          price: 30,
          title: '鲜趣新手专享30元优惠券',
          restrictiveness: 90,
          expiredAt: moment().subtract(20, 'days')
        },
      ],
    };
  }

  handleChangeCard(e, couponId) {
    console.log(couponId)
    dsBridge.call("couponDetail", couponId);
  }

  render() {
    const { couponList } = this.state;
    return (
      <div className="coupon">
        {couponList.map((item, index) => (
          <div key={index} className="card" onClick={(e) => this.handleChangeCard(e, { couponId: item.id })}>
            <div className="name">
              <div className="test-top" data-color={getColor(item.type)}>
                <div className="left-top-radio" style={{
                  background: `radial-gradient(at top left, transparent 0%, transparent 40%, ${getColor(item.type)} 40%, ${getColor(item.type)} 100%)`
                }} />
                <div className="right-top-radio" style={{
                  background: `radial-gradient(at top right, transparent 0%, transparent 40%, ${getColor(item.type)} 40%, ${getColor(item.type)} 100%)`
                }} />
              </div>
              <div className="box" style={{ background: getColor(item.type) }}>
                <div className="text">{item.type}</div>
              </div>
              <div className="test-button">
                <div className="left-bottom-radio" style={{
                  background: `radial-gradient(at bottom left, transparent 0%, transparent 40%, ${getColor(item.type)} 40%, ${getColor(item.type)} 100%)`
                }} />
                <div className="right-bottom-radio" style={{
                  background: `radial-gradient(at bottom right, transparent 0%, transparent 40%, ${getColor(item.type)} 40%, ${getColor(item.type)} 100%)`
                }} />
              </div>
            </div>
            <div className="par">
              <div className="radio">
                <div className="left-top-radio" />
                <div style={{ height: 80, background: '#FFFFFF' }} />
                <div className="left-bottom-radio" />
              </div>
              <div className="price" style={{ color: getColor(item.type) }}>
                <span className="small">¥</span>
                <span>{item.price}</span>
              </div>
              <div className="detail">
                <div className="title">{item.title}</div>
                <div className="description">订单满{item.restrictiveness}元可用</div>
                <div className="description">有效期至：{item.expiredAt}
                  <div className="description" style={{ color: getColor(item.type) }}>查看可用商品>></div>
                </div>
              </div>
              <div className={"expire"}>
                {moment().isAfter(item.expiredAt) ?
                  <Icon type={"expire"} color={"#BBBBBB"} width={40} height={40} /> : null}
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }
}

export default Coupon;