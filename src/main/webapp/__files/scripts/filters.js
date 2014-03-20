/**
 * @since : 13-12-31 下午5:00
 * @author : kui.liu
 */
/**
 * 字段展示时使用的过滤器
 * @author kui.liu
 * @since 2013-09-27
 */
var filter = angular.module('recharge-Filter', []);
filter.filter('checkmark', function () {
    return function (input) {
        return input ? '\u2713' : '\u2718';
    };
});

//将数字表示的类型转换成中文展示
filter.filter('num2Cn', function (appCache) {
    return function (input, type) {
        var num2CnMapper = appCache.get("num2CnMapper");
        if (typeof (num2CnMapper[type][input]) == 'undefined') {
            return "";
        } else {
            return num2CnMapper[type][input];
        }
    };
});