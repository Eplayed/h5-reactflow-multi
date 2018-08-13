import React, { Component } from 'react';
import Banner from '.././component/Banner';
import './commodityDetail.css';
import '../App.css';
import Icon from "../component/Icon";
import moment from 'moment';
import CountDownTime from "../component/CountDownTime";
import dsBridge from "dsbridge";

/**
 * 商品详情页
 */
class CommodityDetail extends Component {

  constructor(props) {
    super(props);
    // this.state = { dookay: 'jsonString' }

    this.state = {
      // 特惠
      preferential: 1,
      // 优惠结束时间
      preferentialEndTime: moment().add(1, 'minutes'),
      countDownTime: {
        hour: '00',
        minute: '00',
        second: '00',
      },
      navState: 0,
      commodity: {
        banner: [
          'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1528468041101&di=946c34001db74d1063ddf4032b442cae&imgtype=0&src=http%3A%2F%2Fe.hiphotos.baidu.com%2Fzhidao%2Fwh%253D450%252C600%2Fsign%3D2d0e9642ba3533faf5e39b2a9de3d129%2Fb17eca8065380cd7a5f5bda1aa44ad3458828196.jpg',
          'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1528468041101&di=946c34001db74d1063ddf4032b442cae&imgtype=0&src=http%3A%2F%2Fe.hiphotos.baidu.com%2Fzhidao%2Fwh%253D450%252C600%2Fsign%3D2d0e9642ba3533faf5e39b2a9de3d129%2Fb17eca8065380cd7a5f5bda1aa44ad3458828196.jpg',
          'http://img1.gtimg.com/kid/pics/hv1/184/99/2208/143600629.png',
          'http://img1.gtimg.com/kid/pics/hv1/228/224/2201/143177373.png',
        ],
        title: '庵咒安格斯牛煎肉 2760天古寺',
        subtitle: 'M3 500g',
        description: '源自澳洲270天谷饲安格斯牛种，M3等级原切。鲜切急冻，锁住新鲜',
        originalPrice: '12.80',
        price: '10.40',
        unit: '袋',
        sold: 2031,
        shelfLife: '2天',
        placeOfOrigin: '内蒙古',
        specifications: '200g/袋',
        brand: '先去自营',
        delivery: '次日达',
        goodsList: [
          {
            goodsId: 45,
            originalPrice: 100,
            price: 100,
            subtitle: "大只；250g",
          },
          {
            goodsId: 46,
            originalPrice: 90,
            price: 90,
            subtitle: "中只；250g",
          },
          {
            goodsId: 47,
            originalPrice: 80,
            price: 80,
            subtitle: "小只；250g",
          },
          {
            goodsId: 48,
            originalPrice: 90,
            price: 90,
            subtitle: "大只；500g",
          },
          {
            goodsId: 49,
            originalPrice: 80,
            price: 80,
            subtitle: "中只；500g",
          },
          {
            goodsId: 50,
            originalPrice: 70,
            price: 70,
            subtitle: "小只；500g",
          },
          {
            goodsId: 51,
            originalPrice: 80,
            price: 80,
            subtitle: "大只；1000g",
          },
          {
            goodsId: 52,
            originalPrice: 70,
            price: 70,
            subtitle: "中只；1000g",
          },
          {
            goodsId: 53,
            originalPrice: 60,
            price: 60,
            subtitle: "小只；1000g",
          }
        ],
        longImg: [
          'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1528519204517&di=71f5380f4f963ce4f2d6fc0847195dc6&imgtype=0&src=http%3A%2F%2Fg.hiphotos.baidu.com%2Fzhidao%2Fpic%2Fitem%2F9922720e0cf3d7ca4d4e0acbf91fbe096a63a9d6.jpg',
          'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1528519204509&di=142fdde1ff79188ead91ea3448445f1a&imgtype=0&src=http%3A%2F%2Fi.gtimg.cn%2Fqqlive%2Fimg%2Fjpgcache%2Ffiles%2Fqqvideo%2Fj%2Fjynqzy9n3wfrsfp.jpg',
        ],
      },
      user: {
        list: [
          {
            nickname: 'Allen.chu',
            comment: '爱来的是朋友送的，包装好记号，肉也好你牛逼，q>一分钱一个大红包，绝对超值',
            gmtCreate: '2017-12-24 15:23:13',
            userImage: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1528519997742&di=5568800f0a8b96f1325ac74a5685ea15&imgtype=0&src=http%3A%2F%2Fpic.962.net%2Fup%2F2017-10%2F15077771822791013.jpg',
          },
          // {
          //   nickname: 'vicky.SG',
          //   comment: '味道不错，我很喜欢',
          //   gmtCreate: '2017-12-24 15:23:13',
          //   userImage: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3858219493,1421455743&fm=11&gp=0.jpg',
          // },
        ],
        total: 6780,
        praisePercent: '99.80',
      },
    };
  }

