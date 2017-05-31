export declare class MbscProvider {
    constructor();
    static setMobiscroll(mobiscroll: object): void;
    getMobiscroll(): {
        date: Function;
        datetime: Function;
        time: Function;
        calendar: Function;
    };
}
export declare function alwaysGetMobiscroll(): any;
