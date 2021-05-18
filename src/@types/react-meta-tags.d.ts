declare module 'react-meta-tags' {
  //MetaTags
  export interface MetaTagsProps {
    [key: string]: any
  }

  export interface MetaTagsState {
    [key: string]: any
  }

  export default class MetaTags extends React.Component<
    MetaTagsProps,
    MetaTagsState
    > { }

}
