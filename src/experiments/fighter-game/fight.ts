import { IObservableData, ICanGetObserved } from "./fighter-observe";
import { IFighter } from "./fighter";

export interface IFight 
extends ICanGetObserved, ICanGetFighters
{
  start()
}


export interface ICanGetFighters{
  getFighters(): IFighter[]
}

export interface IFightState
extends IObservableData
{
  active: boolean
}