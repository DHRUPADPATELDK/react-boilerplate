import { roundToPrecision } from '@App/Libs/utils';
import { config } from 'config';
import React from 'react';
import { useCookies } from 'react-cookie';
import CurrencyFormat, { ReactCurrencyFormatProps } from 'react-currency-format';
import { useSelector } from 'react-redux';

export interface MultiCurrencyProps {
  price: number | Currency.Object;
  formatConfig?: ReactCurrencyFormatProps;
  currencyRate?: any;
  currency?: string;
  trimDecimal: boolean;
  // Default true, Setting work as below.
  // 29.00 => 29,-
  // 29.23 => 29,23
}

const MultiCurrencyComponent: any = (props: MultiCurrencyProps) => {
  const { trimDecimal = true } = props;
  let { price = 0, currencyRate, currency, formatConfig = {} } = props;

  if (!currency) {
    const [cookie]: any = useCookies(['currency']);
    currency = cookie.currency;
  }

  if (!currencyRate) {
    currencyRate = useSelector((state: any) => state.currencyRate && state.currencyRate.data);
  }

  if (!price) {
    price = 0;
  }

  price = Number(price) * (currencyRate[currency] || 1);

  if (trimDecimal) {
    price = Number(roundToPrecision(price.toString(), 2 /* decimalScale */, true /* fixedDecimalScale */));
    if (Number.isInteger(price)) {
      formatConfig = {
        ...formatConfig,
        suffix: ',-',
        decimalScale: 0,
      };
    }
  }

  // const currencySign: any = config.CURRENCY_SIGN;
  const defaultCurrencyFormat: any = config.DEFAULT_CURRENCY_FORMAT;

  return (
    <CurrencyFormat
      value={price}
      // value={typeof price === 'object' ? Number(price[currency]) : Number(price)}
      displayType="text"
      fixedDecimalScale={true}
      thousandSeparator="."
      decimalSeparator=","
      decimalScale={2}
      {...defaultCurrencyFormat[currency]}
      {...formatConfig}
    />
  );
};

export default MultiCurrencyComponent;
