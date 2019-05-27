import { IObservableData } from "./fighter-observe";
import { IAttack } from "./fighter-attack";

export type TFighterStateName = 'Stamina' | 'Speed' | 'Strength' | 'Location' | 'Attacking'


export interface ILocation{
  x: number
  y: number
}

export interface IFighterState
extends IObservableData{
  name: TFighterStateName
  value: any
}
export interface IStaminaFighterState
extends IFighterState
{
  name: 'Stamina'
  value: number
}
export interface ILocationFighterState
extends IFighterState
{
  name: 'Location'
  value: ILocation
}
export interface IAttackingFighterState
extends IFighterState
{
  name: 'Attacking'
  value: {
    location: ILocation
    attack: IAttack
  }
}