/**
 * Author: liukui
 * Date: 14-3-16
 * Time: 下午2:42
 */
angular.module("Activation", ["services", "directives", "filters"]).controller("MainCtrl", ["$scope", function ($scope) {

    $scope.panes = [
        {title: "序列号生成", active: true},
        {title: "序列号激活"},
        {title: "密码验证"}
    ];

    var paneUrlMapper = {
        "序列号生成": root_files + "templates/genActivationCode.html",
        "序列号激活": root_files + "templates/activateCode.html",
        "密码验证": root_files + "templates/contactInfo.html"
    };

    $scope.setPaneUrl = function (pane) {
        if (!pane.url) {
            pane.url = paneUrlMapper[pane.title];
        }
//        return $scope.panes.filter(function (pane) {
//            return pane.active;
//        })[0];
    };
}]).config(['ngClipProvider', function (ngClipProvider) {
    ngClipProvider.setPath(root_files + "jsLib/ZeroClipboard/ZeroClipboard.swf");
}]);
