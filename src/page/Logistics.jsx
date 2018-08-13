import React, {Component} from 'react';
import moment from 'moment';
import './logistics.css';

class Logistics extends Component {

  constructor(props) {
    super(props);
    // this.state = { dookay: 'jsonString' }

    this.state = {
      order: {
        distributionCompany: '顺丰快递',
        number: '179149759171514571',
        step: [
          {msg: '圆通快递已经揽件', time: moment().subtract(1, 'hours')},
          {msg: '商家已经通知快递揽件', time: moment().subtract(2, 'hours')},
          {msg: '您的包裹已出库', time: moment().subtract(3, 'hours')},
        ],
        commodityList: [
          {
            img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1529080441750&di=062461bd86acb46f35a4e072606cbb4f&imgtype=0&src=http%3A%2F%2Fc.hiphotos.baidu.com%2Fzhidao%2Fpic%2Fitem%2F7acb0a46f21fbe09510bf6a960600c338744ad31.jpg',
            name: '澳洲肥牛卷精品超级好吃不买就非常亏',
            specifications: '250g/盒',
            price: '128.00',
            unit: '盒',
            count: 2,
          },
        ],
      },

    };
  }

  render() {
    const {order} = this.state;
    return (
      <div className={'logistics'}>
        <div className={'card'}>
          <div className={'img'}><img src={order.commodityList[0].img} alt={'加载中'}/>
            <div className={'total'}>共{order.commodityList.length}件</div>
          </div>
          <div className={'content'}>
            <div className={'info'}>承运来源：{order.distributionCompany}</div>
            <div className={'info'}>运单编号：{order.number}</div>
          </div>
        </div>
        <div className={'card'}>
          <div className={'time-axis'}>
            {order.step.map((item, index) => (
              <div key={index}>
                <div className={order.step[index - 1] ? 'msg connection' : 'msg'}>{item.msg}
                  <div className={index === 0 ? 'select-point' : 'point'}/>
                  <div className={'time'}>{item.time}</div>
                </div>
                <div className={order.step[index + 1] ? 'placeholder connection' : 'placeholder'}/>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
}

export default Logistics;