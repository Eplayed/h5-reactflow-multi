import React, { Component } from 'react';
import '../App.css';
import './packageDetail.css';
import Icon from '../component/Icon';
import dsBridge from "dsbridge";

/**
 * 包裹信息
 */
class PackageDetail extends Component {

  constructor(props) {
    super(props);
    this.state = { dookay: 'jsonString' }
    // this.state = {
    //   pageList: [
    //     {
    //       id: 1,
    //       delivery: '一小时达',
    //       name: '包裹1', listImg: [
    //         'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1528552976496&di=2db7b137bbd98a856bb7379de1787dd7&imgtype=0&src=http%3A%2F%2Fimg1.gtimg.com%2Fninja%2F1%2F2018%2F04%2Fninja152412756198113.jpg',
    //         'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1528552976495&di=7c70a0fc69c5e6e7a879ea2b29774ada&imgtype=0&src=http%3A%2F%2Fi1.hdslb.com%2Fbfs%2Fface%2F87c310479b906cfa4f71be2651d063ba20d5bbfd.jpg',
    //         'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1528552976477&di=22e6d246bb15826a4ef3ee2983e0a2d3&imgtype=0&src=http%3A%2F%2Fe.hiphotos.baidu.com%2Fzhidao%2Fwh%3D450%2C600%2Fsign%3D0746fa55861001e94e691c0b8d3e57da%2F279759ee3d6d55fb1671c59a66224f4a21a4ddd3.jpg',
    //         'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3858219493,1421455743&fm=11&gp=0.jpg',
    //         'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1528553035600&di=883e4110608cbd8a988b95d023c85464&imgtype=0&src=http%3A%2F%2Fpic.962.net%2Fup%2F2017-10%2F15077771822791013.jpg',
    //         'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1528553035600&di=883e4110608cbd8a988b95d023c85464&imgtype=0&src=http%3A%2F%2Fpic.962.net%2Fup%2F2017-10%2F15077771822791013.jpg',
    //         'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1528553035600&di=883e4110608cbd8a988b95d023c85464&imgtype=0&src=http%3A%2F%2Fpic.962.net%2Fup%2F2017-10%2F15077771822791013.jpg',
    //       ]
    //     },
    //     {
    //       id: 2,
    //       delivery: '次日达',
    //       name: '包裹2', listImg: [
    //         'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1528552976496&di=2db7b137bbd98a856bb7379de1787dd7&imgtype=0&src=http%3A%2F%2Fimg1.gtimg.com%2Fninja%2F1%2F2018%2F04%2Fninja152412756198113.jpg',
    //         'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1528552976495&di=7c70a0fc69c5e6e7a879ea2b29774ada&imgtype=0&src=http%3A%2F%2Fi1.hdslb.com%2Fbfs%2Fface%2F87c310479b906cfa4f71be2651d063ba20d5bbfd.jpg',
    //         'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1528552976477&di=22e6d246bb15826a4ef3ee2983e0a2d3&imgtype=0&src=http%3A%2F%2Fe.hiphotos.baidu.com%2Fzhidao%2Fwh%3D450%2C600%2Fsign%3D0746fa55861001e94e691c0b8d3e57da%2F279759ee3d6d55fb1671c59a66224f4a21a4ddd3.jpg',
    //         'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1528553035600&di=883e4110608cbd8a988b95d023c85464&imgtype=0&src=http%3A%2F%2Fpic.962.net%2Fup%2F2017-10%2F15077771822791013.jpg',
    //       ]
    //     },
    //   ],
    //   amount: '124.03',
    //   freight: '5.00',
    //   promotion: '20.60',
    //   coupon: '10.50',
    // }
  }

  handlePackageTotal(e, packageId) {
    console.log(packageId);
    dsBridge.call("packageDetail", packageId);

  }

  render() {
    const { amount, freight, promotion, coupon, pageList } = this.state;
    this.preferentialAmount = (Number(promotion) + Number(coupon)).toFixed(2);
    return (
      <div className="packageDetail">
        {pageList.map((item, index) => (
          <div className="content" key={index}>
            <div className="head">
              <div className="name">{item.name}</div>
              <div className={item.delivery == '一小时达' ? 'one-hour-arrive' : item.delivery == '自提商品' ? 'self-lifting' : item.delivery == '次日达' ? 'next-day' : 'next-day'}>
                {item.delivery}
              </div>
            </div>
            <div className="commodity">
              <div className="image">
                {item.listImg.map((item, index) => (
                  <img key={index} src={item} alt="加载中" />
                ))}
              </div>
              <div className="total" onClick={(e) => this.handlePackageTotal(e, { packageId: item.id })}>
                <span>共{item.listImg.length}件</span>
                <Icon type={"arrow-forward"} width={17} height={17} color={'#333333'} />
              </div>
            </div>
            
          </div>
        ))}
        <div className="detail">
          <div className="label">
            <span>订单金额</span>
            <span className="total-price">￥{amount}</span>
          </div>
          <div className="label">
            <span>运费</span>
            <span>￥{freight}</span>
          </div>
          <div className="label">
            <span>优惠金额</span>
            <span>-￥{this.preferentialAmount}</span>
          </div>
        </div>
      </div>
    );
  }
}

export default PackageDetail;
