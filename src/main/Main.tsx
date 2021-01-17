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

import Lister from '../pages/Lister/Lister';

////////////////////////////////////////////////////////////////////////////////////
/* Component Imports */
////////////////////////////////////////////////////////////////////////////////////

import History from '../logic/History';
import CardViewer from '../pages/CardViewer/CardViewer';
import SideBar from '../components/SideBar/SideBar';

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

          <SideBar/>  {/* The Actual Sidebar */}
          <IonPage id="main"> {/* ID reference allowing for Sidebar Functionality */}

            <IonRouterOutlet>

              {/*Default Pages*/}
              <Route path="/pricer"       component={Lister}      exact={true} />
              <Route path="/card-viewer"  component={CardViewer}      exact={true} />

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
