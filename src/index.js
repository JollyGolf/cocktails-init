import { getRandomCocktail } from './api'
import _ from 'lodash'

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root')
  const countCocktails = 3;
  _.times(countCocktails).forEach(async (_, index) => {
    const { body: { drinks } } = await getRandomCocktail()

    drinks.forEach(({ strDrink, strIngredient1, strIngredient2, strIngredient3, strIngredient4, strIngredient5, strIngredient6, strIngredient7, strIngredient8, strIngredient9, strIngredient10, strIngredient11, strIngredient12, strIngredient13, strIngredient14, strIngredient15, strDrinkThumb, strInstructions
      }) => {
      const cocktailField = document.createElement('div')
      cocktailField.setAttribute('class', 'cocktail')
      cocktailField.setAttribute('class', 'root__cocktail')
      cocktailField.setAttribute('class', 'cocktail_item_'+index)
      root.appendChild(cocktailField)

      const titleField = document.createElement('div')
      const titleText = document.createTextNode('title: '+strDrink)
      titleField.appendChild(titleText)
      cocktailField.appendChild(titleField)

      const imageField = document.createElement('img')
      imageField.setAttribute('src', strDrinkThumb)
      imageField.setAttribute('class', 'image')
      imageField.setAttribute('class', 'cocktail__image')
      cocktailField.appendChild(imageField)

      const instructionField = document.createElement('div')
      const instrunctionText = document.createTextNode('Instruction: '+ strInstructions)
      instructionField.appendChild(instrunctionText)
      cocktailField.appendChild(instructionField)

      let uncheckedArrayIngridients = [ strIngredient1, strIngredient2, strIngredient3, strIngredient4, strIngredient6, strIngredient7, strIngredient8, strIngredient9, strIngredient10, strIngredient11, strIngredient12, strIngredient13, strIngredient14, strIngredient15 ]
      let checkedArrayIngridients = uncheckedArrayIngridients.filter( value => {
        return !!value 
      })
      const ingridientsField = document.createElement('div')
      ingridientsField.setAttribute('class', 'cocktail__ingridients')
      ingridientsField.setAttribute('class', 'ingridient_item_'+index)
      const ingridientText = document.createTextNode('Ingridients: ')
      ingridientsField.appendChild(ingridientText)
      cocktailField.appendChild(ingridientsField)
      const hr = document.createElement('hr')

      checkedArrayIngridients.forEach( value => {
        let ingridient = document.createTextNode(value+', ')
        ingridientsField.appendChild(ingridient)
        root.appendChild(hr)
      })

      let allIngridient = document.getElementsByClassName('ingridient_item_'+index)[0].textContent
      allIngridient = allIngridient.slice(0, -2) + '.'
      allIngridient = document.createTextNode(allIngridient)
      while (ingridientsField.firstChild) ingridientsField.removeChild(ingridientsField.firstChild);
      ingridientsField.appendChild(allIngridient)
    })
  })
})
