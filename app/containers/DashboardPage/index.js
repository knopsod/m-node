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
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, value }) => {
 	const radius = innerRadius + (outerRadius - innerRadius) * 1.4;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const yy = cy + radius * Math.sin(-midAngle * RADIAN);
 
  return (
    <g>
      <text x={x} y={yy} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
      <text x={x} y={yy + 10} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        HaHa { value }
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
      dashboardStatus: {},
      pieData: []
    }
  }

  componentDidMount() {
    setTimeout(() => {
      fetch('http://180.128.20.132:3000/v1/masternode/status?coin=all')
        .then(response => response.json())
        .then(json => {
          console.log(json)
          this.setState({
            ...this.state,
            dashboardStatus: json
          });
        });
    }, 1000);

    setTimeout(() => {
      fetch('http://180.128.20.132:3000/v1/masternode/chart')
        .then(response => response.json())
        .then(json => {
          json.map((obj) => {
            obj['value'] = obj.y;
            return obj;
          });
          console.log(json);
          this.setState({
            ...this.state,
            pieData: json
          });
        });
    }, 1000);
  }

  render() {

    const { dashboardStatus, pieData } = this.state;

    return (
      <div className="dashboard">
        <h1>DASHBOARD cls</h1>

        <div>
          { `offline: ${dashboardStatus.offline}, online: ${dashboardStatus.online}, warning: ${dashboardStatus.warning}, ` }
        </div>

        <ul>
          { pieData.map((pd, index) => (<li key={index}>{`name: ${pd.name}, y: ${pd.y}, reward: ${pd.reward}, server: ${pd.server}, value: ${pd.value}, `}</li>)) }
        </ul>

        <h5>Income</h5>
        <ul>
          { incomePeriods.map(
            (ipd, index) => <li key={index}>{`${ipd.type}`}</li>
          ) }
        </ul>
        <h5>Masternode Status</h5>
        <h5>Report</h5>
  
        <PieChart width={800} height={400}>
          <Pie isAnimationActive={false} data={data01} dataKey="value" cx={200} cy={200} outerRadius={80} fill="#8884d8" label/>
          <Pie data={data02} dataKey="value" cx={400} cy={200} innerRadius={40} outerRadius={80} fill="#82ca9d" label/>
          <Pie
            data={data}
            dataKey="value"
            cx={600} 
            cy={200} 
            labelLine={true}
            label={renderCustomizedLabel}
            outerRadius={80} 
            fill="#8884d8"
          >
            {
              data.map((entry, index) => <Cell key={index} fill={COLORS[index % COLORS.length]}/>)
            }
          </Pie>
          <Tooltip/>
        </PieChart>
        
      </div>)
  }
};

export default Dashboard;
