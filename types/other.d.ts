import H from 'history';

declare global {
  /**
   * The interface has the attributes of history's object
   */
  declare interface _router {
    history: H.History<H.LocationState>;
  }

  /**
   * Remote server url, such as http://localhost:8080
   */
  declare const remoteServer: string;
}
