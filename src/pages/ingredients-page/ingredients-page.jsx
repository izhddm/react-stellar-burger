import React, {useEffect} from 'react';
import HomePage from "../home-page/home-page";
import {useLocation, useParams} from "react-router-dom";
import IngredientDetails from "../../components/ingredient-details/ingredient-details";
import {useDispatch, useSelector} from "react-redux";
import {useGetIngredientsQuery} from "../../services/api/ingredient-api";
import {setContentModal} from "../../services/slices/modal-slice";

function IngredientsPage() {
  const dispatch = useDispatch();
  const {data} = useGetIngredientsQuery();
  const {id} = useParams()

  // Проверим что ссылку открыли программно
  const location = useLocation();
  const hasState = !!location?.state?.modal;

  let element = useSelector(state => state.modal.data);
  const listIngredients = data?.data ?? [];

  useEffect(() => {
    if (hasState && !element && listIngredients.length > 0) {
      // Move the dispatch logic to useEffect
      const selectedElement = listIngredients.find((el) => el._id === id);

      dispatch(
        setContentModal({
          componentName: 'IngredientDetails',
          data: selectedElement,
        })
      );
    }
  }, [element, hasState, id, listIngredients]);

  // У нас нет модалки
  if (hasState) {
    // Фон из главной страницы
    return <HomePage />;
  }

  return <IngredientDetails />;
}

export default IngredientsPage;
