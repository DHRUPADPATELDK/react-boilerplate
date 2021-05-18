import { doLogin, fetchLoginUser, loginReset, LoginStateProps, LoginUserProps } from '@App/Redux/Auth';
import React, { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import { reduxForm } from 'redux-form';
import LoginScene from './LoginScene';

export interface LoginContainerProps {
  handleSubmit: (data: any) => () => void;
  pristine: boolean;
  submitting: boolean;
  error: string;
}

const LoginContainer: any = (props: LoginContainerProps) => {
  const { handleSubmit, pristine, /** reset, */ submitting, error } = props;
  const loginState: LoginStateProps = useSelector((state: any) => state.login);
  const loginUser: LoginUserProps = useSelector((state: any) => state.loginUser);
  const [cookies, setCookie]: any = useCookies(['auth']);
  const dispatch = useDispatch();

  const onSubmit = (values: any) => {
    // Handle data
    dispatch(doLogin(values));
  };

  useEffect(() => {
    if (loginUser.isLogin && loginState.data) {
      setCookie('auth', JSON.stringify(loginState.data), { path: '/' });
    }
    return () => {};
  }, [loginUser]);

  useEffect(() => {
    if (loginState && loginState.data && loginState.data.isLoggedIn) {
      dispatch(fetchLoginUser({ authorization: 'das3424sadsad' }));
    }
    // if (loginState && loginState.data && loginState.data.accessToken) {
    //   dispatch(fetchLoginUser({ authorization: loginState.data.accessToken }));
    // }
    return () => {};
  }, [loginState]);

  useEffect(() => {
    return () => {
      // Reset the login state
      dispatch(loginReset());
    };
  }, []);

  if (cookies.auth) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <LoginScene
      isLoading={submitting}
      error={error}
      form={{
        pristine,
        submitting,
      }}
      onLogin={handleSubmit(onSubmit)}
    />
  );
};

const LoginForm: any = reduxForm({
  form: 'login',
})(LoginContainer);

export default LoginForm;
