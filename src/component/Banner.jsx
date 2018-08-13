import React, {Component} from 'react';
import './banner.css';
import SwipeableViews from 'react-swipeable-views';

class Banner extends Component {

  constructor(props) {
    super(props);
    this.state = {
      ...props,
      width: 0,
      currentPoint: 0,
    };
  }

  handleChangeIndex = (index) => {
    this.setState({
      currentPoint: index,
    })
  };

  render() {
    const {data, currentPoint} = this.state;
    return (
      <div className="content" style={{position: 'relative'}}>
        <SwipeableViews onChangeIndex={this.handleChangeIndex}>
          {data.map((item, index) => (
            <div key={index} style={{
              padding: 15,
              height: 250,
              backgroundImage: `url(${item})`,
              backgroundSize: '100% 100%',
            }}>

            </div>
          ))}
        </SwipeableViews>
        <div className="point">
          {data.map((item, index) => (
            <div className={index === currentPoint ? 'select': null} key={index}> </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Banner;
