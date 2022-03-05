import $ from "jquery";

export const initCurrAndLastMonth = (currMonthData, lastMonthData) => {
    const personType1 = currMonthData["员工性质"];
    const enterpriseEmployee1 = personType1["企业员工"];
    const parkStaff1 = personType1["园区员工"];
    const personType2 = lastMonthData["员工性质"];
    const enterpriseEmployee2 = personType2["企业员工"];
    const parkStaff2 = personType2["园区员工"];
    $("#enterpriseEmployee")[0].innerText = enterpriseEmployee1;
    $("#parkStaff")[0].innerText = parkStaff1;
    const diff1 = Number(enterpriseEmployee1) - Number(enterpriseEmployee2);
    const diff2 = Number(parkStaff1) - Number(parkStaff2);
    let html1, html2;
    if (diff1 === 0) {
        html1 = "<span>无变化</span>";
    } else if (diff1 > 0) {
        html1 = "<span style='color: blue'>↑" + diff1 + "</span>人";
    } else {
        html1 = "<span style='color: blue'>↓" + Math.abs(diff1) + "</span>人";
    }
    if (diff2 === 0) {
        html2 = "<span>无变化</span>";
    } else if (diff2 > 0) {
        html2 = "<span style='color: yellow'>↑" + diff2 + "</span>人";
    } else {
        html2 = "<span style='color: yellow'>↓" + Math.abs(diff2) + "</span>人";
    }
    $("#enterpriseEmployeeChange")[0].innerHTML = html1;
    $("#parkStaffChange")[0].innerHTML = html2;

}

export const initMaleAndFemale = (currMonthData) => {
    $("#femaleRatio")[0].innerText = currMonthData["性别分布"]["女"];
    $("#maleRatio")[0].innerText = currMonthData["性别分布"]["男"];
}

export const initIndustryDistributionCharts = (currMonthData, monthStr) => {
    const industryDistributionData = currMonthData["行业分布"];
    const industryDistributionDataStr = JSON.stringify(industryDistributionData);
    const tmp = industryDistributionDataStr.substring(1, industryDistributionDataStr.length - 1);
    const tmpArr = tmp.split(",");
    const yAxisData = [];
    const seriesData = [];
    for (const x of tmpArr) {
        yAxisData.push(x.split(":")[0].replaceAll("\"", ""));
        seriesData.push(x.split(":")[1].replaceAll("\"", "").replaceAll("%", ""));
    }

    return {
        title: {
            text: '行业分布',
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
            bottom: 0,
            top: 60,
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
                data: seriesData
            }
        ]
    };
}