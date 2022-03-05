//项目申报JS
import $ from 'jquery';
//项目分类
export const initApplyNameAndValue = (applyData) => {
    const applyDataStr = JSON.stringify(applyData);
    const tmp = applyDataStr.substring(1, applyDataStr.length - 1);
    const tmpArr = tmp.split(",");
    for (let i = 0; i < tmpArr.length; i++) {
        const applyName = $("#applyName" + (i + 1));
        const applyValue = $("#applyValue" + (i + 1));
        const key = tmpArr[i].split(":")[0].replaceAll("\"", "");
        const value = tmpArr[i].split(":")[1].replaceAll("\"", "");
        applyName[0].innerHTML = "<span style='font-size: 0.75em;font-weight: bold;'>" + key + "</span>";
        applyValue[0].innerHTML = "<span style='font-size: 0.75em;font-weight: bold;'>" + value + "</span>";
    }
}

//接收申请项数
export const initApplyNumber = (applyNumberData, monthStr) => {
    const applyNumberDataStr = JSON.stringify(applyNumberData);
    const tmp = applyNumberDataStr.substring(1, applyNumberDataStr.length - 1);
    const tmpArr = tmp.split(",");

    const yAxisData = [];
    const seriesData = [];
    for (const x of tmpArr) {
        yAxisData.push(x.split(":")[0].replaceAll("\"", ""));
        seriesData.push(x.split(":")[1].replaceAll("\"", "").replaceAll("%", ""));
    }
    return {
        title: {
            text: '接收申请项数',
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
            formatter: '{b0}: {c0}%'
        },
        legend: {},
        grid: {
            left: '3%',
            right: '4%',
            bottom: 10,
            containLabel: true
        },
        xAxis: {
            type: 'value',
            boundaryGap: [0, 0.5],
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
                showBackground: true,
                label: {
                    show: true,
                    position: 'right',
                    formatter: '{c0}%'
                },
                data: seriesData
            }
        ]
    };
}