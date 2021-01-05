import { IonIcon, IonItem, IonMenuToggle, IonText } from '@ionic/react';
import React from 'react';
import History from '../../logic/History';
import { SideBarItem } from './SideBarData';

interface SideBarItemSingleProps {
  currentItem: SideBarItem
  isDisabled : boolean
}

/**
 * Renders the Menu Item (Used in the Render)
 * @param currentItem - the SideBarItem to render
 * @param isDisabled - whether the SideBarItem should be disabled or not
 */
const SideBarItemSingle: React.FC<SideBarItemSingleProps> = (props : SideBarItemSingleProps) => {

  ////////////////////////
  /*Initialisation*/
  ////////////////////////
  
  let currentItem : SideBarItem = props.currentItem;
  let isDisabled : boolean = props.isDisabled;

  ////////////////////////
  /*Return*/
  ////////////////////////
  return (
    <IonMenuToggle auto-hide="false">
      
      <IonItem
        disabled={isDisabled}
        onClick={() => {
          History.push(currentItem.path);
        }}
      >
        <IonIcon icon={currentItem.iconName} slot="start"/>
        <IonText>{currentItem.label}</IonText>
      </IonItem>
    </IonMenuToggle>
  );
}

export default SideBarItemSingle;