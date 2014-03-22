/**
 * Author: liukui
 * Date: 14-3-16
 * Time: 下午10:00
 */
function ActivateCodeCtrl($scope, kGrid, kModal, appCache, $http) {

    // 初始化grid
    kGrid.init({
        url: root + "ctrl/activationCode/getActivationCode",
        columnDefs: [
            { field: 'pkid', displayName: '序列号' },
            { field: 'codePassword', displayName: '激活码'},
            { field: 'status', displayName: '激活状态' },
            { field: 'activationType', displayName: '激活类型'},
            { field: 'created', displayName: '生成时间'},
            { field: 'modified', displayName: '修改时间'},
            { field: 'operation', displayName: '操作', cellTemplate: '<div class="ngCellText" ' + 'ng-class="col.colIndex()"><span ng-cell-text>' + '<a href="#" ng-disabled="row.entity.status==1" ng-click="activate(row.entity.pkid)">激活</a>' + '</span></div>'}
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

    $scope.activateType = 1;

    $scope.save = function (activateType) {
        if (confirm("确认激活序列号为 " + items.pkid + " 的激活卡么？")) {
            $http.get(root + "ctrl/activationCode/activateCode?pkid=" + items.pkid + "&activateType=" + activateType).success(function () {
                kGrid.currentPageRefresh(items.scope);
            }).error(function () {
                alert("激活失败!");
            });
        }
    };

    $scope.close = function () {
        $modalInstance.close();
    };
}