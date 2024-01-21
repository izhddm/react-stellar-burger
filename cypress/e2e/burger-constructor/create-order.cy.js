describe('Create order', () => {
  it('Загрузка ингредиентов и оформление заказа', () => {
    cy
      .intercept('api/ingredients', {fixture: 'ingredients.json'}).as('getIngredients')
      .intercept('api/auth/login', {fixture: 'login.json'}).as('loginAuth')
      .intercept({url: 'api/orders', method: 'POST'}, {fixture: 'order-success.json', delay: 3000}).as('orderSuccess')
      .visit('http://localhost:3000/')

      // Ожидаем чтобы загрузились ингредиенты из фикстур
      .wait('@getIngredients')

      // проверим что кол-во загруженных ингредиентов заданное кол-во
      .log('Проверим что кол-во загруженных ингредиентов заданное кол-во')
      .get('[class^="burger-ingredient_container"]').as('ingredients')
      .get('@ingredients').should('have.length', 15)

      // возьмем первый элемент - булочку, и перенесем ее в конструктор
      .log('Возьмем первый элемент - булочку, и перенесем ее в конструктор')
      .get('@ingredients').first().trigger('dragstart')
      .wait(1000)
      .get('[class^="mt-25 burger-constructor_flex-expand"]').trigger('drop')

      // проверим что булочек стало в конструкторе 2
      .log('Проверим что булочек стало в конструкторе 2')
      .get('[class^="constructor-bun_container"]').should('have.length', 2)

      // убедимся что кнопка оформления заказа неактивна
      .log('Убедимся, что кнопка оформления заказа неактивна')
      .get('[class^="burger-price_container"').find('button').as('createOrderBtn').should('be.disabled')

      // Добавим ингредиент
      .log('Добавим третий ингредиент из списка (соус)')
      .get('@ingredients').eq(3).trigger('dragstart')
      .wait(1000)
      .get('[class^="mt-25 burger-constructor_flex-expand"]').trigger('drop')

      // убедимся что кнопка оформления заказа стала активной
      .log('Убедимся, что кнопка оформления заказа стала активной')
      .get('@createOrderBtn').should('not.be.disabled')

      // Пробуем создать заказ
      .log('Попытка создания заказа, должно запросить авторизацию')
      .get('@createOrderBtn').click()

      // Проверяем что открылась страница авторизации
      .log('Проверяем что открылась страница авторизации')
      .get('h2[class^="login-form_title"]').should('have.text', 'Вход')

      // Введем данные email и password
      .log('Введем данные email и password')
      .get('input[name="email"]').type('test@test.com')
      .get('input[name="password"]').type('12345678')
      .get('form[class^="login-form_form"]').submit()

      // Вернулись назад, оформим заказ снова
      .log('Повторная попытка оформления заказа')
      .get('@createOrderBtn').should('not.be.disabled')
      .get('@createOrderBtn').click()

      // Проверим что название кнопки изменилось
      .log('Проверка что название кнопки изменилось')
      .get('@createOrderBtn').should('have.text', 'Оформление заказа...')
      .wait(3000)

      // Проверим что модальное окно появилось с номером заказа 32346
      .log('Проверим что появилось модальное окно с номером заказа 32346')
      .get('#modals h2.text_type_digits-large').should('have.text', '32346')

      .log('Все шаги теста пройдены успешно')
  })
})
