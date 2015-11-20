import React from 'react';
import {Button} from 'react-bootstrap';
import Card from './Card';

export default function PlayableCard(props) {
  return (
    <Button>
      <Card card={props.card} />
    </Button>
  );
}