import { getRandomCocktail } from './api'
import _ from 'lodash'

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root')
  const ingridient1 = document.getElementById('ingridient1')
  const countCocktails = 3;
  let counterCocktail = 1;
  _.times(countCocktails).forEach(async () => {
    const { body: { drinks } } = await getRandomCocktail()
    
    drinks.forEach(({ strDrink, strIngredient1, strIngredient2, strIngredient3, strIngredient4, strIngredient5, strIngredient6, strIngredient7, strIngredient8, strIngredient9, strIngredient10, strIngredient11, strIngredient12, strIngredient13, strIngredient14, strIngredient15, strDrinkThumb, strInstructions
      }) => {
      const title_field = document.createElement('div')
      const title_text = document.createTextNode('title: '+strDrink)
      title_field.appendChild(title_text)
      root.appendChild(title_field)
      const image_field = document.createElement('img')
      image_field.setAttribute('src', strDrinkThumb)
      image_field.setAttribute('class', 'image-cocktail')
      root.appendChild(image_field)
      const instrunction_field = document.createElement('div')
      const instrunction_text = document.createTextNode('Instruction: '+ strInstructions)
      instrunction_field.appendChild(instrunction_text)
      root.appendChild(instrunction_field)
      let array_ingridients = [ strIngredient1, strIngredient2, strIngredient3, strIngredient4, strIngredient6, strIngredient7, strIngredient8, strIngredient9, strIngredient10, strIngredient11, strIngredient12, strIngredient13, strIngredient14, strIngredient15 ]
      const ingridients_field = document.createElement('div')
      ingridients_field.setAttribute('class', 'all_ingridients')
      ingridients_field.setAttribute('id', 'ingridients-'+counterCocktail)
      const ingridient_text = document.createTextNode('Ingridients: ')
      ingridients_field.appendChild(ingridient_text)
      root.appendChild(ingridients_field)
      const hr = document.createElement('hr')
      for (let i = 0; i < 15; i++) {
        if (array_ingridients[i] == '' || array_ingridients[i] == null || array_ingridients[i] == undefined) break
        let ingridient = document.createTextNode(array_ingridients[i]+', ')
        ingridients_field.appendChild(ingridient)
        root.appendChild(hr)
      }
      let all_ingridient = document.getElementById('ingridients-'+counterCocktail).textContent
      all_ingridient = all_ingridient.slice(0, -2) + '.'
      all_ingridient = document.createTextNode(all_ingridient)
      while (ingridients_field.firstChild) ingridients_field.removeChild(ingridients_field.firstChild);
      ingridients_field.appendChild(all_ingridient)
      counterCocktail = counterCocktail+1;
    })
  })
})
