declare module 'react-structured-data' {
  //JSONLD
  export interface JSONLDProps {
    [key: string]: any
  }

  export interface JSONLDState {
    [key: string]: any
  }

  export class JSONLD extends React.Component<
    JSONLDProps,
    JSONLDState
    > { }

  //Product
  export interface ProductProps {
    [key: string]: any
  }

  export interface ProductState {
    [key: string]: any
  }

  export class Product extends React.Component<
    ProductProps,
    ProductState
    > { }

  // AggregateRating
  export interface AggregateRatingProps {
    [key: string]: any
  }

  export interface AggregateRatingState {
    [key: string]: any
  }

  export class AggregateRating extends React.Component<
    AggregateRatingProps,
    AggregateRatingState
    > { }

  // GenericCollection
  export interface GenericCollectionProps {
    [key: string]: any
  }

  export interface GenericCollectionState {
    [key: string]: any
  }

  export class GenericCollection extends React.Component<
    GenericCollectionProps,
    GenericCollectionState
    > { }

  // Generic
  export interface GenericProps {
    [key: string]: any
  }

  export interface GenericState {
    [key: string]: any
  }

  export class Generic extends React.Component<
    GenericProps,
    GenericState
    > { }

  // Review
  export interface ReviewProps {
    [key: string]: any
  }

  export interface ReviewState {
    [key: string]: any
  }

  export class Review extends React.Component<
    ReviewProps,
    ReviewState
    > { }

  // Author
  export interface AuthorProps {
    [key: string]: any
  }

  export interface AuthorState {
    [key: string]: any
  }

  export class Author extends React.Component<
    AuthorProps,
    AuthorState
    > { }


  // Location
  export interface LocationProps {
    [key: string]: any
  }

  export interface LocationState {
    [key: string]: any
  }

  export class Location extends React.Component<
    LocationProps,
    LocationState
    > { }

  // Rating
  export interface RatingProps {
    [key: string]: any
  }

  export interface RatingState {
    [key: string]: any
  }

  export class Rating extends React.Component<
    RatingProps,
    RatingState
    > { }
}
