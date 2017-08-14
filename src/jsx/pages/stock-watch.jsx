import React from 'react';

import StockNamesSection from '../components/stock-names-section';
import appChart from '../../js/stock-watch/chart-stock-app';


class StockWatch extends React.Component {

  componentDidMount() {
    appChart.init();
    appChart.setHighChartTheme();
  }

  render() {
    return (
      <div id="stocks-section" className="container">
        <div className="row">
          <div className="col-lg-12">
            <div id="container-chart">TODO StockWatch</div>
          </div>
        </div>
        <div className="row">
          <div className="stocks-container" id="stock-names-section">
            <StockNamesSection />
          </div>
        </div>
      </div>
    );
  }
}

$(() => {
  appChart.initStockList();
});

export default StockWatch;
