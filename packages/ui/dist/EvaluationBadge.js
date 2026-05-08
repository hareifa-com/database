"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EvaluationBadge = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var lucide_react_1 = require("lucide-react");
var EvaluationBadge = function (_a) {
    var score = _a.score, _b = _a.showLabel, showLabel = _b === void 0 ? true : _b, _c = _a.size, size = _c === void 0 ? 'md' : _c, _d = _a.className, className = _d === void 0 ? '' : _d;
    var getScoreColor = function (score) {
        if (score >= 9)
            return 'text-green-600 border-green-600 bg-green-50';
        if (score >= 8)
            return 'text-blue-600 border-blue-600 bg-blue-50';
        if (score >= 7)
            return 'text-yellow-600 border-yellow-600 bg-yellow-50';
        if (score >= 6)
            return 'text-orange-600 border-orange-600 bg-orange-50';
        return 'text-red-600 border-red-600 bg-red-50';
    };
    var getScoreLabel = function (score) {
        if (score >= 9)
            return 'ممتاز';
        if (score >= 8)
            return 'جيد جداً';
        if (score >= 7)
            return 'جيد';
        if (score >= 6)
            return 'متوسط';
        return 'ضعيف';
    };
    var getSizeClasses = function (size) {
        switch (size) {
            case 'sm':
                return 'px-2 py-1 text-xs';
            case 'lg':
                return 'px-4 py-2 text-lg';
            default:
                return 'px-3 py-1.5 text-sm';
        }
    };
    var getIconSize = function (size) {
        switch (size) {
            case 'sm':
                return 'w-3 h-3';
            case 'lg':
                return 'w-6 h-6';
            default:
                return 'w-4 h-4';
        }
    };
    var colorClasses = getScoreColor(score);
    var sizeClasses = getSizeClasses(size);
    var iconSize = getIconSize(size);
    return ((0, jsx_runtime_1.jsxs)("div", { className: "inline-flex items-center border rounded-full ".concat(colorClasses, " ").concat(sizeClasses, " ").concat(className), children: [score >= 9 ? ((0, jsx_runtime_1.jsx)(lucide_react_1.Award, { className: "".concat(iconSize, " ml-1") })) : score >= 8 ? ((0, jsx_runtime_1.jsx)(lucide_react_1.TrendingUp, { className: "".concat(iconSize, " ml-1") })) : ((0, jsx_runtime_1.jsx)(lucide_react_1.Star, { className: "".concat(iconSize, " ml-1") })), (0, jsx_runtime_1.jsx)("span", { className: "font-bold", children: score.toFixed(1) }), showLabel && ((0, jsx_runtime_1.jsx)("span", { className: "mr-1", children: getScoreLabel(score) }))] }));
};
exports.EvaluationBadge = EvaluationBadge;
