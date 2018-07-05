/* global document */
import _ from 'lodash';
import { getRandomCocktail, getFullCocktailDetailsById } from './api';
//import { getFullCocktailDetailsById } from './api/';

document.addEventListener('DOMContentLoaded', () => {
  const mainField = document.getElementById('mainfield');
  const detailsfield = document.getElementById('detailsfield');
  detailsfield.style.display = 'none';
  mainfield.style.display = 'flex';
  _.times(10).forEach(async (index) => {
    const { body: { drinks } } = await getRandomCocktail();
    drinks.forEach(({
      idDrink, strDrink, strDrinkThumb, strInstructions, ...rest
    }) => {
      function setAttributes(el, attrs) {
        Object.keys(attrs).forEach(key => el.setAttribute(key, attrs[key]));
      }
      const cocktailField = document.createElement('div');
      setAttributes(cocktailField, {'data-id': idDrink, class: `cocktail mainfield__cocktail mainfield__cocktail-flexbox mainfield__cocktail-theme-transparency mainfield__cocktail-border-size-s cocktail-item-${index}` });
      cocktailField.addEventListener('click', lookupFullCocktailDetailsById);
      mainField.appendChild(cocktailField);

      const imageField = document.createElement('img');
      setAttributes(imageField, {src: strDrinkThumb, class: 'cocktail__image' });
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

      function lookupFullCocktailDetailsById() {
        const currentIdCocktail = cocktailField.getAttribute('data-id');
        const urlById = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=' + currentIdCocktail;
        mainField.style.display = 'none';
        detailsfield.style.display = 'flex';
        _.times(1).forEach(async (index) => {
          const { body: { drinks } } = await getFullCocktailDetailsById(urlById);
          drinks.forEach(({
            idDrink, strDrink, strCategory, strAlcoholic, strGlass, strInstructions, strDrinkThumb, dateModified, ...rest
          }) => {
            const imageField = document.createElement('img');
            setAttributes(imageField, {src: strDrinkThumb, class: 'details__image' });
            detailsfield.appendChild(imageField);

            const detailId = document.createElement('div');
            detailId.appendChild(document.createTextNode('id: ' + idDrink));
            detailsfield.appendChild(detailId);

            const detailDrink = document.createElement('div');
            detailDrink.appendChild(document.createTextNode('title: ' + strDrink));
            detailsfield.appendChild(detailDrink);

            const detailCategory = document.createElement('div');
            detailCategory.appendChild(document.createTextNode('category: ' + strCategory));
            detailsfield.appendChild(detailCategory);

            const detailAlcoholic = document.createElement('div');
            detailAlcoholic.appendChild(document.createTextNode('Alcoholic: ' + strAlcoholic));
            detailsfield.appendChild(detailAlcoholic);

            const detailGlass = document.createElement('div');
            detailGlass.appendChild(document.createTextNode('Glass: ' + strGlass));
            detailsfield.appendChild(detailGlass);

            const detailInstructions = document.createElement('div');
            detailInstructions.appendChild(document.createTextNode('Instructions: ' + strInstructions));
            detailsfield.appendChild(detailInstructions);

            const detailDateModified = document.createElement('div');
            detailDateModified.appendChild(document.createTextNode('dateModified: ' + dateModified));
            detailsfield.appendChild(detailDateModified);

            const detailIngredients = document.createElement('div');
            setAttributes(detailIngredients, { class: `ingredient-item-${index}` });
            detailIngredients.appendChild(document.createTextNode('Ingredients and Measures: '));
            detailsfield.appendChild(detailIngredients);
            Object.keys(rest)
              .filter(value => value.match(/strIngredient\d+/))
              .forEach((key) => {
                if (rest[key]) {
                  detailIngredients.appendChild(document.createTextNode(`${rest[key]}, `));
                }
              });
            const allIngredients = document.createTextNode(`${document.getElementsByClassName(`ingredient-item-${index}`)[0].textContent.slice(0, -2)}.`);
            while (detailIngredients.firstChild) detailIngredients.removeChild(detailIngredients.firstChild);
            detailIngredients.appendChild(allIngredient);

            document.getElementById('btnBack').addEventListener('click', () => {
              detailsfield.innerHTML = '<div id="btnBack">Back to Cocktails</div>';
              mainField.style.display = 'flex';
              detailsfield.style.display = 'none';
            });

          });
        });
      }
    });
  });
});
