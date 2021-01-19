import { IonCard, IonCardContent, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonNote, IonText } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import CardHeader from '../../../components/Card/CardHeader';
import { CardInformation, SetInformation } from '../../../dataManagers/DataMangerInterfaces';
import { CardItem } from '../CardViewer';

////////////////////////////////////////////////////////
/*Props*/
////////////////////////////////////////////////////////

interface Current_Props {
  info    : CardItem
  removeCardUpdater : (cardToRemove : CardItem) => void
}

////////////////////////////////////////////////////////
/*Component*/
////////////////////////////////////////////////////////

const SingleCard = (props : Current_Props) => {

  ////////////////////////
  /*Variables*/
  ////////////////////////

  /*Constant Fields*/
  const backgroundColourHighlight : string = "secondaryTint"
  const backgroundColour          : string = "secondaryContrast" 

  /*Retrieve Information from Props*/
  const info : CardItem = props.info;
  const removeCardUpdater : (cardToRemove : CardItem) => void = props.removeCardUpdater;
  const cardInfo  : CardInformation = info.info;
  const isChecked : boolean = info.isChecked;

  /*Information from CardInformation*/
  const name      : string = cardInfo.name;
  let price     : string = cardInfo.price;
  const priceFoil : string = cardInfo.priceFoil;
  const imageURL  : string = cardInfo.imageURL;
  const quantity  : number = cardInfo.quantity;
  let set         : SetInformation = cardInfo.set;
  let setCode   : string = set.setCode;

  ////////////////////////
  /*Variable Adjustments*/
  ////////////////////////

  /*Ensure Price Exists, if not, set to Unknown*/
  if ((price === null) || (price.trim().length === 0)) {
    price = "Unknown";
  }

  /*Capitalise Set Code*/
  setCode = setCode.toUpperCase();

  ////////////////////////
  /*Hooks*/
  ////////////////////////

  /*Alert and Loading Display Hooks*/
  const [showLoading, setShowLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  /*Clean Up UseEffect*/
  useEffect(() => {

    console.log("Generated");

    // //Clean up any react states that were set
    // return function cleanup() {
    //   setShowLoading(false);
    //   setShowAlert(false);
    // }
  }, [])

  ////////////////////////
  /*Return*/
  ////////////////////////

  return (
    <IonCard>
      <CardHeader title={name} subtitle={setCode} inverted={false}/>
      <IonCardContent>
        <img src={imageURL} />
      </IonCardContent>
    </IonCard>
  );
}

export default SingleCard;