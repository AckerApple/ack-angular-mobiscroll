import { Directive, Input, Output, EventEmitter, ElementRef } from "@angular/core"
import { MbscProvider } from "./MbscProvider"
import * as rx from "rxjs"

@Directive({
  selector:'[mbsc-calendar]'
}) export class MobiscrollDate {
  public inst:{setVal:Function, _value:string, init:Function}
  public setter:Function

  @Input() public ngModel
  @Output() public ngModelChange = new EventEmitter()

  @Input('mbsc-calendar') public mbscCalendar
  @Output('mbsc-calendarChange') public mbscCalendarChange = new EventEmitter<Date>()
  
  @Input('mbsc-options') public mbscOptions:{onSet?:Function} = {}
  @Output('mbsc-optionsChange') public mbscOptionsChange = new EventEmitter()

  constructor(public ElementRef:ElementRef, public MbscProvider:MbscProvider){}

  ngOnInit(){
    const orgOnSet = this.mbscOptions.onSet
    
    this.setter = this.mbscOptions.onSet = (event, inst)=>{
      if(orgOnSet)orgOnSet(event, inst)
      
      this.mbscCalendar = inst.getVal()//event.valueText
      this.mbscCalendarChange.emit( this.mbscCalendar )

      this.ngModelChange.emit( this.ngModel=this.mbscCalendar )
      setTimeout(()=>this.ElementRef.nativeElement.value=inst._value, 0)
    }

    this.inst = this.MbscProvider.getMobiscroll().date(this.ElementRef.nativeElement, this.mbscOptions)
console.log('this.inst',this.inst)
    //this.updateVal()

    this.observeOptions()
  }

  observeOptions(){
var source = rx.Observable.of(this.mbscOptions).map(o => JSON.stringify(o))
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

source.subscribe(x=>console.log('x',x))

  }

  /*ngDoCheck(){
    console.log(88)
  }*/

  updateVal(){
    this.inst.setVal( this.mbscCalendar || this.ngModel )
    this.ElementRef.nativeElement.value = this.inst._value
  }

  ngOnChanges(changes){
console.log(0)
    if(!this.inst)return

console.log(1)
    if(changes.mbscCalendar && changes.mbscCalendar.currentValue!=changes.mbscCalendar.previousValue){
      this.updateVal()
    }

console.log(2)
    if(changes.mbscOptions){
console.log('reinit')
      this.inst.init( Object.assign(changes.mbscOptions.currentValue, {onSet:this.setter}) )
      this.observeOptions()
    }

    console.log('changes',changes)
  }

  ngAfterViewInit(){
    setTimeout(()=>this.updateVal(), 0)
  }
}

export const declarations = [
  MobiscrollDate
]