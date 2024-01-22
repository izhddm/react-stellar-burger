import orderReducer, {initialState, setOrder} from '../slices/order-slice'
import {TOrder} from "../../types/types";

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
