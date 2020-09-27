import React, { Component } from 'react';
import axios from 'axios';
import { Table } from 'reactstrap';
import { FiArrowDown, FiArrowUp } from "react-icons/fi";

import LoadingSpinner from './LoadingSpinner'
import classMapping from '../classMapping';
import './css/CharTable.css';

class CharacterList extends Component {
  constructor(props) {
    super(props);
    this.state = { 
        characters: [],
        loading: true,
        sortedColumn: "",
        sortDesc: true
    };
    this.handleSortClick = this.handleSortClick.bind(this);
    this.sortByClass = this.sortByClass.bind(this);
    this.sortByName = this.sortByName.bind(this);
    this.sortByLevel = this.sortByLevel.bind(this);
    this.sortByFaction = this.sortByFaction.bind(this);
    this.sortByRace = this.sortByRace.bind(this);
    this.sortByRealm = this.sortByRealm.bind(this);
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
  
  handleSortClick(e) {
    let order = this.state.sortDesc;
    if(e.target.innerHTML === this.state.sortedColumn) {
      order = !order;
    }
    else {
      order = true;
    }

    let sorted = this.state.characters;
    sorted.sort( (a, b) => {
      switch(e.target.innerHTML) {
        case "Class":
          return this.sortByClass(a, b, order);
        case "Name":
          return this.sortByName(a, b, order);
        case "Level":
          return this.sortByLevel(a, b, order);
        case "Faction":
          return this.sortByFaction(a, b, order);
        case "Race":
          return this.sortByRace(a, b, order);
        case "Realm":
          return this.sortByRealm(a, b, order);
        // DEFUALT
        default:
          return this.sortByName(a, b, order);
      }
    });

    this.setState({
      sortedColumn: e.target.innerHTML, 
      characters: sorted, 
      sortDesc: order
    });
  }

  sortByClass(a, b, order) {
    if(order) {
      return a.playable_class.name.localeCompare(b.playable_class.name) || a.name.localeCompare(b.name);
    }
    else {
      return b.playable_class.name.localeCompare(a.playable_class.name) || a.name.localeCompare(b.name);
    }
  }

  sortByName(a, b, order) {
    if(order) {
      return a.name.localeCompare(b.name);
    }
    else {
      return b.name.localeCompare(a.name);
    }
  }

  sortByLevel(a, b, order) {
    if(order) {
      return a.level - b.level || a.name.localeCompare(b.name);
    }
    else {
      return b.level - a.level || a.name.localeCompare(b.name);
    }
  }

  sortByFaction(a, b, order) {
    if(order) {
      return a.faction.name.localeCompare(b.faction.name) || a.name.localeCompare(b.name);
    }
    else {
      return b.faction.name.localeCompare(a.faction.name) || a.name.localeCompare(b.name);
    }
  }

  sortByRace(a, b, order) {
    if(order) {
      return a.playable_race.name.localeCompare(b.playable_race.name) || a.name.localeCompare(b.name);
    }
    else {
      return b.playable_race.name.localeCompare(a.playable_race.name) || a.name.localeCompare(b.name);
    }
  }

  sortByRealm(a, b, order) {
    if(order) {
      return a.realm.name.localeCompare(b.realm.name) || a.name.localeCompare(b.name);
    }
    else {
      return b.realm.name.localeCompare(a.realm.name) || a.name.localeCompare(b.name);
    }
  }

  render () {
    // Render spinner at first
    if(this.state.loading) {
      return (
        <>
        <LoadingSpinner />
        </>
      )
    }
    // Render list
    else {
      return (
        <>
            <Table dark>
              <thead>
                <tr>
                  <th><span className="sort-header" onClick={this.handleSortClick}>Class</span> <span>{this.state.sortedColumn !== "Class" ? "" : this.state.sortDesc ? <FiArrowDown/>: <FiArrowUp/>}</span></th>
                  <th><span className="sort-header" onClick={this.handleSortClick}>Name</span> <span>{this.state.sortedColumn !== "Name" ? "" : this.state.sortDesc ? <FiArrowDown/>: <FiArrowUp/>}</span></th>
                  <th><span className="sort-header" onClick={this.handleSortClick}>Level</span> <span>{this.state.sortedColumn !== "Level" ? "" : this.state.sortDesc ? <FiArrowDown/>: <FiArrowUp/>}</span></th>
                  <th><span className="sort-header" onClick={this.handleSortClick}>Faction</span> <span>{this.state.sortedColumn !== "Faction" ? "" : this.state.sortDesc ? <FiArrowDown/>: <FiArrowUp/>}</span></th>
                  <th><span className="sort-header" onClick={this.handleSortClick}>Race</span> <span>{this.state.sortedColumn !== "Race" ? "" : this.state.sortDesc ? <FiArrowDown/>: <FiArrowUp/>}</span></th>
                  <th><span className="sort-header" onClick={this.handleSortClick}>Realm</span> <span>{this.state.sortedColumn !== "Realm" ? "" : this.state.sortDesc ? <FiArrowDown/>: <FiArrowUp/>}</span></th>
                </tr>
              </thead>
              <tbody>
                {this.state.characters.map((char) => (
                    <tr key={char.id}>
                      <td><img src={process.env.PUBLIC_URL + '/assets/class_icons/' + classMapping[char.playable_class.name].icon} alt="class icon"></img></td>
                      <td style={{color: classMapping[char.playable_class.name].color}}>{char.name}</td>
                      <td>{char.level}</td>
                      <td>{char.faction.name}</td>
                      <td>{char.playable_race.name}</td>
                      <td>{char.realm.name}</td>
                    </tr>
                ))}
              </tbody>
            </Table>

        </>
      )
    }
  }
}

export default CharacterList;