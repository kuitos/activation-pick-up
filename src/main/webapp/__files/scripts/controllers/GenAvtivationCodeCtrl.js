/**
 * Author: liukui
 * Date: 14-3-16
 * Time: 下午8:45
 */
function GenAvtivationCodeCtrl($scope, $http) {

    // 生成序列号
    $scope.generate = function (amount) {
        $http.get(root + "ctrl/activationCode/genActivationCode?amount=" + amount).success(function (res) {
            alert(res);
        }).error(function () {
            alert("生成失败!");
        });
    };
}