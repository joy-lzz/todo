(function (angular) {
	'use strict';

    /* 创建app主模块 */

    /* 控制器模块单独拿出去 -- 暴露数据 */
    var app = angular.module('mainApp',['controllerApp','ngRoute']);

    /* 配置主模块 -- 路由部分配置 */
    app.config(['$routeProvider', function ($routeProvider) {

        /* 配置路由表 -- 路由器服务对象 */
        $routeProvider
            /* ！！非常重要！！每一次重新请求url地址，也就是地址栏中的path值改变后，重新执行一次控制器！！
             * 那么，如果数据没有缓存的话，就会清空！！ */
            /*  可能存在的问题：当我们设置todos数组为空数组时，即使在不改变锚点值的情况下，增加了数组内容；
             * 下一次改变锚点值，或者是url地址栏的时候，数据将不会保存 -- 重新执行匹配到的控制器和模板 */
             .when('/:task?',{
                controller : 'mainController',
                /* 模板一定不能省略 */
                templateUrl : 'tmpl_id'
            })
            .otherwise({
                redirectTo : '/'
            })

    }]);




})(angular);
