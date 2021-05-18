import LayoutContext, { LayoutContextModel } from '@App/Components/LayoutContext';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

/*const HeaderStickyOffset = 0;*/

export interface HeaderComponentProps {
  auth: any;
}

const HeaderComponent: any = (props: HeaderComponentProps) => {
  const { doLogout }: LayoutContextModel = useContext(LayoutContext);
  const { auth } = props;
  return (
    <header>
      <div>Header</div>
      {typeof auth !== 'undefined' && (
        <a href="javscript:;" onClick={doLogout}>
          Logout
        </a>
      )}
      {typeof auth === 'undefined' && <Link to="/login">Click here to login</Link>}
    </header>
  );
};

export default HeaderComponent;
