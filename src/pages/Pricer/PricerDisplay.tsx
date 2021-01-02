import React, { useState } from 'react';
import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonItem, IonLabel, IonList, IonListHeader, IonPage, IonRadio, IonRadioGroup, IonTitle } from '@ionic/react';
import Header from '../../components/Header/Header';
import uuid from 'uuid';
import ShowMoreLess from '../../components/ShowMoreLess/ShowMoreLess';
import { PricerInfo } from './Pricer';
import SingleItem from './SupportingComponents/SingleItem';
import { CardInformation } from '../../dataManagers/DataMangerInterfaces';

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
}

////////////////////////////////////////////////////////
/*Component*/
////////////////////////////////////////////////////////

const PricerDisplay = (props : Current_Props) => {

  ////////////////////////
  /*Variables*/
  ////////////////////////

  /*From State Props*/
  const state : PricerInfo = props.state;
  const cards : CardInformation[] = state.cards;
  const notes : string[] = state.notes;

  /*Settings*/
  const settingsColor : string = "secondary";

  ////////////////////////
  /*Hooks*/
  ////////////////////////

  const [logsShow, setLogsShow] = useState(Ordering.DATE_ADDED);
  const [filtersShow, setFiltersShow] = useState(false);

  ////////////////////////
  /*Return*/
  ////////////////////////

  return (
    <IonPage>
      
      {/* Displays the Header */}
      <Header headerLabel="MTG Pricer"/>
      
      {/* Displays the History Logs */}
      <IonContent>

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
            </IonCardContent>
            : <div></div>}
          </IonCard>
          
          {/*Displays the Card Items*/}
          <div>
            {
            cards.map((currentCard : CardInformation) =>
                <SingleItem cardInfo={currentCard} key={uuid.v4()}/>
              )
            }
          </div>

        </IonList>

      </IonContent>

    </IonPage>
  );
};

export default PricerDisplay;