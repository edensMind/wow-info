import React, { Component } from 'react';
import axios from 'axios';
import { Spinner } from 'reactstrap';
import classMapping from '../classes';

class CharacterList extends Component {
  constructor(props) {
    super(props);
    this.state = { 
        characters: [],
        loading: true
    };
  }

  static displayName = CharacterList.name;

  componentDidMount() {
    axios.get(`/api/characters`)
    .then(res => {
        const charList = res.data.wow_accounts[0].characters
        console.log(charList);
        this.setState({ characters: charList, loading: false });
    })
    .catch(error => {
        this.setState({ characters: [], loading: false });
    });
  }

  render () {
    // Render spinner at first
    if(this.state.loading) {
      return(<Spinner color="light" />)
    }
    // Render list
    else {
      return (
        <>
            {this.state.characters.map((char) => (
                <>
                <img src="asd"></img>
                <p key={char.id}>{char.name}, {char.level}, {char.faction.name}, {char.playable_race.name}, {char.playable_class.name}, {char.gender.name}, {char.realm.name}</p>
                </>
            ))}
        </>
      )
    }
  }
}

export default CharacterList;