import { Observable } from "rxjs/internal/Observable";
import { IFight } from "./fight";

export interface IObservableData{
}


export interface ICanGetObserved{
  getObserved<T extends IObservableData>(): Observable<T> 
}

export interface ICanGetPutInAFight{
  getPutInAFight(fight: IFight)
}

