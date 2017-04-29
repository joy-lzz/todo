/**
 * Created by Joy-li on 2017/4/25.
 */

(function (angular) {
    'use strict';

    /* 主模块依赖的控制器模块 */
    angular.module('controllerApp',['serviceApp'])
        .controller('mainController',[
            '$scope',
            '$routeParams',
            /* $route对象，可以将$routeParams中的属性值改变 - 重新加载一次更新后的url地址对应的路由映射 */
            '$route',
            'mainService',
            function ($scope,$routeParams,$route,mainService) {

            /* 从服务中得到数据 */
            $scope.todos = mainService.getData();

            /* 缓存函数 */
            $scope.saveData = mainService.saveData;

            /* 新任务数据 */
            $scope.newTask = '';

            /* 添加任务 */
            $scope.addTask = function () {
                /*console.log($scope.newTask);*/
                if ($scope.newTask) {
                    mainService.addTask($scope.newTask);
                }else {
                    alert('任务不能为空');
                }
                $scope.newTask = '';
                $scope.saveData();
            };

            /* 删除任务数据 -- 明确删除哪一个任务 -- 唯一标识任务的是任务的随机数id */
            $scope.removeTask = function (id) {
                mainService.removeTask(id);
                $scope.saveData();
            };

            /* 绑定item left */
            $scope.unCompletedItem = 0;
            /* $watch()监视会影响性能
             * 三个参数：
             * 1、被监视的对象 -- 只能是$scope服务对象中的属性；
             * 2、回调函数，监视数据发生变化后执行的函数；
             * 3、是否深度监视 -- 默认false，如果true，当被监视属性的任何一个属性值变化都将执行回调函数 */
            $scope.$watch('todos', function () {
                /* flag计算todos中active的个数 */
                var flag = 0;
                for (var i = 0,len = $scope.todos.length;i < len; i++) {
                    if (false === $scope.todos[i].completed) {
                        flag += 1;
                    }
                }
                $scope.unCompletedItem = flag;
            },true);

            /* 清除所有已完成任务 -- 将未完成任务存放在新的数组中 */
            $scope.clearAll = function () {
                mainService.clearAll();
                /* 重新改变内存地址中$scope.todos中保存的指针地址 -- 指向新的数组 */
                $scope.todos = mainService.getData();
                $scope.saveData();
            };

            /* 判断clear completed元素是否存在 */
            $scope.checkShow = function () {
                for (var i = 0,len = $scope.todos.length;i < len; i++) {
                    if (true === $scope.todos[i].completed) {
                        /* 如果有一个完成就返回true */
                        return true;
                    }
                }
                /* 都未完成，返回false */
                return false;
            };

            /* 全选/反选 -- 没显示效果是因为input元素css出问题了 */
            $scope.now = false;
            $scope.allOrNot = function () {
                mainService.allOrNot($scope.now);
                $scope.saveData();
            };

            /* 双击进入编辑状态 */
            $scope.editingId = -1;
            $scope.editTask = function (id) {
                $scope.editingId = id;
            };

            /* 保存编辑后的task */
            $scope.save1 = function () {
                /* 直接传入$scope.editingId属性出错！！  传入的是一个数字，而不是某个可使用的变量
                 * 改成传入$scope服务对象，就可以访问对应属性值了 */
                mainService.save($scope);
                $scope.saveData();
            };

            /* 状态筛选 -- 利用路由表，分配url请求 path值不同，而通过路由参数对象获得path
             * 根据path值不同，在给出不同的过滤器匹配条件 */
            $scope.selector = {};

            /* $routeParams 服务对象是路由表中的参数配置对象 -- 一个变量对应一个url地址中的对应值 */
            switch ($routeParams.task) {
                case 'active' :
                    $scope.selector = {completed : false};
                    break;
                case 'completed' :
                    $scope.selector = {completed : true};
                    break;
                default :
                    /* 重新加载一次路由表对应映射 -- 实现路由跳转！！ */
                    /* 当url地址中的path值本身为空的时候，就不需要跳转了 -- 不然太消耗内存 -- 类似死循环 */
                    if ($routeParams.task != '') {
                        $route.updateParams({task : ''});
                    }
                    $scope.selector = {};
            }


            /* 匹配规则 -- 匹配条件满足的规则 -- 默认是模糊匹配，如下函数是完全匹配 */
            $scope.equalCompare = function (source,target) {
                return source === target;
            };





        }]);


})(angular);