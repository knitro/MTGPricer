////////////////////////////////////////////////////////
/*Imports*/
////////////////////////////////////////////////////////

import { Plugins } from '@capacitor/core';
import { CardItem } from '../pages/Pricer/Pricer';

////////////////////////////////////////////////////////
/*Local Initialisation*/
////////////////////////////////////////////////////////

const { Storage } = Plugins;

/*Storage Keys*/
const keyCard : string = "pricer_cards"
const keyNote : string = "pricer_notes"

////////////////////////////////////////////////////////
/*Capacitor Storage for Cards*/
////////////////////////////////////////////////////////

/**
 * Saves an Array of CardItems to Storage for the Pricer Page.
 * @param itemToSave - the array to save in storage
 */
export async function savePricerCards(itemToSave : CardItem[]) : Promise<boolean> {

  let valueToSave : string = JSON.stringify(itemToSave);

  const returnValue = await Storage.set({
    key: keyCard,
    value: valueToSave
  }).then( () => {
    return true;
  }).catch(err => {
    console.log(err);
    return false;
  });

  return returnValue;
}

/**
 * Retrieves a Search State in storage.
 * This is used for ResultsDisplay to retrieve the previously saved data.
 */
export async function getPricerCards() : Promise<CardItem[]> {

  const storageReturn = await Storage.get({key: keyCard});

  if (typeof storageReturn.value === 'string') {
    return (JSON.parse(storageReturn.value) as CardItem[]);
  } else { //Null Case
    return [];
  }
}

////////////////////////////////////////////////////////
/*Capacitor Storage for Notes*/
////////////////////////////////////////////////////////

/**
 * Saves an Array of CardItems to Storage for the Pricer Page.
 * @param itemToSave - the array to save in storage
 */
export async function savePricerNotes(itemToSave : string[]) : Promise<boolean> {

  let valueToSave : string = JSON.stringify(itemToSave);

  const returnValue = await Storage.set({
    key: keyNote,
    value: valueToSave
  }).then( () => {
    return true;
  }).catch(err => {
    console.log(err);
    return false;
  });

  return returnValue;
}

/**
 * Retrieves a Search State in storage.
 * This is used for ResultsDisplay to retrieve the previously saved data.
 */
export async function getPricerNotes() : Promise<string[]> {

  const storageReturn = await Storage.get({key: keyNote});

  if (typeof storageReturn.value === 'string') {
    return (JSON.parse(storageReturn.value) as string[]);
  } else { //Null Case
    return [];
  }
}