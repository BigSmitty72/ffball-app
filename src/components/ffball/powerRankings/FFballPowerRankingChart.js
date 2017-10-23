import React from 'react';
import { Col, Row } from 'react-bootstrap';
import Slider from 'rc-slider';
import { Line } from 'react-chartjs-2';
import _ from 'lodash';
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';

export default class FFballPowerRankingChart extends React.Component{
  constructor() {
    super();
    this.state = {
      weeks: [],
      fullData: {
        labels: [],
        datasets: []
      },
      displayData: {
        labels: [],
        datasets: []
      },
      sliderData: {
        marks: {},
        min: 4,
        max: 14,
        defaultValue: [0,14],
        value: []
      }
    }
    this.updateDataList = this.updateDataList.bind(this);
    this.handleSliderChange = this.handleSliderChange.bind(this);
  }

  componentWillMount() {
    const { weeks } = this.props;
    const { sliderData } = this.state;

    const newWeeks = this.state.weeks;
    const newMarks = {};
    if (newWeeks.length === 0) {
      /* eslint-disable array-callback-return */
      weeks.map((week, index) => {
        if (index > 0) {
          newMarks[week] = 'Week ' + week;
          newWeeks.push('Week ' + week);
        }
      })
      const currentWeek = Number(weeks[weeks.length - 1]) + 1;
      newMarks[currentWeek] = 'Current Week';
      newWeeks.push('Current Week');
      const newDefaultVal = [];
      if (weeks.length > 1) {
        newDefaultVal.push(weeks[1]);
      } else {
        newDefaultVal.push(0);
      }
      newDefaultVal.push(currentWeek);
      const newSliderData = Object.assign({}, sliderData, {marks: newMarks, defaultValue: newDefaultVal});
      this.setState({weeks: newWeeks, sliderData: newSliderData});
    }
    const powerRankData = this.props.powerRankData.concat();

    const fullData = this.updateDataList(powerRankData, newWeeks);
    const displayData = this.updateDataList(powerRankData, newWeeks);

    this.setState({displayData, fullData})
  }

  handleSliderChange = (value) => {
    const { fullData, sliderData } = this.state;
    const startIndex = fullData.labels.indexOf(sliderData.marks[value[0]]);
    const endIndex = fullData.labels.indexOf(sliderData.marks[value[1]]);
    const newDataset = [];

    const newLabels = fullData.labels.filter((label, index) => {
      return index >= startIndex && index <= endIndex;
    });
    /* eslint-disable array-callback-return */
    fullData.datasets.map((dataset) => {
      const newData = dataset.data.filter((dataset, index) => {
        return index >= startIndex && index <= endIndex;
      })
      newDataset.push(Object.assign({}, dataset, {data: newData}));
    })
    this.setState({displayData: Object.assign({}, fullData, {labels: newLabels}, {datasets: newDataset})});
  }

  updateDataList(powerRankData, weeks) {
    const graphDatasets = [];
    /* eslint-disable array-callback-return */
    powerRankData.map((powerRank) => {
      if (powerRank.week === Number(weeks[0].replace('Week ', ''))) {
        const randR = _.random(75, 210);
        const randG = _.random(75, 210);
        const randB = _.random(75, 210);
        const color = `rgba(${randR},${randG},${randB},1)`;
        const backColor = `rgba(${randR},${randG},${randB},0.4)`;
        
        const lineProperties = {
          label: powerRank.label,
          fill: false,
          lineTension: 0.1,
          backgroundColor: backColor,
          borderColor: color,
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: color,
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: color,
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: [powerRank.data]
        };
        graphDatasets.push(lineProperties);
      } else {
        /* eslint-disable array-callback-return */
        graphDatasets.map((dataTeam) => {
          if (powerRank.label === dataTeam.label) {
            dataTeam.data.push(powerRank.data);
          }
        })
      }
    });
    const data = {
      labels: weeks,
      datasets: graphDatasets
    }
    return data;
  }

  render() {
    const { displayData, sliderData } = this.state;

    const weeksSlider = () => {
      const { marks, min, max, defaultValue } = sliderData;

      return (
        <Row>
          <p />
          <Col xs={2} sm={2} md={2} lg={2}>
            Week Range:
          </Col>
          <Col xs={10} sm={10} md={10} lg={10}>
            <Slider.Range min={min} max={max} marks={marks} step={null} defaultValue={defaultValue} tipFormatter={value => `Week ${value}`} onAfterChange={this.handleSliderChange} />
          </Col>
          <br />
          <br />
        </Row>
      );
    }

    return (
      <div>
        <Row>
          <Col xs={12} sm={12} md={12} lg={12}>
            <Line data={displayData} />
          </Col>
        </Row>
        
        {weeksSlider()}
      </div>
    );
  }
};