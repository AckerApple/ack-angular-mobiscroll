"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var memory = { mobiscroll: window['mobiscroll'] };
var MbscProvider = (function () {
    function MbscProvider() {
        if (memory.mobiscroll) {
            this.getMobiscroll = alwaysGetMobiscroll;
        }
    }
    MbscProvider.setMobiscroll = function (mobiscroll) {
        memory.mobiscroll = mobiscroll;
    };
    MbscProvider.prototype.getMobiscroll = function () {
        if (memory.mobiscroll) {
            this.getMobiscroll = alwaysGetMobiscroll;
            return memory.mobiscroll;
        }
        throw new Error('The client-side library Mobiscroll, has not been defined in ' + this.constructor.name);
    };
    return MbscProvider;
}());
MbscProvider.decorators = [
    { type: core_1.Injectable },
];
/** @nocollapse */
MbscProvider.ctorParameters = function () { return []; };
exports.MbscProvider = MbscProvider;
function alwaysGetMobiscroll() {
    return memory.mobiscroll;
}
exports.alwaysGetMobiscroll = alwaysGetMobiscroll;
//# sourceMappingURL=MbscProvider.js.map