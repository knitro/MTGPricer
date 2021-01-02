import { IonAlert, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonLoading, IonText } from '@ionic/react';
import React, { useEffect, useState } from 'react';

////////////////////////////////////////////////////////
/*Props*/
////////////////////////////////////////////////////////

interface Current_Props {
  reading : Reading
}

////////////////////////////////////////////////////////
/*Component*/
////////////////////////////////////////////////////////

/**
 * Displays the 
 */
const SingleItem = (props : Current_Props) => {

  /*Variable Initialisation*/
  const currentReading : Reading = props.reading;
  const locationString : string = capitaliseFirstLetter(currentReading.sensorLocation);
  const dateString : string = currentReading.timestamp.toDateString();
  const timeString : string = currentReading.timestamp.toTimeString();
  const utcString : string = currentReading.timestamp.toUTCString();
  const motionString : string = (currentReading.motionStatus) ? "Motion Detected" : "No Motion Detected";
  const colourMotionString : string = (currentReading.motionStatus) ? "success" : "danger";
  const batteryString : string = "Battery Level : " + currentReading.batteryStatus + "%";

  /*Hook Initialisation*/
  const [showLoading, setShowLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  /*Clean Up UseEffect*/
  useEffect(() => {
    //Clean up any react states that were set
    return function cleanup() {
      setShowLoading(false);
      setShowAlert(false);
    }
  }, [])

  return (
    
    <div>

      {/*The IonCard to be Displayed*/}
      <IonCard onClick= { () => {
          setShowLoading(true);
          setShowAlert(true);
          setShowLoading(false);
        }}
        color={colourMotionString}
      >
        <IonCardHeader>
          <IonCardSubtitle>{utcString}</IonCardSubtitle>
          <IonCardTitle>
            <RoomIcon roomTitle={props.reading.sensorLocation}/>
            {" " + locationString}
          </IonCardTitle>
        </IonCardHeader>
      </IonCard>

      {/*IonLoading Initialisation*/}
      <IonLoading
        cssClass=''
        isOpen={showLoading}
        onDidDismiss={() => setShowLoading(false)}
        message={'Loading History Log Details'}
        duration={10000}
      />
      
      {/*IonAlert Initialisation*/}
      <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          cssClass='failed'
          header={'History Log Details'}
          subHeader={'Details for Log at ' + locationString}
          message={ ""
            + '<b>Date: </b>' + dateString + "<br/>"
            + '<b>Time:</b> ' + timeString + "<br/>"
            + '<b>Detected Motion: </b>' + motionString + "<br/>"
            + '<b>Battery Level: </b>' + batteryString + "<br/>"
          }
          buttons={['Dismiss']}
      />

    </div>
  );
}

export default SingleItem;