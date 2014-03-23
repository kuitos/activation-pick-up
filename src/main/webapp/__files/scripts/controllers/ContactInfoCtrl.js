/**
 * Author: liukui
 * Date: 2014/3/23 0023
 * Time: 16:02
 */
function ContactInfoCtrl($scope, kGrid, kModal) {

    // 初始化grid
    kGrid.init({
        url: root + "ctrl/activationCode/getActivationCodeInfo",
        columnDefs: [
            { field: 'pkid', displayName: '序列号' },
            { field: 'codePassword', displayName: '激活码'},
            { field: 'status', displayName: '激活状态', cellFilter: "num2Cn : 'activationStatus'"},
            { field: 'activationType', displayName: '激活类型', cellFilter: "num2Cn : 'activationType'"},
            { field: 'shipmentStatus', displayName: '发货状态', cellFilter: "num2Cn : 'shipmentStatus'"},
            { field: 'created', displayName: '发货时间', cellFilter: "date : 'yyyy-MM-dd HH:mm:ss'"},
            { field: 'modified', displayName: '更新时间', cellFilter: "date : 'yyyy-MM-dd HH:mm:ss'"},
            { displayName: '操作', cellTemplate: '<div class="ngCellText" ' + 'ng-class="col.colIndex()">' + '<span ng-cell-text>' + '<a href="javascript:void(0)" ng-if="row.entity.shipmentStatus!=1" ng-click="deliverGoods(row.entity.pkid)">发货</a>' + '<a href="javascript:void(0)" ng-if="row.entity.shipmentStatus==1" ng-click="updateInfo(row.entity)">查看/编辑</a>' + '</span></div>'}
        ]
    }, $scope);
    kGrid.refresh($scope);

    // 按密码搜索
    $scope.search = function (codePassword) {
        $scope.queryParams.codePassword = codePassword;
        kGrid.refresh($scope);
    };

    // 发货
    $scope.deliverGoods = function (pkid) {
        kModal.open({controller: deliverCtrl, templateUrl: 'deliverGoods.html'}, {scope: $scope, serialNumber: pkid});
    };

    $scope.updateInfo = function (codeInfo) {
        kModal.open({controller: updateInfoCtrl, templateUrl: 'updateInfo.html'}, {scope: $scope, codeInfo: codeInfo});
    }


}

function deliverCtrl($scope, $modalInstance, kGrid, items, $http) {

    $scope.info = {};

    $scope.deliver = function () {
        if (confirm("发货成功后状态不可更改，确认发货？")) {
            $scope.info.serialNumber = items.serialNumber;

            $http.post(root + "ctrl/activationCode/deliverGoods", $scope.info).success(function () {
                kGrid.currentPageRefresh(items.scope);
                $scope.close();
            }).error(function () {
                alert("发货失败!");
            });
        }
    };

    $scope.close = function () {
        $modalInstance.close();
    };
}

function updateInfoCtrl($scope, $modalInstance, kGrid, items, $http) {

    $scope.info = {
        serialNumber: items.codeInfo.pkid,
        phone: items.codeInfo.phone,
        address: items.codeInfo.address,
        expressNumber: items.codeInfo.expressNumber
    };

    $scope.save = function () {
        $http.post(root + "ctrl/activationCode/updateContactInfo", $scope.info).success(function () {
            kGrid.currentPageRefresh(items.scope);
            $scope.close();
        }).error(function () {
            alert("保存失败!");
        });
    };

    $scope.close = function () {
        $modalInstance.close();
    };
}