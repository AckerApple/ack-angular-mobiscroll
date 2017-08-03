import { Directive, Input, Output, EventEmitter, ElementRef } from "@angular/core"
import { MbscProvider } from "./MbscProvider"

export interface options {
  onSet?:Function,
  //onSetDate?:Function,
  onMonthChange?:Function
}

export interface calInst{
  setDate:Function,
  //setVal:Function,
  _value:string,
  init:Function,
  getVal:Function,
  handlers:{set:Function}
}

@Directive({
  selector:'[mbsc-calendar]',
  exportAs: 'mobiscroll'
}) export class MobiscrollCalendar {
  holdValue
  instance:calInst
  setter:Function//part of onSet override

  @Input('mbsc-calendar-ref') ref
  @Output('mbsc-calendar-refChange') refChange = new EventEmitter()

  @Input() ngModel
  @Output() ngModelChange = new EventEmitter()

  @Input('mbsc-calendar') mbscCalendar
  @Output('mbsc-calendarChange') mbscCalendarChange = new EventEmitter<Date>()
  
  options:options={}
  @Input('mbsc-options') mbscOptions:options = {}
  @Output('mbsc-optionsChange') mbscOptionsChange = new EventEmitter()

  constructor(public ElementRef:ElementRef, public MbscProvider:MbscProvider){}

  setInstVal(val){
    val = new Date(val)
    if(val.toString()=='Invalid Date')return
    this.instance.setDate( new Date(val) )
    //this.instance.setVal()
  }

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
        let newValue = this.instance.getVal()
        if(newValue && newValue.constructor==Date){        
          newValue = new Date(newValue.setFullYear(this.holdValue.year))
          newValue = new Date(newValue.setMonth(this.holdValue.month))
          delete this.holdValue

          return this.updateVal(newValue)
        }
      }

      this.updateVal( this.instance.getVal() )
    }

    this.instance = this.createInst()
    //this.ElementRef.nativeElement.instance = this.instance
    this.setInstVal( this.getValue() )

    //allow angular finish digest cycle. Avoid Expression has changed error
    setTimeout(()=>this.refChange.emit( this ), 0)
  }

  getValue(){
    if(this.mbscCalendar && new Date(this.mbscCalendar).toString()!='Invalid Date'){
      return this.mbscCalendar
    }

    if(this.ngModel){
      return this.ngModel
    }

    /* Dont do this. Mobiscroll may have default date but that doesnt mean use it as a value
    if(this.instance){
      return this.instance.getDate()
    }*/

    return this.isValValue(this.mbscCalendar) ? this.mbscCalendar : null
  }

  createInst(){
    return this.MbscProvider.getMobiscroll().calendar(this.ElementRef.nativeElement, this.options)
  }

  updateVal(value?){
    value = value || this.getValue()
    
    this.setInstVal( value )

    setTimeout(()=>{
      this.updateModel(value)
      setTimeout(()=>this.updateDisplay(), 0)
    }, 0)
  }

  updateDisplay(){
    //this.mbscCalendar = this.instance.getVal()//event.valueText
    //this.mbscCalendarChange.emit( this.mbscCalendar )
    this.ElementRef.nativeElement.value = this.instance._value
    //this.updateModel()
  }

  updateModel(date?){
    date = this.ngModel = this.mbscCalendar = date || this.getValue()
    this.mbscCalendarChange.emit( date )
    this.ngModelChange.emit( date )
    /*setTimeout(()=>{
      this.ElementRef.nativeElement.value=this.instance._value
    }, 0)*/
  }

  isValValue(value){
    return value && value!='mbsc-calendar' && value!='mbscCalendar'
  }

  datesMatch(a, b){
    return a==b || new Date(a).getTime()==new Date(b).getTime()
  }

  ngOnChanges(changes){
    if(!this.instance)return

    if(changes.mbscCalendar && !this.datesMatch(changes.mbscCalendar.currentValue,changes.mbscCalendar.previousValue)){
      const valValue = this.isValValue(changes.mbscCalendar.currentValue)
      if(valValue && changes.mbscCalendar.currentValue != this.instance.getVal()){
        this.setInstVal( changes.mbscCalendar.currentValue )
      }
      if(valValue)setTimeout(()=>this.updateDisplay(), 0)
    }

    if(changes.ngModel && !this.datesMatch(changes.ngModel.currentValue,changes.ngModel.previousValue)){
      this.updateVal( changes.ngModel.currentValue )
      //this.mbscCalendar = changes.ngModel.currentValue
      //this.mbscCalendarChange.emit( this.mbscCalendar )
      //this.instance.setVal( changes.ngModel.currentValue )
      /*setTimeout(()=>{
        this.ElementRef.nativeElement.value=this.instance._value
      }, 0)*/
    }

    if(changes.mbscOptions){
      this.applyConfig( changes.mbscOptions.currentValue )
    }
  }

  applyConfig(config){
    this.instance.init( Object.assign(this.options, config, {onSet:this.setter}) )
  }

  ngAfterViewInit(){
    if(this.isValValue(this.getValue())){
      setTimeout(()=>this.updateVal(), 0)
    }
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