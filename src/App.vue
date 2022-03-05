<template>
    <scale-box id="main">
        <el-row :gutter="10" class="el-row">
            <el-col :span="8" class="el-col">
                <div class="content">
                    <div class="title" id="west"></div>
                    <div class="title-aside">
                        <div class="quarter">
                            <fieldset>
                                <legend id="west1"></legend>
                                <personTotal :year="year"></personTotal>
                            </fieldset>
                        </div>
                        <div class="half">
                            <fieldset>
                                <legend id="west2"></legend>
                                <personAdded :year="year"></personAdded>
                            </fieldset>
                        </div>
                        <div class="quarter">
                            <fieldset>
                                <legend id="west3"></legend>
                                <personLeaved :year="year"></personLeaved>
                            </fieldset>
                        </div>
                    </div>
                </div>
            </el-col>
            <el-col :span="8" class="el-col">
                <div class="content">
                    <div class="title" id="center"></div>
                    <div class="title-aside">
                        <div style="height: 100%;width: 20%;float: left;">
                            <fieldset>
                                <legend id="center1"></legend>
                                <enterpriseTotal :year="year"></enterpriseTotal>
                            </fieldset>
                        </div>
                        <div style="height: 100%;width: 20%;float: left;">
                            <fieldset>
                                <legend id="center2"></legend>
                                <enterpriseInnovate :year="year"></enterpriseInnovate>
                            </fieldset>
                        </div>
                        <div style="height: 100%;width: 20%;float: left;">
                            <fieldset>
                                <legend id="center3"></legend>
                                <enterpriseDistribution :year="year"></enterpriseDistribution>
                            </fieldset>
                        </div>
                        <div style="height: 100%;width: 40%;float: left;">
                            <fieldset>
                                <legend id="center4"></legend>
                                <enterpriseDevelop :year="year"></enterpriseDevelop>
                            </fieldset>
                        </div>
                    </div>
                </div>
            </el-col>
            <el-col :span="8" class="el-col">
                <div class="content">
                    <div class="title" id="east"></div>
                    <div class="title-aside">
                        <div style="height: 100%;width: 15%;float: left;">
                            <fieldset>
                                <legend id="east1"></legend>
                                <projectApply :year="year"></projectApply>
                            </fieldset>
                        </div>
                        <div style="height: 100%;width: 30%;float: left;">
                            <fieldset>
                                <legend id="east2"></legend>
                                <projectSupport :year="year"></projectSupport>
                            </fieldset>
                        </div>
                        <div style="height: 100%;width: 30%;float: left;">
                            <fieldset>
                                <legend id="east3"></legend>
                                <projectCost :year="year"></projectCost>
                            </fieldset>
                        </div>
                        <div style="height: 100%;width: 25%;float: left;">
                            <fieldset>
                                <legend id="east4"></legend>
                                <projectClosed :year="year"></projectClosed>
                            </fieldset>
                        </div>
                    </div>
                </div>
            </el-col>
        </el-row>
    </scale-box>
</template>
<style>
    .el-row {
        height: 100%;
    }

    .el-col {
        height: 100%;
    }

    .content {
        width: 100%;
        height: 100%;
        border-radius: 4px;
        min-height: 36px;
        font-size: 100%;
    }

    .title {
        height: 100%;
        width: 1%;
        float: left;
        writing-mode: tb-rl;
        text-align: center
    }

    .title-aside {
        margin-left: 1%;
        height: 100%;
    }

    .quarter {
        height: 100%;
        width: 25%;
        float: left;
    }

    .half {
        height: 100%;
        width: 50%;
        float: left;
    }

    fieldset {
        height: 93%;
    }

    legend {
        text-align: center;
    }

</style>

<script>
    import $ from 'jquery';
    import {fullScreen} from '@/assets/js/fullScreen';
    import personTotal from "@/views/person/personTotal";
    import personAdded from "@/views/person/personAdded";
    import personLeaved from "@/views/person/personLeaved";
    import enterpriseTotal from "@/views/enterprise/enterpriseTotal";
    import enterpriseInnovate from "@/views/enterprise/enterpriseInnovate";
    import enterpriseDistribution from "@/views/enterprise/enterpriseDistribution";
    import enterpriseDevelop from "@/views/enterprise/enterpriseDevelop";
    import projectApply from "@/views/project/projectApply";
    import projectSupport from "@/views/project/projectSupport";
    import projectCost from "@/views/project/projectCost";
    import projectClosed from "@/views/project/projectClosed";

    export default {
        name: "app",
        components: {
            personTotal,
            personAdded,
            personLeaved,
            enterpriseTotal,
            enterpriseInnovate,
            enterpriseDistribution,
            enterpriseDevelop,
            projectApply,
            projectSupport,
            projectCost,
            projectClosed
        },
        data() {
            return {
                socket: {},
                year: null
            };
        },
        watch: {},
        computed: {},
        mounted() {
            const regions = ['west', 'center', 'east'];

            $.getJSON("static/json/title.json", function (json) {
                const titles = json["标题"];
                for (let i = 0; i < regions.length; i++) {
                    const region = regions[i];
                    const title = titles[i];
                    const titleStr = JSON.stringify(title);
                    const titleKey = titleStr.substring(2, titleStr.indexOf("\":"));
                    const legend = $("#" + region);
                    legend[0].innerHTML = "<span style='font-size: 2.5em;font-weight: bold;color: white;display: inline-block;height: 400px;'>" + titleKey + "</span>";

                    const titleArr = title[titleKey];
                    for (let j = 0; j < titleArr.length; j++) {
                        const legend1 = $("#" + region + (j + 1));
                        legend1[0].innerHTML = "<span style='font-size: 1.25em;color: white;'>" + titleArr[j] + "</span>";
                    }
                }
            });
            $("#fullScreen").bind('click', function () {
                fullScreen(document.getElementById("main"));
            });

            // $("#fullScreen").click();
        },
        created: function () {
            let wsServer = "ws://127.0.0.1:8080/websocket/year";
            this.socket = new WebSocket(wsServer);
            // 监听socket连接
            this.socket.onopen = this.socketOpen;
            // 监听socket错误信息
            this.socket.onerror = this.socketError;
            // 监听socket消息
            this.socket.onmessage = this.getMessage;
        },
        methods: {
            socketError: function () {
                console.log("WebSocket连接发生错误");
            },
            socketOpen: function () {
                console.log("WebSocket连接成功");
            },
            getMessage: function (event) {
                console.log("接收到推送消息：" + event.data);
                this.year = Number(event.data);
            },
        }
    };
</script>
