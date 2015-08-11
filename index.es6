import d3 from "d3";
import React from 'react';

export default class D3xAxis extends React.Component {

  static get propTypes() {
    return {
      test: React.PropTypes.string,
    };
  }

  static get defaultProps() {
    return {
      duration: 500,
      scale: d3.scale.linear(),
      range: [0,100],
      domain:[0,50],
    };
  }

  // CONSTRUCTOR
  //    bind handleResize to this component
  //    set default state
  constructor(props) {
    super(props);
    // this.handleResize = this.handleResize.bind(this);
    // this.nextPassState = this.nextPassState.bind(this);
    this.state = {
      // sceneIndex: props.defaultSceneIndex,
      // isSmall: false,
      // hideImage: false,
    };
  }

  // X axis configuration object is a hard-coded kludge for now...
  getXAxisConfig(domainArray) {
    let xaConfig = {};
    const h = 50;
    const w = 300;

    // Domain and chart type
    // let domainArray = [0,60];
    let chartXScale = d3.scale.linear();
    chartXScale
       .range([0,w])
       .domain(domainArray)
       ;
    let xAxis = d3.svg.axis()
      .scale(chartXScale)
      .orient("bottom")
      .tickPadding(5)   // gap between label and tick
      .ticks(5)
      .tickSize(5)
      ;
    xaConfig.axis = xAxis;
    xaConfig.duration = 500;
    xaConfig.height = h;
    return xaConfig;
  }


  // UPDATE X-AXIS
  // Called directly on the DOM to update the axis
  updateXAxis(config) {
    let axisG = d3.select(".d3-xaxis-group");
    let scale = config.scale;
    let duration = config.duration;
    let axis = config.axis;
    axisG
      .transition().duration(duration)
      .call(axis)
      ;
  }


  componentDidMount() {
    let config = this.getXAxisConfig([0,60]);
    this.updateXAxis(config);
    // For a crude test:
    setTimeout(() => {
      config = this.getXAxisConfig([0,120]);
      this.updateXAxis(config);
      },2000);
    setTimeout(() => {
      config = this.getXAxisConfig([0,200]);
      this.updateXAxis(config);
      },4000);
  }

  componentDidUpdate() {
  }

  // RENDER
  render() {

    // Axis group (during testing, inside a hard-coded hierarchy)
    return (
      <div id="outer-wrapper">
        <div className="chart-outer-wrapper">
          <div className="chart-inner-wrapper">
            <svg className="svg-wrapper">
              <g className="d3-xaxis-group" transform="translate(50,300)" ref="axisGroup">
              </g>
            </svg>
          </div>
        </div>
      </div>
    );
  }
}
