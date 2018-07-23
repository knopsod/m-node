import React from 'react';
import { PieChart, Pie, Legend, Tooltip, Sector, Cell } from 'recharts';

const incomePeriods = [
  { type: 'Daily', dollar: 999999, coin: 888888 },
  { type: 'Weekly', dollar: 999999, coin: 888888 },
  { type: 'Monthly', dollar: 999999, coin: 888888 },
  { type: 'Yearly', dollar: 999999, coin: 888888 },
];

const data01 = [{name: 'Group A', value: 400}, {name: 'Group B', value: 300},
                  {name: 'Group C', value: 300}, {name: 'Group D', value: 200},
                  {name: 'Group E', value: 278}, {name: 'Group F', value: 189}]

const data02 = [{name: 'Group A', value: 2400}, {name: 'Group B', value: 4567},
                  {name: 'Group C', value: 1398}, {name: 'Group D', value: 9800},
                  {name: 'Group E', value: 3908}, {name: 'Group F', value: 4800}];

const data = [{name: 'Group A', value: 400, flag: 4}, {name: 'Group B', value: 300, flag: 3},
              {name: 'Group C', value: 300, flag: 3}, {name: 'Group D', value: 200, flag: 2}];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, flag }) => {
 	const radius = innerRadius + (outerRadius - innerRadius) * 1.25;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
 
  return (
    <g>
      <text x={x} y={y} fill="black" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
      <text x={x} y={y + 10} fill="black" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        new line {flag}
      </text>
    </g>
  );
};

const myLabel = item => {
  console.log(item);

  return (
    <text x={item.cx} y={item.cy}>My label</text>
  );
};

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pieData: []
    }
  }

  componentDidMount() {
    fetch('http://180.128.20.132:3000/v1/masternode/status?coin=all')
      .then(response => response.json())
      .then(json => console.log(json));

    fetch('http://180.128.20.132:3000/v1/masternode/chart')
      .then(response => response.json())
      .then(json => {
        console.log(json);
        this.setState({
          ...this.state,
          pieData: json
        });
      });
  }

  render() {

    const pieData = this.state.pieData;

    return (
      <div>
        <h1>DASHBOARD cls</h1>
        <h5>Income</h5>
        <ul>
          { incomePeriods.map(
              (ipd, index) => <li key={index}>{`${ipd.type} ${ipd.dollar} ${ipd.coin}`}</li>
          ) }
        </ul>
        <h5>Masternode Status</h5>
        <h5>Report</h5>
  
        <PieChart width={800} height={400}>
          <Pie isAnimationActive={false} data={data01} cx={200} cy={200} outerRadius={80} fill="#8884d8" label/>
          <Pie data={data02} cx={400} cy={200} innerRadius={40} outerRadius={80} fill="#82ca9d" label/>
          <Pie
            data={data} 
            cx={600} 
            cy={200} 
            labelLine={true}
            label={renderCustomizedLabel}
            outerRadius={80} 
            fill="#8884d8"
          >
            {
              data.map((entry, index) => <Cell key={index} dataKey={index} fill={COLORS[index % COLORS.length]}/>)
            }
          </Pie>
          <Tooltip/>
        </PieChart>
        <ul>
          { pieData.map((pd, index) => (<li key={index}>{`name: ${pd.name}, y: ${pd.y}, reward: ${pd.reward}, server: ${pd.server}, `}</li>)) }
        </ul>
      </div>)
  }
};

export default Dashboard;
