import React from "react";
import InputSelect from "../inputSelect/InputSelect";
import { VictoryBar, VictoryChart, VictoryAxis, VictoryGroup } from "victory";

class Chart extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showDifficult: true,
            showFun: true
        }

        this.handleFilterChange = this.handleFilterChange.bind(this)
    }

    handleFilterChange(name, state) {
        console.log('name', name, 'state', state)

        if (name === 'difficult') {
            this.setState(() => {
                return {
                    showDifficult: state
                }
            })
        } else if (name === 'fun') {
            this.setState(() => {
                return {
                    showFun: state
                }
            })
        }
    }

    render() {
        const renderDifficultBar = (showDifficult) => {
            if (showDifficult) {
                return (
                    <VictoryBar
                        colorScale={"warm"}
                        alignment="middle"
                        data={this.props.studentData}
                        x="assignment"
                        y="difficult"
                    />
                )
            }
        }

        const renderFunBar = (showFun) => {
            if (showFun) {
                return (
                    <VictoryBar
                        colorScale={"blue"}
                        alignment="end"
                        data={this.props.studentData}
                        x="assignment"
                        y="fun"
                    />
                )
            }
        }

        return (
            <div className="Chart">
                <div className="InputSelect">
                    <InputSelect
                        selectName={'difficult'}
                        selectText={' Hoe moeilijk was de opdracht?'}
                        selectChange={this.handleFilterChange}
                    />
                    <br />
                    <InputSelect
                        selectName={'fun'}
                        selectText={' Hoe leuk was de opdracht?'}
                        selectChange={this.handleFilterChange}
                    />
                </div>

                <VictoryChart
                    domainPadding={{ x: 17 }}
                    className="VictoryChart-BarChart"
                    padding={{ left: 30, top: 30, right: 30, bottom: 100 }}
                >
                    <VictoryAxis
                        // tickValues specifies both the number of ticks and where
                        // they are placed on the axis
                        tickFormat={this.props.studentData.assigment}
                        style={{
                            tickLabels: { angle: 60, textAnchor: 'start', fontSize: 6 },
                            ticks: { stroke: "grey", size: 2 }
                        }}
                    />
                    <VictoryAxis
                        dependentAxis
                        // tickFormat specifies how ticks should be displayed
                        tickFormat={[1, 2, 3, 4, 5]}
                        style={{
                            tickLabels: { fontSize: 10 },
                            ticks: { stroke: "grey", size: 2 }
                        }}
                    />
                    <VictoryGroup offset={13} style={{ data: { width: 8 } }}>
                        {renderDifficultBar(this.state.showDifficult)}
                        {renderFunBar(this.state.showFun)}
                    </VictoryGroup>
                </VictoryChart>
                <div className="ChartInfo">
                    <p className="fun">Hoe leuk was de opdracht</p>
                    <p className="difficult">Hoe moeilijk was de opdracht</p>
                </div>
            </div>
        )
    }
}

export default Chart;