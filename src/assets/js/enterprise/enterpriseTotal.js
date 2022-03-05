//企业整体情况模块JS

//营收与税收
export const initRevenueAndTax = (currMonthData, lastMonthData) => {
    const currMonthRevenue = currMonthData["营收"].replaceAll('万元', '');
    const currMonthTax = currMonthData["税收"].replaceAll('万元', '');

    const option1 = {
        tooltip: {
            show: false,
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
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
            data: ['营收', '税收'],
            axisLabel: {
                color: "#fff"
            }
        },
        yAxis: {
            type: 'value',
            axisTick: {show: false},
            axisLabel: {show: false},
        },
        series: [
            {
                type: 'bar',
                data: [currMonthRevenue, currMonthTax],
                label: {
                    show: true,
                    position: 'top',
                    formatter: '{c0}万元'
                },
            }
        ]
    };

    const lastMonthRevenue = lastMonthData["营收"].replaceAll('万元', '');
    const lastMonthTax = lastMonthData["税收"].replaceAll('万元', '');
    const diff1 = Number(currMonthRevenue) - Number(lastMonthRevenue);
    const diff2 = Number(currMonthTax) - Number(lastMonthTax);
    const changeState1 = (diff1 > 0) ? "增长" : "减少";
    const changeState2 = (diff2 > 0) ? "增长" : "减少";
    const changeValue1 = Math.round(Math.abs(diff1) / Number(lastMonthRevenue) * 100);
    const changeValue2 = Math.round(Math.abs(diff2) / Number(lastMonthTax) * 100);
    const option2 = {
        series: [
            {
                type: 'pie',
                radius: '100%',
                left: 0,
                right: '50%',
                top: 0,
                bottom: 0,
                data: [
                    {value: changeValue1, name: '营收'},
                ],
                label: {
                    position: 'center',
                    formatter: '{b0}\n' + changeState1 + '{c0}%',
                },
                emphasis: {
                    scale: false
                }
            },
            {
                type: 'pie',
                radius: '100%',
                left: '50%',
                right: 0,
                top: 0,
                bottom: 0,
                data: [
                    {value: changeValue2, name: '税收'},
                ],
                label: {
                    position: 'center',
                    formatter: '{b0}\n' + changeState2 + '{c0}%',
                },
                emphasis: {
                    scale: false
                }
            }

        ]
    };
    return {option1, option2};
}

//人均营收创税
export const initPersonelRevenueAndTax = (currMonthData) => {
    const currMonthRevenue = currMonthData["人均营收"].replaceAll('万元', '');
    const currMonthTax = currMonthData["人均创税"].replaceAll('万元', '');

    return {
        tooltip: {
            show: false,
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
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
            data: ['人均营收', '人均创税'],
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
                data: [currMonthRevenue, currMonthTax],
                label: {
                    show: true,
                    position: 'top',
                    formatter: '{c0}万元'
                },
                emphasis: {
                    scale: false
                }
            }
        ]
    };
}
