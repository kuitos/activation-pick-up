angular.module("directives", ["directives/datepicker.html"]).directive("datePicker", ["$timeout", "$filter", function ($timeout, $filter) {
    return {
        restrict: "E",
        require: "ngModel",
        replace: true,
        templateUrl: "directives/datepicker.html",
        link: function (scope, elem, attrs, ngModel) {
            var $datePicker = elem.find("input");

            $datePicker.attr("ng-model", attrs.ngModel);
            $datePicker.attr("value", $filter('date')(scope.$eval(attrs.ngModel), "yyyy-MM-dd"));

            $datePicker.datepicker({
                format: "yyyy-mm-dd",
                autoclose: true
            }).on("hide", function () {// 选中之后绑定日期值
                ngModel.$setViewValue($(this).val());
                $timeout(function () {
                    scope.$apply();
                }, 500);
            });

            // 图标动作
            elem.find(".add-on:has(.icon-calendar)").click(function () {
                $datePicker.datepicker("show");
            });

            // 判断是否需要加required
            if (attrs.hasOwnProperty("required")) {
                $(".input-append input").attr("required", "required");
            }
        }
    }
}]).directive('placeholder', [function () { // 兼容各浏览器的placeholder
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, element, attr, ctrl) {

            var value;

            var placeholder = function () {
                element.val(attr.placeholder)
            };
            var unPlaceholder = function () {
                element.val('');
            };

            scope.$watch(attr.ngModel, function (val) {
                value = val || '';
            });

            element.bind('focus', function () {
                if (value == '') unPlaceholder();
            });

            element.bind('blur', function () {
                if (element.val() == '') placeholder();
            });

            ctrl.$formatters.unshift(function (val) {
                if (!val) {
                    placeholder();
                    value = '';
                    return attr.placeholder;
                }
                return val;
            });
        }
    }
}]).directive('ngEnter', [function () { // 回车事件
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if (event.which === 13) {
                scope.$apply(function () {
                    scope.$eval(attrs.ngEnter);
                });
                event.preventDefault();
            }
        });
    };
}]).directive("getRoot", [function () {
    return function (scope, element) {
        if (element.attr('_href')) {
            element.attr('href', root_files + element.attr('_href'));
        }
        if (element.attr('_src')) {
            $.ajax({
                url: root_files + element.attr('_src'),
                dataType: 'script',
                async: false,
                cache: element.attr('cache') ? true : false,
                success: function () {
                    element.remove();
                }
            });
        }
    }
}]).directive('buttonLink', function () {
    return function (scope, element, attr) {
        var id = attr["buttonLink"];
        element.on("click", function () {
            document.getElementById(id).click();
        });
    };
}).provider('ngClip', function () {
    var self = this;
    this.path = '//cdnjs.cloudflare.com/ajax/libs/zeroclipboard/1.3.2/ZeroClipboard.swf';
    return {
        setPath: function (newPath) {
            self.path = newPath;
        },
        $get: function () {
            return {
                path: self.path
            };
        }
    };
}).run(['$document', 'ngClip', function ($document, ngClip) {
    ZeroClipboard.config({
        moviePath: ngClip.path,
        trustedDomains: ["*"],
        allowScriptAccess: "always",
        forceHandCursor: true
    });
}]).directive('clipCopy', ['$window', 'ngClip', function ($window, ngClip) {
    return {
//        scope: {
//            clipCopy: '&',
//            clipClick: '&'
//        },
        restrict: 'A',
        link: function (scope, element, attr) {
            // Create the clip object
            var clip = new ZeroClipboard(element);
            clip.on('load', function (client) {
                var onMouseDown = function (client) {
                    client.setText(angular.toJson(scope.$eval(attr.clipCopy)));
                    if (angular.isDefined(attr.clipClick)) {
                        scope.$apply(attr.clipClick);
                    }
                };

                var onComplete = function () {
                    alert("联系人信息已成功复制到剪贴板!");
                };

                client.on('mouseDown', onMouseDown);
                client.on('complete', onComplete);

                scope.$on('$destroy', function () {
                    client.off('mouseDown', onMouseDown);
                    client.unclip(element);
                });
            });
        }
    };
}]);

angular.module("directives/datepicker.html", []).run(["$templateCache", function ($templateCache) {
    $templateCache.put("directives/datepicker.html", "<div class=\"input-append\">" + "     <input type=\"text\"/>" + "     <span class=\"add-on\"><i class=\"icon-calendar\"></i></span>" + "</div>");
}]);