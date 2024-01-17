import {FC} from "react";
import OrderDetails from "../components/order-details/order-details";
import IngredientDetails from "../components/ingredient-details/ingredient-details";
import {AppDispatch} from "../services/store/store";
import {OrderInfo} from "../components/order-info/order-info";


export type DispatchFunc = () => AppDispatch

// Для Юзера
export type TUser = {
  email: string,
  name: string
}

export type TIsLoggedIn = {
  isLoggedIn: boolean
}

// Авторизация пользователя
export interface UserLoginReques {
  email: string,
  password: string
}

// Для формы
export type FormUserData = Record<keyof TUser | 'password', string>
export type FormForgotValues =  Pick<FormUserData, 'email'>
export type FormResetValues = Pick<FormUserData, 'password'> & { 'token': string }


// Для модальных окон
type ModalComponent = Record<string, FC>;
export const modalComponent: ModalComponent = {
  'OrderDetails': OrderDetails,
  'IngredientDetails': IngredientDetails,
  'FeedDetails': OrderInfo
};

// Ингредиент приходящий с сервера
export type TIngredient = {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile?: string;
  image_large?: string;
  __v?: number;
}

export type TIngredients = TIngredient[];

export type TIngredientConstructor = TIngredient & { uuid: string }

// Для Drag and Drop
export interface ICollectionPropsDrag {
  isDragging: boolean
}

export interface ICollectionPropsDrop {
  isOver: boolean
}

// Ответ с номером созданого заказа
export type TOrder = {
  order: {
    number: number | null
  },
  name: string | null,
}

// Заказы
interface IOrderOwner {
  createdAt: string;
  email: string;
  name: string;
  updatedAt: string
}

export interface IOrder {
  ingredients: (string | null)[];
  _id: string;
  status: string;
  number: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  owner?: IOrderOwner;
}

export type TOrders = IOrder[];

export type TOrderResponse = {
  success: boolean;
  orders: TOrders;
  total: number;
  totalToday: number;
}
