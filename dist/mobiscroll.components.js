"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var MbscProvider_1 = require("./MbscProvider");
var rx = require("rxjs");
var MobiscrollDate = (function () {
    function MobiscrollDate(ElementRef, MbscProvider) {
        this.ElementRef = ElementRef;
        this.MbscProvider = MbscProvider;
        this.ngModelChange = new core_1.EventEmitter();
        this.mbscCalendarChange = new core_1.EventEmitter();
        this.mbscOptions = {};
        this.mbscOptionsChange = new core_1.EventEmitter();
    }
    MobiscrollDate.prototype.ngOnInit = function () {
        var _this = this;
        var orgOnSet = this.mbscOptions.onSet;
        this.setter = this.mbscOptions.onSet = function (event, inst) {
            if (orgOnSet)
                orgOnSet(event, inst);
            _this.mbscCalendar = inst.getVal(); //event.valueText
            _this.mbscCalendarChange.emit(_this.mbscCalendar);
            _this.ngModelChange.emit(_this.ngModel = _this.mbscCalendar);
            setTimeout(function () { return _this.ElementRef.nativeElement.value = inst._value; }, 0);
        };
        this.inst = this.MbscProvider.getMobiscroll().date(this.ElementRef.nativeElement, this.mbscOptions);
        console.log('this.inst', this.inst);
        //this.updateVal()
        this.observeOptions();
    };
    MobiscrollDate.prototype.observeOptions = function () {
        var source = rx.Observable.of(this.mbscOptions).map(function (o) { return JSON.stringify(o); });
        /*
            var source = rx.Observable.from([this.mbscOptions]).flatMap(function(item) {
              return item
              return rx.Observable.ofObjectChanges(item);
            })
        */
        /*
        var source = rx.Observable
        .ofObjectChanges( [this.mbscOptions] )
        .map(function(x) {
          return JSON.stringify(x);
        })*/
        source.subscribe(function (x) { return console.log('x', x); });
    };
    /*ngDoCheck(){
      console.log(88)
    }*/
    MobiscrollDate.prototype.updateVal = function () {
        this.inst.setVal(this.mbscCalendar || this.ngModel);
        this.ElementRef.nativeElement.value = this.inst._value;
    };
    MobiscrollDate.prototype.ngOnChanges = function (changes) {
        console.log(0);
        if (!this.inst)
            return;
        console.log(1);
        if (changes.mbscCalendar && changes.mbscCalendar.currentValue != changes.mbscCalendar.previousValue) {
            this.updateVal();
        }
        console.log(2);
        if (changes.mbscOptions) {
            console.log('reinit');
            this.inst.init(Object.assign(changes.mbscOptions.currentValue, { onSet: this.setter }));
            this.observeOptions();
        }
        console.log('changes', changes);
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
    'mbscOptionsChange': [{ type: core_1.Output, args: ['mbsc-optionsChange',] },],
};
exports.MobiscrollDate = MobiscrollDate;
exports.declarations = [
    MobiscrollDate
];
//# sourceMappingURL=mobiscroll.components.js.map