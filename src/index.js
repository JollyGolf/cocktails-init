/* global document */
import _ from 'lodash';
import { getRandomCocktail } from './api';

document.addEventListener('DOMContentLoaded', () => {
  const mainField = document.getElementById('main_field');
  _.times(10).forEach(async (index) => {
    const { body: { drinks } } = await getRandomCocktail();
    drinks.forEach(({
      strDrink, strDrinkThumb, strInstructions, ...rest
    }) => {
      function setAttributes(el, attrs) {
        Object.keys(attrs).forEach(key => el.setAttribute(key, attrs[key]));
      }
      const cocktailField = document.createElement('div');
      setAttributes(cocktailField, { class: `cocktail main_field__cocktail cocktail_flexbox cocktail_theme cocktail_border_size_s cocktail_item_${index}` });
      mainField.appendChild(cocktailField);

      const imageField = document.createElement('img');
      setAttributes(imageField, {src: strDrinkThumb, class: 'cocktail__image' });
      cocktailField.appendChild(imageField);

      const titleField = document.createElement('div');
      setAttributes(titleField, { class: 'cocktail__title title_theme text' });
      titleField.appendChild(document.createTextNode(strDrink));
      cocktailField.appendChild(titleField);

      const ingredientsField = document.createElement('div');
      setAttributes(ingredientsField, { class: `cocktail__ingredients ingredient_item_${index} text` });
      ingredientsField.appendChild(document.createTextNode('Ingridients: '));
      cocktailField.appendChild(ingredientsField);

      Object.keys(rest)
        .filter(value => value.match(/strIngredient\d+/))
        .forEach((key) => {
          if (rest[key]) {
            ingredientsField.appendChild(document.createTextNode(`${rest[key]}, `));
          }
        });
      const allIngredient = document.createTextNode(`${document.getElementsByClassName(`ingredient_item_${index}`)[0].textContent.slice(0, -2)}.`);
      while (ingredientsField.firstChild) ingredientsField.removeChild(ingredientsField.firstChild);
      ingredientsField.appendChild(allIngredient);
      const instructionField = document.createElement('div');
      instructionField.appendChild(document.createTextNode(`Instruction: ${strInstructions}`));
      setAttributes(instructionField, { class: 'cocktail__instruction instruction_theme text' });
      cocktailField.appendChild(instructionField);
    });
  });
});
