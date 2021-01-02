import React from 'react';
import { CardInformation } from '../../dataManagers/DataMangerInterfaces';
import { getPricerCards, getPricerNotes } from '../../states/PricerState';
import PricerDisplay from './PricerDisplay';

////////////////////////////////////////////////////////
/*Interfaces*/
////////////////////////////////////////////////////////

export interface CardItem {
  info      : CardInformation,
  isChecked : boolean
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
 * Sorts with Async and other constantly updating components for the Pricer Screen.
 */
class ResultsDisplay extends React.Component<{}, PricerInfo> {

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

  ////////////////////////
  /*Render*/
  ////////////////////////

  render() {

    /*Display*/ 
    return (
      <PricerDisplay state={this.state}/>
    );
  }
 
};

export default ResultsDisplay;
