import React, {Component} from 'react';
import {gapi} from 'gapi-script';
import {loadAuth2, loadAuth2WithProps} from 'gapi-script';
import UserCard from "../UserCard/UserCard";

class GoogleSignIn extends Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    }
  }

  async componentDidMount() {
    let auth2: object = await loadAuth2(process.env.REACT_APP_GOOGLE_CLIENT_ID, '');
    if (auth2.isSignedIn.get()) {
      this.updateUser(auth2.currentUser.get());
    } else {
      this.attachSignIn(document.querySelector('#customBtn'), auth2);
    }
  }

  async componentDidUpdate() {
    if (!this.state.user) {
      let auth2: object = await loadAuth2(process.env.REACT_APP_GOOGLE_CLIENT_ID, '');
      this.attachSignIn(document.querySelector('#customBtn'), auth2);
    }
  }

  updateUser(currentUser) {
    let name: string = currentUser.getBasicProfile().getName();
    let profileImage: string = currentUser.getBasicProfile().getImageUrl();
    this.setState({
      user: {
        name: name,
        profileImage: profileImage
      }
    })
  }

  attachSignIn(element, auth2) {
    auth2.attachClickHandler(element, {},
      (googleUser) => {
        this.updateUser(googleUser);
        console.log('User signed in');
      }, (error) => {
        console.log(JSON.stringify(error))
      });
  }

  signOut = () => {
    let auth2: object = gapi.auth2.getAuthInstance();
    auth2.signOut().then(() => {
      this.setState({user: null});
      console.log('User signed out');
    })
  };

  render() {
    if (this.state.user) {
      return (
        <div className="container">
          <UserCard user={this.state.user}/>
          <div id="logout" className="btn logout" onClick={this.signOut}>Logout</div>
        </div>
      );
    } else {
      return (
        <div className="container">
          <div id="customBtn" className="btn login">
            Login
          </div>
        </div>
      );
    }
  }
}

export default GoogleSignIn;
