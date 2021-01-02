////////////////////////
/*Main Interfaces*/
////////////////////////

/**
 * Interface that denotes what the Advanced Search Functionality can process.
 */
export interface AdvancedSearchTerms {
  mainSearch:     string
  coloursInclude: string[] //Valid Inputs: {W, U, B, R, G}
  coloursExclude: string[] //Valid Inputs: {W, U, B, R, G}
  cardTypes:      string[]
  cardText:       string[]
  //Add More as Advanced Search becomes more fully fleshed out
}

////////////////////////
/*Interface Functions*/
////////////////////////

/**
 * Converts an Interface to a String with new line formatting.
 * @param currentInterface - the AdvancedSearchTerms interface to convert into a string
 */
export function advancedSearchTermsToString(currentInterface: AdvancedSearchTerms) : string {
  
  let returnString = "";

  returnString += "Main Search Term: " + currentInterface.mainSearch + "\n";
  returnString += "Colours Included: " + currentInterface.coloursInclude.map((s : string) => {return s.toUpperCase()}) + "\n";
  returnString += "Colours Excluded: " + currentInterface.coloursExclude.map((s : string) => {return s.toUpperCase()}) + "\n";
  returnString += "Card Types: " + currentInterface.cardTypes.map((s : string) => {return s.toUpperCase()}) + "\n";
  returnString += "Card Text: " + currentInterface.cardText.map((s : string) => {return s.toUpperCase()}) + "\n";

  return returnString;
}