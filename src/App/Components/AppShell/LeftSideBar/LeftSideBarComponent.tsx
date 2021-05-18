import React from 'react';
import LeftSideBarStyles from './styles.scss';

// export interface LeftSideBarProps {
//   location: string;
//   auth: any;
// }

const LeftSideBarComponent: any = (/**props: LeftSideBarProps*/) => {
  return <div className={`${LeftSideBarStyles.leftSideBar} col-12`}>Left Bar</div>;
};

export default LeftSideBarComponent;
