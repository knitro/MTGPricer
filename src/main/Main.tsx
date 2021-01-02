////////////////////////////////////////////////////////////////////////////////////
/* Standard Imports */
////////////////////////////////////////////////////////////////////////////////////

import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonPage, IonRouterOutlet, IonSplitPane } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

////////////////////////////////////////////////////////////////////////////////////
/* Page Imports */
////////////////////////////////////////////////////////////////////////////////////

import Pricer from '../pages/Pricer/Pricer';

////////////////////////////////////////////////////////////////////////////////////
/* Component Imports */
////////////////////////////////////////////////////////////////////////////////////

import History from '../logic/History';

////////////////////////////////////////////////////////////////////////////////////
/* Main */
////////////////////////////////////////////////////////////////////////////////////

/**
 * Main React App
 */
const Main: React.FC = () => {

  ////////////////////////////
  /*Return*/
  ////////////////////////////
  return (
    <IonApp>

      <IonReactRouter history={History}>

        <IonSplitPane contentId="main"> {/* Adds/Allows the SideBar Functionality */}

          <IonPage id="main"> {/* ID reference allowing for Sidebar Functionality */}

            <IonRouterOutlet>

              {/*Default Pages*/}
              <Route path="/pricer"       component={Pricer}      exact={true} />

              {/*Blank Route*/}
              <Route path="/" render={() => <Redirect to="/pricer" />}          exact={true} />

            </IonRouterOutlet>

          </IonPage>

        </IonSplitPane>

      </IonReactRouter>
    </IonApp>
  )
};

export default Main;
