import React, { useState } from 'react';
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonItem, IonLabel, IonList, IonListHeader, IonPage, IonRadio, IonRadioGroup, IonTitle } from '@ionic/react';
import Header from '../../components/Header/Header';
import uuid from 'uuid';
import ShowMoreLess from '../../components/ShowMoreLess/ShowMoreLess';
import { CardItem, PricerInfo } from './CardViewer';
import SingleCard from './SupportingComponents/SingleCard';
import { CardInformation } from '../../dataManagers/DataMangerInterfaces';
import SearchBar from '../../components/SearchBar/SearchBar';
import CardHeader from '../../components/Card/CardHeader';
import { remove } from 'ionicons/icons';
import BulkBar from '../../components/BulkBar/BulkBar';

////////////////////////////////////////////////////////
/*Enums*/
////////////////////////////////////////////////////////

enum Ordering {
  DATE_ADDED, 
  PRICE,
  NAME,
}

////////////////////////////////////////////////////////
/*Props and State*/
////////////////////////////////////////////////////////

interface Current_Props {
  state : PricerInfo
  addCard : (cardToAdd : CardItem) => void
  removeCard : (cardToRemove : CardItem) => void
  removeAllCards : () => void
}

////////////////////////////////////////////////////////
/*Component*/
////////////////////////////////////////////////////////

const CardViewerDisplay = (props : Current_Props) => {

  ////////////////////////
  /*Variables*/
  ////////////////////////

  /*From State Props*/
  const state : PricerInfo = props.state;
  const cards : CardItem[] = state.cards;
  const notes : string[] = state.notes;

  /*Settings*/
  const settingsColor : string = "secondary";

  ////////////////////////
  /*Hooks*/
  ////////////////////////

  /*Filter Hooks*/
  const [logsShow, setLogsShow] = useState(Ordering.DATE_ADDED);
  const [filtersShow, setFiltersShow] = useState(false);
  
  ////////////////////////
  /*Functions*/
  ////////////////////////

  const addCard = props.addCard;
  const removeCard = props.removeCard;
  const removeAllCards = props.removeAllCards;

  ////////////////////////
  /*Return*/
  ////////////////////////

  return (
    <IonPage>
      
      {/* Displays the Header */}
      <Header headerLabel="Card Viewer"/>
      
      {/* Displays the History Logs */}
      <IonContent>

        {/*Create SearchBar*/}
        <BulkBar searchString="" placeholderText="" cardAdderUpdater={addCard}/>
        <IonList>

          {/*Filter Card*/}
          <IonCard color={settingsColor} onClick={() => {setFiltersShow(!filtersShow)}}>
            <IonCardHeader>
              <IonCardTitle>
                {"Settings"}
                <ShowMoreLess isShow={filtersShow}/>
              </IonCardTitle>
            </IonCardHeader>

            {/*Either Displays the Filters or not depending on the Hook*/}
            {filtersShow
            ?
            <IonCardContent >
              <IonRadioGroup value={logsShow} onIonChange={(e) => setLogsShow(e.detail.value)}>
                <IonListHeader>
                  <IonTitle>{"Log Filter"}</IonTitle>
                </IonListHeader>

                <IonItem color={settingsColor}>
                  <IonLabel>{"Date Added"}</IonLabel>
                  <IonRadio slot="start" value={Ordering.DATE_ADDED} />
                </IonItem>

                <IonItem color={settingsColor}>
                  <IonLabel>{"Price"}</IonLabel>
                  <IonRadio slot="start" value={Ordering.PRICE} />
                </IonItem>

                <IonItem color={settingsColor}>
                  <IonLabel>{"Name"}</IonLabel>
                  <IonRadio slot="start" value={Ordering.NAME} />
                </IonItem>
              </IonRadioGroup>

              <IonButton onClick={() => removeAllCards()}>{"Remove All"}</IonButton>
              
            </IonCardContent>
            : <div></div>}

            
          </IonCard>
          
          {/*Displays the Card Items*/}
          <IonList>
            {
              cards.map((currentCard : CardItem) =>
                <SingleCard info={currentCard} key={uuid.v4()} removeCardUpdater={removeCard}/>
              )
            }
          </IonList>

        </IonList>

      </IonContent>

    </IonPage>
  );
};

export default CardViewerDisplay;