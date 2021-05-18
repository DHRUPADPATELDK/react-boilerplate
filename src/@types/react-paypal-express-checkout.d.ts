declare module 'react-paypal-express-checkout' {
  export interface PaypalExpressBtnProps {
    env: 'sandbox' | 'production';
    client: {
      sandbox?: string;
      production?: string;
    };
    currency?: string;
    total?: number;
    shipping?: number;
    paymentOptions?: any;
    style?: {
      label?: 'paypal' | 'checkout' | 'pay' | 'installment';
      size?: 'small' | 'medium' | 'large' | 'responsive';
      shape?: 'pill' | 'rect';
      color?: 'gold' | 'blue' | 'silver';
      layout?: 'horizontal' | 'vertical';
      tagline?: boolean;
    };
    onError?: (err: any) => void;
    onCancel?: (data: {
      paymentToken: string;
      cancelUrl: string;
    }) => void;
    onSuccess?: (data: {
      paid: boolean;
      cancelled: boolean;
      payerID: string;
      paymentID: string;
      paymentToken: string;
      returnUrl: string;
    }) => void;
  }

  export interface PaypalExpressBtnState {
    [key: string]: any
  }

  export default class PaypalExpressBtn extends React.Component<
    PaypalExpressBtnProps,
    PaypalExpressBtnState
    > { }
}
