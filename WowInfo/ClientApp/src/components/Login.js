import React, { Component } from 'react';

const authUrl = 'https://us.battle.net/oauth/authorize?scope=wow.profile&state=123456&redirect_uri=https://localhost:44301/&response_type=code&client_id=ba6c3cfde72340229b948694af4cbfd7';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { 

    };
  }

  static displayName = Login.name;

  componentDidMount() {

  }

  render () {
    return (
        <>
            <a href={authUrl}>Login</a>
        </>
    )
  }
}

export default Login;