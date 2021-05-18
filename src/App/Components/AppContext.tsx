// NOT USING ANYMORE
import React from 'react';

export interface AppContextModel {
  category: Category.Object[];
  menu: Menu.Object[];
}

const initialContext: AppContextModel = {
  category: [],
  menu: [],
};

export default React.createContext(initialContext);
