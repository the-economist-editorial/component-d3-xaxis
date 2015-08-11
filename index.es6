import d3 from 'd3';
import React from 'react';

export default class D3xAxis extends React.Component {

  static get propTypes() {
    return {
      test: React.PropTypes.string,
      xscale: React.PropTypes.function,
      duration: React.PropTypes.number,
      height: React.PropTypes.number,
    };
  }

  static get defaultProps() {
    return {
      duration: 500,
      height: 100,
      xscale: d3.scale.linear(),
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

  componentDidMount() {
    // console.log(this.props);
    let config = this.getXAxisConfig([ 0, 60 ]);
    this.updateXAxis(config);
    // For a crude test:
    setTimeout(() => {
      config = this.getXAxisConfig([ 0, 120 ]);
      this.updateXAxis(config);
    }, 2000);
    setTimeout(() => {
      config = this.getXAxisConfig([ 0, 200 ]);
      this.updateXAxis(config);
    }, 4000);
  }

  componentDidUpdate() {
  }


  // X axis configuration object is a hard-coded kludge for now...
  getXAxisConfig() {
    const xaConfig = {};
    // const h = 50;
    // const w = 300;

    // Domain and chart type
    // let domainArray = [0,60];
    const chartXScale = this.props.xscale;
    // chartXScale
    //     .range([0,w])
    //     .domain(domainArray)
    //    ;
    const xAxis = d3.svg.axis()
      .scale(chartXScale)
      .orient('bottom')
      .tickPadding(5)
      .ticks(5)
      .tickSize(5)
      ;
    xaConfig.axis = xAxis;
    xaConfig.duration = this.props.duration;
    xaConfig.height = this.props.height;
    return xaConfig;
  }


  // UPDATE X-AXIS
  // Called directly on the DOM to update the axis
  updateXAxis(config) {
    const axisG = d3.select('.d3-xaxis-group');
    const duration = config.duration;
    const axis = config.axis;
    axisG
      .transition().duration(duration)
      .call(axis)
      ;
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
