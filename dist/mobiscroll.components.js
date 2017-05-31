"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var MbscProvider_1 = require("./MbscProvider");
var MobiscrollCalendar = (function () {
    function MobiscrollCalendar(ElementRef, MbscProvider) {
        this.ElementRef = ElementRef;
        this.MbscProvider = MbscProvider;
        this.refChange = new core_1.EventEmitter();
        this.ngModelChange = new core_1.EventEmitter();
        this.mbscCalendarChange = new core_1.EventEmitter();
        this.options = {};
        this.mbscOptions = {};
        this.mbscOptionsChange = new core_1.EventEmitter();
    }
    MobiscrollCalendar.prototype.ngOnInit = function () {
        var _this = this;
        this.options = Object.assign(this.options, this.mbscOptions); //safe options
        var orgOnSet = this.mbscOptions.onSet;
        // TODO : Find better way to tap into onSet event without overriding settings onSet
        this.setter = this.options.onSet = function (event, inst) {
            console.log('faq');
            if (orgOnSet)
                orgOnSet(event, inst);
            _this.updateDisplay();
            console.log('set', _this.constructor.name);
        };
        this.inst = this.createInst();
        this.inst.setVal(this.mbscCalendar || this.ngModel);
        //allow angular finish digest cycle. Avoid Expression has changed error
        setTimeout(function () { return _this.refChange.emit(_this.ref = _this); }, 0);
    };
    MobiscrollCalendar.prototype.createInst = function () {
        return this.MbscProvider.getMobiscroll().calendar(this.ElementRef.nativeElement, this.options);
    };
    MobiscrollCalendar.prototype.updateVal = function () {
        var _this = this;
        this.inst.setVal(this.mbscCalendar || this.ngModel);
        setTimeout(function () { return _this.updateDisplay(); }, 0);
    };
    MobiscrollCalendar.prototype.updateDisplay = function () {
        this.mbscCalendar = this.inst.getVal(); //event.valueText
        this.mbscCalendarChange.emit(this.mbscCalendar);
        this.ElementRef.nativeElement.value = this.inst._value;
        this.updateModel();
    };
    MobiscrollCalendar.prototype.updateModel = function () {
        var _this = this;
        this.ngModelChange.emit(this.ngModel = this.mbscCalendar);
        setTimeout(function () {
            _this.ElementRef.nativeElement.value = _this.inst._value;
        }, 0);
    };
    MobiscrollCalendar.prototype.ngOnChanges = function (changes) {
        var _this = this;
        if (!this.inst)
            return;
        if (changes.mbscCalendar && changes.mbscCalendar.currentValue != changes.mbscCalendar.previousValue) {
            this.inst.setVal(changes.mbscCalendar.currentValue);
            this.updateModel();
        }
        if (changes.ngModel && changes.ngModel.currentValue != changes.ngModel.previousValue) {
            this.mbscCalendar = changes.ngModel.currentValue;
            this.mbscCalendarChange.emit(this.mbscCalendar);
            this.inst.setVal(this.mbscCalendar);
            setTimeout(function () {
                _this.ElementRef.nativeElement.value = _this.inst._value;
            }, 0);
        }
        if (changes.mbscOptions) {
            this.applyConfig(changes.mbscOptions.currentValue);
        }
    };
    MobiscrollCalendar.prototype.applyConfig = function (config) {
        this.inst.init(Object.assign(this.options, config, { onSet: this.setter }));
        //this.updateVal(false)
    };
    MobiscrollCalendar.prototype.ngAfterViewInit = function () {
        var _this = this;
        setTimeout(function () { return _this.updateVal(); }, 0);
    };
    return MobiscrollCalendar;
}());
MobiscrollCalendar.decorators = [
    { type: core_1.Directive, args: [{
                selector: '[mbsc-calendar]'
            },] },
];
/** @nocollapse */
MobiscrollCalendar.ctorParameters = function () { return [
    { type: core_1.ElementRef, },
    { type: MbscProvider_1.MbscProvider, },
]; };
MobiscrollCalendar.propDecorators = {
    'ref': [{ type: core_1.Input, args: ['mbsc-calendar-ref',] },],
    'refChange': [{ type: core_1.Output, args: ['mbsc-calendar-refChange',] },],
    'ngModel': [{ type: core_1.Input },],
    'ngModelChange': [{ type: core_1.Output },],
    'mbscCalendar': [{ type: core_1.Input, args: ['mbsc-calendar',] },],
    'mbscCalendarChange': [{ type: core_1.Output, args: ['mbsc-calendarChange',] },],
    'mbscOptions': [{ type: core_1.Input, args: ['mbsc-options',] },],
    'mbscOptionsChange': [{ type: core_1.Output, args: ['mbsc-optionsChange',] },],
};
exports.MobiscrollCalendar = MobiscrollCalendar;
var MobiscrollDate = (function (_super) {
    __extends(MobiscrollDate, _super);
    function MobiscrollDate() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.refChange = new core_1.EventEmitter();
        _this.mbscCalendarChange = new core_1.EventEmitter();
        return _this;
    }
    MobiscrollDate.prototype.createInst = function () {
        return this.MbscProvider.getMobiscroll().date(this.ElementRef.nativeElement, this.options);
    };
    return MobiscrollDate;
}(MobiscrollCalendar));
MobiscrollDate.decorators = [
    { type: core_1.Directive, args: [{
                selector: '[mbsc-date]'
            },] },
];
/** @nocollapse */
MobiscrollDate.ctorParameters = function () { return []; };
MobiscrollDate.propDecorators = {
    'ref': [{ type: core_1.Input, args: ['mbsc-date-ref',] },],
    'refChange': [{ type: core_1.Output, args: ['mbsc-date-refChange',] },],
    'mbscCalendar': [{ type: core_1.Input, args: ['mbsc-date',] },],
    'mbscCalendarChange': [{ type: core_1.Output, args: ['mbsc-dateChange',] },],
};
exports.MobiscrollDate = MobiscrollDate;
var MobiscrollDateTime = (function (_super) {
    __extends(MobiscrollDateTime, _super);
    function MobiscrollDateTime() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.refChange = new core_1.EventEmitter();
        _this.mbscCalendarChange = new core_1.EventEmitter();
        return _this;
    }
    MobiscrollDateTime.prototype.createInst = function () {
        return this.MbscProvider.getMobiscroll().datetime(this.ElementRef.nativeElement, this.options);
    };
    return MobiscrollDateTime;
}(MobiscrollCalendar));
MobiscrollDateTime.decorators = [
    { type: core_1.Directive, args: [{
                selector: '[mbsc-datetime]'
            },] },
];
/** @nocollapse */
MobiscrollDateTime.ctorParameters = function () { return []; };
MobiscrollDateTime.propDecorators = {
    'ref': [{ type: core_1.Input, args: ['mbsc-datetime-ref',] },],
    'refChange': [{ type: core_1.Output, args: ['mbsc-datetime-refChange',] },],
    'mbscCalendar': [{ type: core_1.Input, args: ['mbsc-datetime',] },],
    'mbscCalendarChange': [{ type: core_1.Output, args: ['mbsc-datetimeChange',] },],
};
exports.MobiscrollDateTime = MobiscrollDateTime;
var MobiscrollTime = (function (_super) {
    __extends(MobiscrollTime, _super);
    function MobiscrollTime() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.refChange = new core_1.EventEmitter();
        _this.mbscCalendarChange = new core_1.EventEmitter();
        return _this;
    }
    MobiscrollTime.prototype.createInst = function () {
        return this.MbscProvider.getMobiscroll().time(this.ElementRef.nativeElement, this.options);
    };
    return MobiscrollTime;
}(MobiscrollCalendar));
MobiscrollTime.decorators = [
    { type: core_1.Directive, args: [{
                selector: '[mbsc-time]'
            },] },
];
/** @nocollapse */
MobiscrollTime.ctorParameters = function () { return []; };
MobiscrollTime.propDecorators = {
    'ref': [{ type: core_1.Input, args: ['mbsc-time-ref',] },],
    'refChange': [{ type: core_1.Output, args: ['mbsc-time-refChange',] },],
    'mbscCalendar': [{ type: core_1.Input, args: ['mbsc-time',] },],
    'mbscCalendarChange': [{ type: core_1.Output, args: ['mbsc-timeChange',] },],
};
exports.MobiscrollTime = MobiscrollTime;
exports.declarations = [
    MobiscrollCalendar,
    MobiscrollDate,
    MobiscrollDateTime,
    MobiscrollTime
];
//# sourceMappingURL=mobiscroll.components.js.map