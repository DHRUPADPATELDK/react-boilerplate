declare module 'react-rating' {
  //ReactRating
  export interface ReactRatingProps {
    [key: string]: any;
    start?: number;
    stop?: number;
    step?: number;
    fractions?: number;
    initialRating?: number;
    placeholderRating?: number;
    readonly?: boolean;
    quiet?: boolean;
    direction?: string;
    emptySymbol?: any;
    placeholderSymbol?: any;
    onChange?: (value?: any) => void;
    onClick?: (value?: any) => void;
    onHover?: (value?: any) => void;
  }

  export interface ReactRatingState {
    [key: string]: any
  }

  export default class ReactRating extends React.Component<
    ReactRatingProps,
    ReactRatingState
    > { }

}
