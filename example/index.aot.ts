import 'zone.js'
import 'reflect-metadata'
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'
import { enableProdMode } from "@angular/core"
import { AppModuleNgFactory } from './aot/src/app.module.ngfactory'

enableProdMode()

platformBrowserDynamic().bootstrapModuleFactory( AppModuleNgFactory )