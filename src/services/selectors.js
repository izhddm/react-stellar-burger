export const getCountIngredientFromConstructor = element => state => {
  if (state.burger.bun && element._id === state.burger.bun._id) {
    return 2;
  }

  return state.burger.ingredients.reduce((acc, ingredient) => (ingredient._id === element._id ? acc + 1 : acc), 0);
}

// Возвращает ингредиент, либо из стейта, либо находит по id среди всех ингредиентов
export const getDetailIngredient = id => state => {
  if (state.modal.data){
    return state.modal.data;
  }

  return state.ingredients.find((el) => el._id === id) ?? null;
}
