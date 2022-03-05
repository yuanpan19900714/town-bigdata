export const initCurrMonthAdded = (currMonthAddedData) => {
    const option1 = {
        title: {
            left: 'center'
        },
        tooltip: {
            trigger: 'item'
        },
        series: [
            {
                type: 'pie',
                radius: '90%',
                data: [
                    {value: currMonthAddedData["员工性质"]['企业员工'], name: '企业员工'},
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
            trigger: 'item'
        },
        series: [
            {
                type: 'pie',
                radius: '90%',
                data: [
                    {value: currMonthAddedData["员工性质"]['园区员工'], name: '园区员工'},
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
    return {option1, option2};
}


export const initPersonAddedCompare = (currMonthAddedData, lastMonthAddedData, currAndLastMonthArr) => {
    const currMonthAddedEmployee = currMonthAddedData["员工性质"]["企业员工"];
    const lastMonthAddedEmployee = lastMonthAddedData["员工性质"]["企业员工"];
    const currMonthAddedStaff = currMonthAddedData["员工性质"]["园区员工"];
    const lastMonthAddedStaff = lastMonthAddedData["员工性质"]["园区员工"];

    return {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            },
        },
        legend: {
            textStyle: {
                color: '#fff'
            },
            data: ['企业员工', '园区员工']
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: 30,
            top: 20,
            containLabel: true
        },
        xAxis: {
            type: 'value',
            axisLabel: {
                color: "#fff"
            },
        },
        yAxis: {
            type: 'category',
            data: currAndLastMonthArr,
            axisLabel: {
                color: "#fff"
            }
        },
        series: [
            {
                name: '企业员工',
                type: 'bar',
                data: [currMonthAddedEmployee, lastMonthAddedEmployee]
            },
            {
                name: '园区员工',
                type: 'bar',
                data: [currMonthAddedStaff, lastMonthAddedStaff]
            }
        ]
    };
}

//学历分布
export const initEducationDistribution = (currMonthAddedData) => {
    const educationData = currMonthAddedData["学历分布"];
    const educationDataStr = JSON.stringify(educationData);
    const tmp = educationDataStr.substring(1, educationDataStr.length - 1);
    const tmpArr = tmp.split(",");
    const seriesData = [];
    for (const x of tmpArr) {
        seriesData.push({
            name: x.split(":")[0].replaceAll("\"", ""),
            value: x.split(":")[1].replaceAll("\"", "")
        });
    }

    return {
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c}'
        },
        series: [
            {
                name: '学历分布',
                type: 'funnel',
                left: 20,
                top: 10,
                bottom: 10,
                width: '80%',
                gap: 2,
                label: {
                    formatter: '{b} : {c}'
                },
                animation: false,
                data: seriesData
            }
        ]
    };
}

//工作年限
export const initWorkingYears = (currMonthAddedData) => {
    const workYearData = currMonthAddedData["工作年限"];
    const workYearDataStr = JSON.stringify(workYearData);
    const tmp = workYearDataStr.substring(1, workYearDataStr.length - 1);
    const tmpArr = tmp.split(",");
    const yAxisData = [];
    const seriesData = [];
    for (const x of tmpArr) {
        yAxisData.push(x.split(":")[0].replaceAll("\"", ""));
        seriesData.push(x.split(":")[1].replaceAll("\"", ""));
    }
    return {
        title: {},
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
            top: 0,
            containLabel: true
        },
        xAxis: {
            type: 'value',
            axisLabel: {
                color: "#fff"
            },
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
