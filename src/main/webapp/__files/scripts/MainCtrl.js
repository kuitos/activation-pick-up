/**
* Author: liukui
* Date: 14-3-16
* Time: 下午2:42
*/
angular.module("Activation", ["services", "directives"]).controller("MainCtrl", ["$scope", function ($scope) {

    $scope.panes = [
        {title: "序列号生成", active: true},
        {title: "序列号激活"},
        {title: "密码验证"}
    ];

    var paneUrlMapper = {
        "序列号生成": root_files + "templates/genActivationCode.html",
        "序列号激活": root_files + "templates/activateCode.html",
        "联系人管理": ""
    };

    $scope.setPaneUrl = function (pane) {
        if (!pane.url) {
            pane.url = paneUrlMapper[pane.title];
        }
//        return $scope.panes.filter(function (pane) {
//            return pane.active;
//        })[0];
    };
}]);
