import { getRandomCocktail } from './api'
import _ from 'lodash'

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root')
  const ingridient1 = document.getElementById('ingridient1')
  _.times(3).forEach(async () => {
    const { body: { drinks } } = await getRandomCocktail()

    drinks.forEach(({ strDrink, 
      strIngredient1, strIngredient2, strIngredient3, strIngredient4, 
      strIngredient5, strIngredient6, strIngredient7, strIngredient8, 
      strIngredient9, strIngredient10, strIngredient11, strIngredient12, 
      strIngredient13, strIngredient14, strIngredient15, strDrinkThumb, strInstructions
      }) => {
      const title_field = document.createElement('div')
      const title_text = document.createTextNode('title: '+strDrink)
      title_field.appendChild(title_text)
      root.appendChild(title_field)

      const image_field = document.createElement('img')
      image_field.setAttribute('src', strDrinkThumb)
      root.appendChild(image_field)

      const instrunction_field = document.createElement('div')
      const instrunction_text = document.createTextNode('Instruction: '+ strInstructions)
      instrunction_field.appendChild(instrunction_text)
      root.appendChild(instrunction_field)

      // let array = [
      //   document.createTextNode(strIngredient1), document.createTextNode(strIngredient2), document.createTextNode(strIngredient3),
      //   document.createTextNode(strIngredient4), document.createTextNode(strIngredient5), document.createTextNode(strIngredient6),
      //   document.createTextNode(strIngredient7), document.createTextNode(strIngredient8), document.createTextNode(strIngredient9), 
      //   document.createTextNode(strIngredient10), document.createTextNode(strIngredient11), document.createTextNode(strIngredient12),
      //   document.createTextNode(strIngredient13), document.createTextNode(strIngredient14), document.createTextNode(strIngredient15)
      // ]
      let array_ingridients = [
        strIngredient1, strIngredient2, strIngredient3, strIngredient4, strIngredient6, strIngredient7, strIngredient8, 
        strIngredient9, strIngredient10, strIngredient11, strIngredient12, strIngredient13, strIngredient14, strIngredient15
      ]

      const ingridients_field = document.createElement('div')
      ingridients_field.setAttribute('id', 'all_ingridients')
      const ingridient_text = document.createTextNode('Ingridients: ')
      //const ingridient_dot = document.createTextNode(', ')
      // const ingridient_title1 = document.createTextNode(strIngredient1+'AAAAAAAAAAAA ')
      // const ingridient_title2 = document.createTextNode(strIngredient2+'AAAAAAAAAAAA ')
      // const ingridient_title3 = document.createTextNode(strIngredient3+'AAAAAAAAAAAA ')
      // const ingridient_title4 = document.createTextNode(strIngredient15+'AAAAAAAAAAAA ')
      // if ( strIngredient15 != '' || strIngredient15 != null) {
        
      // }
      // console.log(array2[1])
      ingridients_field.appendChild(ingridient_text)
      root.appendChild(ingridients_field)
      const id_field_ingridient = document.getElementById('all_ingridients')
      console.log(id_field_ingridient)
      for(let i = 0; i < 15; i++){
        if ( array_ingridients[i] != '' && array_ingridients[i] != null && array_ingridients[i] != undefined) {
          let ingridient = document.createTextNode(array_ingridients[i]+', ')
          console.log(ingridient)
          id_field_ingridient.appendChild(ingridient)
        }
        //console.log(array[i])
      }
      let all_ingridient = document.getElementById('all_ingridients').textContent
      all_ingridient = all_ingridient.slice(0, -2) + '.'
      document.getElementById('all_ingridients').innerHTML = all_ingridient
      console.log(all_ingridient)

      
      
      // ingridients_field.appendChild(ingridient_title1)
      // ingridients_field.appendChild(ingridient_title2)
      // ingridients_field.appendChild(ingridient_title3)//.appendChild(ingridient_dot)
      // ingridients_field.appendChild(ingridient_title4)//.appendChild(ingridient_dot)
      root.appendChild(ingridients_field)

/*
      const div3 = document.createElement('div')
      const text3 = document.createTextNode(strIngredient2)
      div3.appendChild(text3)
      root.appendChild(div3)

      const div4 = document.createElement('div')
      const text4 = document.createTextNode(strIngredient3)
      div4.appendChild(text4)
      root.appendChild(div4)

      const div5 = document.createElement('div')
      const text5 = document.createTextNode(strIngredient4)
      div5.appendChild(text5)
      root.appendChild(div5)

      const div6 = document.createElement('div')
      const text6 = document.createTextNode(strIngredient5)
      div6.appendChild(text6)
      root.appendChild(div6)

      const div7 = document.createElement('div')
      const text7 = document.createTextNode(strIngredient6)
      div7.appendChild(text7)
      root.appendChild(div7)

      const div8 = document.createElement('div')
      const text8 = document.createTextNode(strIngredient7)
      div8.appendChild(text8)
      root.appendChild(div8)
      */
    })
  })
})
