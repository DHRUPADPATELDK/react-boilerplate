import { getDescendantProp } from '@App/Libs/utils';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export interface FieldWrapperComponentProps {
  children?: any;
  formName?: any;
  fieldName?: string;
}

const FieldWrapperComponent = (props: FieldWrapperComponentProps) => {
  const { children, fieldName, formName } = props;
  const formState = useSelector((state: any) => state.form[formName]);
  const [touched, setTouched] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errors, setErrors] = useState(null);

  useEffect(() => {
    if (formState && formState.fields) {
      const field = getDescendantProp(formState.fields, fieldName);
      if (field) {
        setTouched(field.touched);
      }
    }

    if (formState && formState.syncErrors) {
      const syncError = getDescendantProp(formState.syncErrors, fieldName);
      setErrors(syncError);
      if (syncError) {
        setHasError(true);
      } else {
        setHasError(false);
      }
    }
    if (formState && formState.asyncErrors) {
      const asyncError = getDescendantProp(formState.asyncErrors, fieldName);
      setErrors(asyncError);
      if (asyncError) {
        setHasError(true);
      } else {
        setHasError(false);
      }
    }
    if (formState && !formState.syncErrors && !formState.asyncErrors) {
      setErrors(null);
      setHasError(false);
    }
    return () => {};
  }, [formState]);

  return children({ touched, hasError, errors });
};

export default FieldWrapperComponent;
