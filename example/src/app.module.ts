import { MbscModule, MbscProvider } from "./ack-angular-mobiscroll"
import * as mobiscroll from "./mobiscroll-src-copy/mobiscroll.custom-3.2.0.min.js"

import { FormsModule }   from '@angular/forms'

import { Input, Component, NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

MbscProvider.setMobiscroll(mobiscroll)

@Component({
  selector: 'my-example-0',
  template: `<input [(ngModel)]="birthday" mbsc-calendar [mbsc-options]="{theme:theme}" /> - birthday : {{ birthday | date : 'MM/dd/yy' }}`
})
export class MyExampleComponent0 {
  @Input() theme
  birthday: Date = new Date()
}

@Component({
  selector: 'my-example-1',
  template: `<input [(mbsc-calendar)]="birthday" [mbsc-options]="{theme:theme}" /> - birthday : {{ birthday | date : 'MM/dd/yy' }}`
})
export class MyExampleComponent1 {
  @Input() theme
  public birthday: Date = new Date( new Date().setHours( new Date().getHours()-24 ) )
}

@Component({
  selector: 'my-example-2',
  template: `<input [(ngModel)]="birthday" mbsc-calendar [mbsc-options]="myBirthdaySettings" /> - birthday : {{ birthday | date : 'MM/dd/yy' }}`
})
export class MyExampleComponent2 {
  @Input() theme
  birthday: Date = new Date( new Date().setHours( new Date().getHours()-48 ) )
  myBirthdaySettings: {theme?:string, display?:string} = {display: 'bottom'}

  ngOnChanges(changes){
    if(changes.theme.currentValue != changes.theme.previousValue){
      this.myBirthdaySettings.theme = this.theme
      console.log('this.theme', this.theme)
    }
  }
}

const appTemplate=`
<h2>mbsc-calendar</h2>

Select Theme
<select [(ngModel)]="theme">
  <option value=""></option>
  <option value="ios">ios</option>
</select>
<!--
<h3>my-example-0</h3>
<my-example-0 [theme]="theme"></my-example-0>
<hr />

<h3>my-example-1</h3>
<my-example-1 [theme]="theme"></my-example-1>
<hr />
-->
<h3>my-example-2</h3>
<my-example-2 [theme]="theme"></my-example-2>
`
@Component({
  selector: 'ack-angular-mobiscroll-app',
  template: appTemplate
}) export class AppComponent {
  public theme:string = 'ios'

  constructor(public MbscProvider:MbscProvider){
    console.log( 'mobiscroll set test', MbscProvider.getMobiscroll() )
  }
}

@NgModule({
  imports:[
    BrowserModule,
    FormsModule,
    MbscModule
  ],
  declarations: [
    AppComponent,
    MyExampleComponent0,
    MyExampleComponent1,
    MyExampleComponent2
  ],
  bootstrap:[ AppComponent ]
}) export class AppModule { }