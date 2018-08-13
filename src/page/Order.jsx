import React, { Component } from 'react';
import moment from 'moment';
import './order.css';
import Icon from "../component/Icon";
import AwitPayCountDownTime from "../component/AwaitPayCountDownTime";
import dsBridge from "dsbridge";

class Order extends Component {

  constructor(props) {
    super(props);
    // this.state = { dookay: 'jsonString' }
    this.state = {
      user: {
        name: 'Allen.chu',
        phone: '15312495836',
        address: '上海市浦东新区浦电路790号40弄',
      },
      order: {
        type: '门店自提',
        totalPrice: '154.03',
        transportationExpenses: '5.00',
        promotion: '12.00',
        coupon: '50.00',
        number: '139138520072584894',
        purchaseTime: '1696',
        paymentChannel: '支付宝',
        invoiceTitle:'天津市网城天创科技有限责任公司',
        chainName: '国权北路店',
        deliveryType: '物流配送',
        deliverTime: ['今日', '12:00', '12:30'],
        remark: '我是个非常有洁癖的人，所以请务必帮我包装的好一点，谢谢',
        delivery: '门店自提',
      },
      commodityList: [
        {
          commodityId: 1,
          img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1529080441750&di=062461bd86acb46f35a4e072606cbb4f&imgtype=0&src=http%3A%2F%2Fc.hiphotos.baidu.com%2Fzhidao%2Fpic%2Fitem%2F7acb0a46f21fbe09510bf6a960600c338744ad31.jpg',
          name: '澳洲肥牛卷精品超级好吃不买就非常亏',
          specifications: '250g/盒',
          price: '128.00',
          unit: '盒',
          count: 2,
          ordersId: 11,
          goodsId: 22,
          id:2

        },
        // {
        //   commodityId:2,
        //   img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1529080441750&di=062461bd86acb46f35a4e072606cbb4f&imgtype=0&src=http%3A%2F%2Fc.hiphotos.baidu.com%2Fzhidao%2Fpic%2Fitem%2F7acb0a46f21fbe09510bf6a960600c338744ad31.jpg',
        //   name: '澳洲肥牛卷精品超级好吃',
        //   specifications: '250g/盒',
        //   price: '128.00',
        //   unit: '盒',
        //   count: 2,
        // },
      ],
    };
  }

  handleRefund(e, refundInfo) {
    e.stopPropagation();
    console.log("refund")
    dsBridge.call("Refund", refundInfo), ((refundId) => {
      alert(refundId);
    });
  }

  handleCommodityDetail(e, commodityId) {
    console.log(commodityId)

    dsBridge.call("CommodityDetail", commodityId);
  }

  handleAddressDetail(e, userId) {

    dsBridge.call("AddressDetail", userId, (result) => {
      const userInfo = JSON.parse(result)
      console.log(userInfo);
      this.setState({ user: userInfo })
    });

  }

