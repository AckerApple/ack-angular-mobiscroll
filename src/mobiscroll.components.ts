import { Directive, Input, Output, EventEmitter, ElementRef } from "@angular/core"
import { MbscProvider } from "./MbscProvider"

@Directive({
  selector:'[mbsc-calendar]'
}) export class MobiscrollDate {
  public inst
  @Input() public ngModel
  @Output() public ngModelChange = new EventEmitter()

  @Input('mbsc-calendar') public mbscCalendar
  @Output('mbsc-calendarChange') public mbscCalendarChange = new EventEmitter<Date>()
  @Input('mbsc-options') public mbscOptions:{onSet?:Function} = {}

  constructor(public ElementRef:ElementRef, public MbscProvider:MbscProvider){}

  ngOnInit(){
    const orgOnSet = this.mbscOptions.onSet
    
    this.mbscOptions.onSet = (event, inst)=>{
      if(orgOnSet)orgOnSet(event, inst)
      
      this.mbscCalendar = inst.getVal()//event.valueText
      this.mbscCalendarChange.emit( this.mbscCalendar )

      this.ngModelChange.emit( this.ngModel=this.mbscCalendar )
      setTimeout(()=>this.ElementRef.nativeElement.value=inst._value, 0)
    }

    this.inst = this.MbscProvider.getMobiscroll().date(this.ElementRef.nativeElement, this.mbscOptions)

    //this.updateVal()
  }

  updateVal(){
    this.inst.setVal( this.mbscCalendar || this.ngModel )
    this.ElementRef.nativeElement.value = this.inst._value
  }

  ngOnChanges(changes){
    if(this.inst && changes.mbscCalendar && changes.mbscCalendar.currentValue!=changes.mbscCalendar.previousValue){
      this.updateVal()
    }
  }

  ngAfterViewInit(){
    setTimeout(()=>this.updateVal(), 0)
  }
}

export const declarations = [
  MobiscrollDate
]