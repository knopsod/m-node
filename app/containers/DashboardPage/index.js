import React from 'react';

const incomePeriods = [
  { type: 'Daily', dollar: 999999, coin: 888888 },
  { type: 'Weekly', dollar: 999999, coin: 888888 },
  { type: 'Monthly', dollar: 999999, coin: 888888 },
  { type: 'Yearly', dollar: 999999, coin: 888888 },
];

const index = props => {
  
  return (
    <div>
      <h1>DASHBOARD</h1>
      <h5>Income</h5>
      <ul>
        { incomePeriods.map(
            (ipd, index) => <li key={index}>{`${ipd.type} ${ipd.dollar} ${ipd.coin}`}</li>
        ) }
      </ul>
      <h5>Masternode Status</h5>
      <h5>Report</h5>

    </div>)
};

export default index;
