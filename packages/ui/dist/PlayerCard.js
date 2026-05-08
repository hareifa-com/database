"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerCard = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var lucide_react_1 = require("lucide-react");
var PlayerCard = function (_a) {
    var id = _a.id, name = _a.name, position = _a.position, age = _a.age, governorate = _a.governorate, rating = _a.rating, academy = _a.academy, image = _a.image, onClick = _a.onClick, _b = _a.className, className = _b === void 0 ? '' : _b;
    var getRatingColor = function (rating) {
        if (rating >= 9)
            return 'text-green-600';
        if (rating >= 8)
            return 'text-blue-600';
        if (rating >= 7)
            return 'text-yellow-600';
        if (rating >= 6)
            return 'text-orange-600';
        return 'text-red-600';
    };
    var getRatingBgColor = function (rating) {
        if (rating >= 9)
            return 'bg-green-100';
        if (rating >= 8)
            return 'bg-blue-100';
        if (rating >= 7)
            return 'bg-yellow-100';
        if (rating >= 6)
            return 'bg-orange-100';
        return 'bg-red-100';
    };
    return ((0, jsx_runtime_1.jsx)("div", { className: "bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer ".concat(className), onClick: onClick, children: (0, jsx_runtime_1.jsxs)("div", { className: "p-6", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center mb-4", children: [(0, jsx_runtime_1.jsx)("div", { className: "w-16 h-16 bg-gray-200 rounded-full mr-4 flex items-center justify-center", children: image ? ((0, jsx_runtime_1.jsx)("img", { src: image, alt: name, className: "w-full h-full rounded-full object-cover" })) : ((0, jsx_runtime_1.jsx)(lucide_react_1.User, { className: "w-8 h-8 text-gray-400" })) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex-1", children: [(0, jsx_runtime_1.jsx)("h3", { className: "font-semibold text-lg text-gray-900", children: name }), (0, jsx_runtime_1.jsx)("p", { className: "text-gray-600", children: position })] }), rating && ((0, jsx_runtime_1.jsxs)("div", { className: "text-left", children: [(0, jsx_runtime_1.jsx)("div", { className: "text-2xl font-bold ".concat(getRatingColor(rating)), children: rating.toFixed(1) }), (0, jsx_runtime_1.jsx)("div", { className: "text-xs text-gray-500", children: "\u062A\u0642\u064A\u064A\u0645" })] }))] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2 text-sm text-gray-600", children: [age && ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Calendar, { className: "w-4 h-4 ml-2" }), (0, jsx_runtime_1.jsxs)("span", { children: [age, " \u0633\u0646\u0629"] })] })), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.MapPin, { className: "w-4 h-4 ml-2" }), (0, jsx_runtime_1.jsx)("span", { children: governorate })] }), academy && ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Trophy, { className: "w-4 h-4 ml-2" }), (0, jsx_runtime_1.jsx)("span", { children: academy })] }))] }), rating && ((0, jsx_runtime_1.jsxs)("div", { className: "mt-4 pt-4 border-t", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between mb-2", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-sm text-gray-600", children: "\u0645\u0633\u062A\u0648\u0649 \u0627\u0644\u062A\u0642\u064A\u064A\u0645" }), (0, jsx_runtime_1.jsx)("span", { className: "px-2 py-1 text-xs font-medium rounded-full ".concat(getRatingBgColor(rating), " ").concat(getRatingColor(rating)), children: rating >= 9 ? 'ممتاز' :
                                        rating >= 8 ? 'جيد جداً' :
                                            rating >= 7 ? 'جيد' :
                                                rating >= 6 ? 'متوسط' : 'ضعيف' })] }), (0, jsx_runtime_1.jsx)("div", { className: "w-full bg-gray-200 rounded-full h-2", children: (0, jsx_runtime_1.jsx)("div", { className: "h-2 rounded-full transition-all ".concat(rating >= 9 ? 'bg-green-600' :
                                    rating >= 8 ? 'bg-blue-600' :
                                        rating >= 7 ? 'bg-yellow-600' :
                                            rating >= 6 ? 'bg-orange-600' : 'bg-red-600'), style: { width: "".concat((rating / 10) * 100, "%") } }) })] }))] }) }));
};
exports.PlayerCard = PlayerCard;
