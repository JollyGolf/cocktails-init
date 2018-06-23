import { getRandomCocktail } from './api'
import _ from 'lodash'

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root')
  const countCocktails = 3;
  let currentCocktail = 1;
  _.times(countCocktails).forEach(async () => {
    const { body: { drinks } } = await getRandomCocktail()

    drinks.forEach(({ strDrink, strIngredient1, strIngredient2, strIngredient3, strIngredient4, strIngredient5, strIngredient6, strIngredient7, strIngredient8, strIngredient9, strIngredient10, strIngredient11, strIngredient12, strIngredient13, strIngredient14, strIngredient15, strDrinkThumb, strInstructions
      }) => {
      const cocktailField = document.createElement('div')
      cocktailField.setAttribute('id', 'cocktail-'+currentCocktail)
      root.appendChild(cocktailField)

      const titleField = document.createElement('div')
      const titleText = document.createTextNode('title: '+strDrink)
      titleField.appendChild(titleText)
      cocktailField.appendChild(titleField)

      const imageField = document.createElement('img')
      imageField.setAttribute('src', strDrinkThumb)
      imageField.setAttribute('class', 'image-cocktail')
      cocktailField.appendChild(imageField)

      const instructionField = document.createElement('div')
      const instrunction_text = document.createTextNode('Instruction: '+ strInstructions)
      instructionField.appendChild(instrunction_text)
      cocktailField.appendChild(instructionField)

      let uncheckedArrayIngridients = [ strIngredient1, strIngredient2, strIngredient3, strIngredient4, strIngredient6, strIngredient7, strIngredient8, strIngredient9, strIngredient10, strIngredient11, strIngredient12, strIngredient13, strIngredient14, strIngredient15 ]
      let checkedArrayIngridients = uncheckedArrayIngridients.filter( value => {
        return value != '' && value != null && value != undefined 
      })
      const ingridientsField = document.createElement('div')
      ingridientsField.setAttribute('class', 'all_ingridients')
      ingridientsField.setAttribute('id', 'ingridients-'+currentCocktail)
      const ingridientText = document.createTextNode('Ingridients: ')
      ingridientsField.appendChild(ingridientText)
      cocktailField.appendChild(ingridientsField)
      const hr = document.createElement('hr')

      checkedArrayIngridients.forEach( value => {
        let ingridient = document.createTextNode(value+', ')
        ingridientsField.appendChild(ingridient)
        root.appendChild(hr)
      })
      let allIngridient = document.getElementById('ingridients-'+currentCocktail).textContent
      allIngridient = allIngridient.slice(0, -2) + '.'
      allIngridient = document.createTextNode(allIngridient)
      while (ingridientsField.firstChild) ingridientsField.removeChild(ingridientsField.firstChild);
      ingridientsField.appendChild(allIngridient)
      currentCocktail = currentCocktail+1;
    })
  })
})
