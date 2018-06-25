import { getRandomCocktail } from './api'
import _ from 'lodash'

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root')
  _.times(10).forEach(async (_, index) => {
    const { body: { drinks } } = await getRandomCocktail()
    drinks.forEach(({ strDrink, strDrinkThumb, strInstructions, ...rest}) => {
      function setAttributes(el, attrs) {
        Object.keys(attrs).forEach(key => el.setAttribute(key, attrs[key]))
      }
      const cocktailField = document.createElement('div')
      setAttributes(cocktailField, { class: 'cocktail root__cocktail cocktail_item_' + index})
      root.appendChild(cocktailField)

      const titleField = document.createElement('div')
      titleField.appendChild(document.createTextNode('title: ' + strDrink))
      cocktailField.appendChild(titleField)

      const imageField = document.createElement('img')
      setAttributes(imageField, { src: strDrinkThumb, class: 'image cocktail__image'})
      cocktailField.appendChild(imageField)

      const instructionField = document.createElement('div')
      instructionField.appendChild(document.createTextNode('Instruction: ' + strInstructions))
      cocktailField.appendChild(instructionField)

      const ingredientsField = document.createElement('div')
      setAttributes(ingredientsField, {class: 'cocktail__ingridients ingridient_item_' + index})
      ingredientsField.appendChild(document.createTextNode('Ingridients: '))
      cocktailField.appendChild(ingredientsField)
      const hr = document.createElement('hr')

      Object.keys(rest)
        .filter((value) => value.match(/strIngredient\d+/))
        .forEach((key) => {
        if(!!rest[key]) {
          ingredientsField.appendChild(document.createTextNode(rest[key] + ', '))
          root.appendChild(hr)
        } 
      })
      const allIngredient = document.createTextNode(document.getElementsByClassName('ingridient_item_' + index)[0].textContent.slice(0, -2) + '.')
      while (ingredientsField.firstChild) ingredientsField.removeChild(ingredientsField.firstChild)
      ingredientsField.appendChild(allIngredient)
    })
  })
})