  render() {
    const { order, commodityList } = this.state;
    const totalAmount = ((+order.totalPrice) + (+order.transportationExpenses) - (+order.promotion) - (+order.coupon)).toFixed(2);
    const leftIcon = [
      { label: '等待付款', value: 'waitTime' },
      { label: '正在备货', value: 'stockUp' },
      { label: '正在配送', value: 'distribution' },
      { label: '配送完成', value: 'smile' },
      { label: '期待你的评价', value: 'flower' },
      { label: '交易完成', value: 'smile' },
      { label: '交易关闭', value: 'tradeClose' },
      { label: '门店自提', value: 'selfLifting' },
    ].find(item => item.label === order.type);
    return (
      <div className="order">
        <div className="nav">
          <div className="content">
            <div className="type">
              {leftIcon ? <Icon type={leftIcon.value} color="#FFFFFF" width={22} height={22} /> : null}
              <span className="typeName">{order.type}</span>
            </div>
            {order.type === '等待付款' ?
              <div className="count-down-time">
                <p><AwitPayCountDownTime preferentialEndTime={moment().add(order.purchaseTime / 60, 'minutes')} /></p>
                <p>需付款：¥{totalAmount}</p>
              </div> : null}
            {['正在备货', '正在配送', '配送完成', '门店自提'].find(item => item === order.type) ?
              <div className="schedule">
                <div>
                  <div><Icon type={order.type === '正在备货' ? 'radio-button-on' : 'radio-button-off'} color="#FFFFFF"
                    width={22} height={22} /></div>
                  <div className="remark">备货中</div>
                </div>
                <div className="dashed" />
                <div>
                  <div><Icon type={(order.type === '正在配送' || order.delivery === '门店自提') ? 'radio-button-on' : 'radio-button-off'} color="#FFFFFF"
                    width={22} height={22} /></div>
                  {
                    order.type === '门店自提' ? <div className="remark">待领取</div> : <div className="remark">配送中</div>
                  }

                </div>
                <div className="dashed" />
                <div>
                  <div><Icon type={order.type === '配送完成' ? 'radio-button-on' : 'radio-button-off'} color="#FFFFFF"
                    width={22} height={22} /></div>
                  <div className="remark">已完成</div>
                </div>
              </div> : null}
            {order.type === '交易关闭' ?
              <div className="count-down-time">
                <p>订单未付款，超时自动关闭</p>
              </div> : null}
          </div>
        </div>
        <div className="user" onClick={(e) => this.handleAddressDetail(e, { userId: this.state.user.id })}>
          <div className="icon"><Icon type={"location"} color="#FF7494" width={30} height={24} /></div>
          <div className="detail">
            <div className="contact">
              <span>{this.state.user.name}</span><span className="phone">{this.state.user.phone}</span>
            </div>
            <div className="address">{this.state.user.address}</div>
          </div>
        </div>
        <div className="commodity">
          <div className="head">
            <div className="title">商品总览</div>
            <div className={order.delivery === '一小时达' ? 'one-hour-arrive' : order.delivery === '门店自提' ? 'self-lifting' : order.delivery === '次日达' ? 'next-day' : 'next-day'}>
              {order.delivery}
            </div>
          </div>
          {commodityList.map((item, index) => (
            <div className="card" key={index} onClick={(e) => this.handleCommodityDetail(e, { commodityId: item.id })} >
              <div className="sidebar">
                <img src={item.img} alt="加载中" />
              </div>
              <div className="content">
                <div className="text">
                  <div className="name">{item.name}</div>
                  <div className="specifications">规格:{item.specifications}</div>
                  <div className="unit">
                    <span>单价:¥ {item.price}/{item.unit}</span><span>数量:{item.count}{item.unit}</span>
                  </div>
                </div>
                <div className="price">
                  <div className="total">¥{(item.count * +item.price).toFixed(2)}</div>
                  {['期待你的评价', '交易完成'].find(item => item === order.type) ?
                    <div className="refund" onClick={(e) => this.handleRefund(e, { goodsId: item.goodsId, orderId: item.ordersId, refundId: item.refundId })}>{item.refundId > 0 ? '退款详情' : '申请退款'}</div> : null}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="detail">
          <div className="content">
            <p><span className="label">订单编号：</span><span>{order.number}</span></p>
            <p><span
              className="label">下单时间：</span><span>{order.purchaseTime}</span></p>
            <p><span className="label">支付方式：</span><span>{order.paymentChannel}</span></p>
            <p><span className="label">发票信息：</span><span>{order.invoiceTitle}</span></p>

          </div>

          <div className="content">
            {
              order.delivery === '门店自提' ? <p><span className="label">门店选择：</span><span>{order.chainName}</span></p> : null
            }
            <p><span className="label">配送方式：</span><span>{order.deliveryType}</span></p>
            <p>{order.delivery === '门店自提' ? <span className="label">自提时间：</span> : <span className="label">配送时间：</span>}
              <span>{order.deliverTime[0]} {order.deliverTime.slice(1, 3).join('~')}</span>
            </p>
          </div>

          {
            order.delivery === '门店自提' ? null :
              <div className="remark">
                <p className="label">其他信息：</p> <p className="content">{order.remark}</p>
              </div>
          }

        </div>
        <div className="price">
          <div className="content"><span className="label">商品总额：</span><span>￥{order.totalPrice}</span></div>
          <div className="content"><span className="label">运费：</span><span>¥{order.transportationExpenses}</span></div>
          <div className="content last-child"><span className="label">优惠金额：</span><span>-¥{((+order.coupon) + (+order.promotion)).toFixed(2)}</span></div>
          <div className="total">
            <span>订单总额：</span>
            <span
              className="total-amount">￥{totalAmount}</span>
          </div>
        </div>

      </div>
    )
  }
}

export default Order;
