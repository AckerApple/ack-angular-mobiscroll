import { EventEmitter, ElementRef } from "@angular/core";
import { MbscProvider } from "./MbscProvider";
export interface options {
    onSet?: Function;
    onMonthChange?: Function;
}
export declare class MobiscrollCalendar {
    ElementRef: ElementRef;
    MbscProvider: MbscProvider;
    holdValue: any;
    inst: {
        setVal: Function;
        _value: string;
        init: Function;
        getVal: Function;
        handlers: {
            set: Function;
        };
    };
    setter: Function;
    ref: any;
    refChange: EventEmitter<{}>;
    ngModel: any;
    ngModelChange: EventEmitter<{}>;
    mbscCalendar: any;
    mbscCalendarChange: EventEmitter<Date>;
    options: options;
    mbscOptions: options;
    mbscOptionsChange: EventEmitter<{}>;
    constructor(ElementRef: ElementRef, MbscProvider: MbscProvider);
    ngOnInit(): void;
    getValue(): any;
    createInst(): any;
    updateVal(value?: any): void;
    updateDisplay(): void;
    updateModel(date?: any): void;
    ngOnChanges(changes: any): void;
    applyConfig(config: any): void;
    ngAfterViewInit(): void;
}
export declare class MobiscrollDate extends MobiscrollCalendar {
    ref: any;
    refChange: EventEmitter<{}>;
    mbscCalendar: any;
    mbscCalendarChange: EventEmitter<Date>;
    createInst(): any;
}
export declare class MobiscrollDateTime extends MobiscrollCalendar {
    ref: any;
    refChange: EventEmitter<{}>;
    mbscCalendar: any;
    mbscCalendarChange: EventEmitter<Date>;
    createInst(): any;
}
export declare class MobiscrollTime extends MobiscrollCalendar {
    ref: any;
    refChange: EventEmitter<{}>;
    mbscCalendar: any;
    mbscCalendarChange: EventEmitter<Date>;
    createInst(): any;
}
export declare const declarations: typeof MobiscrollCalendar[];
