import superagent from 'superagent'

const ENDPOINTS = {
  random: 'https://www.thecocktaildb.com/api/json/v1/1/random.php'
}

export const getRandomCocktail = () => superagent.get(ENDPOINTS.random);
export const getFullCocktailDetailsById = (urlById) => superagent.get(urlById);
