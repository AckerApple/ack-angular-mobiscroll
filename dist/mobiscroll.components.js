"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var MbscProvider_1 = require("./MbscProvider");
var MobiscrollDate = (function () {
    function MobiscrollDate(ElementRef, MbscProvider) {
        this.ElementRef = ElementRef;
        this.MbscProvider = MbscProvider;
        this.ngModelChange = new core_1.EventEmitter();
        this.mbscCalendarChange = new core_1.EventEmitter();
        this.mbscOptions = {};
    }
    MobiscrollDate.prototype.ngOnInit = function () {
        var _this = this;
        var orgOnSet = this.mbscOptions.onSet;
        this.mbscOptions.onSet = function (event, inst) {
            if (orgOnSet)
                orgOnSet(event, inst);
            _this.mbscCalendar = inst.getVal(); //event.valueText
            _this.mbscCalendarChange.emit(_this.mbscCalendar);
            _this.ngModelChange.emit(_this.ngModel = _this.mbscCalendar);
            setTimeout(function () { return _this.ElementRef.nativeElement.value = inst._value; }, 0);
        };
        this.inst = this.MbscProvider.getMobiscroll().date(this.ElementRef.nativeElement, this.mbscOptions);
        //this.updateVal()
    };
    MobiscrollDate.prototype.updateVal = function () {
        this.inst.setVal(this.mbscCalendar || this.ngModel);
        this.ElementRef.nativeElement.value = this.inst._value;
    };
    MobiscrollDate.prototype.ngOnChanges = function (changes) {
        if (this.inst && changes.mbscCalendar && changes.mbscCalendar.currentValue != changes.mbscCalendar.previousValue) {
            this.updateVal();
        }
    };
    MobiscrollDate.prototype.ngAfterViewInit = function () {
        var _this = this;
        setTimeout(function () { return _this.updateVal(); }, 0);
    };
    return MobiscrollDate;
}());
MobiscrollDate.decorators = [
    { type: core_1.Directive, args: [{
                selector: '[mbsc-calendar]'
            },] },
];
/** @nocollapse */
MobiscrollDate.ctorParameters = function () { return [
    { type: core_1.ElementRef, },
    { type: MbscProvider_1.MbscProvider, },
]; };
MobiscrollDate.propDecorators = {
    'ngModel': [{ type: core_1.Input },],
    'ngModelChange': [{ type: core_1.Output },],
    'mbscCalendar': [{ type: core_1.Input, args: ['mbsc-calendar',] },],
    'mbscCalendarChange': [{ type: core_1.Output, args: ['mbsc-calendarChange',] },],
    'mbscOptions': [{ type: core_1.Input, args: ['mbsc-options',] },],
};
exports.MobiscrollDate = MobiscrollDate;
exports.declarations = [
    MobiscrollDate
];
//# sourceMappingURL=mobiscroll.components.js.map