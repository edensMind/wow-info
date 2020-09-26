import React, { Component } from 'react';
import axios from 'axios';

class CharacterList extends Component {
  constructor(props) {
    super(props);
    this.state = { 
        characters: []
    };
  }

  static displayName = CharacterList.name;

  componentDidMount() {
    axios.get(`/api/characters`)
    .then(res => {
        const charList = res.data.wow_accounts[0].characters
        this.setState({ characters: charList });
    })
    .catch(error => {
        this.setState({ characters: [] });
    });
  }

  render () {
    return (
        <>
            {this.state.characters.map((char) => (
                <p key={char.id}>{char.name}</p>
            ))}
        </>
    )
  }
}

export default CharacterList;