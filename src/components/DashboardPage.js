import React, { Component , PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import assign from 'object-assign';
import _ from 'lodash';
const ReactHighcharts = require('react-highcharts');
var HighchartsMore = require('highcharts-more');
HighchartsMore(ReactHighcharts.Highcharts);
var HighchartsExporting = require('highcharts-exporting');
HighchartsExporting(ReactHighcharts.Highcharts);
import request from 'superagent';

class DashboardPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            time:null,
            cpuUsage: null
        };
    }

    render() {

        var config = {
            chart: {
                type: 'spline',
                marginRight: 10,
                events: {
                    load: function () {

                        // set up the updating of the chart each second
                        var series = this.series[0];
                        setInterval(function () {
                            var x = (new Date()).getTime()-25200000;
                            request.get("http://localhost:3000/cpuLoad")
                                .set('Accept', 'application/json')
                                .end(function(error,res) {
                                    if(res) {
                                        if (res.error) {
                                        } else {
                                            var json = JSON.parse(res.text);
                                            console.log(json.time,json.cpuUsage);
                                            series.addPoint([x, json.cpuUsage], true, true);
                                        }
                                    }
                                });
                            //series.addPoint([x, y], true, true);
                        }, 1000);
                    }
                }
            },
            title: {
                text: 'System Load since page open'
            },
            xAxis: {
                type: 'datetime',
                tickPixelInterval: 150
            },
            yAxis: {
                labels: {
                    format: '{value}%',
                },
                title: {
                    text: 'Percentage'
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            legend: {
                enabled: false
            },
            exporting: {
                enabled: false
            },
            series: [{
                name: 'CPU Load',
                data: (function () {
                    // generate an array of random data
                    var data = [],
                        time = (new Date()).getTime()-25200000,
                        i;

                    for (i = -9; i <= 0; i += 1) {
                        data.push({
                            x: time + i * 1000,
                            y: 0
                        });
                    }
                    return data;
                }())
            }]
        };

        var config2 = {
            chart: {
                type: 'gauge',
                plotBackgroundColor: null,
                plotBackgroundImage: null,
                plotBorderWidth: 0,
                plotShadow: false
            },

            title: {
                text: 'Real-time System Load'
            },

            pane: {
                startAngle: -150,
                endAngle: 150,
                background: [{
                    backgroundColor: {
                        linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                        stops: [
                            [0, '#FFF'],
                            [1, '#333']
                        ]
                    },
                    borderWidth: 0,
                    outerRadius: '109%'
                }, {
                    backgroundColor: {
                        linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                        stops: [
                            [0, '#333'],
                            [1, '#FFF']
                        ]
                    },
                    borderWidth: 1,
                    outerRadius: '107%'
                }, {
                    // default background
                }, {
                    backgroundColor: '#DDD',
                    borderWidth: 0,
                    outerRadius: '105%',
                    innerRadius: '103%'
                }]
            },

            // the value axis
            yAxis: {
                min: 0,
                max: 100,

                minorTickInterval: 'auto',
                minorTickWidth: 1,
                minorTickLength: 10,
                minorTickPosition: 'inside',
                minorTickColor: '#666',

                tickPixelInterval: 30,
                tickWidth: 2,
                tickPosition: 'inside',
                tickLength: 10,
                tickColor: '#666',
                labels: {
                    step: 2,
                    rotation: 'auto'
                },
                title: {
                    text: '%'
                },
                plotBands: [{
                    from: 0,
                    to: 60,
                    color: '#55BF3B' // green
                }, {
                    from: 60,
                    to: 80,
                    color: '#DDDF0D' // yellow
                }, {
                    from: 80,
                    to: 100,
                    color: '#DF5353' // red
                }]
            },

            series: [{
                name: 'CPU Load',
                data: [0],
                tooltip: {
                    valueSuffix: ' %'
                }
            }]
        };
        const afterRender = (chart) => {
            if (!chart.renderer.forExport) {
                setInterval(function () {
                    var point = chart.series[0].points[0],
                        newVal,
                        inc = Math.round((Math.random() - 0.5) * 20);

                    newVal = point.y + inc;
                    if (newVal < 0 || newVal > 100) {
                        newVal = point.y - inc;
                    }

                    request.get("http://localhost:3000/cpuLoad")
                        .set('Accept', 'application/json')
                        .end(function(error,res) {
                            if(res) {
                                if (res.error) {
                                } else {
                                    var json = JSON.parse(res.text);
                                    console.log(json.time,json.cpuUsage);
                                    point.update(json.cpuUsage);
                                }
                            }
                        });

                }, 1000);
            }
        };


        return (
            <div className="app-container">
                <div className=" page-content">
                    <div style={{fontSize:'0.7em'}}>
                        <div className="container-fluid">
                            <div className ="content-wrapper">
                                <div className="row">
                                    <div className="col-md-6 col-lg-6"><ReactHighcharts config = {config2} callback = {afterRender}></ReactHighcharts></div>
                                    <div className="col-md-6 col-lg-6"><ReactHighcharts config = {config}></ReactHighcharts></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
    };
}

export default connect(mapStateToProps, { } )(DashboardPage);
