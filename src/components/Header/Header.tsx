import React from 'react';
import { IonHeader, IonToolbar, IonTitle, IonButtons, IonMenuButton } from "@ionic/react";
import './Header.css';

interface HeaderProps {
  headerLabel : string
}

/**
 * Creates the Default Header for the App.
 * @param props - takes in parameters (currently only a string to display on the header).
 */
const Header: React.FC<HeaderProps> = (props) => {
  
  return (
    <IonHeader>

      <IonToolbar color="primary">
        <IonButtons slot="start">
          <IonMenuButton autoHide={false}/>
        </IonButtons>
        
        <IonTitle size="large">{props.headerLabel}</IonTitle>

      </IonToolbar>
    </IonHeader>
  );
};

export default Header;