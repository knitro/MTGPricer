////////////////////////////////////////////////////////
/*Imports*/
////////////////////////////////////////////////////////

import { CardInformation } from "../../../dataManagers/DataMangerInterfaces";
import { Pricer } from "../Pricer";
import axios from 'axios';
import { PriceURLs, SetInformation } from "../PricerInterfaces";

////////////////////////////////////////////////////////
/*Class*/
////////////////////////////////////////////////////////

export class StarCityGames extends Pricer {

  ////////////////////////
  /*Constructor*/
  ////////////////////////

  constructor(props : any) {
    super(props);
  }

  ////////////////////////
  /*Extended Functions*/
  ///////////////////////

  /**
   * Gets the Price of a Card
   * @param cardToPrice
   */
  async getPrices(cardToPrice : CardInformation) : Promise<PriceURLs> {

    /*Variable Initialisation*/
    let foilPriceURL : string;
    let nonFoilPriceURL : string;
    const doesNotExist : string = "Does not Exist"

    /*Create the SCG Link if they exist*/
    //Foil
    if (cardToPrice.misc.foil) {
      foilPriceURL = await this.createSCGLink(cardToPrice.name, cardToPrice.set.setCode, cardToPrice.misc.collector_number, true);
    } else {
      foilPriceURL = doesNotExist;
    }

    //Non-Foil
    if (cardToPrice.misc.nonfoil) {
      nonFoilPriceURL = await this.createSCGLink(cardToPrice.name, cardToPrice.set.setCode, cardToPrice.misc.collector_number, false);
    } else {
      nonFoilPriceURL = doesNotExist;
    }
    
    /*Return*/
    const returnValue : PriceURLs = {
      nonFoil : nonFoilPriceURL,
      foil    : foilPriceURL,
    }
    return returnValue;

  }

  ////////////////////////
  /*Supporting Functions*/
  ////////////////////////

  /**
   * Creates a SCG Link from supplied information.
   * @param cardName - the card name
   * @param setCode - the card's set code
   * @param collector_number - the card's collector number
   * @param isFoil - whether the SCG link is for a foil variant or not
   */
  async createSCGLink(cardName : string, setCode : string, collector_number : string, isFoil : boolean) {

    /*Variable Initialisation*/
    const baseLink : string = "https://starcitygames.com/";

    /*Check if Box Topper/Extended Art*/
    //This is so that we can change the SCG URL accordingly
      
    //Get Set Size
    const setSize : number = await axios({
      url: "https://api.scryfall.com/sets/" + setCode,
      method: 'GET',
    }).then((response) => {
      if (typeof response.data.data === 'undefined') {
        let output : SetInformation = response.data;
        return output.printed_size;
      } else {
        //TODO Solve this case later
        return 0;
      }
    });

    const isExtended : boolean = (setSize < parseInt(collector_number)) ? true : false;

    /*Format the Card Name for the SCG Link*/
    let cardNameFormatted : string = cardName.toLowerCase();
    cardNameFormatted = cardNameFormatted.split(" ").join("-");
    cardNameFormatted = cardNameFormatted.split("'").join("");
    cardNameFormatted = cardNameFormatted.split(",").join("");
    
    /*Add the SCG Suffixes*/
    const setCodeFormatted : string = (setCode.toLowerCase()) + ((isExtended) ? "2" : "");
    const collectorNumberFormatted : string = collector_number.toLowerCase();
    const foilingString : string = (isFoil) ? ("enf/") : ("enn/");  

    /*Create and Return the URL*/
    const returnString : string = baseLink + cardNameFormatted + "-sgl-mtg-" + setCodeFormatted + "-" + collectorNumberFormatted + "-" + foilingString;
    return returnString;
  }

}