import oats from '../components/recipes/oats.jpg'
import dal from '../components/recipes/dal.jpg'
import smoothie from '../components/recipes/smoothie.jpg'
import salad from '../components/recipes/salad.jpg'
import curry from '../components/recipes/curry.jpg'
import soup from '../components/recipes/soup.jpg'
import quinoa from '../components/recipes/quinoa.jpg'
import tofu from '../components/recipes/tofu.jpg'

import nuts from '../components/recipes/nuts.jpg'
import juice from '../components/recipes/juice.jpg'
import dessert from '../components/recipes/dessert.jpg'

export function getFoodImage(name = '') {
  const n = name.toLowerCase()

  // breakfast
  if (n.includes('oats') || n.includes('chia')) return oats
  if (n.includes('smoothie')) return smoothie

  // indian / meals
  if (n.includes('tofu')) return tofu
  if (n.includes('dal') || n.includes('lentil')) return dal
  if (n.includes('quinoa')) return quinoa
  if (n.includes('curry') || n.includes('palak')) return curry
  if (n.includes('soup')) return soup

  // snacks
  

  if (
    n.includes('nuts') ||
    n.includes('almond') ||
    n.includes('cashew')
  ) return nuts

 

  // drinks
  if (
    n.includes('juice') ||
    n.includes('drink') ||
    n.includes('cooler')
  ) return juice

  // desserts
  if (
    n.includes('dessert') ||
    n.includes('cake') ||
    n.includes('pudding')
  ) return dessert

  return salad
}