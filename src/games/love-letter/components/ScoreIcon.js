import React from 'react';
import Icon from '../../../components/common/Icon';

if (process.env.APP_ENV === 'browser') {
  require('../stylesheets/score-icon.scss');
}

export default class ScoreIcon extends React.Component {
  render() {
    return <span className="love-letter-score-icon"><Icon type="heart" /></span>;
  }
};
