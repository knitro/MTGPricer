////////////////////////////////
/*Imports*/
////////////////////////////////

import { updateFunctionDeclaration } from "typescript";
import DataManager from "../dataManagers/DataManager";
import { CardInformation, emptyCardInformation } from "../dataManagers/DataMangerInterfaces";
import ScryFall from "../dataManagers/ScryFall/ScryFall";
import { CardItem } from "../pages/Lister/Lister";
import { addPricerCard } from "../states/PricerState";
import { emptySearch, SearchState } from "../states/SearchState";
import uuid from 'uuid';

////////////////////////////////
/*DataManager Fields*/
////////////////////////////////

const currentDataManager : DataManager = new ScryFall(null);

////////////////////////////////
/*Search Functions*/
////////////////////////////////

/**
 * Creates a quick call for the DataManager, and performs navigational changes.
 * @param cardNameSearchTerm - the card name of the card to search for
 * @param loadingFunction - the function to call to adjust whether the loading popup is active or not. The parameter of the method should set the alert on or off.
 * @param alertFunction - the function to call to create the alert popup for failure of execution.
 */
export function searchCall(cardNameSearchTerm : string, 
    loadingFunction : (value : boolean) => void,
    alertFunction : (value : boolean) => void, 
    cardAdderUpdater: (cardToAdd : CardItem) => void) : void {

  /*Create the SearchState and add the Search Term*/
  let currentSearch: SearchState = Object.assign([], emptySearch); //Creates a blank search SearchState.
  currentSearch.cardName = cardNameSearchTerm;
  
  /*Perform the API Call*/
  loadingFunction(true)
  currentDataManager.performSearch(currentSearch).then(async (searchResult : SearchState) => {
    if (searchResult !== emptySearch) {
      loadingFunction(false);

      //Create CardInformation
      let newCardInformation : CardInformation = {
        name      : searchResult.cardName,
        price     : searchResult.prices.scryFallPricing_nonfoil,
        priceFoil : searchResult.prices.scryFallPricing_foil,
        imageURL  : searchResult.imageLink,
        quantity  : 1,
        set       : {
          setName : searchResult.set.setName,
          setCode : searchResult.set.setCode,
          imageLink: searchResult.set.imageLink,
        },
        misc: {
          foil:     searchResult.misc.foil,
          nonfoil:  searchResult.misc.nonfoil,
          collector_number: searchResult.misc.collector_number,
          released: searchResult.misc.released,
          digital_only: searchResult.misc.digital_only
        },
        
      }

      //Add to Local Storage
      addPricerCard(newCardInformation);

      //Create CardItem and Add to Hook
      let newCardItem : CardItem = {
        info : newCardInformation,
        isChecked : false,
        uid : uuid.v4(),
      }
      cardAdderUpdater(newCardItem);

    } else {
      loadingFunction(false);
      alertFunction(true);
      return Object.assign([], emptyCardInformation);
    }
  });
}

/**
 * Creates a quick call for the DataManager, and performs navigational changes.
 * @param uri - the URI to get the card information
 * @param loadingFunction - the function to call to adjust whether the loading popup is active or not. The parameter of the method should set the alert on or off.
 * @param alertFunction - the function to call to create the alert popup for failure of execution.
 */
export function searchCallURI(uri : string, 
  loadingFunction : (value : boolean) => void,
  alertFunction : (value : boolean) => void) : void {

  /*Create the SearchState and add the Search Term*/
  let currentSearch: SearchState = Object.assign([], emptySearch); //Creates a blank search SearchState.
  currentSearch.api_uri = uri;

  /*Perform the API Call*/
  loadingFunction(true)
  currentDataManager.performSearch(currentSearch).then(async (searchResult : SearchState) => {
    if (searchResult !== emptySearch) {
      loadingFunction(false);
      return {
        name      : searchResult.cardName,
        price     : searchResult.prices.scryFallPricing_nonfoil,
        priceFoil : searchResult.prices.scryFallPricing_foil,
        imageURL  : searchResult.imageLink,
        quantity  : 1,
        set       : searchResult.set 
      }
    } else {
      loadingFunction(false);
      alertFunction(true);
      return Object.assign([], emptyCardInformation);
    }
  });
}
 