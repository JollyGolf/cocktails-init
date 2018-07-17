import { getFullCocktailDetailsById } from './api';

export function getFullDetails(currentId) {
  const urlById = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${currentId}`;
  const mainField = document.getElementById('main-field');
  const detailsField = document.getElementById('details-field');
  mainField.style.display = 'none';
  detailsField.style.display = 'flex';
  _.times(1).forEach(async () => {
    const { body: { drinks } } = await getFullCocktailDetailsById(urlById);
    drinks.forEach(({
      idDrink, strDrink, strCategory, strAlcoholic, strGlass,
      strInstructions, strDrinkThumb, dateModified, ...rest
    }) => {
      function setAttributes(el, attrs) {
        Object.keys(attrs).forEach(key => el.setAttribute(key, attrs[key]));
      }
      const detImage = document.getElementById('det-image');
      const detDescription = document.getElementById('det-description');
      const detTable = document.getElementById('det-table');

      const detailImage = document.createElement('img');
      setAttributes(detailImage, { src: strDrinkThumb, class: 'det-image__image' });
      detImage.appendChild(detailImage);

      const detailId = document.createElement('div');
      detailId.appendChild(document.createTextNode(`id: ${idDrink}`));
      detDescription.appendChild(detailId);

      const detailDrink = document.createElement('div');
      detailDrink.appendChild(document.createTextNode(`title: ${strDrink}`));
      detDescription.appendChild(detailDrink);

      const detailCategory = document.createElement('div');
      detailCategory.appendChild(document.createTextNode(`category: ${strCategory}`));
      detDescription.appendChild(detailCategory);

      const detailAlcoholic = document.createElement('div');
      detailAlcoholic.appendChild(document.createTextNode(`Alcoholic: ${strAlcoholic}`));
      detDescription.appendChild(detailAlcoholic);

      const detailGlass = document.createElement('div');
      detailGlass.appendChild(document.createTextNode(`Glass: ${strGlass}`));
      detDescription.appendChild(detailGlass);

      const detailInstructions = document.createElement('div');
      detailInstructions.appendChild(document.createTextNode(`Instructions: ${strInstructions}`));
      setAttributes(detailInstructions, { class: 'det-description__instruction' });
      detDescription.appendChild(detailInstructions);

      const detailDateModified = document.createElement('div');
      detailDateModified.appendChild(document.createTextNode(`dateModified: ${dateModified}`));
      detDescription.appendChild(detailDateModified);

      const tableView = document.createElement('table');
      setAttributes(tableView, { class: 'det-table__table' });
      detTable.appendChild(tableView);
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
        .forEach((key, index1) => {
          if (rest[key]) {
            const trElementI = document.createElement('tr');
            setAttributes(trElementI, { class: `tr-item-${index1}` });
            const tdElementI = document.createElement('td');
            tdElementI.appendChild(document.createTextNode(rest[key]));
            trElementI.appendChild(tdElementI);
            tableView.appendChild(trElementI);
          }
        });

      Object.keys(rest)
        .filter(value => value.match(/strMeasure\d+/))
        .forEach((key, index2) => {
          if (rest[key] && rest[key] !== ' ' && rest[key] !== '\n') {
            const trElementM = document.getElementsByClassName(`tr-item-${index2}`)[0];
            const tdElementM = document.createElement('td');
            tdElementM.appendChild(document.createTextNode(rest[key]));
            trElementM.appendChild(tdElementM);
            tableView.appendChild(trElementM);
          }
        });

      document.getElementById('btn-back').addEventListener('click', () => {
        detailsField.innerHTML = '<div class="part-description details-field__part-description part-description-flexbox part-description-theme-dark"><div id="det-image" class="det-image part-description__det-image det-image-flexbox"></div><div id="det-description" class="det-description part-description__det-desctiption det-description-flexbox"></div></div><div class="part-ingredients details-field__part-ingredients part-ingredients-flexbox"><div id="det-table" class="det-table part-ingredients__det-table det-table-flexbox part-ingredients-theme-color"></div></div><div id="btn-back" class="details__btn details__btn-font-size">Back to Cocktails</div>';
        mainField.style.display = 'flex';
        detailsField.style.display = 'none';
      });
    });
  });
}
