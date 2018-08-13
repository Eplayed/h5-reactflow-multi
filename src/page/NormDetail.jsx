import React, { Component } from 'react';
import './normDetail.css';
import Icon from "../component/Icon";
import dsBridge from "dsbridge";

/**
 * 选择规格
 */
class NormDetail extends Component {

  constructor(props) {
    super(props);
    // this.state = { dookay: "jsonString" }

    this.state = {
      goodsPrice: 0,
      commodity: {
        banner: "https://xianquapp.oss-cn-hangzhou.aliyuncs.com/image/cb/e0/cbe04e33f4709d2735bb689e9bedee72.jpg",
        goodsList: [
          {
            goodsId: 45,
            goodsPrice0: 100,
            goodsSpecString: "大只；250g",
            goodsStorage: 1086,
          },
          {
            goodsId: 46,
            goodsPrice0: 90,
            goodsSpecString: "中只；250g",
            goodsStorage: 1111,
          },
          {
            goodsId: 47,
            goodsPrice0: 80,
            goodsSpecString: "小只；250g",
            goodsStorage: 1111,
          },
          {
            goodsId: 48,
            goodsPrice0: 90,
            goodsSpecString: "大只；500g",
            goodsStorage: 1111,
          },
          {
            goodsId: 49,
            goodsPrice0: 80,
            goodsSpecString: "中只；500g",
            goodsStorage: 1111,
          },
          {
            goodsId: 50,
            goodsPrice0: 70,
            goodsSpecString: "小只；500g",
            goodsStorage: 1111,
          },
          {
            goodsId: 51,
            goodsPrice0: 80,
            goodsSpecString: "大只；1000g",
            goodsStorage: 1111,
          },
          {
            goodsId: 52,
            goodsPrice0: 70,
            goodsSpecString: "中只；1000g",
            goodsStorage: 1111,
          },
          {
            goodsId: 53,
            goodsPrice0: 60,
            goodsSpecString: "小只；1000g",
            goodsStorage: 1111,
          }
        ],
        specIdsArray: [
          {
            goodsId: 45,
            specValueIds: [
              54,
              57
            ],
          },
          {
            goodsId: 48,
            specValueIds: [
              55,
              57
            ],
          },
          {
            goodsId: 51,
            specValueIds: [
              56,
              57
            ],
          },
          {
            goodsId: 46,
            specValueIds: [
              54,
              58
            ],
          },
          {
            goodsId: 49,
            specValueIds: [
              55,
              58
            ],
          },
          {
            goodsId: 52,
            specValueIds: [
              56,
              58
            ],
          },
          {
            goodsId: 47,
            specValueIds: [
              54,
              59
            ],
          },
          {
            goodsId: 50,
            specValueIds: [
              55,
              59
            ],
          },
          {
            goodsId: 53,
            specValueIds: [
              56,
              59
            ],
          }
        ],
        subtitle: "大只；250g",
        title: "大香蕉",
      },
      flavoring: [
        {
          key: "单品大小",
          option: [
            {
              specValueId: 57,
              specValueName: "大只",
            },
            {
              specValueId: 58,
              specValueName: "中只",
            },
            {
              specValueId: 59,
              specValueName: "小只",
            }
          ],
        },
        {
          key: "重量",
          option: [
            {
              specValueId: 54,
              specValueName: '250g',
            },
            {
              specValueId: 55,
              specValueName: '500g',
            },
            {
              specValueId: 56,
              specValueName: '1000g',
            }
          ],
        }
      ],
      select: {
        amount: 1,
        flavoring: [
          {
            specValueId: 57,
            specValueName: "大只",
          },
          {
            specValueId: 54,
            specValueName: '250g',
          }
        ],
      },
      totalAmount: 1086,
    }
  }

  componentDidMount() {
    this.specArray = [];
    this.data = {};
    this.goodsId = 0;
    const { select, commodity } = this.state;
    const self = this;
    select.flavoring.forEach((item, index) => {
      self.specArray.push(item.specValueId);
    })
    self.specArray.sort();

    this.goodsinfo = this.findGoodsSpecPrice(this.specArray);
    commodity.subtitle = this.goodsinfo.specString;
    this.setState({ goodsPrice: this.goodsinfo.price, commodity })
  }

