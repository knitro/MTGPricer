import { Component } from 'react';

import axios from 'axios';
import { SearchState } from '../states/SearchState';
import { AdvancedSearchTerms } from './DataMangerInterfaces';

export enum DatabaseLoad {
  NOT_LOADED,
  LOADED,
  OLD_DATA
}

/**
 * The Abstract Class that all DataManagers need to extend.
 * A DataManager is a class that is able to use use a database, either offline or online.
 */
abstract class DataManager extends Component {

  ////////////////////////
  /*Fields*/
  ////////////////////////

  loaded : DatabaseLoad; //Determines what state the database is in (see DatabaseLoad Interface)

  ////////////////////////
  /*Constructor*/
  ////////////////////////

  constructor(props : any) {
    super(props);
    this.loaded = DatabaseLoad.NOT_LOADED;
  }

  ////////////////////////
  /*Abstract Methods*/
  ////////////////////////

  /**
   * This method should download the database and call/return the return value from downloadingDatabase(string, string).
   * The exception to this is if the database is an API, in which this method will do nothing.
   */
  abstract downloadDatabase() : void;

  /**
   * This method should verify the database and call/return the return value from verifyingDatabase(string, string).
   * The exception to this is if the database is an API, in which this method will return DatabaseLoad.LOADED.
   */
  abstract verifyDatabase() : DatabaseLoad;

  /**
   * This method should load the database file and call/return the return value from loadingDatabaseFile(string, string).
   * The exception to this is if the database is an API, in which this method will return true.
   */
  abstract loadDatabase() : boolean;

  /**
   * This method should perform the search and store the search result in the database.
   * @param currentSearchState - the currentSearchState that is being used to perform the search (quick and advanced)
   */
  abstract async performSearch(currentSearchState: SearchState) : Promise<boolean>;

  /**
   * This method should perform a search, and store all the search results into the database.
   * @param searchTerms 
   */
  abstract async performAllSearch(searchTerms : AdvancedSearchTerms) : Promise<boolean>;

  ////////////////////////
  /*"Implemented" Methods*/
  ////////////////////////

  /**
   * Downloads the Database from the given url.
   * Note that this method exists SOLELY to show that there was some intended implementation of downloading a database,
   * but plugin failures have negated the possible use. 
   * @param url - the URL to the database
   * @param fileName - the file name that the database will be saved under
   * @param databaseIndex - the Index of the database as per App.tsx
   */
  protected async downloadingDatabase(url : string, fileName : string) {

    console.log("Started: downloadingDatabase() ");

    // const FileDownload = require('js-file-download');

    /*Download the File*/
    axios({
      url: url,
      method: 'GET'
    }).then((response) => {
      console.log("Started: Downloading Database " + fileName + " from " + url);
      // FileDownload(response.data, FilesystemDirectory.Data + "/" + fileName);
      this.loaded = DatabaseLoad.LOADED;
      console.log("Finished: Downloading Database " + fileName + " from " + url);
    });

    console.log("Finished: downloadingDatabase() ");
    return;

  }

  /**
   * This method is to be only called by verifyDatabase() once the variables are set accordingly.
   * Note that this method exists SOLELY to show that there was some intended implementation of downloading a database,
   * but plugin failures have negated the possible use. 
   * @param url - the URL to the online SHA256 file
   * @param localDirectory the directory to the local SHA256 file
   */
  protected verifyingDatabase(url : string, localDirectory : string) : DatabaseLoad {
    //Code Exists to allow for Extension of the System
    return DatabaseLoad.LOADED;
  }

  /**
   * 
   * @param fileName 
   * @param directory 
   */
  protected loadingDatabase(fileName : string, directory: string) : boolean {
    //Code Exists to allow for Extension of the System
    return true;
  }

  ////////////////////////
  /*Supporting Methods*/
  ////////////////////////

  /**
   * Percent Encode the parameter string.
   * @param stringToEncode - the string to encode.
   */
  protected percentEncode(stringToEncode : string) : string {
    let encodedString = encodeURI(stringToEncode)
    return encodedString;
  }

}
  

export default DataManager;