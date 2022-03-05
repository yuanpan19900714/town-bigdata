//资助情况JS

//直接费用情况
export const initCostDetail = (costData, monthStr) => {
    const costDataStr = JSON.stringify(costData);
    const tmp = costDataStr.substring(1, costDataStr.length - 1);
    const tmpArr = tmp.split(",");
    const xAxisData = [];
    const seriesData = [];
    for (const x of tmpArr) {
        const value = Number(x.split(":")[1].replaceAll("\"", "").replaceAll("万元", ""));
        const key = x.split(":")[0].replaceAll("\"", "").replaceAll("万元", "");
        xAxisData.push(key);
        seriesData.push(value);
    }
    return {
        title: {
            text: '直接投入费用',
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
            top: 60,
            containLabel: false
        },
        xAxis: {
            show: false,
            type: 'category',
            data: xAxisData
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
                    formatter: '{b0}\n{c0}万元'
                },
            }
        ]
    };
}

//直接费用占比
export const initCostPercent = (costData, monthStr) => {
    const costDataStr = JSON.stringify(costData);
    const tmp = costDataStr.substring(1, costDataStr.length - 1);
    const tmpArr = tmp.split(",");

    const seriesData = [];
    let total = 0;
    for (const x of tmpArr) {
        const value = Number(x.split(":")[1].replaceAll("\"", "").replaceAll("万元", ""));
        total += value;
        seriesData.push({
            name: x.split(":")[0].replaceAll("\"", ""),
            value: value
        });
    }
    for (const series of seriesData) {
        series.value = Math.round(series.value / total * 100);
    }
    return {
        title: {
            text: '费用占比情况',
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
            trigger: 'item',
            formatter: '{b0} {c0}%'
        },
        series: [
            {
                type: 'pie',
                radius: ['40%', '70%'],
                avoidLabelOverlap: false,
                itemStyle: {
                    borderRadius: 10,
                    borderColor: '#fff',
                    borderWidth: 2
                },
                label: {
                    position: 'inner',
                    formatter: '{b0}\n占比:{c0}%'
                },
                labelLine: {
                    show: false
                },
                data: seriesData
            }
        ]
    };
}