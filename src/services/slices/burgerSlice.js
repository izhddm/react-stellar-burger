import {createSlice} from '@reduxjs/toolkit';
import {v4 as uuidv4} from 'uuid';

const initialState = {
  bun: {
    "_id": "60666c42cc7b410027a1a9b1",
    "name": "Краторная булка N-200i",
    "type": "bun",
    "proteins": 80,
    "fat": 24,
    "carbohydrates": 53,
    "calories": 420,
    "price": 20,
    "image": "https://code.s3.yandex.net/react/code/bun-02.png",
    "image_mobile": "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
    "image_large": "https://code.s3.yandex.net/react/code/bun-02-large.png",
    "__v": 0
  },
  ingredients: [
    {
      "_id":"60666c42cc7b410027a1a9b5",
      "name":"Говяжий метеорит (отбивная)",
      "type":"main",
      "proteins":800,
      "fat":800,
      "carbohydrates":300,
      "calories":2674,
      "price":3000,
      "image":"https://code.s3.yandex.net/react/code/meat-04.png",
      "image_mobile":"https://code.s3.yandex.net/react/code/meat-04-mobile.png",
      "image_large":"https://code.s3.yandex.net/react/code/meat-04-large.png",
      "__v":0
    },
    {
      "_id":"60666c42cc7b410027a1a9b7",
      "name":"Соус Spicy-X",
      "type":"sauce",
      "proteins":30,
      "fat":20,
      "carbohydrates":40,
      "calories":30,
      "price":90,
      "image":"https://code.s3.yandex.net/react/code/sauce-02.png",
      "image_mobile":"https://code.s3.yandex.net/react/code/sauce-02-mobile.png",
      "image_large":"https://code.s3.yandex.net/react/code/sauce-02-large.png",
      "__v":0
    },
    {
      "_id":"60666c42cc7b410027a1a9b4",
      "name":"Мясо бессмертных моллюсков Protostomia",
      "type":"main",
      "proteins":433,
      "fat":244,
      "carbohydrates":33,
      "calories":420,
      "price":1337,
      "image":"https://code.s3.yandex.net/react/code/meat-02.png",
      "image_mobile":"https://code.s3.yandex.net/react/code/meat-02-mobile.png",
      "image_large":"https://code.s3.yandex.net/react/code/meat-02-large.png",
      "__v":0
    },
    {
      "_id":"60666c42cc7b410027a1a9b5",
      "name":"Говяжий метеорит (отбивная)",
      "type":"main",
      "proteins":800,
      "fat":800,
      "carbohydrates":300,
      "calories":2674,
      "price":3000,
      "image":"https://code.s3.yandex.net/react/code/meat-04.png",
      "image_mobile":"https://code.s3.yandex.net/react/code/meat-04-mobile.png",
      "image_large":"https://code.s3.yandex.net/react/code/meat-04-large.png",
      "__v":0
    },
    {
      "_id":"60666c42cc7b410027a1a9b7",
      "name":"Соус Spicy-X",
      "type":"sauce",
      "proteins":30,
      "fat":20,
      "carbohydrates":40,
      "calories":30,
      "price":90,
      "image":"https://code.s3.yandex.net/react/code/sauce-02.png",
      "image_mobile":"https://code.s3.yandex.net/react/code/sauce-02-mobile.png",
      "image_large":"https://code.s3.yandex.net/react/code/sauce-02-large.png",
      "__v":0
    },
    {
      "_id":"60666c42cc7b410027a1a9b4",
      "name":"Мясо бессмертных моллюсков Protostomia",
      "type":"main",
      "proteins":433,
      "fat":244,
      "carbohydrates":33,
      "calories":420,
      "price":1337,
      "image":"https://code.s3.yandex.net/react/code/meat-02.png",
      "image_mobile":"https://code.s3.yandex.net/react/code/meat-02-mobile.png",
      "image_large":"https://code.s3.yandex.net/react/code/meat-02-large.png",
      "__v":0
    },
    {
      "_id":"60666c42cc7b410027a1a9b5",
      "name":"Говяжий метеорит (отбивная)",
      "type":"main",
      "proteins":800,
      "fat":800,
      "carbohydrates":300,
      "calories":2674,
      "price":3000,
      "image":"https://code.s3.yandex.net/react/code/meat-04.png",
      "image_mobile":"https://code.s3.yandex.net/react/code/meat-04-mobile.png",
      "image_large":"https://code.s3.yandex.net/react/code/meat-04-large.png",
      "__v":0
    },
    {
      "_id":"60666c42cc7b410027a1a9b7",
      "name":"Соус Spicy-X",
      "type":"sauce",
      "proteins":30,
      "fat":20,
      "carbohydrates":40,
      "calories":30,
      "price":90,
      "image":"https://code.s3.yandex.net/react/code/sauce-02.png",
      "image_mobile":"https://code.s3.yandex.net/react/code/sauce-02-mobile.png",
      "image_large":"https://code.s3.yandex.net/react/code/sauce-02-large.png",
      "__v":0
    },
    {
      "_id":"60666c42cc7b410027a1a9b4",
      "name":"Мясо бессмертных моллюсков Protostomia",
      "type":"main",
      "proteins":433,
      "fat":244,
      "carbohydrates":33,
      "calories":420,
      "price":1337,
      "image":"https://code.s3.yandex.net/react/code/meat-02.png",
      "image_mobile":"https://code.s3.yandex.net/react/code/meat-02-mobile.png",
      "image_large":"https://code.s3.yandex.net/react/code/meat-02-large.png",
      "__v":0
    },
  ],
};

const burgerSlice = createSlice({
  name: 'burger',
  initialState,
  reducers: {
    setBun: (state, action) => {
      state.bun = action.payload;
    },
    addIngredient: (state, action) => {
      const newIngredient = {
        ...action.payload,
        uuid: uuidv4(),
      };
      state.ingredients.push(newIngredient);
    },
    removeIngredient: (state, action) => {
      const index = state.ingredients.findIndex(
        (ingredient) => ingredient.uuid === action.payload.uuid
      );

      if (index !== -1) {
        state.ingredients.splice(index, 1);
      }
    },
  },
});

export const {
  setBun,
  addIngredient,
  removeIngredient,
} = burgerSlice.actions;

export default burgerSlice.reducer;
