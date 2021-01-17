////////////////////////////////////////////////////////
/*Main Interfaces*/
////////////////////////////////////////////////////////

/**
 * Interface that denotes the main information about a Card
 */
export interface CardInformation {
  name      : string,
  price     : string,
  priceFoil : string,
  imageURL  : string
  quantity  : number,
  set       : SetInformation,
  misc      : MiscInformation,
}

/**
 * Stores the information about the set that the card is in
 */
export interface SetInformation {
  setName:    string,
  setCode:    string,
  imageLink:  string //Not Implemented Yet
}

export interface MiscInformation {
  foil            : boolean,
  nonfoil         : boolean,
  collector_number: string,
  released        : string,
  digital_only    : boolean,
}

export const emptyCardInformation : CardInformation = {
  name      : "",
  price     : "",
  priceFoil : "",
  imageURL  : "",
  quantity  : -1,
  set       : {
    setName : "",
    setCode : "",
    imageLink: "",
  },
  misc      : {
    foil            : false,
    nonfoil         : false,
    collector_number: "",
    released        : "",
    digital_only    : false,
  }
}