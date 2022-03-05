//企业整体情况模块JS

//企业发展展望
export const initEnterpriseDevelopProspect = (developData, monthStr) => {
    const developDataStr = JSON.stringify(developData);
    const tmp = developDataStr.substring(1, developDataStr.length - 1);
    const tmpArr = tmp.split(",");
    const yAxisData = [];
    const seriesData = [];
    for (const x of tmpArr) {
        yAxisData.push(x.split(":")[0].replaceAll("\"", ""));
        seriesData.push(x.split(":")[1].replaceAll("\"", "").replaceAll("%", ""));
    }

    return {
        title: {
            text: '盈利能力增长情况',
            textStyle: {
                color: '#fff',
                fontSize: 24
            },
            subtext: monthStr,
            subtextStyle: {
                color: '#fff',
                fontSize: 18
            },
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {
            orient: "vertical",
            x: 'right',
            y: 'center',
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'value',
            boundaryGap: [0, 0.01],
            axisLabel: {
                color: "#fff"
            }
        },
        yAxis: {
            type: 'category',
            data: yAxisData,
            axisLabel: {
                color: "#fff"
            }
        },
        series: [
            {
                type: 'bar',
                data: seriesData
            }
        ]
    };
}