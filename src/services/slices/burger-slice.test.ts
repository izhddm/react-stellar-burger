import burgerReducer, {
  addIngredient,
  clearBurgerConstructor, initialState,
  removeIngredient,
  setBun,
  swapIngredients
} from '../slices/burger-slice'
import {v4 as uuidv4} from 'uuid';
import {IRemoveIngredient, ISwapIngredient, TIngredient, TIngredients} from "../../types/types";

const bun: TIngredient = {
  _id: "643d69a5c3f7b9001cfa093d",
  name: "Флюоресцентная булка R2-D3",
  type: "bun",
  proteins: 44,
  fat: 26,
  carbohydrates: 85,
  calories: 643,
  price: 988,
  image: "https://code.s3.yandex.net/react/code/bun-01.png",
  image_mobile: "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
  image_large: "https://code.s3.yandex.net/react/code/bun-01-large.png",
  __v: 0
}

const ingredients: TIngredients = [
  {
    "_id": "643d69a5c3f7b9001cfa0941",
    "name": "Биокотлета из марсианской Магнолии",
    "type": "main",
    "proteins": 420,
    "fat": 142,
    "carbohydrates": 242,
    "calories": 4242,
    "price": 424,
    "image": "https://code.s3.yandex.net/react/code/meat-01.png",
    "image_mobile": "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
    "image_large": "https://code.s3.yandex.net/react/code/meat-01-large.png",
    "__v": 0
  },
  {
    "_id": "643d69a5c3f7b9001cfa093e",
    "name": "Филе Люминесцентного тетраодонтимформа",
    "type": "main",
    "proteins": 44,
    "fat": 26,
    "carbohydrates": 85,
    "calories": 643,
    "price": 988,
    "image": "https://code.s3.yandex.net/react/code/meat-03.png",
    "image_mobile": "https://code.s3.yandex.net/react/code/meat-03-mobile.png",
    "image_large": "https://code.s3.yandex.net/react/code/meat-03-large.png",
    "__v": 0
  },
  {
    "_id": "643d69a5c3f7b9001cfa0942",
    "name": "Соус Spicy-X",
    "type": "sauce",
    "proteins": 30,
    "fat": 20,
    "carbohydrates": 40,
    "calories": 30,
    "price": 90,
    "image": "https://code.s3.yandex.net/react/code/sauce-02.png",
    "image_mobile": "https://code.s3.yandex.net/react/code/sauce-02-mobile.png",
    "image_large": "https://code.s3.yandex.net/react/code/sauce-02-large.png",
    "__v": 0
  }
]

// Замокаем библиотеку uuid
jest.mock('uuid', () => ({
  ...jest.requireActual('uuid'),
  v4: jest.fn(() => '12345678'),
}));

describe('Тест BurgerSlice', () => {
  it('Метод записи булочки setBun', () => {

    expect(burgerReducer(initialState,
        setBun(bun)
      )
    ).toEqual({...initialState, bun: {...bun}})
  })

  it('Метод добавления ингредиента addIngredient', () => {

    const ingredient = ingredients[0];

    (uuidv4 as jest.Mock).mockReturnValue('12345678');

    expect(burgerReducer(initialState,
        addIngredient(ingredient)
      )
    ).toEqual({...initialState, ingredients: [{...ingredient, uuid: '12345678'}]})
  })

  it('Метод обмена местами ингредиентов swapIngredients', () => {
    const state = {
      ...initialState,
      ingredients: [
        {...ingredients[0], uuid: '123456'},
        {...ingredients[1], uuid: '1234567'},
        {...ingredients[2], uuid: '12345678'}
      ]
    }

    const swapState: ISwapIngredient = {
      indexFrom: 0,
      indexTo: 1,
      ingredient: {...ingredients[0], uuid: '123456'}
    }

    expect(burgerReducer(state,
        swapIngredients(swapState)
      )
    ).toEqual({
      ...initialState,
      ingredients: [
        {...ingredients[1], uuid: '1234567'},
        {...ingredients[0], uuid: '123456'},
        {...ingredients[2], uuid: '12345678'},
      ]
    })
  })

  it('Метод удаления ингредиента removeIngredient', () => {
    const state = {
      ...initialState,
      ingredients: [
        {...ingredients[0], uuid: '123456'},
        {...ingredients[1], uuid: '1234567'},
        {...ingredients[2], uuid: '12345678'}
      ]
    }

    const removeItem: IRemoveIngredient = {
      uuid: '1234567'
    }

    expect(burgerReducer(state,
        removeIngredient(removeItem)
      )
    ).toEqual({
      ...initialState,
      ingredients: [
        {...ingredients[0], uuid: '123456'},
        {...ingredients[2], uuid: '12345678'},
      ]
    })
  })

  it('Метод сброса состояния бургера к исходному clearBurgerConstructor', () => {
    const state = {
      ...initialState,
      ingredients: [
        {...ingredients[0], uuid: '123456'},
        {...ingredients[1], uuid: '1234567'},
        {...ingredients[2], uuid: '12345678'}
      ]
    }

    expect(burgerReducer(state,
        clearBurgerConstructor()
      )
    ).toEqual(initialState)
  })
})
