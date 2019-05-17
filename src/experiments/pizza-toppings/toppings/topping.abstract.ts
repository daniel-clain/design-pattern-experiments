export default abstract class Topping{
  abstract name: string
  abstract cost: number
  abstract description: string

  getCost(): number{
    return this.cost
  }
}