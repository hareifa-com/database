"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MapView = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var lucide_react_1 = require("lucide-react");
var MapView = function (_a) {
    var markers = _a.markers, _b = _a.center, center = _b === void 0 ? { lat: 30.0444, lng: 31.2357 } : _b, // Cairo coordinates
    _c = _a.zoom, // Cairo coordinates
    zoom = _c === void 0 ? 6 : _c, onMarkerClick = _a.onMarkerClick, _d = _a.className, className = _d === void 0 ? '' : _d;
    var getMarkerColor = function (type, rating) {
        if (type === 'academy') {
            return 'bg-blue-500';
        }
        if (rating && rating >= 8) {
            return 'bg-green-500';
        }
        return 'bg-orange-500';
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: "relative bg-gray-100 rounded-lg overflow-hidden ".concat(className), children: [(0, jsx_runtime_1.jsxs)("div", { className: "absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50", children: [(0, jsx_runtime_1.jsx)("div", { className: "absolute inset-0 flex items-center justify-center", children: (0, jsx_runtime_1.jsxs)("div", { className: "text-center", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.MapPin, { className: "w-16 h-16 text-gray-400 mx-auto mb-4" }), (0, jsx_runtime_1.jsx)("p", { className: "text-gray-600 text-lg mb-2", children: "\u062E\u0631\u064A\u0637\u0629 \u062A\u0641\u0627\u0639\u0644\u064A\u0629" }), (0, jsx_runtime_1.jsx)("p", { className: "text-gray-500 text-sm", children: "\u0633\u064A\u062A\u0645 \u0639\u0631\u0636 \u0627\u0644\u062E\u0631\u064A\u0637\u0629 \u0647\u0646\u0627" })] }) }), markers.map(function (marker, index) { return ((0, jsx_runtime_1.jsxs)("div", { className: "absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 hover:scale-110 transition-transform", style: {
                            left: "".concat(20 + (index * 15), "%"),
                            top: "".concat(30 + (index * 10), "%")
                        }, onClick: function () { return onMarkerClick === null || onMarkerClick === void 0 ? void 0 : onMarkerClick(marker); }, children: [(0, jsx_runtime_1.jsx)("div", { className: "w-8 h-8 ".concat(getMarkerColor(marker.type, marker.rating), " rounded-full flex items-center justify-center text-white shadow-lg"), children: marker.type === 'academy' ? ((0, jsx_runtime_1.jsx)(lucide_react_1.Users, { className: "w-4 h-4" })) : ((0, jsx_runtime_1.jsx)(lucide_react_1.MapPin, { className: "w-4 h-4" })) }), marker.count && ((0, jsx_runtime_1.jsx)("div", { className: "absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center", children: marker.count })), (0, jsx_runtime_1.jsx)("div", { className: "absolute top-8 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded shadow-md text-xs whitespace-nowrap", children: marker.name })] }, marker.id)); })] }), (0, jsx_runtime_1.jsxs)("div", { className: "absolute top-4 right-4 bg-white rounded-lg shadow-md p-2 space-y-2", children: [(0, jsx_runtime_1.jsx)("button", { className: "w-8 h-8 bg-gray-100 rounded flex items-center justify-center hover:bg-gray-200", children: "+" }), (0, jsx_runtime_1.jsx)("button", { className: "w-8 h-8 bg-gray-100 rounded flex items-center justify-center hover:bg-gray-200", children: "\u2212" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "absolute bottom-4 left-4 bg-white rounded-lg shadow-md p-3", children: [(0, jsx_runtime_1.jsx)("h4", { className: "text-sm font-semibold mb-2", children: "\u0627\u0644\u062E\u0631\u064A\u0637\u0629" }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-1 text-xs", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center", children: [(0, jsx_runtime_1.jsx)("div", { className: "w-3 h-3 bg-blue-500 rounded-full ml-2" }), (0, jsx_runtime_1.jsx)("span", { children: "\u0623\u0643\u0627\u062F\u064A\u0645\u064A\u0629" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center", children: [(0, jsx_runtime_1.jsx)("div", { className: "w-3 h-3 bg-green-500 rounded-full ml-2" }), (0, jsx_runtime_1.jsx)("span", { children: "\u0644\u0627\u0639\u0628 \u0645\u0645\u064A\u0632" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center", children: [(0, jsx_runtime_1.jsx)("div", { className: "w-3 h-3 bg-orange-500 rounded-full ml-2" }), (0, jsx_runtime_1.jsx)("span", { children: "\u0644\u0627\u0639\u0628" })] })] })] })] }));
};
exports.MapView = MapView;
