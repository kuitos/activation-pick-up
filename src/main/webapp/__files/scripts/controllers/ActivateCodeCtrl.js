/**
 * Author: liukui
 * Date: 14-3-16
 * Time: 下午10:00
 */
function ActivateCodeCtrl($scope, kGrid, kModal) {

    // 初始化grid
    kGrid.init({
        url: root + "ctrl/activationCode/getActivationCode",
        columnDefs: [
            { field: 'pkid', displayName: '序列号' },
            { field: 'codePassword', displayName: '激活码'},
            { field: 'status', displayName: '激活状态', cellFilter: "num2Cn : 'activationStatus'"},
            { field: 'activationType', displayName: '激活类型', cellFilter: "num2Cn : 'activationType'"},
            { field: 'created', displayName: '生成时间', cellFilter: "date : 'yyyy-MM-dd HH:mm:ss'"},
            { field: 'modified', displayName: '修改时间', cellFilter: "date : 'yyyy-MM-dd HH:mm:ss'"},
            { field: 'operation', displayName: '操作', cellTemplate: '<div class="ngCellText" ' + 'ng-class="col.colIndex()"><span ng-cell-text>'
                + '<a href="javascript:void(0)" ng-if="row.entity.status==0" ng-click="activate(row.entity.pkid)">激活</a>'
                + '</span></div>'}
        ]
    }, $scope);
    kGrid.refresh($scope);

    // 按条件筛选
    $scope.queryParams = {};
    $scope.$watch("queryParams", function (newVal, oldVal) {
        if (newVal !== oldVal && newVal.status !== oldVal.status || newVal.activationType !== oldVal.activationType) {
            kGrid.refresh($scope);
        }
    }, true);

    // 按序列号搜索
    $scope.search = function (pkid) {
        $scope.queryParams.pkid = pkid;
        kGrid.refresh($scope);
    };

    // 激活
    $scope.activate = function (pkid) {
        kModal.open({controller: confirmCtrl, templateUrl: 'activateTypeSelect.html'}, {scope: $scope, pkid: pkid});
    };
}

function confirmCtrl($scope, $modalInstance, kGrid, items, $http) {

    $scope.activationType = 1;

    $scope.save = function (activationType) {
        if (confirm("确认激活序列号为 " + items.pkid + " 的激活卡么？")) {
            debugger;
            $http.get(root + "ctrl/activationCode/activateCode?pkid=" + items.pkid + "&activationType=" + activationType).success(function () {
                kGrid.currentPageRefresh(items.scope);
                $scope.close();
            }).error(function () {
                alert("激活失败!");
            });
        }
    };

    $scope.close = function () {
        $modalInstance.close();
    };
}