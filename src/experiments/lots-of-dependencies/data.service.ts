
import IObservable from "./observable.interface";

export class DataService{
  constructor(
    private connectionObservable: IObservable
  ){
    this.connectionObservable.onUpdate((connected: boolean) => connected && this.onConnectionToRemoteDb())
  }

  private onConnectionToRemoteDb(){
    this.synchronizeRemoteAndLocalDataSinceLastConnected()
    if(this.overAMonthSinceLastConnectedToRemoteDb()){
      this.synchronizeRemoteAndLocalDataBeforeLastConnected()
    }
  }

  synchronizeRemoteAndLocalDataBeforeLastConnected(){
    this.allLocalDataThatHasntBeenUpdatedSinceLastConnected().forEach(dataItem => {
      if(this.dataItemDoesntExistInRemoteDb(dataItem)){
        console.log('this data items exists in local but not in remote, the only way this could be possible is if it was marked for delete and expired by another client, or if the data in the remote db was manually delete. investigate this and determine the cause. for now local item will be deleted');
        this.deleteItem(dataItem)
      }
      else{
        this.resolveConflictingDataItems([dataItem])
      }        
    }) 
  }

  synchronizeRemoteAndLocalDataSinceLastConnected(){}
  overAMonthSinceLastConnectedToRemoteDb():boolean{return}
  allLocalDataThatHasntBeenUpdatedSinceLastConnected():[]{return []}
  dataItemDoesntExistInRemoteDb(dataItem):boolean{console.log(dataItem);return}
  deleteItem(dataItem){console.log(dataItem);}
  resolveConflictingDataItems([]){}
}