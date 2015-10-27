import React from 'react';

export default class Game extends React.Component {
  render() {
    return <h1>{this.props.params.id}</h1>;
  }
};