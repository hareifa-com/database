"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EvaluationRadar = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var recharts_1 = require("recharts");
var EvaluationRadar = function (_a) {
    var data = _a.data, _b = _a.size, size = _b === void 0 ? 'md' : _b, _c = _a.className, className = _c === void 0 ? '' : _c;
    var chartData = [
        {
            category: 'المهارات الفنية',
            value: data.technicalSkills || 0,
            fullMark: 10
        },
        {
            category: 'الصفات البدنية',
            value: data.physicalAttributes || 0,
            fullMark: 10
        },
        {
            category: 'الجوانب الذهنية',
            value: data.mentalAspects || 0,
            fullMark: 10
        },
        {
            category: 'الفهم التكتيكي',
            value: data.tacticalUnderstanding || 0,
            fullMark: 10
        }
    ];
    var getSizeClasses = function (size) {
        switch (size) {
            case 'sm':
                return 'h-48 w-48';
            case 'lg':
                return 'h-96 w-96';
            default:
                return 'h-64 w-64';
        }
    };
    return ((0, jsx_runtime_1.jsx)("div", { className: "".concat(getSizeClasses(size), " ").concat(className), children: (0, jsx_runtime_1.jsx)(recharts_1.ResponsiveContainer, { width: "100%", height: "100%", children: (0, jsx_runtime_1.jsxs)(recharts_1.RadarChart, { data: chartData, children: [(0, jsx_runtime_1.jsx)(recharts_1.PolarGrid, { gridType: "polygon", stroke: "#e5e7eb", strokeWidth: 1 }), (0, jsx_runtime_1.jsx)(recharts_1.PolarAngleAxis, { dataKey: "category", tick: { fontSize: size === 'sm' ? 10 : size === 'lg' ? 14 : 12 }, className: "text-gray-600" }), (0, jsx_runtime_1.jsx)(recharts_1.PolarRadiusAxis, { domain: [0, 10], tickCount: 6, tick: { fontSize: size === 'sm' ? 8 : size === 'lg' ? 12 : 10 }, axisLine: false, tickLine: false }), (0, jsx_runtime_1.jsx)(recharts_1.Radar, { name: "\u0627\u0644\u062A\u0642\u064A\u064A\u0645", dataKey: "value", stroke: "#3b82f6", fill: "#3b82f6", fillOpacity: 0.3, strokeWidth: 2 })] }) }) }));
};
exports.EvaluationRadar = EvaluationRadar;
