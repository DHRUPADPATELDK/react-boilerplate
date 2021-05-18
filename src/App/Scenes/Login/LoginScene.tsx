import LayoutContext, { LayoutContextModel } from '@App/Components/LayoutContext';
import { email, requiredLabel } from '@App/Libs/validators';
import Button from '@Components/Theme/Button/ButtonComponent';
import { InputField } from '@Components/Theme/FormFields/FormFieldsComponent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { Field } from 'redux-form';

import LoginStyles from './styles.scss';

export interface LoginSceneProps {
  isLoading: boolean;
  error: string;
  form: {
    pristine: boolean;
    submitting: boolean;
  };
  onLogin: any;
}

const usernameRequired = requiredLabel('emailAddress');
const passwordRequired = requiredLabel('password');

const LoginScene: any = (props: LoginSceneProps) => {
  const {
    onLogin,
    form: { pristine, submitting },
    isLoading,
    error,
  } = props;
  const { translate }: LayoutContextModel = useContext(LayoutContext);
  // const { isMobile }: DeviceDetectionContextModel = useContext(DeviceDetectionContext);

  return (
    <form className={`${LoginStyles.wrapper} loginWrapper`} onSubmit={onLogin}>
      <div className="row justify-content-md-center mt-5">
        <div className="col-3">
          <h4 className="mb-3 text-center">Login Page</h4>
          <div className="row">
            <div className={`col-12`}>
              <Field
                label={translate('emailAddress')}
                name="username"
                component={InputField}
                type="text"
                validate={[usernameRequired, email]}
                autoCapitalize="none"
                placeholder={translate('emailAddress')}
              />
              <Field
                label={translate('password')}
                className="form-control"
                name="password"
                component={InputField}
                type="password"
                autoComplete="current-password"
                validate={[passwordRequired]}
                autoCapitalize="none"
                placeholder={translate('password')}
              />
              {error && <div className="alertBox alertBoxDanger">{error}</div>}
              <div className={`${LoginStyles.loginBottomNav} loginBottomNav`}>
                <div className="d-flex justify-content-md-end">
                  <Button
                    className="btn-secondary"
                    id="loginFormSubmitBtn"
                    type="submit"
                    disabled={pristine || submitting || isLoading}
                  >
                    {translate('loginWord')}
                  </Button>
                </div>
                <div className={`${LoginStyles.forgotPassword} forgotPassword`}>
                  <NavLink to="/forgot-password">
                    {/* <FontAwesomeIcon icon={['far', 'arrow-alt-circle-right']} /> */}
                    {translate('login.forgotPassLabel')}?
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default LoginScene;
