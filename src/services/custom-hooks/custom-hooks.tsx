import { useLocation } from "react-router";
import { useEffect, useState } from 'react';
import { CURRENT_INGREDIENT_DETAILS } from "../actions/ingredient-details";
import { useDispatch } from "react-redux";
import { IUseLocation } from "../types/types";

export type TValues = {
    name?: string;
    email?: string;
    password?: string;
}

export const useModalData = (): void => {

    const dispatch = useDispatch();
    const location: IUseLocation = useLocation();
    const locationUrlIndex = location.pathname.indexOf('/ingredients/');
    const locationIngredientId = location.pathname.substring(locationUrlIndex + '/ingredients/'.length)

    const storageToken = localStorage.getItem('modalData');
    const modalIngredient = typeof storageToken === 'string' ? JSON.parse(storageToken) : null;


    useEffect(() => {
        if (locationIngredientId === modalIngredient?._id) {
            dispatch({
                type: CURRENT_INGREDIENT_DETAILS,
                product: modalIngredient,
                visible: true,
            })
        }
        // ругается на modalIngredients, который в зависимостях даёт бесконечный рендер
    }, [locationIngredientId, dispatch]) // eslint-disable-line
}

export function useForm(nameValue: TValues) {
    const [values, setValues] = useState(nameValue);

    const handleChange = (event: any): void => {
        const { value, name } = event.target;
        setValues({ ...values, [name]: value });
    };

    return { values, handleChange, setValues };
}