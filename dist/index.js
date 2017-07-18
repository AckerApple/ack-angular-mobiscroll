"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var mobiscroll_components_1 = require("./mobiscroll.components");
var MbscProvider_1 = require("./MbscProvider");
__export(require("./mobiscroll.components"));
var MbscModule = (function () {
    function MbscModule() {
    }
    return MbscModule;
}());
MbscModule.decorators = [
    { type: core_1.NgModule, args: [{
                imports: [
                    common_1.CommonModule
                ],
                providers: [MbscProvider_1.MbscProvider],
                declarations: mobiscroll_components_1.declarations,
                exports: mobiscroll_components_1.declarations
            },] },
];
/** @nocollapse */
MbscModule.ctorParameters = function () { return []; };
exports.MbscModule = MbscModule;
var MbscProvider_2 = require("./MbscProvider");
exports.MbscProvider = MbscProvider_2.MbscProvider;
var mobiscroll_components_2 = require("./mobiscroll.components");
exports.components = mobiscroll_components_2.declarations;
//# sourceMappingURL=index.js.map