import React, { Component } from 'react';
import moment from 'moment';
import './afterSale.css';
import dsBridge from "dsbridge";

class AfterSale extends Component {

  constructor(props) {
    super(props);
    // this.state = { dookay: 'jsonString' }
    this.state = {
      imgZoomVisible: false,
      imgZoomUrl: '',
      // info: { dookay: 'jsonString' },
      info: {
        state: '正在审核',
        commodityList: {
          img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1529080441750&di=062461bd86acb46f35a4e072606cbb4f&imgtype=0&src=http%3A%2F%2Fc.hiphotos.baidu.com%2Fzhidao%2Fpic%2Fitem%2F7acb0a46f21fbe09510bf6a960600c338744ad31.jpg',
          name: '澳洲肥牛卷精品超级好吃不买就非常亏',
          specifications: '250g/盒',
          price: '128.00',
          unit: '盒',
          count: 2,
          id: 2
        },
        trade: {
          saleNumber: '128947593579',
          number: '139138520072583544',
          gmtTime: moment().subtract(3, 'hours'),
          amount: '100.00',
          remark: '实物不符、配送延时',
        },
        uploadRoot: '',
        imageSrc: "https://flowerhome.oss-cn-hangzhou.aliyuncs.com/image/74/4b/744b6ed029e0c8bcb2f88ee39179f614.png,https://flowerhome.oss-cn-hangzhou.aliyuncs.com/image/3d/9f/3d9f7f3f88ad3e2ab6f4d195be882cce.jpg,https://flowerhome.oss-cn-hangzhou.aliyuncs.com/image/3d/9f/3d9f7f3f88ad3e2ab6f4d195be882cce.jpg"
      }
    }
  }

  handleCommodityDetail(e, commodityId) {
    dsBridge.call("CommodityDetail", commodityId);

  }

  handleImgOnClick(imgUrl) {
    this.setState({ imgZoomVisible: true, imgZoomUrl: imgUrl })
  }

  hideImgZoomWrap() {
    this.setState({ imgZoomVisible: false });
  }

  render() {
    const { info: { state, commodityList, trade, goodsCount, uploadRoot, imageSrc }, imgZoomVisible, imgZoomUrl } = this.state;
    const imageUrl = imageSrc.split(',');
    return (
      <div className="after-sale">
        <div className={'head'}>处理状态：<span className={"state"}>{state}</span></div>
        <div className={'card'} onClick={e => this.handleCommodityDetail(e, { commodityId: commodityList.id })}>
          <div className={'slide'}>
            <img src={commodityList.img} alt={'加载中'} />
            <div className={'total'}>共{goodsCount}件</div>
          </div>

          <div className={'content'}>
            <div className={'name'}>{commodityList.name}</div>
            <div className={'specifications'}>规格:{commodityList.specifications}</div>
            <div
              className={'unit'}>
              <span>单价:¥ {commodityList.price}/{commodityList.unit}</span><span>数量:{commodityList.count}{commodityList.unit}</span>
            </div>
          </div></div>

        <div className={'card'}>
          <div className={'sale'}>
            <div className={'title'}>售后信息</div>
            <p className={'info'}><span>售后编号：</span><span className={'param'}>{trade.saleNumber}</span></p>
            <p className={'info'}>
              <span>申请时间：</span><span className={'param'}>{moment(trade.gmtTime).format('YYYY-MM-DD hh:mm:ss')}</span>
            </p>
            <p className={'info'}><span>订单编号：</span><span className={'param'}>{trade.number}</span></p>
            <p className={'info'}><span>退款金额：</span><span className={'param'}>￥{trade.amount}</span></p>
            <p className={'info info-last'}><span>售后原因：</span><span className={'param'}>{trade.remark}</span></p>
          </div>
        </div>
        <div className={'card'}>
          <div className={'sale'} style={{ width: '100%' }}>
            <div className={'title'}>售后凭证</div>
            <div className={'imageSrc-wrap'}>
              {
                imageUrl.map((img) => {
                  return (
                    <div onClick={() => { this.handleImgOnClick(img) }}>
                      <img src={uploadRoot + img} alt="" />
                    </div>
                  )

                })
              }
            </div>
          </div>
        </div>
        {
          imgZoomVisible && (
            <div className={'imgZoomWrap'} onClick={() => { this.hideImgZoomWrap() }}>
              <img src={uploadRoot + imgZoomUrl} alt="" />
            </div>
          )
        }

      </div>
    )
  }
}

export default AfterSale;