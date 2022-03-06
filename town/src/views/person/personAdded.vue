<template>
    <div style="width: 100%;height: 100%;">
        <div style="height: 50%;width: 50%;float: left;">
            <span style="font-size: 0.875em;">本月招入（</span>
            <span style="font-size: 0.875em;" id="currMonth"></span>
            <span style="font-size: 0.875em;">）</span>
            <div style="width: 100%;height: 100%;">
                <div style="width: 50%; height: 100%;float: left;"
                     id="enterpriseEmployeeAdded">
                </div>
                <div style="width: 50%; height: 100%;float: right;"
                     id="parkStaffAdded">
                </div>
            </div>
        </div>
        <div style="height: 50%;width: 50%;float: left;">
            <span style="font-size: 0.875em;">对比上期</span>
            <div style="height: 100%;" id="personAddedCompare"></div>
        </div>
        <div style="height: 50%;width: 50%;float: left;">
            <span style="font-size: 0.875em;">学历分布</span>
            <div style="height: 100%;" id="educationDistribution"></div>
        </div>
        <div style="height: 50%;width: 50%;float: left;">
            <span style="font-size: 0.875em;">工作年限</span>
            <div style="height: 100%;" id="workingYears"></div>
        </div>
    </div>

</template>

<script>
    import {
        initCurrMonthAdded,
        initPersonAddedCompare,
        initEducationDistribution,
        initWorkingYears
    } from '@/assets/js/person/personAdded';
    import * as echarts from 'echarts';
    import $ from "jquery";

    let interval1, interval2;
    let myChart1, myChart2, myChart3, myChart4, myChart5;
    export default {
        name: "personAdded",
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
                let that = this;
                new Promise(resolve => {
                    this.$axios.get("http://localhost:8080/data/personAdded", {
                        params: {
                            year: year
                        }
                    }).then(res => {
                        if (res.status === 200) {
                            let data = res.data;
                            if (data.year === year && data.type === "personAdded") {
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
                    if (myChart1 != null && myChart1 !== "" && myChart1 !== undefined) {
                        myChart1.dispose();
                    }
                    if (myChart2 != null && myChart2 !== "" && myChart2 !== undefined) {
                        myChart2.dispose();
                    }
                    if (myChart3 != null && myChart3 !== "" && myChart3 !== undefined) {
                        myChart3.dispose();
                    }
                    if (myChart4 != null && myChart4 !== "" && myChart4 !== undefined) {
                        myChart4.dispose();
                    }
                    if (myChart5 != null && myChart5 !== "" && myChart5 !== undefined) {
                        myChart5.dispose();
                    }
                    myChart1 = echarts.init(document.getElementById("enterpriseEmployeeAdded"));
                    myChart2 = echarts.init(document.getElementById("parkStaffAdded"));
                    myChart3 = echarts.init(document.getElementById("personAddedCompare"));
                    myChart4 = echarts.init(document.getElementById("educationDistribution"));
                    myChart5 = echarts.init(document.getElementById("workingYears"));
                    that.initData(data[0], myChart1, myChart2, myChart3, myChart4, myChart5);

                    interval1 && clearInterval(interval1);
                    interval1 = setInterval((function func() {
                        let i = 0;
                        interval2 && clearInterval(interval2);
                        interval2 = setInterval(function () {
                            if (i < data.length) {
                                that.initData(data[i], myChart1, myChart2, myChart3, myChart4, myChart5);
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
            initData: function (targetData, myChart1, myChart2, myChart3, myChart4, myChart5) {
                let currMonthData = targetData.currMonthData.data;
                let currMonthStr = targetData.currMonthData.month;
                let lastMonthData = targetData.lastMonthData.data;
                let lastMonthStr = targetData.lastMonthData.month;
                const currAndLastMonthArr = [currMonthStr, lastMonthStr];
                $("#currMonth")[0].innerText = currMonthStr;

                const {option1, option2} = initCurrMonthAdded(currMonthData); //本月招入
                myChart1.setOption(option1);
                myChart2.setOption(option2);

                const option3 = initPersonAddedCompare(currMonthData, lastMonthData, currAndLastMonthArr); //对比上期
                myChart3.setOption(option3);

                const option4 = initEducationDistribution(currMonthData);//学历分布
                myChart4.setOption(option4);

                const option5 = initWorkingYears(currMonthData);//工作年限
                myChart5.setOption(option5);
            }
        }
    }
</script>

<style scoped>

</style>