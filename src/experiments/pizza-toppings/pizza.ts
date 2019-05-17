import CrustTypes from './enums/crust-types';
import PizzaSizes from './enums/pizza-sizes';
import Topping from './toppings/topping.abstract';

export default class Pizza{
  protected crustType: CrustTypes = CrustTypes.Regular
  protected pizzaSize: PizzaSizes = PizzaSizes.Medium
  protected toppings: Topping[] = []
  protected basePrice: number = 6
  

  public addTopping(topping: Topping){
    this.toppings.push(topping)
  }

  getToppings(): Topping[]{
    return this.toppings
  }

  public removeTopping(topping: Topping){
    const indexOfTopping = this.toppings.indexOf(topping)
    if(indexOfTopping >= 0){
      this.toppings.splice(indexOfTopping, 1)
    }
    else{
      throw `could not remove ${topping.name} from pizza because ${topping.name} was not found on pizza`
    }
  }

  public setCrustType(crustType: CrustTypes){
    this.crustType = crustType
  }

  public setPizzaSize(pizzaSize: PizzaSizes){
    this.pizzaSize = pizzaSize
  }

  public calculateTotalPrice(): number{
    let sizeMultiplier
    switch (this.pizzaSize) {
      case PizzaSizes.Small: sizeMultiplier = 0.8
        break;
      case PizzaSizes.Medium: sizeMultiplier = 1
        break;
      case PizzaSizes.Large: sizeMultiplier = 1.2
        break;
      case PizzaSizes.Family: sizeMultiplier = 1.4
        break;
    }
    return this.toppings.reduce((cost: number, topping: Topping) => cost + topping.getCost(), this.basePrice) * sizeMultiplier
  }

  public getPizzaDescription(): string{
    return '123'
  }


}