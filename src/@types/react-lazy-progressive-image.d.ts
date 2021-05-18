declare module 'react-lazy-progressive-image' {
  export interface LazyImageProps {
    placeholder?: string;
    src: string;
  }

  export interface LazyImageState {
    src: string;
    loading: boolean;
    isVisible?: boolean;
    visibilitySensorProps: any;
  }

  export default class ProgressiveImage extends React.Component<
    LazyImageProps,
    LazyImageState
    > { }
}
