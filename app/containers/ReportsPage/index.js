import React, { Component } from 'react';
import { PieChart, Pie, Legend, Tooltip, Sector, Cell } from 'recharts';

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

class Reports extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reports: []
    };
  }

  componentDidMount() {
    setTimeout(() => {
      fetch('http://180.128.20.132:3000/v1/report?draw=1&columns%5B0%5D%5Bdata%5D=timestamp&columns%5B0%5D%5Bname%5D=&columns%5B0%5D%5Bsearchable%5D=true&columns%5B0%5D%5Borderable%5D=true&columns%5B0%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B0%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B1%5D%5Bdata%5D=mnd_id&columns%5B1%5D%5Bname%5D=&columns%5B1%5D%5Bsearchable%5D=true&columns%5B1%5D%5Borderable%5D=true&columns%5B1%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B1%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B2%5D%5Bdata%5D=coin&columns%5B2%5D%5Bname%5D=&columns%5B2%5D%5Bsearchable%5D=true&columns%5B2%5D%5Borderable%5D=true&columns%5B2%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B2%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B3%5D%5Bdata%5D=address&columns%5B3%5D%5Bname%5D=&columns%5B3%5D%5Bsearchable%5D=true&columns%5B3%5D%5Borderable%5D=true&columns%5B3%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B3%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B4%5D%5Bdata%5D=hash&columns%5B4%5D%5Bname%5D=&columns%5B4%5D%5Bsearchable%5D=true&columns%5B4%5D%5Borderable%5D=true&columns%5B4%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B4%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B5%5D%5Bdata%5D=deposit&columns%5B5%5D%5Bname%5D=&columns%5B5%5D%5Bsearchable%5D=true&columns%5B5%5D%5Borderable%5D=true&columns%5B5%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B5%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B6%5D%5Bdata%5D=withdraw&columns%5B6%5D%5Bname%5D=&columns%5B6%5D%5Bsearchable%5D=true&columns%5B6%5D%5Borderable%5D=true&columns%5B6%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B6%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B7%5D%5Bdata%5D=remain&columns%5B7%5D%5Bname%5D=&columns%5B7%5D%5Bsearchable%5D=true&columns%5B7%5D%5Borderable%5D=true&columns%5B7%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B7%5D%5Bsearch%5D%5Bregex%5D=false&order%5B0%5D%5Bcolumn%5D=0&order%5B0%5D%5Bdir%5D=asc&start=0&length=10&search%5Bvalue%5D=&search%5Bregex%5D=false&dateRange=+01%2F07%2F2018+00%3A00++-++24%2F07%2F2018+23%3A59+&coin=all&_=1532441921333')
        .then(response => response.json())
        .then(json => {
          console.log(json);
          this.setState({
            ...this.state,
            reports: json.data
          })
        });      
    }, 1000);
  }

  render() {

    const reports = this.state.reports;
    console.log(reports);

    return (
      <div>
        <ul>
          { reports.map(({coin, deposit, mnd_id, remain}, index) => (<li key={index}>{`${coin} ${deposit} ${mnd_id} ${remain}`}</li>)) }
        </ul>

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
      </div>
    );
  }
}

export default Reports;
