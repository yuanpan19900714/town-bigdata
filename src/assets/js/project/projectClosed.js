//已结项目JS

//已结项目
export const initClosedDetail = (closedData, monthStr) => {
    const closedDataStr = JSON.stringify(closedData);
    const tmp = closedDataStr.substring(1, closedDataStr.length - 1);
    const tmpArr = tmp.split(",");
    const xAxisData = [];
    const seriesData = [];
    let total = 0;
    for (const x of tmpArr) {
        const value = Number(x.split(":")[1].replaceAll("\"", "").replaceAll("项", ""));
        const key = x.split(":")[0].replaceAll("\"", "").replaceAll("项", "");
        xAxisData.push(key);
        seriesData.push(value);
        total += value;
    }
    return {
        title: {
            text: '已结项目',
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
            containLabel: true
        },
        xAxis: {
            show: false,
            type: 'category',
            data: xAxisData
        },
        yAxis: {
            type: 'value',
            boundaryGap: [0, 0.5],
        },
        series: [
            {
                type: 'bar',
                data: seriesData,
                label: {
                    show: true,
                    formatter: '{b0}\n{c0}项'
                },
                showBackground: true,
            }
        ]
    };
}