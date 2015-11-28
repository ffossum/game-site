import React from 'react';

export default class Card extends React.Component {
  render() {
    return <div>{this.props.card}</div>;
  }
}