import React, { useState } from 'react';
import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonItem, IonLabel, IonList, IonListHeader, IonPage, IonRadio, IonRadioGroup, IonTitle } from '@ionic/react';
import Header from '../../components/Header/Header';
import uuid from 'uuid';
import ShowMoreLess from '../../components/ShowMoreLess/ShowMoreLess';

////////////////////////////////////////////////////////
/*Enums*/
////////////////////////////////////////////////////////

enum FilterOptions {
  ALL, MOTION_ONLY, NO_MOTION,
}

////////////////////////////////////////////////////////
/*Props and State*/
////////////////////////////////////////////////////////

/**Empty*/

////////////////////////////////////////////////////////
/*Component*/
////////////////////////////////////////////////////////

const Pricer: React.FC = () => {

  ////////////////////////
  /*Variables*/
  ////////////////////////

  const settingsColor : string = "secondary";

  ////////////////////////
  /*Hooks*/
  ////////////////////////

  const [logsShow, setLogsShow] = useState(FilterOptions.ALL);
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
              <IonRadioGroup value={logsShow} onIonChange={e => setLogsShow(e.detail.value)}>
                <IonListHeader>
                  <IonTitle>{"Log Filter"}</IonTitle>
                </IonListHeader>

                <IonItem color={settingsColor}>
                  <IonLabel>{"All"}</IonLabel>
                  <IonRadio slot="start" value={FilterOptions.ALL} />
                </IonItem>

                <IonItem color={settingsColor}>
                  <IonLabel>{"Motion Only"}</IonLabel>
                  <IonRadio slot="start" value={FilterOptions.MOTION_ONLY} />
                </IonItem>

                <IonItem color={settingsColor}>
                  <IonLabel>{"No Motion"}</IonLabel>
                  <IonRadio slot="start" value={FilterOptions.NO_MOTION} />
                </IonItem>
              </IonRadioGroup>
            </IonCardContent>
            : <div></div>}
          </IonCard>
          
          {/*Displays the Logs with Latest First*/}
          <div>
            {
            // mqttState.logs.reverse()
            //   .filter((currentReading : Reading) => {
            //     if (logsShow === LogsShow.ALL) { return true; }
            //     else if (logsShow === LogsShow.MOTION_ONLY) {
            //       if (currentReading.motionStatus) { return true; }
            //       else { return false; }
            //     }
            //     else if (logsShow === LogsShow.NO_MOTION) {
            //       if (currentReading.motionStatus) { return false; }
            //       else { return true; }
            //     }
            //     else { return true; }
            //   })
            //   .map((currentReading : Reading) =>
            //     <SingleHistoryLog reading={currentReading} key={uuid.v4()}/>
            //   )
            }
          </div>

        </IonList>

      </IonContent>

    </IonPage>
  );
};

export default Pricer;