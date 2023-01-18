import React, { } from 'react';
import styles from './burger-ingredients.module.css';
import IngredientCard from '../burger-ingredients-card/burger-ingredients-card';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal.jsx';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { useDispatch, useSelector } from 'react-redux';
import { CURRENT_INGREDIENT_DETAILS } from '../../services/actions/ingredient-details';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useDrag } from 'react-dnd/dist/hooks';

function BurgerIngredients() {

    const dispatch = useDispatch();

    const products = useSelector((store) => store.getProducts.products);

    const [current, setCurrent] = React.useState('Булки');

    const modalVisible = useSelector(store => store.ingredientDetails.visible);

    const currentTarget = useSelector(store => store.ingredientDetails.current);

    const buns = products.filter(ingredient => ingredient.type === 'bun');
    const main = products.filter(ingredient => ingredient.type === 'main');
    const sauce = products.filter(ingredient => ingredient.type === 'sauce');

    const ingredientsContainer = document.querySelector(`.${styles.container}`);
    const scrollBun = document.getElementById('bun');
    const scrollMain = document.getElementById('main');
    const scrollSauce = document.getElementById('sauce');



    const categoryChange = (value) => {

        setCurrent(value);

        const scrollCategory = () => {

            if (value === 'Булки') {
                return (scrollBun.getBoundingClientRect().top - ingredientsContainer.getBoundingClientRect().top)
            }

            else if (value === 'Соусы') {
                return (scrollSauce.getBoundingClientRect().top - ingredientsContainer.getBoundingClientRect().top)
            }

            else if (value === 'Начинки') {
                return (scrollMain.getBoundingClientRect().top - ingredientsContainer.getBoundingClientRect().top)
            }
        };
        ingredientsContainer.scrollBy(0, scrollCategory());
    };

    const scrollNavigation = () => {

        if (Math.abs(scrollBun.getBoundingClientRect().top - ingredientsContainer.getBoundingClientRect().top)
            < Math.abs(scrollSauce.getBoundingClientRect().top - ingredientsContainer.getBoundingClientRect().top)) {
            setCurrent('Булки');
        }

        else setCurrent('Соусы');

        if (Math.abs(scrollMain.getBoundingClientRect().top - ingredientsContainer.getBoundingClientRect().top)
            < Math.abs(scrollSauce.getBoundingClientRect().top - ingredientsContainer.getBoundingClientRect().top)) {
            setCurrent('Начинки');
        };

    }

    function onOpenModal(event) {

        const currentTarget = event.currentTarget;
        const targetProduct = products.find((product) => product._id === currentTarget.getAttribute('id'))

        dispatch({
            type: CURRENT_INGREDIENT_DETAILS,
            product: targetProduct,
            visible: true,
        })

    };

    function onCloseModal() {

        dispatch({
            type: CURRENT_INGREDIENT_DETAILS,
            product: null,
            visible: false,
        });
    };


    return (
        <section className={styles.ingredients} >
            <h1 className="text text_type_main-large">
                Соберите бургер
            </h1 >
            <div className={styles.tabs} >
                <div style={{ display: 'flex' }}>
                    <Tab value="Булки" active={current === 'Булки'} onClick={categoryChange}>
                        Булки
                    </Tab>
                    <Tab value="Соусы" active={current === 'Соусы'} onClick={categoryChange}>
                        Соусы
                    </Tab>
                    <Tab value="Начинки" active={current === 'Начинки'} onClick={categoryChange}>
                        Начинки
                    </Tab>
                </div>
            </div>

            <div onScroll={scrollNavigation} className={styles.container} >
                <p id="bun" className="text text_type_main-medium ">
                    Булки
                </p>
                <div className={styles.wrapper}>

                    {buns.map((product) => <IngredientCard product={product} onOpenModal={onOpenModal}  />)}
                </div>
                <p id="sauce" className="text text_type_main-medium mt-10">
                    Соусы
                </p>
                <div className={styles.wrapper} >
                    <IngredientCard onOpenModal={onOpenModal} category={sauce} />
                </div>
                <p id="main" className="text text_type_main-medium mt-10">
                    Начинки
                </p>
                <div className={styles.wrapper}>
                    <IngredientCard onOpenModal={onOpenModal} category={main} />
                </div>

            </div>

            {modalVisible && <Modal onCloseModal={onCloseModal}>
                {currentTarget ? <IngredientDetails products={products} onCloseModal={onCloseModal} />
                    : <></>}
            </Modal>}
        </section>

    )
}

BurgerIngredients.propTypes = {

}

export default BurgerIngredients;