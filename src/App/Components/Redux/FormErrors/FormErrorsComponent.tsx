import LayoutContext from '@App/Components/LayoutContext';
import { RenderErrorComponent } from '@App/Components/Theme/FormFields/FormFieldsComponent';
import { getDescendantProp } from '@App/Libs/utils';
import React, { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { scroller } from 'react-scroll';

export interface FormErrorsComponentProps {
  // Form name to be used while register
  formName: string;
}

const FormErrorsComponent = (props: FormErrorsComponentProps) => {
  const { formName } = props;
  const [errors, setErrors] = useState([]);
  const formState = useSelector((state: any) => state.form[formName]);
  const { translate } = useContext(LayoutContext);

  useEffect(() => {
    if (formState && formState.fields) {
      const tempErrors = [];
      if (formState.syncErrors && formState.submitFailed) {
        const registeredFields = Object.keys(formState.registeredFields);
        registeredFields.forEach((rf) => {
          const field = getDescendantProp(formState.fields, rf);
          if (field && field.touched) {
            const syncError = getDescendantProp(formState.syncErrors, rf);
            if (syncError) {
              tempErrors.push({
                error: syncError,
                field: rf,
              });
            }
          }
        });
      }
      setErrors(tempErrors);
    }
    return () => {};
  }, [formState && formState.fields, formState && formState.syncErrors]);

  if (errors.length === 0) {
    return null;
  }

  return (
    <div className="alertBox alertBoxDanger">
      <ul>
        <li>
          <strong>{translate('checkout.alertBoxHeading')}.</strong>
        </li>
        {errors.map((e, key) => (
          <li key={`form_errors_component_${key}`}>
            <RenderErrorComponent
              error={e.error}
              htmlFor={e.field}
              handleHtmlForElement={(ele) => {
                if (ele.target && ele.target.htmlFor && ele.target.htmlFor === e.field) {
                  setTimeout(() => {
                    scroller.scrollTo(e.field, {
                      smooth: true,
                      duration: 500,
                      offset: -150,
                    });
                  }, 1);
                }
              }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FormErrorsComponent;
