declare module '@pawjs/pawjs/src/router/handler' {
  import { AsyncSeriesHook } from 'tapable';
  class RouteHandler {
    public hooks: {
      initRoutes: AsyncSeriesHook<any[]>;
    };
    public addRoutes(routes: any[]): void;
    public setPwaSchema(schema: any): void;
    public setDefaultSeoSchema(schema: any): void;
    public setDefaultAllowedLoadDelay(delay: number): void;
    public setDefaultLoaderComponent(Component: any): void;
    public set404Component(Component: any): void;
  }
  export default RouteHandler;
}
declare module '@pawjs/srcset/picture' {
  export interface PictureProps {
    image?: any;
    alt?: string;
    pictureClassName?: string;
    imgClassName?: string;
    width?: string;
    title?: string;
  }

  export interface PictureState {
  }

  export default class Picture extends React.Component<
    PictureProps,
    PictureState
    > { }
}
