import React from 'react';
import { IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';

////////////////////////////////////////////////////////
/*Props for CardHeader*/
////////////////////////////////////////////////////////

interface CardHeader_Props {
  title     : string,
  subtitle  : string,
}

////////////////////////////////////////////////////////
/*CardHeader*/
////////////////////////////////////////////////////////

const CardHeader: React.FC<CardHeader_Props> = (props : CardHeader_Props) => {

  //////////////////////////////
  /*Variable Initialisation*/
  //////////////////////////////

  const title : string = props.title;
  const subtitle : string = props.subtitle;

  //////////////////////////////
  /*Return*/
  //////////////////////////////

  return (
    <IonCardHeader>
      <IonCardSubtitle>{title}</IonCardSubtitle>
      <IonCardTitle>{subtitle}</IonCardTitle>
    </IonCardHeader>
  )

}

export default CardHeader;