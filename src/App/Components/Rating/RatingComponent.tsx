import starGrey from '@Public/images/star-grey.svg';
import starYellow from '@Public/images/star-yellow.svg';
import React from 'react';
import Rating from 'react-rating';

const RatingComponent: any = (props) => (
  <Rating
    emptySymbol={<img src={starGrey} alt="empty-star" className="icon" aria-hidden="true" width={16} height={15} />}
    fullSymbol={<img src={starYellow} alt="full-star" className="icon" aria-hidden="true" width={16} height={15} />}
    fractions={2}
    readonly
    {...props}
  />
);

export default RatingComponent;