  findGoodsSpecPrice(specArray) {
    let goodsinfo = {};
    const { commodity } = this.state;
    commodity.specIdsArray.forEach((value, index) => {
      if (String(value.specValueIds) === String(specArray))
        commodity.goodsList.forEach(item => {
          if (value.goodsId === item.goodsId) {
            goodsinfo.price = item.goodsPrice0;
            goodsinfo = {
              price: item.goodsPrice0,
              specString: item.goodsSpecString
            }

            this.goodsId = item.goodsId;
            return
          }
        })
    })
    return goodsinfo;
  }



  handleChangeAmount = (e, payload) => {
    const { select } = this.state;
    select.amount = Number(select.amount) + Number(payload.count);
    console.log({ number: select.amount });
    
    this.setState({ select });

    // todo: 等待原生返回内容
    dsBridge.call("ChangeAmount", select.amount);
  };

  handleSelect = (e, payload) => {
    const { select, flavoring, commodity } = this.state;
    console.log(payload.option);
    // 互斥
    select.flavoring[payload.index] = flavoring[payload.index].option.find(itemFlavoring => itemFlavoring.specValueId === payload.option.specValueId)
    this.data = { number: select.amount, selectList: [] };

    select.flavoring.forEach((item, index) => {
      this.data.selectList.push(item.specValueId);
    })

    //商品价格
    // let goodsPrice = this.findGoodsSpecPrice(this.data.selectList.sort()) * select.amount;
    this.goodsinfo = this.findGoodsSpecPrice(this.data.selectList.sort());
    commodity.subtitle = this.goodsinfo.specString;
    this.setState({ select, goodsPrice: this.goodsinfo.price, commodity })

    // todo 等待原生返回内容
    console.log(this.data);

    dsBridge.call("ChangeSpecifications", this.data, (totalAmount) => {
      this.setState({ totalAmount: totalAmount })
    });
  };

  handleConfirm = () => {
    console.log('事件 confirm')
    dsBridge.call("AddCart", "AddCart");
  };

  render() {
    const { commodity, select, flavoring, totalAmount, goodsPrice } = this.state;
    return (
      <div className="dashboard">
        <div className="head">
          <div className="banner">
            <img src={commodity.banner} alt="加载中" />
          </div>
          <div className="title">
            <p>{commodity.title}</p>
            <p>{commodity.subtitle}</p>
            <p>¥{goodsPrice}</p>
          </div>
        </div>
        {flavoring.map((item, index) => (
          <div className="param" key={index}>
            <div className="label">{item.key}</div>
            <div className="option">
              {item.option.map((itemOption, indexOption) => (
                <div className={select.flavoring.find(itemSelect => itemSelect.specValueId === itemOption.specValueId) ? 'select' : null}
                  key={indexOption} onClick={(e) => this.handleSelect(e, { option: itemOption, index: index })}>{itemOption.specValueName}</div>
              ))}
            </div>
          </div>
        ))}
        <div className="param">
          <div className="label">数量</div>
          <div className="option-amount">
            <button className="amount-button amount-button-left"
              onClick={(e) => this.handleChangeAmount(e, { count: -1 })}
              disabled={1 < select.amount && select.amount <= totalAmount ? false : true}>
              <Icon type={'remove'} color={select.amount > 1 ? '#FF7494' : '#999999'} width={18} height={18} />
            </button>
            <div className="amount-button-total">{totalAmount > 0 ? select.amount : '0'}</div>
            <button className="amount-button amount-button-right"
              onClick={(e) => this.handleChangeAmount(e, { count: 1 })}
              disabled={select.amount < totalAmount ? false : true}>
              <Icon type={'add'} color={select.amount < totalAmount ? '#FF7494' : '#999999'} width={18} height={18} />
            </button>
          </div>
        </div>
        <button className={"shopping-cart"} onClick={this.handleConfirm} disabled={totalAmount > 0 ? false : true}>
          <span>{totalAmount > 0 ? "加入购物车" : "库存不足"}</span>
        </button>
      </div>
    );
  }

}


export default NormDetail;
