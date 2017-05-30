import { MbscModule, MbscProvider } from "./ack-angular-mobiscroll"
import * as mobiscroll from "./mobiscroll-src-copy/mobiscroll.custom-3.2.0.min.js"

import { FormsModule }   from '@angular/forms'

import { Component, NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

MbscProvider.setMobiscroll(mobiscroll)

@Component({
  selector: 'my-example-0',
  template: `<input [(ngModel)]="birthday" mbsc-calendar /> - birthday : {{ birthday | date : 'MM/dd/yy' }}`
})
export class MyExampleComponent0 {
  birthday: Date = new Date()
}

@Component({
  selector: 'my-example-1',
  template: `<input [(mbsc-calendar)]="birthday" /> - birthday : {{ birthday | date : 'MM/dd/yy' }}`
})
export class MyExampleComponent1 {
  public birthday: Date = new Date( new Date().setHours( new Date().getHours()-24 ) )
}

@Component({
  selector: 'my-example-2',
  template: `<input [(ngModel)]="birthday" mbsc-calendar [mbsc-options]="myBirthdaySettings" /> - birthday : {{ birthday | date : 'MM/dd/yy' }}`
})
export class MyExampleComponent2 {
  birthday: Date = new Date( new Date().setHours( new Date().getHours()-48 ) )
  myBirthdaySettings: any = {
    theme: 'ios',
    display: 'bottom'
  }
}

const appTemplate=`
<h2>mbsc-calendar</h2>
<h3>my-example-0</h3>
<my-example-0></my-example-0>
<hr />
<h3>my-example-1</h3>
<my-example-1></my-example-1>
<hr />
<h3>my-example-2</h3>
<my-example-2></my-example-2>
`
@Component({
  selector: 'ack-angular-mobiscroll-app',
  template: appTemplate
}) export class AppComponent {
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