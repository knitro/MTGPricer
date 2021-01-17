import React from 'react';
import { CardInformation } from '../../dataManagers/DataMangerInterfaces';
import { getPricerCards, getPricerNotes, savePricerCards } from '../../states/PricerState';
import ListerDisplay from './ListerDisplay';

////////////////////////////////////////////////////////
/*Interfaces*/
////////////////////////////////////////////////////////

export interface CardItem {
  info      : CardInformation,
  isChecked : boolean
  uid       : string
}

export interface PricerInfo {
  cards     : CardItem[],
  notes     : string[],
}

export function getEmptyPricerInfo() : PricerInfo {
  return {
    cards : [],
    notes : [],
  } 
}

////////////////////////////////////////////////////////
/*Class*/
////////////////////////////////////////////////////////

/**
 * Sorts with Async and other constantly updating components for the Lister Screen.
 */
class Lister extends React.Component<{}, PricerInfo> {

  ////////////////////////
  /*Constructor*/
  ////////////////////////

  constructor(props : any) {
    super(props);
    this.state = getEmptyPricerInfo();
  }

  ////////////////////////
  /*Methods*/
  ////////////////////////

  /**
   * Updates the Components when async results.
   */
  async componentDidMount() {

    console.log("Component Mounting");
    this.setState({cards: await getPricerCards()});
    this.setState({notes: await getPricerNotes()});
  }

  /**
   * Adds a Card to the State.
   * It is important to note that the Database adds the card to local storage.
   * @param cardToAdd 
   */
  addCard = (cardToAdd : CardItem) => {
    let newArray : CardItem[] = this.state.cards;
    newArray.push(cardToAdd);
    this.setState({cards : newArray});
  }

  /**
   * Removes a Card from the State.
   * This function must remove the card from the database.
   * @param cardToRemove 
   */
  removeCard = (cardToRemove : CardItem) => {
    let newArray : CardItem[] = this.state.cards.filter(currentCard => currentCard !== cardToRemove);
    this.setState({cards: newArray});
    savePricerCards(newArray);
  }

  /**
   * Removes all the Cards from the Local Storage.
   */
  removeAllCards = () => {
    this.setState({cards : []});
    savePricerCards([]);
  }

  ////////////////////////
  /*Render*/
  ////////////////////////

  render() {

    /*Display*/ 
    return (
      <ListerDisplay 
        state={this.state} 
        addCard={this.addCard} 
        removeCard={this.removeCard}
        removeAllCards={this.removeAllCards}
      />
    );
  }
 
};

export default Lister;
