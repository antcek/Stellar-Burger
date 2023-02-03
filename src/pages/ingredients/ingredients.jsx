import AppHeader from "../../components/app-header/app-header"
import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router";
import { Outlet, } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect, } from 'react';
import { CURRENT_INGREDIENT_DETAILS } from "../../services/actions/ingredient-details";
import { useModalData } from '../../services/custom-hooks/custom-hooks';
import styles from './ingredients.module.css'
import IngredientDetails from "../../components/ingredient-details/ingredient-details";

export function IngredientsPage() {

  const dispatch = useDispatch();
  const location = useLocation();
  const modalIngredient = JSON.parse(localStorage.getItem('modalData'));
  const locationUrlIndex = location.pathname.indexOf('/ingredients/');
  const locationIngredientId = location.pathname.substring(locationUrlIndex + '/ingredients/'.length)

  useEffect(() => {
    if (locationIngredientId === modalIngredient?._id) {
      dispatch({
        type: CURRENT_INGREDIENT_DETAILS,
        product: modalIngredient,
        visible: true,
      })
    }

  }, [locationIngredientId])


  return (
    <>
      <AppHeader />
      <div className={styles.container}>
        <IngredientDetails  />
      </div>
    </>
  )
}