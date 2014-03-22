/**
 * @since : 13-12-26 下午9:04
 * @author : kui.liu
 */
angular.module('services', ['ngGrid', 'ui.bootstrap']).service("kGrid", ["$http", "$timeout", function ($http, $timeout) {
    /*
     ngGrid 封装
     */
    // 初始化grid配置
    this.init = function (gridOptions, scope) {
        scope.mySelection = []; // 将当前选中条目设定成全局并与mySelection绑定，供修改删除使用
        scope.totalServerItems = 0;
        scope.pagingOptions = {
            currentPage: 1,
            pageSizes: [5, 10, 25],
            pageSize: 10
        };

        // 默认配置
        var defaultGridConfigs = {
            data: 'myData', // 展示数据
            i18n: 'zh-cn', // 设置显示语言
            enablePaging: true,
            multiSelect: false,
            showFooter: true,
            enableColumnReordering: true, // 列是否可排序
            selectedItems: scope.mySelection, // 选中条目
            totalServerItems: 'totalServerItems', // 数据总条数
            pagingOptions: scope.pagingOptions // 页面配置
        };

        scope.url = gridOptions.url;

        // 绑定配置
        angular.extend(defaultGridConfigs, gridOptions);
        scope.gridOptions = defaultGridConfigs;

        scope.$watch('pagingOptions', function (newVal, oldVal) {
            if (newVal !== oldVal && newVal.currentPage !== oldVal.currentPage || newVal.pageSize !== oldVal.pageSize) {
                _getPagedDataAsync(scope.pagingOptions.currentPage, scope.pagingOptions.pageSize, scope);
            }
        }, true);
    };

    this.refresh = function (scope) {
        _getPagedDataAsync(1, scope.pagingOptions.pageSize, scope);
    };

    this.currentPageRefresh = function (scope) {
        _getPagedDataAsync(scope.pagingOptions.currentPage, scope.pagingOptions.pageSize, scope);
    };

    var _getPagedDataAsync = function (currentPage, pageSize, scope) {
        var pageOption = {
            currentPage: currentPage,
            pageSize: pageSize
        };
        angular.extend(pageOption, scope.queryParams);

        // 使用外部自定义数据
        if (scope.externalData && scope.externalData.data instanceof Array) {
            _setPagingData(scope.externalData, currentPage, pageSize, scope);
        } else {
            $http.post(scope.url, pageOption).success(function (result) {
                if (result.status == 1) {
                    _setPagingData(result.data, currentPage, pageSize, scope);
                } else {
                    alert("查询出错!");
                }
            });
        }
    };

    var _setPagingData = function (result, pageNum, pageSize, scope) {
        scope.myData = result.dataList;
        scope.totalServerItems = result.total;
        scope.pagingOptions.currentPage = pageNum;
        if (!scope.$$phase) {
            scope.$apply();
        }
    };
}]).service("appCache", ["$cacheFactory", function ($cacheFactory) {
    /*
     $cacheFactory封装
     */
    var cache = $cacheFactory("appCache");
    var num2CnMapper = {
        gatewayType: {
            1: "独立结算",
            2: "共享",
            3: "独享"
        },
        payType: {
            0: "预付费",
            1: "后付费"
        },
        signType: {
            0: "无签名时加上签名值",
            1: "强制加签名值"
        },
        smsPackageStatus: {
            0: "销售中",
            1: "已停售"
        }
    };
    cache.put("num2CnMapper", num2CnMapper);
    return cache;
}]).service("kModal", ["$modal", function ($modal) {
    /*
     ui.bootstrap.modal 封装
     */
    this.open = function (modalOptions, objPass2Controller) {
        // 初始化modal配置
        var defaultConfigs = {
            resolve: {
                items: function () {
                    return objPass2Controller;
                }
            }
        };

        if (modalOptions) {
            modalOptions = angular.extend(defaultConfigs, modalOptions);
        } else {
            modalOptions = defaultConfigs;
        }

        // 生成modal
        $modal.open(modalOptions).result.then(function (result) {
            if (result) {
                console.log('selectedItem: ' + result);
            }
        }, function () {
            console.log('Modal dismissed at: ' + new Date());
        });
    }
}]);