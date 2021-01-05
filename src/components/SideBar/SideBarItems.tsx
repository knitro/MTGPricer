import { IonContent, IonList } from '@ionic/react';
import React from 'react';
import { SideBarItem, sideBarItems } from './SideBarData';
import SideBarItemSingle from './SideBarItemSingle';
import uuid from 'uuid'

/**
 * Encapsulates the Rendering of all the Sidebar Items.
 */
const SideBarItems: React.FC = () => {

  return (
    <IonContent>
      <IonList>

        {/* Creates the Default SideBar Items through calling the renderMenuItem for each item in the sideBarItems array*/}
        {sideBarItems.map((currentItem: SideBarItem) => <SideBarItemSingle currentItem={currentItem} isDisabled={false} key={uuid.v4()}/>)}
          
      </IonList>
    </IonContent>
  )
}

export default SideBarItems;