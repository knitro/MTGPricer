import React, { useState } from 'react';
import { IonSearchbar, IonButton, IonLoading, IonAlert } from "@ionic/react";
import './SearchBar.css';
import { emptySearch, SearchState } from '../../states/SearchState';
import { searchCall } from '../../logic/DataManagerCall';
import { CardItem } from '../../pages/Lister/Lister';

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

const SearchBarCards = (props : Current_Props) => {

  ////////////////////////
  /*Variables*/
  ////////////////////////

  //Props Variables
  let placeholderText : string = props.placeholderText;
  let cardAdderUpdater : (cardToAdd : CardItem) => void = props.cardAdderUpdater;

  //Other Initialisations
  let currentSearch: SearchState = Object.assign([], emptySearch);

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

      <IonSearchbar 
        autocomplete="on" 
        inputmode="text" 
        type="search" 
        placeholder={placeholderText}
        value={searchString} 
        onIonChange={
          e => {
            setSearchString(e.detail.value!);
            currentSearch.cardName = searchString;
          } 
        }
        animated={true}
      />
      
      <IonButton 
        color="primary"
        expand="block"
        fill="solid"
        size="large"
        text-align="center"
        class="searchButton"
        onClick={() => {
          currentSearch.cardName = searchString;
          setShowLoading(true)
          searchCall(searchString, setShowLoading, setShowAlert1, cardAdderUpdater);
        }}
      >
        {"Search"}
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

export default SearchBarCards;