import React, { useState } from 'react';
import { IonButton, IonLoading, IonAlert, IonTextarea } from "@ionic/react";
import { searchCall } from '../../logic/DataManagerCall';
import { CardItem } from '../../pages/Pricer/Pricer';

////////////////////////////////////////////////////////
/*Props*/
////////////////////////////////////////////////////////

interface Current_Props {
  searchString    : string,
  placeholderText : string,
  cardAdderUpdater: (cardToAdd : CardItem) => void,
}

////////////////////////////////////////////////////////
/*Component*/
////////////////////////////////////////////////////////

const BulkBar = (props : Current_Props) => {

  ////////////////////////
  /*Variables*/
  ////////////////////////

  //Props Variables
  let placeholderText : string = props.placeholderText;
  let cardAdderUpdater : (cardToAdd : CardItem) => void = props.cardAdderUpdater;

  ////////////////////////
  /*Hooks*/
  ////////////////////////

  const [showAlert1, setShowAlert1] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [searchString, setSearchString] = useState(props.searchString);

  ////////////////////////
  /*Rendering*/
  ////////////////////////

  return (
    <div>

      <IonTextarea 
        inputmode="text" 
        placeholder={placeholderText}
        value={searchString} 
        onIonChange={
          e => {
            setSearchString(e.detail.value!);
          } 
        }
      />
      
      <IonButton 
        color="primary"
        expand="block"
        fill="solid"
        size="large"
        text-align="center"
        class="searchButton"
        onClick={() => {
          
          setShowLoading(true)
          searchString.split("\n").forEach( (row : string) => {
            searchCall(row, setShowLoading, setShowAlert1, cardAdderUpdater);
          })
          
        }}
      >
        {"Bulk Add"}
      </IonButton>
      
      <IonLoading
        cssClass='ionLoading'
        isOpen={showLoading}
        onDidDismiss={() => setShowLoading(false)}
        message={'Searching for "' + searchString + '"'}
        duration={10000}
      />

      <IonAlert
        isOpen={showAlert1}
        onDidDismiss={() => setShowAlert1(false)}
        cssClass='failed'
        header={'Error'}
        subHeader={'Failed to Get Card Information'}
        message={"Please make sure to check the spelling of the search term"}
        buttons={['OK']}
      />

    </div>
  );
}

export default BulkBar;