import React, { Component } from 'react';
import axios from 'axios';
import queryString from 'query-string';

import Login from './Login'
import CharacterList from './CharacterList'
import LoadingSpinner from './LoadingSpinner'

export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      mode: "default" 
    };
  }

  static displayName = Home.name;

  componentDidMount() {

    let code = 'DEFUALT';
    // Get code from query params
    const queryParams = queryString.parse(this.props.location.search);
    if(queryParams.code) {
      code = queryParams.code;
    }
    
    axios.get(`/api/token/${code}`)
    .then(res => {
      this.setState({ mode: "show" });
    })
    .catch(error => {
      this.setState({ mode: "login" });
    });
  }

  render () {
    // Render Login Dialog
    if(this.state.mode === "login") {
      return (
        <Login />
      );
    }
    // Render Character Profile
    else if(this.state.mode === "show") {
      return (
        <CharacterList />
      );
    }
    // Render spinner at first
    else {
      return (
        <>
        <LoadingSpinner />
        </>
      )
    }
  }
}
