# ack-angular-mobiscroll
Angular wrapper for Mobiscroll. Mimics the paid version of Mobiscroll's Angular wrapper. Does NOT include mobiscroll framework.

### Table of Contents
- [Installation](#installation)
- [Importing](#Importing)
- [Supported Modules](#supported-modules)
  - [Calendar](#calendar)
- [History](#history)

## Installation
```bash
npm install ack-angular-mobiscroll --save-dev
```

> Reminder, you will need to have your own copy of the mobiscroll framework.
>> [Download mobiscroll](https://download.mobiscroll.com), as seen in image below
![mobiscroll download](https://ackerapple.github.io/ack-angular-mobiscroll/download.png)

## Importing
How to get using ack-angular-mobiscroll

```javascript
import { Component, NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { MbscModule, MbscProvider } from "ack-angular-mobiscroll"

import * as mobiscroll from "./my-mobiscroll-paid-copy"

//union of mobiscroll-to-wrapper
MbscProvider.setMobiscroll(mobiscroll)

@Component({
  selector: 'my-app',
  template: '<input type="datetime" mbsc-calendar />'
}) export class AppComponent {}

@NgModule({
  imports:[
    BrowserModule,
    MbscModule
  ],
  declarations: [
    AppComponent
  ],
  bootstrap:[ AppComponent ]
}) export class AppModule { }
```

> CSS Files are a seperate topic.
>> Please ensure, at runtime, you have `linked` to mobiscroll css files

## Supported Modules
Currently, only the Calendar module has been replicated from mobiscroll.

### Calendar
Create a calendar with default functionality

[Mobiscroll's Angular Calendar](https://docs.mobiscroll.com/3-2-0/angular/calendar)

Here is an example for the calendar directive with ngModel
```javascript
@Component({
    selector: 'my-example',
    template: `<input [(ngModel)]="birthday" mbsc-calendar />`
})
export class MyExampleComponent {
    birthday: Date = new Date();
}
```

Example for the calendar directive without ngModel
```javascript
@Component({
    selector: 'my-example',
    template: `<input [(mbsc-calendar)]="birthday" />`
})
export class MyExampleComponent {
    birthday: Date = new Date();
}
```

Example for the calendar directive with additional settings
```javascript
@Component({
  selector: 'my-example',
  template: `<input [(ngModel)]="birthday" mbsc-calendar [mbsc-options]="myBirthdaySettings" />`
})
export class MyExampleComponent {
  birthday: Date = new Date();
  myBirthdaySettings: any = {
    theme: 'ios',
    display: 'bottom'
  };
}
```

## History

5/30/17 - I, Acker Apple, have only ever used the Calendar module of Mobiscroll. I disagree with Mobiscroll's approach to many things, especially it's paid platform. The mobiscroll paid platform, which I've paid into, requires you to [download](https://download.mobiscroll.com) file updates via a login (no npm update commands). Mobiscroll does have an [npmjs.org](npmjs.org) package and github page but they are limited incomplete versions of the paid Mobiscroll code.