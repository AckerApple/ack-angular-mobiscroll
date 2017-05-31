import { EventEmitter, ElementRef } from "@angular/core";
import { MbscProvider } from "./MbscProvider";
export declare class MobiscrollDate {
    ElementRef: ElementRef;
    MbscProvider: MbscProvider;
    inst: {
        setVal: Function;
        _value: string;
        init: Function;
    };
    setter: Function;
    ngModel: any;
    ngModelChange: EventEmitter<{}>;
    mbscCalendar: any;
    mbscCalendarChange: EventEmitter<Date>;
    mbscOptions: {
        onSet?: Function;
    };
    mbscOptionsChange: EventEmitter<{}>;
    constructor(ElementRef: ElementRef, MbscProvider: MbscProvider);
    ngOnInit(): void;
    observeOptions(): void;
    updateVal(): void;
    ngOnChanges(changes: any): void;
    ngAfterViewInit(): void;
}
export declare const declarations: typeof MobiscrollDate[];