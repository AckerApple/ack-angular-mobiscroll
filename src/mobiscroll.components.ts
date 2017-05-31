import { Directive, Input, Output, EventEmitter, ElementRef } from "@angular/core"
import { MbscProvider } from "./MbscProvider"

@Directive({
  selector:'[mbsc-calendar]'
}) export class MobiscrollCalendar {
  public inst:{
    setVal:Function,
    _value:string,
    init:Function,
    getVal:Function,
    handlers:{set:Function}
  }
  public setter:Function//part of onSet override

  @Input('mbsc-calendar-ref') public ref
  @Output('mbsc-calendar-refChange') public refChange = new EventEmitter()

  @Input() public ngModel
  @Output() public ngModelChange = new EventEmitter()

  @Input('mbsc-calendar') public mbscCalendar
  @Output('mbsc-calendarChange') public mbscCalendarChange = new EventEmitter<Date>()
  
  public options:{onSet?:Function}={}
  @Input('mbsc-options') public mbscOptions:{onSet?:Function} = {}
  @Output('mbsc-optionsChange') public mbscOptionsChange = new EventEmitter()

  constructor(public ElementRef:ElementRef, public MbscProvider:MbscProvider){}

  ngOnInit(){
    this.options = Object.assign(this.options, this.mbscOptions)//safe options
    const orgOnSet = this.mbscOptions.onSet
    
    // TODO : Find better way to tap into onSet event without overriding settings onSet
    this.setter = this.options.onSet = (event, inst)=>{
      console.log('faq')
      if(orgOnSet)orgOnSet(event, inst)
      this.updateDisplay()
      console.log('set', this.constructor.name)
    }

    this.inst = this.createInst()
    this.inst.setVal( this.mbscCalendar || this.ngModel )

    //allow angular finish digest cycle. Avoid Expression has changed error
    setTimeout(()=>this.refChange.emit( this.ref=this ), 0)
  }

  createInst(){
    return this.MbscProvider.getMobiscroll().calendar(this.ElementRef.nativeElement, this.options)
  }

  updateVal(){
    this.inst.setVal( this.mbscCalendar || this.ngModel )
    setTimeout(()=>this.updateDisplay(),0)
  }

  updateDisplay(){
    this.mbscCalendar = this.inst.getVal()//event.valueText
    this.mbscCalendarChange.emit( this.mbscCalendar )

    this.ElementRef.nativeElement.value = this.inst._value
    this.updateModel()
  }

  updateModel(){
    this.ngModelChange.emit( this.ngModel = this.mbscCalendar )
    setTimeout(()=>{
      this.ElementRef.nativeElement.value=this.inst._value
    }, 0)
  }

  ngOnChanges(changes){
    if(!this.inst)return

    if(changes.mbscCalendar && changes.mbscCalendar.currentValue!=changes.mbscCalendar.previousValue){
      this.inst.setVal( changes.mbscCalendar.currentValue )
      this.updateModel()
    }

    if(changes.ngModel && changes.ngModel.currentValue!=changes.ngModel.previousValue){
      this.mbscCalendar = changes.ngModel.currentValue
      this.mbscCalendarChange.emit( this.mbscCalendar )
      this.inst.setVal( this.mbscCalendar )
      setTimeout(()=>{
        this.ElementRef.nativeElement.value=this.inst._value
      }, 0)
    }

    if(changes.mbscOptions){
      this.applyConfig( changes.mbscOptions.currentValue )
    }
  }

  applyConfig(config){
    this.inst.init( Object.assign(this.options, config, {onSet:this.setter}) )
    //this.updateVal(false)
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