//资助情况JS

//项目资助情况
export const initSupportDetail = (supportData, monthStr) => {
    const supportDataStr = JSON.stringify(supportData);
    const tmp = supportDataStr.substring(1, supportDataStr.length - 1);
    const tmpArr = tmp.split(",");
    const originData = [];
    for (const x of tmpArr) {
        const value = Number(x.split(":")[1].replaceAll("\"", "").replaceAll("万元", ""));
        const key = x.split(":")[0].replaceAll("\"", "").replaceAll("万元", "");
        originData.push({
            key: key,
            value: value
        });
    }
    const sortedData = originData.sort((a, b) => {
        return a.value - b.value;
    });

    const radiusAxisData = [];
    const seriesData = [];
    let total = 0;
    for (const x of sortedData) {
        total += x.value;
        radiusAxisData.push(x.key);
        seriesData.push(x.value);
    }
    return {
        title: [
            {
                text: '项目资助情况',
                textStyle: {
                    color: '#fff',
                    fontSize: 24
                },
                subtext: monthStr,
                subtextStyle: {
                    color: '#fff',
                    fontSize: 18
                }
            }
        ],
        polar: {
            radius: [0, '100%']
        },
        angleAxis: {
            max: total,
            axisLine: {show: false},
            axisTick: {show: false},
            minInterval: total
        },
        radiusAxis: {
            show: true,
            type: 'category',
            axisLine: {show: false},
            axisTick: {show: false},
            data: radiusAxisData,
            axisLabel: {
                color: "#fff"
            }
        },
        tooltip: {
            formatter: '{b}:{c}万元'
        },
        series: {
            type: 'bar',
            data: seriesData,
            coordinateSystem: 'polar',
            label: {
                show: true,
                position: 'middle',
                formatter: '{b}:{c}万元'
            }
        }
    };
}

//项目资助占比
export const initSupportPercent = (supportData, monthStr) => {
    const supportDataStr = JSON.stringify(supportData);
    const tmp = supportDataStr.substring(1, supportDataStr.length - 1);
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
            text: '资助占比情况',
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
        legend: {
            show: false
        },
        tooltip: {
            trigger: 'item',
            formatter: '{b0} {c0}%'
        },
        series: [
            {
                type: 'pie',
                left: 20,
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