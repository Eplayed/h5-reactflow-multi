import React, {Component} from 'react';
import './help.css';
import Icon from '../component/Icon';

class Help extends Component {

  constructor(props) {
    super(props);
    // this.state = { dookay: 'jsonString' }
    this.state = { 
      selectIndex: [],
      ulList: [
        {
          label: '购买咨询', content: '内容哦内容我很坚强哦i和哦片我恶化大蒜片  爱死对u坚强哦i未见其哦u酒i哦啊ui哦送的回去后完全哦i恶的话1\n内容2',
        },
        {
          label: '付款结算', content: '',
        },
        {
          label: '价格说明', content: '',
        },
        {
          label: '售后服务', content: '',
        },
        {
          label: '退款说明', content: '',
        },
        {
          label: '联系我们', content: '',
        },
        {
          label: '免责申明', content: '',
        },
        {
          label: '食品安全管理制度', content: '',
        },
      ]
    };
  }

  handleShow = (e, payload) => {
    const {selectIndex} = this.state;
    if (selectIndex.find(item => item === payload.index) > -1) {
      selectIndex.splice(selectIndex.indexOf(payload.index), 1);
    } else {
      selectIndex.push(payload.index)
    }
    this.setState({
      selectIndex
    })
  };

  render() {
    const {ulList, selectIndex} = this.state;
    return (
      <div className="help">
        <div className="head">帮助中心</div>
        <div className="content">
          {ulList.map((item, index) => (
            <div key={index}>
              <div className="individual" onClick={(e) => this.handleShow(e, {index: index})}>
                <p>{item.label}</p>
                <div className="arrow-down"><Icon type={'arrow-down'} width={20} color={"#999999"}/></div>
              </div>
              {selectIndex.find(selectItem => selectItem === index) > -1 ?
                <div>
                  <ul className="detail">
                    {item.content.split('\n').map((contentItem, contentIndex) => {
                      return <li key={contentIndex}>{contentItem}</li>
                    })}
                  </ul>
                </div> : null}
            </div>
          ))}

        </div>
      </div>
    );
  }
}

export default Help;
