import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  changeFilterType = type => {
    this.setState({
      filters: {
        type
      }
    });
  }

  fetchPetsList = () => {
    const parameter = this.state.filters.type === 'all' ? '' : `?type=${this.state.filters.type}`;
    const baseURL = `/api/pets${parameter}`;
    fetch(baseURL).then(response => response.json()).then(pets => this.setState({ pets }));
  }

  adoptPet = id => {
    const index = this.state.pets.indexOf(this.state.pets.find(pet => pet.id === id));
    this.setState(prevState => {
      const newState = {...prevState};
      newState.pets[index].isAdopted = true;
      return newState;
    });
  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.changeFilterType} onFindPetsClick={this.fetchPetsList} />
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={id => this.adoptPet(id)} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App