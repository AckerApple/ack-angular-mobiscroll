export const appTemplate = `
<h2>
  <a href="https://docs.mobiscroll.com/3-2-0/angular/calendar">mbsc-calendar</a>
  &nbsp;
  <a href="https://docs.mobiscroll.com/3-2-0/angular/datetime">mbsc-date</a>
  &nbsp;
  <a href="https://docs.mobiscroll.com/3-2-0/angular/datetime">mbsc-time</a>
  &nbsp;
  <a href="https://docs.mobiscroll.com/3-2-0/angular/datetime">mbsc-datetime</a>
</h2>

<h3>Examples</h3>

<div style="padding:1em;display:inline-block;">
  <strong style="display:block">ngModel mbsc-calendar</strong>
  <input [(ngModel)]="birthday" mbsc-calendar #myVariable="mobiscroll" [(mbsc-calendar-ref)]="iCal0" [mbsc-options]="options" />
</div>

<div style="padding:1em;display:inline-block;">
  <strong style="display:block">mbsc-calendar</strong>
  <input [(mbsc-calendar)]="birthday" [(mbsc-calendar-ref)]="iCal1" [mbsc-options]="options" />
</div>

<div style="padding:1em;display:inline-block;">
  <strong style="display:block">mbsc-date</strong>
  <input [(mbsc-date)]="birthday" [(mbsc-date-ref)]="iCal2" [mbsc-options]="options" />
</div>

<div style="padding:1em;display:inline-block;">
  <strong style="display:block">mbsc-time</strong>
  <input [(mbsc-time)]="birthday" [(mbsc-time-ref)]="iTime" [mbsc-options]="options" />
</div>

<div style="padding:1em;display:inline-block;">
  <strong style="display:block">mbsc-datetime</strong>
  <input [(mbsc-datetime)]="birthday" [(mbsc-datetime-ref)]="iDateTime" [mbsc-options]="options" />
</div>

<div style="padding:1em;display:inline-block;">
  <strong style="display:block">Date Value</strong>
  {{ birthday }}
</div>

<h3>Options</h3>
<p>
  <a href="https://docs.mobiscroll.com/3-2-0/angular/calendar#options">more about options here</a>
</p>

<div style="padding:1em;display:inline-block;">
  <strong style="display:block">Format</strong>
  <input [(ngModel)]="options.dateFormat" (keyup)="applyConfig()" />
</div>

<div style="padding:1em;display:inline-block;">
  <strong style="display:block">Select Theme</strong>
  <select [(ngModel)]="options.theme" (change)="applyConfig()">
    <option value=""></option>
    <option value="ios">ios</option>
    <option value="android-holo">android-holo</option>
    <option value="android-holo-light">android-holo-light</option>
    <option value="bootstrap">bootstrap</option>
    <option value="ios">ios</option>
    <option value="material">material</option>
    <option value="material-dark">material-dark</option>
    <option value="jqm">jqm</option>
    <option value="mobiscroll">mobiscroll</option>
    <option value="mobiscroll-dark">mobiscroll-dark</option>
    <option value="wp">wp</option>
    <option value="wp-light">wp-light</option>
  </select>
</div>

<div style="padding:1em;display:inline-block;">
  <strong style="display:block">Select Display</strong>
  <select [(ngModel)]="options.display" (change)="applyConfig()">
    <option value="center">center</option>
    <option value="inline">inline</option>
    <option value="bubble">bubble</option>
    <option value="top">top</option>
    <option value="bottom">bottom</option>
  </select>
</div>

<div style="padding:1em;display:inline-block;">
  <strong style="display:block">Select Display</strong>
  <select [(ngModel)]="options.animate" (change)="applyConfig()">
    <option value=""></option>
    <option value="fade">fade</option>
    <option value="flip">flip</option>
    <option value="pop">pop</option>
    <option value="swing">swing</option>
    <option value="slidevertical">slidevertical</option>
    <option value="slidehorizontal">slidehorizontal</option>
    <option value="slidedown">slidedown</option>
    <option value="slideup">slideup</option>
  </select>
</div>

<div style="padding:1em;display:inline-block;">
  <strong style="display:block">Select Layout</strong>
  <select [(ngModel)]="options.layout" (change)="applyConfig()">
    <option value=""></option>
    <option value="fixed">fixed</option>
    <option value="liquid">liquid</option>
  </select>
</div>

<h3>Usage</h3>
The following usage example consists of two files:

<ul>
  <li>app.module.ts</li>
  <li>templates.ts</li>
</ul>
      

app.module.ts
<pre style="code-sample">
import &#123; MbscModule, MbscProvider &#125; from "ack-angular-mobiscroll"

import &#123; FormsModule &#125;   from '@angular/forms'

import &#123; Input, Component, NgModule &#125; from '@angular/core'
import &#123; BrowserModule &#125; from '@angular/platform-browser'

//you must have your own copy of mobiscroll
import * as mobiscroll from "./mobiscroll-src-copy/mobiscroll.custom-3.2.0.min.js"
MbscProvider.setMobiscroll(mobiscroll)

import &#123; appTemplate &#125; from "./templates"
@Component(&#123;
  selector: 'ack-angular-mobiscroll-app',
  template: appTemplate
&#125;) export class AppComponent &#123;
  public iCal0
  public iCal1
  public iCal2
  public iTime
  public iDateTime
  public options = &#123;
    theme:'mobiscroll',
    display:'center',
    dateFormat:'mm/dd/yy',
    timeFormat:'hh:ii A',
    animate:'slideup',
    controls: ['calendar', 'time']
  &#125;
  birthday: Date = new Date()

  constructor(public MbscProvider:MbscProvider)&#123;
    console.log( 'mobiscroll set test', MbscProvider.getMobiscroll() )
  &#125;

  applyConfig()&#123;
    this.iCal0.applyConfig(this.options)
    this.iCal1.applyConfig(this.options)
    this.iCal2.applyConfig(this.options)
    this.iTime.applyConfig(this.options)
    this.iDateTime.applyConfig(this.options)
  &#125;
&#125;

@NgModule(&#123;
  imports:[
    BrowserModule,
    FormsModule,
    MbscModule
  ],
  declarations: [
    AppComponent
  ],
  bootstrap:[ AppComponent ]
&#125;) export class AppModule &#123; &#125;
</pre>

templates.ts
<pre style="code-sample">
export const appTemplate = \`
  &lt;div style="padding:1em;display:inline-block;"&gt;
    &lt;strong style="display:block"&gt;ngModel mbsc-calendar&lt;/strong&gt;
    &lt;input [(ngModel)]="birthday" mbsc-calendar [(mbsc-calendar-ref)]="iCal0" [mbsc-options]="options" /&gt;
  &lt;/div&gt;

  &lt;div style="padding:1em;display:inline-block;"&gt;
    &lt;strong style="display:block"&gt;mbsc-calendar&lt;/strong&gt;
    &lt;input [(mbsc-calendar)]="birthday" [(mbsc-calendar-ref)]="iCal1" [mbsc-options]="options" /&gt;
  &lt;/div&gt;

  &lt;div style="padding:1em;display:inline-block;"&gt;
    &lt;strong style="display:block"&gt;mbsc-date&lt;/strong&gt;
    &lt;input [(mbsc-date)]="birthday" [(mbsc-date-ref)]="iCal2" [mbsc-options]="options" /&gt;
  &lt;/div&gt;

  &lt;div style="padding:1em;display:inline-block;"&gt;
    &lt;strong style="display:block"&gt;mbsc-time&lt;/strong&gt;
    &lt;input [(mbsc-time)]="birthday" [(mbsc-time-ref)]="iTime" [mbsc-options]="options" /&gt;
  &lt;/div&gt;

  &lt;div style="padding:1em;display:inline-block;"&gt;
    &lt;strong style="display:block"&gt;mbsc-datetime&lt;/strong&gt;
    &lt;input [(mbsc-datetime)]="birthday" [(mbsc-datetime-ref)]="iDateTime" [mbsc-options]="options" /&gt;
  &lt;/div&gt;
\`
</pre>
`