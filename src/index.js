/* global document */
import _ from 'lodash';
import { getRandomCocktail, getFullCocktailDetailsById } from './api';

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
      setAttributes(cocktailField, { 'data-id': idDrink, class: `cocktail mainfield__cocktail mainfield__cocktail-flexbox mainfield__cocktail-theme-transparency mainfield__cocktail-border-size-s cocktail-item-${index}` });
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

      function lookupFullCocktailDetailsById() {
        const currentIdCocktail = cocktailField.getAttribute('data-id');
        const urlById = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${currentIdCocktail}`;
        mainField.style.display = 'none';
        detailsfield.style.display = 'flex';

        _.times(1).forEach(async (index) => {
          const { body: { drinks } } = await getFullCocktailDetailsById(urlById);
          drinks.forEach(({
            idDrink, strDrink, strCategory, strAlcoholic, strGlass, strInstructions, strDrinkThumb, dateModified, ...rest
          }) => {
            const detimage = document.getElementById('detimage');
            const detdescription = document.getElementById('detdescription');
            const dettable = document.getElementById('dettable');

            const imageField = document.createElement('img');
            setAttributes(imageField, { src: strDrinkThumb, class: 'detimage__image' });
            detimage.appendChild(imageField);

            const detailId = document.createElement('div');
            detailId.appendChild(document.createTextNode(`id: ${idDrink}`));
            detdescription.appendChild(detailId);

            const detailDrink = document.createElement('div');
            detailDrink.appendChild(document.createTextNode(`title: ${strDrink}`));
            detdescription.appendChild(detailDrink);

            const detailCategory = document.createElement('div');
            detailCategory.appendChild(document.createTextNode(`category: ${strCategory}`));
            detdescription.appendChild(detailCategory);

            const detailAlcoholic = document.createElement('div');
            detailAlcoholic.appendChild(document.createTextNode(`Alcoholic: ${strAlcoholic}`));
            detdescription.appendChild(detailAlcoholic);

            const detailGlass = document.createElement('div');
            detailGlass.appendChild(document.createTextNode(`Glass: ${strGlass}`));
            detdescription.appendChild(detailGlass);

            const detailInstructions = document.createElement('div');
            detailInstructions.appendChild(document.createTextNode(`Instructions: ${strInstructions}`));
            setAttributes(detailInstructions, { class: 'detdescription__instruction' });
            detdescription.appendChild(detailInstructions);

            const detailDateModified = document.createElement('div');
            detailDateModified.appendChild(document.createTextNode(`dateModified: ${dateModified}`));
            detdescription.appendChild(detailDateModified);

            const tableView = document.createElement('table');
            setAttributes(tableView, { class: 'dettable__table' });
            dettable.appendChild(tableView);
            const trElementTitle = document.createElement('tr');
            const tdElementIngredient = document.createElement('td');
            tdElementIngredient.appendChild(document.createTextNode('Ingredient'));
            const tdElementMeasure = document.createElement('td');
            tdElementMeasure.appendChild(document.createTextNode('Measure'));
            trElementTitle.appendChild(tdElementIngredient);
            trElementTitle.appendChild(tdElementMeasure);
            tableView.appendChild(trElementTitle);

            Object.keys(rest)
              .filter(value => value.match(/strIngredient\d+/))
              .forEach((key, index) => {
                if (rest[key]) {
                  const trElementI = document.createElement('tr');
                  setAttributes(trElementI, { class: `tr-item-${index}` });
                  const tdElementI = document.createElement('td');
                  tdElementI.appendChild(document.createTextNode(rest[key]));
                  trElementI.appendChild(tdElementI);
                  tableView.appendChild(trElementI);
                }
              });

            Object.keys(rest)
              .filter(value => value.match(/strMeasure\d+/))
              .forEach((key, index) => {
                if (rest[key] && rest[key] != ' ' && rest[key] != '\n') {
                  const trElementM = document.getElementsByClassName(`tr-item-${index}`)[0];
                  const tdElementM = document.createElement('td');
                  tdElementM.appendChild(document.createTextNode(rest[key]));
                  trElementM.appendChild(tdElementM);
                  tableView.appendChild(trElementM);
                }
              });

            document.getElementById('btnBack').addEventListener('click', () => {
              detailsfield.innerHTML = '<div class="partdescription detailsfield__partdescription partdescription-flexbox partdescription-theme-dark"><div id="detimage" class="detimage partdescription__detimage detimage-flexbox"></div><div id="detdescription" class="detdescription partdescription__detdesctiption detdescription-flexbox"></div></div><div class="partingredients detailsfield__partingredients partingredients-flexbox"><div id="dettable" class="dettable partingredients__dettable dettable-flexbox partingredients-theme-color"></div></div><div id="btnBack" class="details__btn details__btn-font-size">Back to Cocktails</div>';
              mainField.style.display = 'flex';
              detailsfield.style.display = 'none';
            });
          });
        });
      }
      cocktailField.addEventListener('click', lookupFullCocktailDetailsById);
    });
  });
});
