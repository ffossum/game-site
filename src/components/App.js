import React from 'react';
import Menu from '../containers/MenuContainer';

class App extends React.Component {
  render() {
    const {pathname} = this.props.location;

    return (
      <div>
        <Menu activePath={pathname} />
        <div className="main-content">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default App;
