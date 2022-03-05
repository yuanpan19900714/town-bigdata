<template>
    <div style="width: 100%;height: 100%;">
        <div style="font-size: 0.175em;width: 100%;height: 10%;float: top;">
            <div style="border-radius: 4px;background-color:cornflowerblue;float: left;padding: 6px;">
                <span>企业员工</span><span style="color: blue" id="enterpriseEmployee">0</span>
                <span>名</span>
                <span style="margin-left: 10px;">比上月</span>
                <span id="enterpriseEmployeeChange"></span>
            </div>
            <div style="border-radius: 4px;background-color:yellowgreen;float: right;padding: 6px;">
                <span>园区员工</span><span style="color: yellow" id="parkStaff">0</span><span>名</span>
                <span style="margin-left: 10px;">比上月</span>
                <span id="parkStaffChange"></span>
            </div>
        </div>
        <div style="font-size: 0.175em;width: 100%;height: 30%;float: top;">
            <span>性别分布</span>
            <table align="center">
                <tr>
                    <td>
                        <img src="~@/assets/image/女.png" width="100%" height="100%"/>
                    </td>
                    <td>
                        <img src="~@/assets/image/男.png" width="100%" height="100%"/>
                    </td>
                </tr>
                <tr>
                    <td align="center"><span id="femaleRatio">0%</span></td>
                    <td align="center"><span id="maleRatio">0%</span></td>
                </tr>
            </table>
        </div>
        <div style="font-size: 1.5em;width: 100%;height: 60%;float: top;">
            <div id="industryDistribution" style="height: 80%;width: 100%;"></div>
        </div>
    </div>
</template>

<style scoped>

</style>

<script>
    import {
        initCurrAndLastMonth,
        initMaleAndFemale,
        initIndustryDistributionCharts,
    } from '@/assets/js/person/personTotal';
    import * as echarts from 'echarts';

    let interval1, interval2;
    let myChart;
    export default {
        name: "personTotal",
        props: {
            year: {
                type: Number,
                default() {
                    return new Date().getFullYear()
                }
            }
        },
        watch: {
            year: function (value) {
                this.init(value);
            }
        },
        mounted: function () {
            let year = new Date().getFullYear();
            this.init(year);
        },
        methods: {
            init: function (year) {
                const that = this;
                new Promise(resolve => {
                    this.$axios.get("http://localhost:8080/data/personTotal", {
                        params: {
                            year: year
                        }
                    }).then(res => {
                        if (res.status === 200) {
                            let data = res.data;
                            if (data.year === year && data.type === "personTotal") {
                                let dataArray = data.datas;
                                let targetDataArray = [];
                                for (let i = 1; i < dataArray.length; i++) {
                                    let currMonthData = dataArray[i];
                                    let lastMonthData = dataArray[i - 1];
                                    targetDataArray.push({
                                        month: currMonthData.month,
                                        currMonthData: currMonthData,
                                        lastMonthData: lastMonthData
                                    });
                                }
                                resolve(targetDataArray);
                            }
                        }
                    });
                }).then(res => {
                    const data = res;
                    if (myChart != null && myChart !== "" && myChart !== undefined) {
                        myChart.dispose();
                    }
                    myChart = echarts.init(document.getElementById("industryDistribution"));
                    that.initData(data[0], myChart);
                    interval1 && clearInterval(interval1);
                    interval1 = setInterval((function func() {
                        let i = 0;
                        interval2 && clearInterval(interval2);
                        interval2 = setInterval(function () {
                            if (i < data.length) {
                                that.initData(data[i], myChart);
                                i += 1;
                            }
                            if (i === data.length) {
                                clearInterval(interval2);
                            }
                        }, 2000);
                        return func;
                    })(), 2000 * (data.length+1));
                });
            },
            initData(targetData, myChart) {
                let currMonthData = targetData.currMonthData.data;
                let monthStr = targetData.currMonthData.month;
                let lastMonthData = targetData.lastMonthData.data;
                initCurrAndLastMonth(currMonthData, lastMonthData); //与上月对比
                initMaleAndFemale(currMonthData); //性别分布
                const option = initIndustryDistributionCharts(currMonthData, monthStr); //行业分布百分比
                myChart.setOption(option);
            }
        }
    }
</script>