import Pizza from './pizza';
import Olives from './toppings/olives';
import Topping from './toppings/topping.abstract';
import Pepperoni from './toppings/pepperoni';
import Pineapple from './toppings/pineapple';

export default class SupremePizza extends Pizza{
  toppings: Topping[] = [
    new Olives(),
    new Pepperoni(),
    new Pineapple()
  ]
}