import React, { useState } from 'react';
import {  IonContent, IonSearchbar, IonButton, IonLoading, IonAlert } from "@ionic/react";
import '../SearchBar.css';
import { useHistory } from 'react-router-dom';
import { emptySearch, SearchState } from '../../../states/SearchState';
import App from '../../../App';

interface SearchBarProps_Cards {
  searchString: string;
  placeholderText: string;
}

const SearchBarCards = (props : SearchBarProps_Cards) => {

  /*Variable Initialisation*/
  //Parameter Variables
  let placeholderText : string = props.placeholderText;

  //Other Initialisations
  const history = useHistory();
  let currentSearch: SearchState = Object.assign([], emptySearch);

  /*Hook Initialisation*/

  const [showAlert1, setShowAlert1] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [searchString, setSearchString] = useState(props.searchString);

  /*Rendering*/
  return (
    <IonContent>

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
        onClick={e => {
          currentSearch.cardName = searchString;
          setShowLoading(true)
          App.dataManager.performSearch(currentSearch).then(async (didPerform) => {
            if (didPerform) {
              setShowLoading(false)
              history.push("/results-display");
            } else {
              setShowLoading(false)
              setShowAlert1(true);
            }
            
          });
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

    </IonContent>
  );
}

export default SearchBarCards;