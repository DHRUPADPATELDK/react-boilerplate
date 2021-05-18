declare module 'react-currency-format' {
  //ReactCurrencyFormat
  export interface ReactCurrencyFormatProps {
    [key: string]: any;
    prefix?: string;
    suffix?: string;
    thousandSeparator?: string | boolean;
    thousandSpacing?: string;
    decimalSeparator?: string;
    decimalScale?: number;
    fixedDecimalScale?: boolean;
    allowNegative?: boolean;
    value?: number | string;
    isNumericString?: boolean;
    displayType?: string;
    type?: string;
    format?: string;
    removeFormatting?: any;
    mask?: string;
    customInput?: any;
    onValueChange?: any;
    isAllowed?: boolean;
    renderText?: any;
  }

  export interface ReactCurrencyFormatState {
    [key: string]: any;
  }

  export default class ReactCurrencyFormat extends React.Component<
    ReactCurrencyFormatProps,
    ReactCurrencyFormatState
    > { }

}
