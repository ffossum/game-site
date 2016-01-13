import React from 'react';
import * as messageKeys from '../../constants/messageKeys';
import {FalcorUsername} from '../common';

export default {
  [messageKeys.GAME_STARTED]: () => <span>{'The game has started'}</span>,
  [messageKeys.PLAYER_RECONNECTED]: ({args}) => <span><FalcorUsername userId={args[0]} />{' has reconnected.'}</span>,
  [messageKeys.PLAYER_JOINED]: ({args}) => <span><FalcorUsername userId={args[0]} />{' has joined the game.'}</span>,
  [messageKeys.PLAYER_LEFT]: ({args}) => <span><FalcorUsername userId={args[0]} />{' has left.'}</span>,
  [messageKeys.PLAYER_DISCONNECTED]: ({args}) => <span><FalcorUsername userId={args[0]} />{' has disconnected.'}</span>,
};
