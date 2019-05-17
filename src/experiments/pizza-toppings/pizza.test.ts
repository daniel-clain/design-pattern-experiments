import Pizza from './pizza';
import Chicken from './toppings/chicken';
import Olives from './toppings/olives';
import Prawns from './toppings/prawns';
import SupremePizza from './supreme-pizza';
import Topping from './toppings/topping.abstract';
import Pepperoni from './toppings/pepperoni';
import PizzaSizes from './enums/pizza-sizes';

const testPizza = new Pizza()


test('a default pizza should cost 6', () => {
  expect(testPizza.calculateTotalPrice()).toBe(6)
})

test('a default pizza with chicken olives and prawns added should cost 11', () => {
  testPizza.addTopping(new Chicken())
  testPizza.addTopping(new Olives())
  testPizza.addTopping(new Prawns())
  expect(testPizza.calculateTotalPrice()).toBe(11)
})

const testSupremePizza = new SupremePizza()

test('a default supreme pizza should cost 9', () => {
  expect(testSupremePizza.calculateTotalPrice()).toBe(9)
})

test('a default supreme pizza that has had olives removed should cost 8', () => {
  const toppings: Topping[] = testSupremePizza.getToppings()
  const olives: Olives = toppings.find((topping: Topping) => topping.name == 'Olives')
  testSupremePizza.removeTopping(olives)
  expect(testSupremePizza.calculateTotalPrice()).toBe(8)
})

describe ('when a pizza that is family sized with 3 portions of pepperoni added', () => {

  const testPizza = new Pizza()
  testPizza.addTopping(new Pepperoni)
  testPizza.addTopping(new Pepperoni)
  testPizza.addTopping(new Pepperoni)
  testPizza.setPizzaSize(PizzaSizes.Family)

  test('should cost 12.6', () => {
    expect(testPizza.calculateTotalPrice()).toBe(12.6)
  })


  test('after removing 1 portion of pepperoni, should cost 11.2', () => {
    const toppings: Topping[] = testPizza.getToppings()
    const pepperoni: Pepperoni = toppings.find((topping: Topping) => topping.name == 'Pepperoni')
    testPizza.removeTopping(pepperoni)
    expect(testPizza.calculateTotalPrice()).toBe(11.2)
  })


  test('after changing pizza size to small should cost 6.4', () => {
    testPizza.setPizzaSize(PizzaSizes.Small)
    expect(testPizza.calculateTotalPrice()).toBe(6.4)
  })
});

