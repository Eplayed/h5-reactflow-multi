import React, {Component} from 'react';
import './App.css';
import CommodityDetail from './page/CommodityDetail';
import NormDetail from './page/NormDetail';
import Help from './page/Help';
import DistributionTime from './page/DistributionTime';
import PackageDetail from './page/PackageDetail';
import PickUpOrder from './page/PickUpOrder';
import Promotion from './page/Promotion';
import Coupon from './page/Coupon';
import Order from './page/Order';
import AfterSale from "./page/AfterSale";
import Logistics from "./page/Logistics";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      page: 1,
    }
  }

  render() {
    const {page} = this.state;
    return (
      <div className="App">


        {page === 0 ? <CommodityDetail/> : null}
        {page === 1 ? <NormDetail/> : null}
        {page === 2 ? <DistributionTime/> : null}
        {page === 3 ? <PackageDetail/> : null}
        {page === 4 ? <PickUpOrder/> : null}
        {page === 5 ? <Help/> : null}
        {page === 6 ? <Promotion/> : null}
        {page === 7 ? <Coupon/> : null}
        {page === 8 ? <Order/> : null}
        {page === 9 ? <AfterSale/> : null}
        {page === 10 ? <Logistics/> : null}

      </div>
    );
  }
}

export default App;
