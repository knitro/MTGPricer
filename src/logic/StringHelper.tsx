/**
 * Capitalises the First Letter
 * @param input - the string to capitalise
 */
export function capitaliseFirstLetter(input : string) : string {
  return input.charAt(0).toUpperCase() + input.slice(1);
}

/**
 * Converts a boolean into a Yes/No string
 * @param input - the 
 */
export function convertBooleanToString(input : boolean) : string {
  return (input) ? "Yes" : "No";
}