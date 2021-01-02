import { chevronDownOutline, chevronUpOutline } from 'ionicons/icons';

/**
 * Returns a IonIcon string name depending on the label provided.
 * It returns the ? icon if it cannot determine an appropriate icon from the label provided.
 * @param isShow - whether the icon should be pressed to expand more info, or less info.
 */
export function getIconString(isShow : boolean) : string {
  if (isShow) {
    return chevronUpOutline;
  } else {
    return chevronDownOutline;
  }
}