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
  set       : string
}

export const emptyCardInformation : CardInformation = {
  name      : "",
  price     : "",
  priceFoil : "",
  imageURL  : "",
  quantity  : -1,
  set       : "",
}