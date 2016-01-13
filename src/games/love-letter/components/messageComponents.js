import React from 'react';
import {FalcorUsername} from '../../../components/common';
import * as messageKeys from '../constants/messageKeys';
import {cards} from '../constants/cards';
import cardTexts from '../constants/cardTexts';

export default {
  [messageKeys.GUARD_CORRECT]: ({args}) => {
    const User = <FalcorUsername userId={args[0]} />;
    const Target = <FalcorUsername userId={args[1]} />;
    const card = args[2];
    return (
      <div>
        <div>{User} {`plays ${cardTexts[cards.GUARD].title}.`}</div>
        <div>{User} {'guesses'} {Target} {`has a ${cardTexts[card].title}.`}</div>
        <div>{'The guess is correct!'} {Target} {'is eliminated!'}</div>
      </div>
    );
  },
  [messageKeys.GUARD_WRONG]: ({args}) => {
    const User = <FalcorUsername userId={args[0]} />;
    const Target = <FalcorUsername userId={args[1]} />;
    const card = args[2];
    return (
      <div>
        <div>{User} {`plays ${cardTexts[cards.GUARD].title}.`}</div>
        <div>{User} {'guesses'} {Target} {`has a ${cardTexts[card].title}.`}</div>
        <div>{'The guess is wrong!'}</div>
      </div>
    );
  },
  [messageKeys.USED_PRIEST]: ({args}) => {
    const User = <FalcorUsername userId={args[0]} />;
    const Target = <FalcorUsername userId={args[1]} />;
    return (
      <div>
        <div>{User} {`plays ${cardTexts[cards.PRIEST].title}.`}</div>
        <div>{User} {'looks at'} {Target}{`'s hand.`}</div>
      </div>
    );
  },
  [messageKeys.HAS_CARD]: ({args}) => {
    const User = <FalcorUsername userId={args[0]} />;
    const card = args[1];
    return (
      <div>{User} {`has a ${cardTexts[card].title}.`}</div>
    );
  },
  [messageKeys.BARON_SUCCESS]: ({args}) => {
    const User = <FalcorUsername userId={args[0]} />;
    const Target = <FalcorUsername userId={args[1]} />;
    return (
      <div>
        <div>{User} {`plays ${cardTexts[cards.BARON].title}.`}</div>
        <div>{User} {'compares hands with'} {Target}{'.'}</div>
        <div>{Target} {'is eliminated!'}</div>
      </div>
    );
  },
  [messageKeys.BARON_FAIL]: ({args}) => {
    const User = <FalcorUsername userId={args[0]} />;
    const Target = <FalcorUsername userId={args[1]} />;
    return (
      <div>
        <div>{User} {`plays ${cardTexts[cards.BARON].title}.`}</div>
        <div>{User} {'compares hands with'} {Target}{'.'}</div>
        <div>{User} {'is eliminated!'}</div>
      </div>
    );
  },
  [messageKeys.BARON_DRAW]: ({args}) => {
    const User = <FalcorUsername userId={args[0]} />;
    const Target = <FalcorUsername userId={args[1]} />;
    return (
      <div>
        <div>{User} {`plays ${cardTexts[cards.BARON].title}.`}</div>
        <div>{User} {'compares hands with'} {Target}{'.'}</div>
        <div>{'They have the same hand!'}</div>
      </div>
    );
  },
  [messageKeys.USED_HANDMAIDEN]: ({args}) => {
    const User = <FalcorUsername userId={args[0]} />;
    return (
      <div>
        <div>{User} {`plays ${cardTexts[cards.HANDMAIDEN].title}`}</div>
        <div>{User} {'is protected until their next turn.'}</div>
      </div>
    );
  },
  [messageKeys.USED_PRINCE]: ({args}) => {
    const User = <FalcorUsername userId={args[0]} />;
    const Target = <FalcorUsername userId={args[1]} />;
    return (
      <div>
        <div>{User} {`plays ${cardTexts[cards.PRINCE].title}.`}</div>
        <div>{Target} {'discards their hand and draws a card.'}</div>
      </div>
    );
  },
  [messageKeys.USED_PRINCE_ON_PRINCESS]: ({args}) => {
    const User = <FalcorUsername userId={args[0]} />;
    const Target = <FalcorUsername userId={args[1]} />;
    return (
      <div>
        <div>{User} {`plays ${cardTexts[cards.PRINCE].title}.`}</div>
        <div>{Target} {`discards the ${cardTexts[cards.PRINCESS].title} and is eliminated!`}</div>
      </div>
    );
  },
  [messageKeys.DREW_DISCARD]: ({args}) => {
    const User = <FalcorUsername userId={args[0]} />;
    return (
      <div>
        {'There were no cards in the deck, so'} {User} {'instead drew the card discarded at the beginning of the round.'}
      </div>
    );
  },
  [messageKeys.USED_KING]: ({args}) => {
    const User = <FalcorUsername userId={args[0]} />;
    const Target = <FalcorUsername userId={args[1]} />;
    return (
      <div>
        <div>{User} {`plays ${cardTexts[cards.KING].title}.`}</div>
        <div>{User} {'switches hands with'} {Target}{'.'}</div>
      </div>
    );
  },
  [messageKeys.USED_COUNTESS]: ({args}) => {
    const User = <FalcorUsername userId={args[0]} />;
    return (
      <div>{User} {`plays ${cardTexts[cards.COUNTESS].title}.`}</div>
    );
  },
  [messageKeys.USED_PRINCESS]: ({args}) => {
    const User = <FalcorUsername userId={args[0]} />;
    return (
      <div>{User} {`plays ${cardTexts[cards.PRINCESS].title} and is eliminated.`}</div>
    );
  },
  [messageKeys.NO_EFFECT]: ({args}) => {
    const User = <FalcorUsername userId={args[0]} />;
    const card = args[1];
    return (
      <div>
        {User} {`plays ${cardTexts[card].title}, but the effect is ignored by ${cardTexts[cards.HANDMAIDEN].title}.`}
      </div>
    );
  }
};
