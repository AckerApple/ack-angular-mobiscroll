import { MobiscrollCalendar, MbscModule, MbscProvider } from "./ack-angular-mobiscroll"

import { FormsModule }   from '@angular/forms'

import { ViewChild, Input, Component, NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

//you must have your own copy of mobiscroll
import * as mobiscroll from "./mobiscroll-src-copy/mobiscroll.custom-3.2.3.min.js"
MbscProvider.setMobiscroll(mobiscroll)

import { appTemplate } from "./templates"
@Component({
  selector: 'ack-angular-mobiscroll-app',
  template: appTemplate
}) export class AppComponent {
  iCal0
  iCal1
  iCal2
  iTime
  iDateTime
  options = {
    theme:'mobiscroll',
    display:'center',
    dateFormat:'mm/dd/yy',
    timeFormat:'hh:ii A',
    animate:'slideup',
    controls: ['calendar', 'time'],
    calendarScroll:'vertical',
    buttons:['set','clear','cancel'],
    headerText:'Custom Header Text Here'
  }
  birthday: Date = new Date()

  constructor(public MbscProvider:MbscProvider){
    console.log( 'mobiscroll set test', MbscProvider.getMobiscroll() )
  }

  applyConfig(){
    this.iCal0.applyConfig(this.options)
    this.iCal1.applyConfig(this.options)
    this.iCal2.applyConfig(this.options)
    this.iTime.applyConfig(this.options)
    this.iDateTime.applyConfig(this.options)
  }

  toggleBtn(name){
    const index = this.options.buttons.indexOf(name)
    if(index>=0){
      this.options.buttons.splice(index,1)
    }else{
      this.options.buttons.push(name)
    }
    this.applyConfig()
  }
}

@NgModule({
  imports:[
    BrowserModule,
    FormsModule,
    MbscModule
  ],
  declarations: [
    AppComponent
  ],
  bootstrap:[ AppComponent ]
}) export class AppModule { }