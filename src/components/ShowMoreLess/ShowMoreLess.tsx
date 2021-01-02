import { IonIcon } from '@ionic/react';
import React from 'react';
import { getIconString } from './Logic/ShowMoreLessLogic';

////////////////////////////////////////////////////////
/*Props*/
////////////////////////////////////////////////////////

interface ShowMoreLessProps {
  isShow : boolean
}

////////////////////////////////////////////////////////
/*Component*/
////////////////////////////////////////////////////////

/**
 * Displays the ShowMoreLessIcon.
 * It either shows the arrow pointing up or down depending on the props.
 */
const ShowMoreLess = (props : ShowMoreLessProps) => {

  const iconString : string = getIconString(props.isShow);

  return (
    <IonIcon
      icon={iconString}
    />
  );
}

export default ShowMoreLess;