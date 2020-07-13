import React, {Component} from 'react';
import config from '../../config/GooglePhotos';
import {gapi} from 'gapi-script';
import {loadAuth2, loadAuth2WithProps} from 'gapi-script';

let googleAuth: object = {};
let auth2Token: object = {};
let isAuthorised: boolean = false;

class GooglePhotos extends Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    };
  }

  async getAuthToken() {
    googleAuth = await loadAuth2(config.oAuthClientID, config.scopes.photosLibrary);
  }

  updateSignedInStatus() {
    if (isSignedIn) {

    }
  }

  componentDidMount() {
    this.getAuthToken()
      .then(() => {
        if (googleAuth.isSignedIn.get()) {
          googleAuth = gapi.auth2.getAuthInstance();
          auth2Token = googleAuth.currentUser.je;
          googleAuth.isSignedIn.listen();
          isAuthorised = googleAuth.isSignedIn.je;
        } else {
          isAuthorised = false;
          console.log("you are signed out");
        }
    });
  }

  componentDidUpdate() {
    console.log("componentDidUpdate");
  }

  render() {
    return("");
  }
}

export default GooglePhotos;
