/* global document */

import _ from 'lodash';
import { getRandomCocktail } from './api';
import { getFullDetails } from './fulldetails';


document.addEventListener('DOMContentLoaded', () => {
  const mainField = document.getElementById('main-field');
  const detailsField = document.getElementById('details-field');
  detailsField.style.display = 'none';
  mainField.style.display = 'flex';
  _.times(4).forEach(async (index) => {
    const { body: { drinks } } = await getRandomCocktail();
    drinks.forEach(({
      idDrink, strDrink, strDrinkThumb, strInstructions, ...rest
    }) => {
      function setAttributes(el, attrs) {
        Object.keys(attrs).forEach(key => el.setAttribute(key, attrs[key]));
      }
      const cocktailField = document.createElement('div');
      setAttributes(cocktailField, { 'data-id': idDrink, class: `cocktail main-field__cocktail main-field__cocktail-flexbox main-field__cocktail-theme-transparency main-field__cocktail-border-size-s cocktail-item-${index}` });
      mainField.appendChild(cocktailField);

      const imageField = document.createElement('img');
      setAttributes(imageField, { src: strDrinkThumb, class: 'cocktail__image' });
      cocktailField.appendChild(imageField);

      const titleField = document.createElement('div');
      setAttributes(titleField, { class: 'cocktail__title text' });
      titleField.appendChild(document.createTextNode(strDrink));
      cocktailField.appendChild(titleField);

      const ingredientsField = document.createElement('div');
      setAttributes(ingredientsField, { class: `cocktail__ingredients ingredient-item-${index} text` });
      ingredientsField.appendChild(document.createTextNode('Ingredients: '));
      cocktailField.appendChild(ingredientsField);

      Object.keys(rest)
        .filter(value => value.match(/strIngredient\d+/))
        .forEach((key) => {
          if (rest[key]) {
            ingredientsField.appendChild(document.createTextNode(`${rest[key]}, `));
          }
        });
      const allIngredient = document.createTextNode(`${document.getElementsByClassName(`ingredient-item-${index}`)[0].textContent.slice(0, -2)}.`);
      while (ingredientsField.firstChild) ingredientsField.removeChild(ingredientsField.firstChild);
      ingredientsField.appendChild(allIngredient);
      const instructionField = document.createElement('div');
      instructionField.appendChild(document.createTextNode(`Instruction: ${strInstructions}`));
      setAttributes(instructionField, { class: 'cocktail__instruction text' });
      cocktailField.appendChild(instructionField);
      const currentIdCocktail = cocktailField.getAttribute('data-id');
      cocktailField.addEventListener('click', () => getFullDetails(currentIdCocktail));
    });
  });
});
