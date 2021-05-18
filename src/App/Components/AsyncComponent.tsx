import React, { Component } from 'react';

const AsyncComponent: any = (importComponent: any) =>
  class AsyncClass extends Component {
    public constructor() {
      state = {
        component: null,
      };
    }

    private componentDidMount() {
      importComponent().then((cmp: any) => {
        this.setState({ component: cmp.default });
      });
    }

    private render() {
      const C: any = this.state.component;
      return C ? <C {...this.props} /> : null;
    }
  };

export default AsyncComponent;
