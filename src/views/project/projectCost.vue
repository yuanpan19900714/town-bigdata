<template>
    <div style="width: 100%;height: 100%;">
        <div id="costDetail" style="float: left;width: 50%;height: 100%;"></div>
        <div id="costPercent" style="float: right;width: 50%;height: 100%;"></div>
    </div>
</template>

<script>
    import {
        initCostDetail,
        initCostPercent
    } from '@/assets/js/project/projectCost';
    import * as echarts from 'echarts';

    let interval1, interval2;
    let myChart1, myChart2;
    export default {
        name: "projectCost",
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
                    this.$axios.get("http://localhost:8080/data/projectCost", {
                        params: {
                            year: year
                        }
                    }).then(res => {
                        if (res.status === 200) {
                            let data = res.data;
                            if (data.year === year && data.type === "projectCost") {
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
                    myChart1 = echarts.init(document.getElementById("costDetail"));
                    myChart2 = echarts.init(document.getElementById("costPercent"));
                    that.initData(data[0], myChart1, myChart2);
                    interval1 && clearInterval(interval1);
                    interval1 = setInterval((function func() {
                        let i = 0;
                        interval2 && clearInterval(interval2);
                        interval2 = setInterval(function () {
                            if (i < data.length) {
                                that.initData(data[i], myChart1, myChart2);
                                i += 1;
                            }
                            if (i === data.length) {
                                clearInterval(interval2);
                            }
                        }, 2000);
                        return func;
                    })(), 2000 * (data.length+1))
                });
            },
            initData: function (targetData, myChart1, myChart2) {
                const currMonthData = targetData.currMonthData.data;
                const monthStr = targetData.currMonthData.month;
                const option1 = initCostDetail(currMonthData, monthStr); //直接费用情况
                myChart1.setOption(option1);

                const option2 = initCostPercent(currMonthData, monthStr); //直接费用占比
                myChart2.setOption(option2);
            }
        }
    }
</script>

<style scoped>

</style>