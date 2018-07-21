import React from 'react';

import MasternodesItem from 'components/MasternodesItem';

const data = [
  { label: 'Dash' },
  { label: 'Deviant' },
  { label: 'HexxCoin' },
  { label: 'ALQO(XLQ)' },
  { label: 'Rhenium(XRH)' },
];

const index = (props) => {
  return (
    <div>
      MasternodeList!!
      <ul>
        { data.map((item, index) => (<MasternodesItem key={index} label={item.label} />)) }
      </ul>
    </div>
  );
};

export default index;
