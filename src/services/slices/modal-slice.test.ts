import modalReducer, {clearContentModal, initialState, setContentModal} from '../slices/modal-slice'

describe('Тест ModalSlice', () => {
  it('Метод записи данных для модального окна setContentModal', () => {
    expect(
      modalReducer(initialState, setContentModal(
        {
          ...initialState,
          componentName: 'OrderDetails',
          data: 1234
        }
      ))
    ).toEqual({
      componentName: 'OrderDetails',
      data: 1234
    })
  })

  it('Метод сброса данных для модального окна clearContentModal', () => {
    expect(
      modalReducer({
        ...initialState,
        componentName: 'OrderDetails',
        data: 1234
      }, clearContentModal())
    ).toEqual(initialState)
  })
})
