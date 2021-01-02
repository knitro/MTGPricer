import React from 'react';
import './SearchBar.css';
import SearchBarCards from './SearchBarCards/SearchBarCards';
import { IonText } from '@ionic/react';

export enum SearchCategory {
  Cards,
  Rules,
  SetEV
}

interface SearchBarProps {
  searchString: string;
  placeholderText: string;
  category : SearchCategory;
}

/**
 * Creates the SearchBar.
 * @param props - Considers the parameters to set the searchbar.
 */
const SearchBar = (props : SearchBarProps) => {

  /*Variable Initialisation*/
  let category : SearchCategory = props.category;

  /*Rendering*/
  if (category === SearchCategory.Cards) {
    return (
      <SearchBarCards searchString="" placeholderText="Search for Magic Cards" />
    );
  } else if (category === SearchCategory.Rules) {
    return (
      <div>
        <IonText>{"This has not been implemented yet"}</IonText>
      </div>
    );
  } else if (category === SearchCategory.SetEV) {
    return (
      <div>
        <IonText>{"This has not been implemented yet"}</IonText>
      </div>
    );
  } else {
    console.log("ERROR: This is not an implemented SearchBar category");
    return (
      <div>
        <IonText>{"The SearchBar type is not recognised"}</IonText>
      </div>
    );
  }
  
}

export default SearchBar;