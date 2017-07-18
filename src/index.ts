import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { declarations as components } from "./mobiscroll.components"
import { MbscProvider } from "./MbscProvider"

export * from "./mobiscroll.components"

@NgModule({
  imports:[
    CommonModule
  ],
  providers:[ MbscProvider ],
  declarations: components,
  exports: components
}) export class MbscModule {}

export { MbscProvider } from "./MbscProvider"
export { declarations as components } from "./mobiscroll.components"
