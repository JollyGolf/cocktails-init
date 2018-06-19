import { getRandomCocktail } from './api'
import _ from 'lodash'

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root')

  _.times(3).forEach(async () => {
    const { body: { drinks } } = await getRandomCocktail()

    drinks.forEach(({ strDrink }) => {
      const div = document.createElement('div')

      const text = document.createTextNode(strDrink)
      div.appendChild(text)
      root.appendChild(div)
    })
  })
})
