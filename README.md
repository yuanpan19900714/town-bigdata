# town-bigdata
本项目主要实现一个大屏数据展示的功能，分为前端页面展示、后端数据处理、数据控制3部分，分别对应town、bigdata和updtest等3个子项目

## town
这是一个vue项目，除了页面数据展示，还启动了websocket用来接收后端发送过来的数据控制信息

## bigdata
这是一个SpringBoot项目，为方便数据展示，采用从配置的json文件中读取数据的方式，实际情况中可以采用数据库连接池方式从数据库读取，还启动了一个socket端口用来接收数据控制端发送的数据控制信息，收到信息后转发到页面的websocket

## updtest
这是一个java项目，用来模拟数据控制
