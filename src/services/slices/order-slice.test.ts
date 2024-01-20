import orderReducer, {setOrder} from '../slices/order-slice'
import {TOrder} from "../../types/types";

const initialState: TOrder = {
  order: {
    number: null
  },
  name: null,
};

const testOrder: TOrder = {
  order: {
    number: 1234,
  },
  name: 'Тестовый ордер'
}

describe('Тест OrderSlice', () => {
  it('Метод записи информации об оформленном заказе setOrder', () => {
    expect(orderReducer(initialState, setOrder(testOrder)
      )
    ).toEqual(testOrder)
  })
})
