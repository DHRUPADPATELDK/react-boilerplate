import LayoutContext, { LayoutContextModel } from '@App/Components/LayoutContext';
import React, { useContext } from 'react';

export interface RenderErrorComponentProps {
  error: string[] | string;
  htmlFor?: string;
  handleHtmlForElement?: any;
}

export const RenderErrorComponent: any = (props: RenderErrorComponentProps) => {
  const { error, htmlFor, handleHtmlForElement } = props;
  const { translate }: LayoutContextModel = useContext(LayoutContext);

  if (typeof error === 'string') {
    return error;
  } else if (typeof error === 'object') {
    if (htmlFor) {
      return (
        <span
          onClick={(e) => {
            if (typeof handleHtmlForElement === 'function') {
              handleHtmlForElement(e);
            }
          }}
        >
          {translate(
            error[0],
            typeof error[1] === 'string'
              ? { label: `<label for="${htmlFor}">${translate(error[1]).toLowerCase()}</label>` }
              : error[1],
          )}
        </span>
      );
    } else {
      return translate(
        error[0],
        typeof error[1] === 'string' ? { label: translate(error[1]).toLowerCase() } : error[1],
      );
    }
  }
};

export const InputField: any = ({
  input,
  label,
  placeholder,
  defaultValue,
  className = 'form-control',
  id,
  type,
  autoCapitalize,
  autoComplete,
  meta: { active, touched, error, warning },
  showError = true,
}: any) => {
  return (
    <div
      className={`${touched && !active && error ? 'is-invalid' : ''} ${touched && !error ? 'is-valid' : ''} form-group`}
    >
      <label htmlFor={id}>{label}</label>
      <input
        className={`${touched && !active && error ? 'is-invalid' : ''} ${
          touched && !error ? 'is-valid' : ''
        } ${className}`}
        {...{
          ...input,
          defaultValue,
          id,
          type,
          autoCapitalize,
          autoComplete,
          placeholder,
        }}
      />
      {showError &&
        touched &&
        ((error && (
          <span className="text-danger">
            <RenderErrorComponent error={error} />
          </span>
        )) ||
          (warning && (
            <span className="text-warning">
              <RenderErrorComponent error={warning} />
            </span>
          )))}
    </div>
  );
};

export const InputFieldOnly: any = ({
  input,
  label,
  placeholder,
  defaultValue,
  className = 'form-control',
  id,
  type,
  autoCapitalize,
  autoComplete,
  meta: { active, touched, error, warning },
  showError = true,
}: any) => {
  return (
    <>
      {label && <label htmlFor={id}>{label}</label>}
      <input
        className={`${touched && !active && error ? 'is-invalid' : ''} ${
          (touched || input.value) && !error ? 'is-valid' : ''
        } ${className}`}
        {...{
          ...input,
          defaultValue,
          id,
          type,
          autoCapitalize,
          autoComplete,
          placeholder,
        }}
      />
      {showError &&
        touched &&
        ((error && (
          <span className="text-danger">
            <RenderErrorComponent error={error} />
          </span>
        )) ||
          (warning && (
            <span className="text-warning">
              <RenderErrorComponent error={warning} />
            </span>
          )))}
    </>
  );
};

export const SelectField: any = ({
  input,
  children,
  label,
  defaultValue,
  className = 'form-control',
  id,
  meta: { active, touched, error, warning },
  showError = true,
}: any) => {
  return (
    <div
      className={`${touched && !active && error ? 'is-invalid' : ''} ${touched && !error ? 'is-valid' : ''} form-group`}
    >
      <label htmlFor={id}>{label}</label>
      <select
        className={`${touched && !active && error ? 'is-invalid' : ''} ${
          touched && !error ? 'is-valid' : ''
        } ${className}`}
        {...{
          ...input,
          defaultValue,
          id,
        }}
      >
        {children}
      </select>
      {showError &&
        touched &&
        ((error && (
          <span className="text-danger">
            <RenderErrorComponent error={error} />
          </span>
        )) ||
          (warning && (
            <span className="text-warning">
              <RenderErrorComponent error={warning} />
            </span>
          )))}
    </div>
  );
};

export const SelectFieldOnly: any = ({
  input,
  children,
  label,
  defaultValue,
  className = 'form-control',
  id,
  meta: { active, touched, error, warning },
  showError = true,
}: any) => {
  return (
    <>
      {label && <label htmlFor={id}>{label}</label>}
      <select
        className={`${touched && !active && error ? 'is-invalid' : ''} ${
          touched && !error ? 'is-valid' : ''
        } ${className}`}
        {...{
          ...input,
          defaultValue,
          id,
        }}
      >
        {children}
      </select>
      {showError &&
        touched &&
        ((error && (
          <span className="text-danger">
            <RenderErrorComponent error={error} />
          </span>
        )) ||
          (warning && (
            <span className="text-warning">
              <RenderErrorComponent error={warning} />
            </span>
          )))}
    </>
  );
};
