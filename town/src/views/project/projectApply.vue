<template>
    <div style="width: 100%;height: 100%;">
        <div style="font-size: 0.5em;width: 100%;height: 20%;float: top;">
            <div style="border-radius: 0 4px 4px 0;background-color:cornflowerblue;
            float: left;padding: 4px;width: 50%;">
                <div style="float: left">
                    <span style="color: blue" id="applyName1"></span>
                </div>
                <div style="float: right">
                    <span id="applyValue1" style="margin-left: 10px;">0</span>
                    <span>项</span>
                </div>
            </div>
            <div style="border-radius: 0 4px 4px 0;background-color:cornflowerblue;float: left;padding: 4px;
            width: 40%;margin-left:12px;">
                <div style="float: left">
                    <span style="color: blue" id="applyName2"></span>
                </div>
                <div style="float: right">
                    <span id="applyValue2" style="margin-left: 10px;">0</span>
                    <span>项</span>
                </div>
            </div>
            <div style="border-radius: 0 4px 4px 0;background-color:cornflowerblue;float: left;padding: 4px;
            margin-top:6px;width: 50%;">
                <div style="float: left">
                    <span style="color: blue" id="applyName3"></span>
                </div>
                <div style="float: right">
                    <span id="applyValue3" style="margin-left: 10px;">0</span>
                    <span>项</span>
                </div>
            </div>
            <div style="border-radius: 0 4px 4px 0;background-color:cornflowerblue;float: left;padding: 4px;
            margin-top:6px;margin-left:12px;width: 40%;">
                <div style="float: left">
                    <span style="color: blue" id="applyName4"></span>
                </div>
                <div style="float: right">
                    <span id="applyValue4" style="margin-left: 10px;">0</span>
                    <span>项</span>
                </div>
            </div>
        </div>
        <div style="font-size: 0.875em;width: 100%;height: 80%;float: top;">
            <div id="applyNumber" style="height: 100%;width: 100%;"></div>
        </div>
    </div>
</template>

<script>
    import {
        initApplyNameAndValue,
        initApplyNumber
    } from '@/assets/js/project/projectApply';
    import * as echarts from 'echarts';

    let interval1, interval2;
    let myChart1;
    export default {
        name: "projectApply",
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
                    this.$axios.get("http://localhost:8080/data/projectApply", {
                        params: {
                            year: year
                        }
                    }).then(res => {
                        if (res.status === 200) {
                            let data = res.data;
                            if (data.year === year && data.type === "projectApply") {
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
                    myChart1 = echarts.init(document.getElementById("applyNumber"));
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
                initApplyNameAndValue(currMonthData["项目申报"]); //项目申报分类
                const option1 = initApplyNumber(currMonthData["接收申请项数"], monthStr); //接收申请项数
                myChart1.setOption(option1);
            }
        }
    }
</script>

<style scoped>

</style>