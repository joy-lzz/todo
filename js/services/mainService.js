/**
 * Created by Joy-li on 2017/4/26.
 */
(function (angular) {
    'use strict';

    /* 自定义服务也是定义在模块下面！ 要使用自定义服务，就需要依赖该服务所属的模块 */

    /* 服务中一般写业务逻辑 -- 一切和数据相关的变化都算是业务逻辑 -- 业务逻辑可复用！！基本原则 */

    /* 数据的增删查改 也就是数据里面的值变换了后都算是业务逻辑 */

    /* 服务可以看成是一个构造函数对象 */

    /* 业务逻辑仅关心数据的变化如何实现 -- 其他一律不关心 */

    angular.module('serviceApp',[])
        .service('mainService',['$window',function ($window) {


            /* 列表数据等于缓存数据，如果没有缓存数据，等于空数组 */
            /*每一次重新请求的时候，todos的内容，应该是修改后的内容，而不是空数组*/
            var todos = $window.localStorage['todos_list'] ? JSON.parse($window.localStorage['todos_list']) : [];

            /* 保存缓存数据 */
            /* 修改数据后，将数据转译成字符串形式，缓存在localStorage中！！
             * 如果我们只是单纯的写死数据，每一次重新请求，都会恢复数据！！ */
            /* 这里localStorage方法是H5中的数据缓存方法
             -- window对象的一个localStorage属性，返回一个数据缓存对象！！
             {todos_list : '缓存的数据'}*/
            this.saveData = function () {
                $window.localStorage['todos_list'] = JSON.stringify(todos);
            };

            /*  暴露数据 -- 和控制器建立联系 */
            this.getData = function () {
                return todos
            };


            /* 获得每一个todos的随机id，保证id不重复 */
            function getId() {
                var id = Math.random();
                for (var i = 0,len = todos.length;i < len; i++) {
                    if (id === todos[i].id) {
                        getId();
                    }
                }
                return id;
            }


            /* 添加任务 -- 添加谁？需要参数 */
            this.addTask = function (newTask) {
                var newObj = {
                    id : getId(),
                    task : newTask,
                    completed : false
                };
                todos.push(newObj);
            };

            /* 删除任务数据 -- 明确删除哪一个任务 -- 唯一标识任务的是任务的随机数id */
            this.removeTask = function (id) {
                for (var i = 0,len = todos.length;i < len; i++) {
                    if (id === todos[i].id) {
                        todos.splice(i,1);
                        break;
                    }
                }
            };

            /* 清除所有已完成任务 -- 将未完成任务存放在新的数组中 */
            this.clearAll = function () {
                var result = [];
                for (var i = 0,len = todos.length;i < len; i++) {
                    if (false === todos[i].completed) {
                        result.push(todos[i]);
                    }
                }
                todos = result;
            };

            /* 全选/反选*/
            this.allOrNot = function (status) {
                for (var i = 0,len = todos.length;i < len; i++) {
                    todos[i].completed = status;
                }
                status = !status;
            };

            /* 保存编辑后的task  -- 不生效 */
            this.save = function ($scope) {
                $scope.editingId = -1;
            };

            /* 数据更新 -- 案例中未使用到 */
            this.upData = function (id, target) {

            }

        }]);





})(angular);
