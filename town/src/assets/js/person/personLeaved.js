//人员流出模块JS

//本月离职
export const initCurrMonthLeaved = (currMonthLeavedData) => {
    const option1 = {
        tooltip: {
            show: false,
            trigger: 'item'
        },
        series: [
            {
                type: 'pie',
                radius: '90%',
                data: [
                    {value: currMonthLeavedData["员工性质"]['企业员工'], name: '企业员工'},
                ],
                label: {
                    position: 'center',
                    formatter: '{c0}名\n{b0}',
                    fontWeight: 'bold',
                    fontSize: 20
                },
                emphasis: {
                    scale: false
                }
            }
        ]
    };

    const option2 = {
        title: {
            left: 'center'
        },
        tooltip: {
            show: false,
            trigger: 'item'
        },
        series: [
            {
                type: 'pie',
                radius: '90%',
                data: [
                    {value: currMonthLeavedData["员工性质"]['园区员工'], name: '园区员工'},
                ],
                label: {
                    position: 'center',
                    formatter: '{c0}名\n{b0}',
                    fontWeight: 'bold',
                    fontSize: 20
                },
                emphasis: {
                    scale: false
                }
            }
        ]
    };
    return {option1, option2}
}

//离职原因
export const initLeavedReason = (currMonthLeavedData) => {
    const leavedData = currMonthLeavedData["离职原因"];
    const leavedDataStr = JSON.stringify(leavedData);
    const tmp = leavedDataStr.substring(1, leavedDataStr.length - 1);
    const tmpArr = tmp.split(",");
    const xAxisData = [];
    const seriesData = [];
    for (const x of tmpArr) {
        xAxisData.push(x.split(":")[0].replaceAll("\"", ""));
        seriesData.push(x.split(":")[1].replaceAll("\"", "").replaceAll("%", ""));
    }
    return {
        tooltip: {
            show: false,
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            },
            formatter(params) {
                // 只展示柱子对应的内容，把顶部底部的 tooltip 过滤掉
                return params.reduce((pre, i) => {
                    if (i.componentSubType === 'bar') {
                        i.marker = i.marker.replace(/\[object Object\]/, i.color.colorStops[1].color);
                        i.value = `<span style="flex: 1; text-align: right; margin-left: 16px;">${i.value}</span>`;
                        const current = `<div style="display: flex; align-items: center; height: 26px;">${i.marker} ${i.value}%</div>`;
                        return `${pre}${current}`;
                    }
                    return pre;
                }, '');
            },
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: 20,
            top: 20,
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: xAxisData,
            axisLabel: {
                color: "#fff"
            },
        },
        yAxis: {
            type: 'value',
            axisTick: {show: false},
            axisLabel: {show: false},
        },
        series: [
            {
                type: 'bar',
                data: seriesData,
                label: {
                    show: true,
                    position: 'top',
                    formatter: '{c0}%'
                },
                emphasis: {
                    scale: false
                }
            },
            {
                type: 'pictorialBar',
                symbolSize: [56, 12],
                // 这个属性很重要，直接决定了顶部跟柱子是否契合
                symbolOffset: [0, -5],
                z: 12,
                itemStyle: {color: '#188df0'},
                symbolPosition: 'end',
                // 要给成柱子的值，这是圆柱顶部，值不给对高度会对不上
                data: seriesData,
                emphasis: {
                    scale: false
                }
            },
            {
                type: 'pictorialBar',
                symbolSize: [56, 12],
                symbolOffset: [0, 5],
                z: 12,
                itemStyle: {color: '#188df0'},
                symbolPosition: 'start',
                // 这个给成大于 0 的值就行，设置了 position，一定会在柱子底部展示
                data: [1, 1],
                emphasis: {
                    scale: false
                }
            },
        ]
    };
}