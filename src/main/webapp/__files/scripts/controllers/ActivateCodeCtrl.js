/**
 * Author: liukui
 * Date: 14-3-16
 * Time: 下午10:00
 */
function ActivateCodeCtrl($scope, kGrid, appCache, $http) {

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
            { field: 'operation', displayName: '操作', cellTemplate: '<div class="ngCellText" ' + 'ng-class="col.colIndex()">' + '<span ng-cell-text><a href="#" ng-disabled="row.entity.status==1" ng-click="config(row.entity.pkid)">激活</a></span></div>'}
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

    $scope.search = function (pkid) {
        $scope.queryParams.pkid = pkid;
        kGrid.refresh($scope);
    };

    $scope.activate = function () {

    }
}