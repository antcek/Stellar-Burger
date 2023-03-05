import AppHeader from "../../components/app-header/app-header";
import { LeftSideMenu } from "../../components/left-side-menu/left-side-menu";
import styles from './orders.module.css';
import { FC } from 'react';
import { useLocation, useNavigate } from "react-router";
import { FormattedDate, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { FEED_MODAl_DETAILS } from "../../services/actions/ingredient-details";
import { IUseLocation } from "../../services/types/types";
import { AnimatePresence,motion } from "framer-motion";
import Modal from "../../components/modal/modal";
import { CreatedOrderDetails } from "../../components/created-order-details/created-order-details";
import { useSelector, useDispatch } from "../../services/types/hooks";


export const OrderPage: FC = () => {

  const navigate = useNavigate();
  const today = new Date();
  const dispatch = useDispatch();
  const location: IUseLocation = useLocation();
  const createdOrderVisible = useSelector((store) => store.ingredientDetails.visible);

  function onCloseModal(): void {

    dispatch({
      type: FEED_MODAl_DETAILS,
      product: null,
      visible: false
    });

    if (location.pathname.startsWith('/profile/orders')) {
      navigate('/profile/orders/', { replace: true })
    }

  };

  const handleClick = () => {

    dispatch({
      type: FEED_MODAl_DETAILS,
      visible: true
    });

    navigate(`/profile/orders/${124}`);
  }

  return (
    <>
      <AppHeader />
      <div className={styles.container}>
        <LeftSideMenu />
        <div className={styles.cardWrapper}>
          <div onClick={handleClick} className={styles.order}>
            <div className={styles.cardTop}>
              <p className="text text_type_digits-default">#034535</p>
              <FormattedDate
                date={
                  new Date(
                    today.getFullYear(),
                    today.getMonth(),
                    today.getDate(),
                    today.getHours(),
                    today.getMinutes() - 1,
                    0,
                  )
                }
                className={styles.date}
              />
            </div>
            <h1 className="text text_type_main-medium pb-2 ">
              Death Star Starship Main бургер
            </h1 >
            <p className="text text_type_main-default pb-6">
              Готовится
            </p>
            <div className={styles.cardBottom}>
              <div className={styles.burger}>
                {/* выводить массив через arr.reverse.map ...  */}
                <svg className={styles.ingredient} width="64" height="64" viewBox="0 0 64 64" fill="#131316" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                  <g clipPath="url(#clip0_16791_2983)">
                    <rect width="64" height="64" rx="32" fill="#131316" />
                    <mask id="mask0_16791_2983" maskUnits="userSpaceOnUse" x="-24" y="4" width="112" height="56">
                      <rect x="-24" y="4" width="112" height="56" fill="black" />
                    </mask>
                    <g mask="url(#mask0_16791_2983)">
                      <rect x="-24" y="4" width="112" height="56" fill="url(#pattern0)" />
                    </g>
                  </g>
                  <rect x="1" y="1" width="62" height="62" rx="31" stroke="url(#paint0_linear_16791_2983)" strokeWidth="2" />
                  <defs>
                    <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
                      <use xlinkHref="#image0_16791_2983" transform="scale(0.00150602 0.00301205)" />
                    </pattern>
                    <linearGradient id="paint0_linear_16791_2983" x1="1.44676e-06" y1="64" x2="76.7401" y2="25.1941" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#801AB3" />
                      <stop offset="1" stopColor="#4C4CFF" />
                    </linearGradient>
                    <clipPath id="clip0_16791_2983">
                      <rect width="64" height="64" rx="32" fill="white" />
                    </clipPath>
                  </defs>
                  {/* вставлять нужную картинку! */}
                  <image xlinkHref={`https://code.s3.yandex.net/react/code/bun-01.png`} width="112" height="56" x="0" y="0" />
                </svg>
                <svg className={styles.ingredient} width="64" height="64" viewBox="0 0 64 64" fill="#131316" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                  <g clipPath="url(#clip0_16791_2983)">
                    <rect width="64" height="64" rx="32" fill="#131316" />
                    <mask id="mask0_16791_2983" maskUnits="userSpaceOnUse" x="-24" y="4" width="112" height="56">
                      <rect x="-24" y="4" width="112" height="56" fill="black" />
                    </mask>
                    <g mask="url(#mask0_16791_2983)">
                      <rect x="-24" y="4" width="112" height="56" fill="url(#pattern0)" />
                    </g>
                  </g>
                  <rect x="1" y="1" width="62" height="62" rx="31" stroke="url(#paint0_linear_16791_2983)" strokeWidth="2" />
                  <defs>
                    <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
                      <use xlinkHref="#image0_16791_2983" transform="scale(0.00150602 0.00301205)" />
                    </pattern>
                    <linearGradient id="paint0_linear_16791_2983" x1="1.44676e-06" y1="64" x2="76.7401" y2="25.1941" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#801AB3" />
                      <stop offset="1" stopColor="#4C4CFF" />
                    </linearGradient>
                    <clipPath id="clip0_16791_2983">
                      <rect width="64" height="64" rx="32" fill="white" />
                    </clipPath>
                  </defs>

                </svg>
                {/* для бургера с длинной >5 - отдельно выводить круг с opacity 0.6 с условным рендером */}
              </div>

              <div className={styles.price}>
                <p className="text text_type_digits-default">480</p>
                <CurrencyIcon type="primary" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {createdOrderVisible &&
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Modal onCloseModal={onCloseModal}>
              {<CreatedOrderDetails />}
            </Modal>
          </motion.div>}
      </AnimatePresence>
    </>
  )
}