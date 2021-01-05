////////////////////////
/*Imports*/
////////////////////////

import { timeOutline, calendarOutline, newspaperOutline, listOutline, createOutline, cartOutline, logInOutline, settingsOutline, personCircle } from 'ionicons/icons';

////////////////////////
/*Interfaces*/
////////////////////////

/**
 * The Interface used for containing the important data when constructing a SideBar Item.
 */
export interface SideBarItem {
  label : string,
  path : string,
  iconName : string
}

////////////////////////
/*SideBar Items*/
////////////////////////
  
/**
 * Main Sidebar Items
 */
export const sideBarItems : SideBarItem[]= [
  {label: "Pricer"            , path: "/pricer"              , iconName: timeOutline},
  {label: "Card Viewer"       , path: "/card-viewer"         , iconName: calendarOutline},
];