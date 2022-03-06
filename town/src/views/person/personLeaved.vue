<template>
    <div style="width :100%; height: 100%;">
        <div style="height: 50%;width: 100%;float: left;">
            <span style="font-size: 0.875em;">本月离职（</span>
            <span style="font-size: 0.875em;" id="currMonth1"></span>
            <span style="font-size: 0.875em;">）</span>
            <div style="width :100%; height: 100%;">
                <div style="width: 50%; height: 100%;float: left;"
                     id="enterpriseEmployeeLeaved">
                </div>
                <div style="width: 50%; height: 100%;float: right;"
                     id="parkStaffLeaved">
                </div>
            </div>
        </div>
        <div style="height: 50%;width: 100%;float: left;">
            <span style="font-size: 0.875em;">离职原因</span>
            <div style="height: 100%;" id="leavedReason"></div>
        </div>
    </div>
</template>

<script>
    import {
        initCurrMonthLeaved,
        initLeavedReason,
    } from '@/assets/js/person/personLeaved';
    import * as echarts from 'echarts';
    import $ from "jquery";

    let interval1, interval2;
    let myChart1, myChart2, myChart3;
    export default {
        name: "personLeaved",
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
                    this.$axios.get("http://localhost:8080/data/personLeaved", {
                        params: {
                            year: year
                        }
                    }).then(res => {
                        if (res.status === 200) {
                            let data = res.data;
                            if (data.year === year && data.type === "personLeaved") {
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
                    myChart1 = echarts.init(document.getElementById("enterpriseEmployeeLeaved"));
                    myChart2 = echarts.init(document.getElementById("parkStaffLeaved"));
                    myChart3 = echarts.init(document.getElementById("leavedReason"));
                    that.initData(data[0], myChart1, myChart2, myChart3);
                    interval1 && clearInterval(interval1);
                    interval1 = setInterval((function func() {
                        let i = 0;
                        interval2 && clearInterval(interval2);
                        interval2 = setInterval(function func() {
                            if (i < data.length) {
                                that.initData(data[i], myChart1, myChart2, myChart3);
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
            initData: function (targetData, myChart1, myChart2, myChart3) {
                const currMonthData = targetData.currMonthData.data;
                $("#currMonth1")[0].innerText = targetData.currMonthData.month;

                const {option1, option2} = initCurrMonthLeaved(currMonthData);//本月离职
                myChart1.setOption(option1);
                myChart2.setOption(option2);

                const option3 = initLeavedReason(currMonthData);//离职原因
                myChart3.setOption(option3);
            }
        }
    }
</script>

<style scoped>

</style>