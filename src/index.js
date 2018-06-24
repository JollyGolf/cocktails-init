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
      setAttributes(cocktailField, { 'class': 'cocktail root__cocktail cocktail_item_'+index})
      root.appendChild(cocktailField)

      const titleField = document.createElement('div')
      titleField.appendChild(document.createTextNode('title: '+strDrink))
      cocktailField.appendChild(titleField)

      const imageField = document.createElement('img')
      setAttributes(imageField, { 'src': strDrinkThumb, 'class': 'image cocktail__image'})
      cocktailField.appendChild(imageField)

      const instructionField = document.createElement('div')
      instructionField.appendChild(document.createTextNode('Instruction: '+ strInstructions))
      cocktailField.appendChild(instructionField)

      const ingridientsField = document.createElement('div')
      setAttributes(ingridientsField, {'class': 'cocktail__ingridients ingridient_item_'+index})
      ingridientsField.appendChild(document.createTextNode('Ingridients: '))
      cocktailField.appendChild(ingridientsField)
      const hr = document.createElement('hr')
      
      let ingridients = Object.keys(rest).filter((value) => value.match(/strIngredient\d+/))
      for (let key1 in rest) {
        for (let key2 of ingridients) {
          if(key1 == key2 && !!rest[key2]) {
            ingridientsField.appendChild(document.createTextNode(rest[key2]+', '))
            root.appendChild(hr)
          } 
        }
      }
      let allIngridient = document.createTextNode(document.getElementsByClassName('ingridient_item_'+index)[0].textContent.slice(0, -2) + '.')
      while (ingridientsField.firstChild) ingridientsField.removeChild(ingridientsField.firstChild)
      ingridientsField.appendChild(allIngridient)
    })
  })
})
























      // let values_ingridients = Object.values(rest).filter((rest)=>  {
      //   return rest.match(/strIngredient\d+/)
      // })

      // let ingridientss = rest.filter((rest) =>  {
      //   return rest.match(/strIngredient\d+/)
      // })
      //console.log(Object.rest)
      //console.log(ingridients)
      //console.log(values_ingridients)

      // ingridients.forEach( value => {
      //   let ingridient = document.createTextNode(value+', ')
      //   ingridientsField.appendChild(ingridient)
      //   root.appendChild(hr)
      //   //console.log('ingr => '+ingridient)
      // })
      
      // var c = 100;
      // window["War_" + c] = "it works"
      // alert(War_100)

      //window[ingridients]
      //console.log(ingridients)
      //console.log(ingridients)
      //console.log(ingridients)
      
      
      // var getTempItems = (...rest) => rest
      // console.log(getTempItems)
      //var getTempItems = (...rest) => rest;
      // эквивалент
      //var getTempItems = function() { return [].slice.apply(arguments) };

      //console.log(Object.keys(drinks).filter((arguments) => arguments.match(/strIngredient \d+/)) )
      