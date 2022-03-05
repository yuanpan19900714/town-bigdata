//企业整体情况模块JS

//行业分布
export const initEnterpriseDistribution = (currMonthData, monthStr) => {
    const enterpriseDisData = currMonthData["行业分布"];
    const enterpriseDisDataStr = JSON.stringify(enterpriseDisData);
    const tmp = enterpriseDisDataStr.substring(1, enterpriseDisDataStr.length - 1);
    const tmpArr = tmp.split(",");
    const seriesData = [];
    for (const x of tmpArr) {
        seriesData.push({
            name: x.split(":")[0].replaceAll("\"", ""),
            value: x.split(":")[1].replaceAll("\"", "").replaceAll("%", "")
        });
    }

    return {
        title: {
            text: '百分比',
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
            formatter: '{b0}:{c0}%'
        },
        series: [
            {
                type: 'pie',
                radius: '90%',
                data: seriesData,
                label: {
                    position: 'inner',
                    formatter: '{b0}:{c0}%'
                },
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };
}
