import React from 'react';
import { IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';

////////////////////////////////////////////////////////
/*Props for CardHeader*/
////////////////////////////////////////////////////////

interface CardHeader_Props {
  title     : string,
  subtitle  : string,
  inverted  : boolean,
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
  const isInverted : boolean = props.inverted;

  //////////////////////////////
  /*Return*/
  //////////////////////////////

  return (
    <IonCardHeader>
      {
        (isInverted)
        ? <div>
          <IonCardSubtitle>{subtitle}</IonCardSubtitle>
          <IonCardTitle>{title}</IonCardTitle>
        </div>
        : <div>
          <IonCardTitle>{title}</IonCardTitle>
          <IonCardSubtitle>{subtitle}</IonCardSubtitle>
        </div>
      }
    </IonCardHeader>
  )

}

export default CardHeader;