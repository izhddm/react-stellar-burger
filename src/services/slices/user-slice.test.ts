import userReducer, {initialState, resetUser, setLoggedIn, setUser} from '../slices/user-slice'

describe('Тест UserSlice', () => {
  it('Метод записи данных о пользователе setUser', () => {
    expect(userReducer(initialState,
        setUser({
          email: 'test@email.ru',
          name: 'Тестовый'
        })
      )
    ).toEqual({
      ...initialState,
      email: 'test@email.ru',
      name: 'Тестовый'
    })
  })

  it('Метод записи состояния авторизации пользователя setLoggedIn', () => {
    expect(userReducer(initialState,
        setLoggedIn({
          isLoggedIn: true
        })
      )
    ).toEqual({
      ...initialState,
      isLoggedIn: true
    })
  })

  it('Метод сброса пользователя resetUser', () => {
    expect(userReducer(initialState,
        resetUser()
      )
    ).toEqual(initialState)
  })
})
