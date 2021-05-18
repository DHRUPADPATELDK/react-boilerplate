import Preloader from '@App/Public/images/preloader.svg';
import LayoutContext, { LayoutContextModel } from '@Components/LayoutContext';
import React, { useContext } from 'react';

import DefaultSkeletonStyles from './DefaultSkeletonStyles.scss';

const DefaultSkeleton: any = () => {
  const { translate }: LayoutContextModel = useContext(LayoutContext);

  return (
    <div className={DefaultSkeletonStyles.wrapper}>
      <div className={DefaultSkeletonStyles.backdrop}></div>
      <div className={DefaultSkeletonStyles.preLoader}>
        <img src={Preloader} width={64} alt="Preloader" />
        <span>{translate('loading')}...</span>
      </div>
    </div>
  );
};

export default DefaultSkeleton;
