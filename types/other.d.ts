import H from 'history';

declare global {
  /**
   * The interface has the attributes of history's object
   */
  declare interface _router {
    history: H.History<H.LocationState>;
  }

  /**
   * Remote server url of blog
   */
  declare const remoteBlog: string;

  /**
   * Remote server url of package library
   */
  declare const remotePackageLibrary: string;
}
