import { Directive, Input, Output, EventEmitter, ElementRef } from "@angular/core"
import { MbscProvider } from "./MbscProvider"

export interface options {
  onSet?:Function,
  //onSetDate?:Function,
  onMonthChange?:Function
}

@Directive({
  selector:'[mbsc-calendar]'
}) export class MobiscrollCalendar {
  holdValue
  inst:{
    setVal:Function,
    _value:string,
    init:Function,
    getVal:Function,
    handlers:{set:Function}
  }
  setter:Function//part of onSet override

  @Input('mbsc-calendar-ref') public ref
  @Output('mbsc-calendar-refChange') public refChange = new EventEmitter()

  @Input() public ngModel
  @Output() public ngModelChange = new EventEmitter()

  @Input('mbsc-calendar') public mbscCalendar
  @Output('mbsc-calendarChange') public mbscCalendarChange = new EventEmitter<Date>()
  
  public options:options={}
  @Input('mbsc-options') public mbscOptions:options = {}
  @Output('mbsc-optionsChange') public mbscOptionsChange = new EventEmitter()

  constructor(public ElementRef:ElementRef, public MbscProvider:MbscProvider){}

  ngOnInit(){
    this.options = Object.assign(this.options, this.mbscOptions)//safe options
    
    const orgOnMonthChange = this.options.onMonthChange
    this.options.onMonthChange = (event, inst)=>{
      this.holdValue = event
      if(orgOnMonthChange)orgOnMonthChange()
    }

    // TODO : Find better way to tap into onSet event without overriding settings onSetDate
    const orgOnSet = this.mbscOptions.onSet
    this.setter = this.options.onSet = (event, inst)=>{
      if(orgOnSet)orgOnSet(event, inst)

      if(this.holdValue){
        let newValue = this.inst.getVal()
        if(newValue && newValue.constructor==Date){        
          newValue = new Date(newValue.setFullYear(this.holdValue.year))
          newValue = new Date(newValue.setMonth(this.holdValue.month))
          delete this.holdValue

          return this.updateVal(newValue)
        }
      }

      this.updateVal( this.inst.getVal() )
      /*
      setTimeout(()=>{
        this.updateModel()
        setTimeout(()=>this.updateDisplay(), 0)
      }, 0)*/
    }

    this.inst = this.createInst()
    this.inst.setVal( this.getValue() )

    //allow angular finish digest cycle. Avoid Expression has changed error
    setTimeout(()=>this.refChange.emit( this.ref=this ), 0)
  }

  getValue(){
    if(this.mbscCalendar && this.mbscCalendar.constructor==Date){
      return this.mbscCalendar
    }

    if(this.ngModel){
      return this.ngModel
    }

    return this.mbscCalendar
  }

  createInst(){
    return this.MbscProvider.getMobiscroll().calendar(this.ElementRef.nativeElement, this.options)
  }

  updateVal(value?){
    value = value || this.getValue()
    
    this.inst.setVal( value )

    setTimeout(()=>{
      this.updateModel(value)
      setTimeout(()=>this.updateDisplay(), 0)
    }, 0)
  }

  updateDisplay(){
    //this.mbscCalendar = this.inst.getVal()//event.valueText
    //this.mbscCalendarChange.emit( this.mbscCalendar )
    this.ElementRef.nativeElement.value = this.inst._value
    //this.updateModel()
  }

  updateModel(date?){
    date = this.ngModel = this.mbscCalendar = date || this.getValue()
    this.mbscCalendarChange.emit( date )
    this.ngModelChange.emit( date )
    /*setTimeout(()=>{
      this.ElementRef.nativeElement.value=this.inst._value
    }, 0)*/
  }

  ngOnChanges(changes){
    if(!this.inst)return

    if(changes.mbscCalendar && changes.mbscCalendar.currentValue!=changes.mbscCalendar.previousValue){
      //this.inst.setVal( changes.mbscCalendar.currentValue )
      //this.updateModel()
      if(changes.mbscCalendar.currentValue != this.inst.getVal()){
        this.inst.setVal(changes.mbscCalendar.currentValue)
      }
      setTimeout(()=>this.updateDisplay(), 0)
    }

    if(changes.ngModel && changes.ngModel.currentValue!=changes.ngModel.previousValue){
      this.updateVal( changes.ngModel.currentValue )
      //this.mbscCalendar = changes.ngModel.currentValue
      //this.mbscCalendarChange.emit( this.mbscCalendar )
      //this.inst.setVal( changes.ngModel.currentValue )
      /*setTimeout(()=>{
        this.ElementRef.nativeElement.value=this.inst._value
      }, 0)*/
    }

    if(changes.mbscOptions){
      this.applyConfig( changes.mbscOptions.currentValue )
    }
  }

  applyConfig(config){
    this.inst.init( Object.assign(this.options, config, {onSet:this.setter}) )
  }

  ngAfterViewInit(){
    setTimeout(()=>this.updateVal(), 0)
  }
}

@Directive({
  selector:'[mbsc-date]'
}) export class MobiscrollDate extends MobiscrollCalendar {
  @Input('mbsc-date-ref') public ref
  @Output('mbsc-date-refChange') public refChange = new EventEmitter()

  @Input('mbsc-date') public mbscCalendar
  @Output('mbsc-dateChange') public mbscCalendarChange = new EventEmitter<Date>()

  createInst(){
    return this.MbscProvider.getMobiscroll().date(this.ElementRef.nativeElement, this.options)
  }
}

@Directive({
  selector:'[mbsc-datetime]'
}) export class MobiscrollDateTime extends MobiscrollCalendar {
  @Input('mbsc-datetime-ref') public ref
  @Output('mbsc-datetime-refChange') public refChange = new EventEmitter()

  @Input('mbsc-datetime') public mbscCalendar
  @Output('mbsc-datetimeChange') public mbscCalendarChange = new EventEmitter<Date>()

  createInst(){
    return this.MbscProvider.getMobiscroll().datetime(this.ElementRef.nativeElement, this.options)
  }
}

@Directive({
  selector:'[mbsc-time]'
}) export class MobiscrollTime extends MobiscrollCalendar {
  @Input('mbsc-time-ref') public ref
  @Output('mbsc-time-refChange') public refChange = new EventEmitter()

  @Input('mbsc-time') public mbscCalendar
  @Output('mbsc-timeChange') public mbscCalendarChange = new EventEmitter<Date>()

  createInst(){
    return this.MbscProvider.getMobiscroll().time(this.ElementRef.nativeElement, this.options)
  }
}

export const declarations = [
  MobiscrollCalendar,
  MobiscrollDate,
  MobiscrollDateTime,
  MobiscrollTime
]