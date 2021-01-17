import { IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonNote, IonSelect, IonSelectOption, IonText } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { CardInformation } from '../../../dataManagers/DataMangerInterfaces';
import { CardItem } from '../Lister';
import { Plugins } from '@capacitor/core';
import { PriceURLs } from '../../../logic/Pricers/PricerInterfaces';
import { StarCityGames } from '../../../logic/Pricers/SCG/StarCityGames';
import { car, card } from 'ionicons/icons';

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

const SingleItem = (props : Current_Props) => {

  ////////////////////////
  /*Variables*/
  ////////////////////////

  /*Constant Fields*/
  const { Browser } = Plugins;
  const swapToFoil : string = "Swap to Foil"
  const swapToNonFoil : string = "Swap to Non-Foil"
  const scgLinker : StarCityGames = new StarCityGames("");

  /*Retrieve Information from Props*/
  const info : CardItem = props.info;
  const removeCardUpdater : (cardToRemove : CardItem) => void = props.removeCardUpdater;
  const cardInfo  : CardInformation = info.info;
  const isChecked : boolean = info.isChecked;

  /*Information from CardInformation*/
  const name      : string = cardInfo.name;
  let price       : string = cardInfo.price;
  const priceFoil : string = cardInfo.priceFoil;
  const imageURL  : string = cardInfo.imageURL;
  const quantity  : number = cardInfo.quantity;
  let setCode     : string = cardInfo.set.setCode;

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
  
  /**/
  const [isFoil, setIsFoil] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState("");
  const [leftLabel, setLeftLabel] = useState(swapToFoil);

  ////////////////////////
  /*Return*/
  ////////////////////////

  return (
    
    <div>
      <IonItemSliding>

        <IonItemOptions side="start">
          <IonItemOption onClick={() => {
            if (isFoil) {
              setLeftLabel(swapToNonFoil);
              setIsFoil(false);
              setBackgroundColor("");
            } else {
              setLeftLabel(swapToFoil);
              setIsFoil(true);
              setBackgroundColor("secondary");
            }
          }}>{leftLabel}</IonItemOption>
        </IonItemOptions>

        <IonItem
          color={backgroundColor}
        >
          <IonLabel 
            onClick={async () => {
              await scgLinker.getPrices(cardInfo).then((value : PriceURLs) => {
                const url : string = (isFoil) ? value.foil : value.nonFoil;
                Browser.open({ url: url });
              });
            }}
          >
            {name}
          </IonLabel>
          {/* <IonSelect value={setCode} placeholder={setCode} onIonChange={(e) => {console.log(e.detail.value)}}>
            <IonSelectOption value={setCode}>{setCode}</IonSelectOption>
          </IonSelect> */}
          <IonText slot="end">{price}</IonText>
          
        </IonItem>

        <IonItemOptions side="end">
          <IonItemOption onClick={() => removeCardUpdater(info)}>{"Remove"}</IonItemOption>
        </IonItemOptions>
        
      </IonItemSliding>
    </div>
  );
}

export default SingleItem;