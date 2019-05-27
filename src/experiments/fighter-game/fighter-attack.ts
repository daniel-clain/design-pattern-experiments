
export interface IAttack{
  type: TAttackName
  damage: number
}
export interface ICanGetAttacked{
  getAttacked(attack: IAttack)
}

export type TAttackName = 'Punch' | 'Kick' | 'Headbut'
