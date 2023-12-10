export const getCountIngredientFromConstructor = element => state => {
  if (state.burger.bun && element._id === state.burger.bun._id) {
    return 2;
  }

  return state.burger.ingredients.reduce((acc, ingredient) => (ingredient._id === element._id ? acc + 1 : acc), 0);
}
