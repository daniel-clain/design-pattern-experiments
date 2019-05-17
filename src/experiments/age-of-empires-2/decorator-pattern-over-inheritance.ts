

abstract class Unit{
  hitPoints: number
  movementSpeed: number
  takeDamage(damage: number){
    this.hitPoints -= damage
  }
  move(direction: number){

  }
}



abstract class MillitaryUnit extends Unit{
  attackDamage: number
  attack(unit: Unit){
    unit.takeDamage(this.attackDamage)
  }
}

abstract class MountedUnit extends MillitaryUnit{

}

abstract class PikeUnit extends MillitaryUnit{
  extraDamageDealtToMountedUnits = 2.5
  attack(unit: Unit){
    if(unit instanceof MountedUnit){
      unit.takeDamage(this.attackDamage * this.extraDamageDealtToMountedUnits)
    }
    else{
      super.attack(unit)
    }
  }
}


class CavalryArcher implements IMountedUnit, IArcheryUnit{}

class Knight extends MountedUnit{}

class Halberdier extends PikeUnit{}

const testKnight = new Knight()
const testHalberdier = new Halberdier()

testHalberdier.attack(testKnight)