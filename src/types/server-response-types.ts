import {IOrder, TIngredients, TOrders, TUser} from "./types";

// Для расширения всех ошибок
export type ExtendedErrorResponse = {
  status: string | number;
  data?: MessageResponse;
}

export interface SuccessApiResponse {
  success: boolean
}

// Ответ на запрос создания заказа
export interface CreateOrderResponse extends SuccessApiResponse {
  name: string,
  order: IOrder
}

// Ответ на обновление токена
export interface UpdateTokenResponse extends SuccessApiResponse {
  accessToken: string;
  refreshToken: string
}

// Пользовательские ответы
export interface SuccessLoginResponse extends UpdateTokenResponse {
  user: TUser
}

interface MessageResponse extends SuccessApiResponse {
  message: string
}

export interface SuccessLogoutResponse extends MessageResponse {
}

export interface SuccessForgotResponse extends MessageResponse {
}

export interface SuccessResetResponse extends MessageResponse {
}

export interface SuccessRegistrationResponse extends UpdateTokenResponse {
  user: TUser
}

// Ответ на запрос ингредиентов с сервера
export interface IngredientsResponse extends SuccessApiResponse {
  data: TIngredients
}

// Ответ на запрос ордеров
export type OrderResponse = {
  success: boolean;
  orders: TOrders;
  total: number;
  totalToday: number;
}
