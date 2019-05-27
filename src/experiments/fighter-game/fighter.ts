import { Observable } from "rxjs/internal/Observable";
import { Subject, Subscription } from "rxjs";
import { Subscriber } from "rxjs/internal/Subscriber";
import { ICanGetAttacked, IAttack } from "./fighter-attack";
import { ICanGetPutInAFight, IObservableData, ICanGetObserved } from "./fighter-observe";
import { IFighterState, IStaminaFighterState, ILocationFighterState, TFighterStateName, ILocation, IAttackingFighterState } from "./fighter-states";
import { IFight, IFightState } from "./fight";


const toMili = (num: number) => num * 1000



/** 
 * Fighters are people who can get put into fights and get attacked by other fighters * 
 * 
 * @interface IFighter 
 */
export interface IFighter 
extends ICanGetObserved, ICanGetAttacked, ICanGetPutInAFight{}


class Fighter implements IFighter{
  private state: IFighterState[];
  private observableState$: Observable<IFighterState[]>
  private stateUpdated$: Subject<void>

  private fightersBeingObserved: Subscription[]

  constructor(private name){
    const stamina: IStaminaFighterState = { name: 'Stamina', value: 3 } 
    const location: ILocationFighterState = { name: 'Location', value: {x: 0, y: 0}}
    this.state = [stamina, location]
    this.stateUpdated$= new Subject()
    this.observableState$ = new Observable((subscriber: Subscriber<IFighterState[]>) => {
      const observableStates: TFighterStateName[] =  ['Location', 'Stamina']

      let filteredFighterStates: IFighterState[] = this.getFilteredStates(observableStates)
      subscriber.next(filteredFighterStates)


      this.stateUpdated$.subscribe(() => subscriber.next(this.getFilteredStates(observableStates)))
    })
  }

  private getFilteredStates(stateNames: TFighterStateName[]): IFighterState[]{
    return this.state.filter(
      (state: IFighterState) => stateNames.some(
        (stateName: TFighterStateName) => 
          state.name == stateName
      )
    )
  }
  
  private attackLocation(location: ILocation){
    const attack: IAttack =  {
      type: 'Punch', 
      damage: 1
    }
    const attackState: IAttackingFighterState = {
      name: 'Attacking', 
      value: {
        location: location, 
        attack: attack
      }
    }
    this.setState<IAttackingFighterState>(attackState)
  }

  getAttacked(attack: IAttack){
    this.setState<IStaminaFighterState>({
      name: 'Stamina', 
      value: this.getState<IStaminaFighterState>('Stamina').value - attack.damage
    })
  }

  getObserved(): Observable<IFighterState[]>{
    return this.observableState$
  }

  getPutInAFight(fight: IFight){
    this.observeOtherFightersInFight(fight.getFighters())    
    this.waitForFightToStart(fight.getObserved<IFightState>()) 
    this.watchFightToEnd(fight.getObserved())
  }

  getName(): string {
    return this.name
  }

  private observeOtherFightersInFight(otherFightersInFight: IFighter[]){
    this.fightersBeingObserved = otherFightersInFight.map((fighter: IFighter) => 
      fighter.getObserved().subscribe(
        (fighterObservableState: IFighterState[]) => {
          fighterObservableState.forEach((state: IFighterState) => {
            switch(state.name){
              case 'Location' : {
                if(this.isLocationClose(state.value)){
                  this.attackLocation(state.value)
                }
              }
            }
          })
        }
      )
    )
  }

  private isLocationClose(location: ILocation){
    return location.x == 0
  }

  private waitForFightToStart(fightObservable: Observable<IFightState>){
    fightObservable.subscribe((fightState: IFightState) => fightState.active && this.startFighting())
  }
  private watchFightToEnd(fightObservable: Observable<IObservableData>){
    fightObservable.subscribe((fightState: IFightState) => !fightState.active && this.stopFighting())
  }

  private startFighting(){
    
  }
  stopFighting(){
    this.fightersBeingObserved.forEach((subscription: Subscription) => subscription.unsubscribe())
  }

  private getState<T extends IFighterState>(stateName: TFighterStateName): T{
    return this.state[stateName]
  }

  private setState<T extends IFighterState>(newState: T){
    const changedFrom: IFighterState[] = [...this.state]
    this.state[newState.name] = newState
    this.stateUpdated$.next()
  }
}



class Fight implements IFight{
  private fighters: IFighter[]
  private startCountDown
  private observableState$: Observable<IFightState>
  private active: boolean
  private start$: Subject<boolean>
  constructor(
    fighter1: IFighter,
    fighter2: IFighter,
    fighter3: IFighter,
    fighter4: IFighter,
  ){
    this.fighters = [fighter1, fighter2, fighter3, fighter4]
    this.active = false
    this.startCountDown = 3
    this.start$ = new Subject()
    this.observableState$ = new Observable((subscriber: Subscriber<IFightState>) => {      
      subscriber.next({active: this.active})
      this.start$.subscribe(() => subscriber.next({active: this.active}))
    })
  }

  getFighters(): IFighter[]{
    return this.fighters
  }

  start(){
    setTimeout(() => this.start$.next(true), toMili(this.startCountDown))
  }

  getObserved<T extends IObservableData>(): Observable<T> {
    return this.observableState$
  }
}

const fighterBobInstance: Fighter = new Fighter('Bob')
const fighterCharlesInstance: Fighter = new Fighter('Charles')
const fighterJimInstance: Fighter = new Fighter('Jim')
const fighterHarryInstance: Fighter = new Fighter('Harry')


const superPunchFiesta: IFight = new Fight(fighterBobInstance, fighterCharlesInstance, fighterJimInstance, fighterHarryInstance)
superPunchFiesta.start()