  componentDidMount() {

    dsBridge.register("ChangeProductInfo", (goodsId) => {
      console.log(goodsId)
      const { commodity } = this.state;
      const goodsInfo = commodity.goodsList.find(item => item.goodsId == goodsId)
      if (goodsInfo) {
        commodity.price = goodsInfo.price;
        commodity.subtitle = goodsInfo.subtitle;
        this.setState({ commodity })
      }

    })
  }

  componentWillUnmount() {
    clearInterval(this.countDownId);
    window.localStorage.removeItem('CommodityGoodsId');
  }

  handleCommodityShare(e) {
    console.log("CommodityShare");
    dsBridge.call("CommodityShare", "CommodityShare");
  }

  handleCommodityEvaluate(e) {
    console.log("CommodityEvaluate");
    dsBridge.call("CommodityEvaluate", "CommodityEvaluate");
  }

  render() {
    const { navState, user, commodity, preferential, countDownTime, preferentialEndTime } = this.state;
    return (
      <div>
        <div className="nav">
          <a href="#"><p className={navState === 0 ? 'select' : null}>商品</p></a>
          <a href="#evaluate"><p className={navState === 1 ? 'select' : null}>评价</p></a>
          <a href="#graphic"><p className={navState === 2 ? 'select' : null}>详情</p></a>
        </div>
        <Banner data={commodity.banner} />
        {Boolean(preferential) ?
          <div className="sale">
            <div className="price">
              <p className="title">限时特惠价</p>
              <p className="discount"><span className="favorable-price">￥{commodity.price}</span><span
                className="original-price">￥{commodity.originalPrice}/{commodity.unit}</span></p>
            </div>
            <CountDownTime preferentialEndTime={preferentialEndTime} preferential={preferential} countDownTime={countDownTime} />
          </div> : null}

        <div className="product">
          <div className="product-name">
            <div className="">
              <p>{commodity.title}</p>
              <p>{commodity.subtitle}</p>
            </div>
            <div className={commodity.delivery == '一小时达' ? 'one-hour-arrive' : commodity.delivery == '自提商品' ? 'self-lifting' : commodity.delivery == '次日达' ? 'next-day' : 'next-day'}>
              {commodity.delivery}
            </div>
          </div>

          <p className="description">{commodity.description}</p>

          <div className="price">
            {preferential ? null : <div><span className="money">￥{commodity.price}</span>
              <span className="unit">/{commodity.unit}</span></div>}
            <div className="amount"><span>已售{commodity.sold}份</span><span>支持7天无理由退换货</span></div>
          </div>

          <div className="share" onClick={(e) => this.handleCommodityShare(e)}>
            <span className="share-ico"><Icon type={'share'} color={"#FFFFFF"} width={20} height={20} /></span>
            <span className="title">立即分享赢30元大礼包</span>

            <span className="forward-ico">
              <span className="tag">去分享</span>
              <Icon type={'arrow-forward'} width={18} height={18} color={'#FFFFFF'} /></span>
          </div>
        </div>

        <div id={'evaluate'} className="evaluate" >
          <div onClick={(e) => this.handleCommodityEvaluate(e)}>
            <div className="detail">
              <div className="total">全部评价({user.total})</div>
              <div className="comment">好评度 <span className="percent"> {user.praisePercent}</span> %
              <Icon type={'arrow-forward'} width={18} height={18} color={'#999999'} />
              </div>
            </div>
            {user.list.map((item, index) => (
              <div className="user" key={index}>
                <div className="name">
                  <div><img className="head-portrait" alt={'加载中'} src={item.userImage} /></div>
                  <span>{item.nickname}</span>
                </div>
                <p className="comment">{item.comment}</p>
                <p className="gmt-create">{item.gmtCreate}</p>
              </div>
            ))}
          </div>


        </div>

        <div id={'graphic'} className="graphic">
          {commodity.longImg.map((item, index) => <img key={index} className="picture" src={item} alt={'加载中'} />)}
        </div>

      </div>
    );
  }
}

export default CommodityDetail;
