import React from 'react';
import {Button} from 'react-bootstrap';
import Card from './Card';

export default class PlayableCard extends React.Component {
  render() {
    return (
      <Button>
        <Card card={this.props.card} />
      </Button>
    );
  }
}