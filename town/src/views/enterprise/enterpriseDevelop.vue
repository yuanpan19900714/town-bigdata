<template>
    <div style="width: 100%;height: 100%;">
        <div style="height: 100%;width: 100%;" id="enterpriseDevelopProspect"></div>
    </div>
</template>

<script>
    import {
        initEnterpriseDevelopProspect
    } from '@/assets/js/enterprise/enterpriseDevelop';
    import * as echarts from 'echarts';

    let interval1, interval2;
    let myChart1;
    export default {
        name: "enterpriseDevelop",
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
                    this.$axios.get("http://localhost:8080/data/enterpriseDevelop", {
                        params: {
                            year: year
                        }
                    }).then(res => {
                        if (res.status === 200) {
                            let data = res.data;
                            if (data.year === year && data.type === "enterpriseDevelop") {
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
                    myChart1 = echarts.init(document.getElementById("enterpriseDevelopProspect"));
                    that.initData(data[0], myChart1);
                    interval1 && clearInterval(interval1);
                    interval1 = setInterval((function func() {
                        let i = 0;
                        interval2 && clearInterval(interval2);
                        interval2 = setInterval(function () {
                            if (i < data.length) {
                                that.initData(data[i], myChart1);
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
            initData: function (targetData, myChart1) {
                const currMonthData = targetData.currMonthData.data;
                const monthStr = targetData.currMonthData.month;
                const option1 = initEnterpriseDevelopProspect(currMonthData, monthStr);//企业发展展望
                myChart1.setOption(option1);
            }
        }
    }
</script>

<style scoped>

</style>