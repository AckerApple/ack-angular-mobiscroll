import { Injectable } from "@angular/core"

const memory = {mobiscroll:null}

@Injectable() export class MbscProvider{
  constructor(){
    if(memory.mobiscroll){
      this.getMobiscroll = alwaysGetMobiscroll
    }
  }

  static setMobiscroll(mobiscroll:object){
    memory.mobiscroll = mobiscroll
  }

  getMobiscroll() : {date:Function} {
    if(memory.mobiscroll){
      this.getMobiscroll = alwaysGetMobiscroll
      return memory.mobiscroll
    }

    throw new Error('The client-side library Mobiscroll, has not been defined in '+this.constructor.name)
  }
}

export function alwaysGetMobiscroll(){
  return memory.mobiscroll
}
