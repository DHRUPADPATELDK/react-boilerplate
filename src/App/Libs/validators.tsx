export const required = (value: any) => (value || typeof value === 'number' ? undefined : ['validator.required', {}]);

export const requiredLabel = (label: string) => (value: any) =>
  value || typeof value === 'number' ? undefined : ['validator.requiredLabel', label];

// export const requiredTranslate = (t: any) => (value: any) => (value || typeof value === 'number' ? undefined : t('validator.required', {}));

export const maxLength = (max: any) => (value: any) =>
  value && value.length > max ? [`validator.maxLength`, max] : undefined;

export const minLength = (min: any) => (value: any) =>
  value && value.length < min ? [`validator.minLength`, { min }] : undefined;

export const number = (value: any) => (value && isNaN(Number(value)) ? [`validator.number`, {}] : undefined);

export const minValue = (min: any) => (value: any) =>
  value && value < min ? [`validator.minValue`, { min }] : undefined;

export const email = (value: any) =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? [`validator.email`, {}] : undefined;

export const alphaNumeric = (value: any) =>
  value && /[^a-zA-Z0-9 ]/i.test(value) ? [`validator.alphaNumeric`, {}] : undefined;

export const phoneNumber = (value: any) =>
  value && !/^(0|[1-9][0-9]{9})$/i.test(value) ? [`validator.phoneNumber`, {}] : undefined;

export const confirmField = (fieldName: string) => (value: any, allValue: any) => {
  return value && fieldName && allValue && allValue[fieldName] && allValue[fieldName] !== value
    ? ['validator.confirmField', { fieldName }]
    : undefined;
};
