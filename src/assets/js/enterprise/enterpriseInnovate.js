//企业整体情况模块JS

//创新融资
export const initInnovateFinanceAmt = (currMonthData, lastMonthData, monthStr) => {
    const currMonthRevenue = currMonthData["融资金额"].replaceAll('万元', '');
    const currMonthTax = currMonthData["创新经费"].replaceAll('万元', '');

    const option1 = {
        title: {
            text: '金额',
            textStyle: {
                color: '#fff',
                fontSize: 24
            },
            subtext: monthStr,
            subtextStyle: {
                color: '#fff',
                fontSize: 18
            }
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            },
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            top: 80,
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: ['融资金额', '创新经费'],
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

    const lastMonthRevenue = lastMonthData["融资金额"].replaceAll('万元', '');
    const lastMonthTax = lastMonthData["创新经费"].replaceAll('万元', '');
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
                radius: '90%',
                left: 0,
                right: 0,
                top: 0,
                bottom: '50%',
                data: [
                    {value: changeValue1, name: '融资金额'},
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
                radius: '90%',
                left: 0,
                right: 0,
                top: '50%',
                bottom: 0,
                data: [
                    {value: changeValue2, name: '创新经费'},
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
