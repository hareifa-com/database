"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiClient = void 0;
__exportStar(require("./types"), exports);
__exportStar(require("./players"), exports);
__exportStar(require("./evaluations"), exports);
__exportStar(require("./academies"), exports);
var players_1 = require("./players");
var evaluations_1 = require("./evaluations");
var academies_1 = require("./academies");
var ApiClient = /** @class */ (function () {
    function ApiClient(baseUrl) {
        this.players = new players_1.PlayersClient(baseUrl);
        this.evaluations = new evaluations_1.EvaluationsClient(baseUrl);
        this.academies = new academies_1.AcademiesClient(baseUrl);
    }
    return ApiClient;
}());
exports.ApiClient = ApiClient;
exports.default = ApiClient;
