import React, { useState, useRef, useEffect } from 'react';
import AppHeader from '../../components/app-header/app-header';
import styles from './forgot-password.module.css';
import { EmailInput, PasswordInput, Button, Input } from '@ya.praktikum/react-developer-burger-ui-components'
import { Link } from 'react-router-dom';
import { recoverPassword } from '../../services/thunk-actions/thunk-actions';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


export function ForgotPasswordPage() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const passwordRecovered = useSelector(store => store.recoverPassword.recoverSuccess)

  const [loginValue, setLoginValue] = useState('')
  const onLoginForgot = e => {
    setLoginValue(e.target.value)
  };

  useEffect(() => {
    if (passwordRecovered) {
      navigate('/reset-password', { replace: true })
    }
  }, [passwordRecovered])



  return (
    <>
      <AppHeader />
      <div className={styles.container}>
        <p className="text text_type_main-medium ">
          Восстановление пароля
        </p>
        <EmailInput onChange={onLoginForgot}
          value={loginValue}
          name={'email'}
          isIcon={false}
          placeholder="Укажите e-mail" />

        <Button onClick={() => dispatch(recoverPassword(loginValue))} htmlType="button" type="primary" size="large">
          Восстановить
        </Button>

      </div>
      <div className={styles.forgotPassword}>
        <p className="text text_type_main-default  text_color_inactive">
          Вмпомнили пароль?
        </p>
        <Link to='/login'>
          <Button htmlType="button" type="secondary" size="medium" extraClass={styles.button}>
            Войти
          </Button>
        </Link>
      </div>
    </>
  )
}