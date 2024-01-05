import {FC} from "react";
import OrderDetails from "../components/order-details/order-details";
import IngredientDetails from "../components/ingredient-details/ingredient-details";

// Для формы
export type FormUserData = Record<'email' | 'name' | 'password', string>

// Для модальных окон
type ModalComponent = Record<string, FC>;
export const modalComponent: ModalComponent = {
  'OrderDetails': OrderDetails,
  'IngredientDetails': IngredientDetails,
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

export type TIngredientConstructor = TIngredient & { uuid: string }

// Для Drag and Drop
export interface ICollectionPropsDrag {
  isDragging: boolean
}
