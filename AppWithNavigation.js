import React from 'react';

import { Flatlist, StyleSheet, Text, View, TextInput, Button, Image, ScrollView, Input } from 'react-native';

import { createStackNavigator, createAppContainer } from 'react-navigation';

import PokemonItem from './PokemonItem'
import AboutItem from './AboutItem'

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
        <Button
          title="About"
          onPress={() => this.props.navigation.navigate('About')}
        />
        <Button
          title="See all Pokemons"
          onPress={() => this.props.navigation.push('SeeAll')        
          }
        />
        <Button
          title="Search Pokemon"
          onPress={() => this.props.navigation.navigate('Search')}
        />
      </View>
    );
  }
}

class About extends React.Component {
  render() {
    return <AboutItem />;
  }
}




class SeeAll extends React.Component {
  constructor(props){

    super(props)

    this.state = {

      isLoading: true,

      pokemons: [],

      name_cur:'',
      }

    console.log('All Pokemons are below');
    fetch('http://178.62.4.93:8080/api/pokemons')
      .then(response => response.json())
      .then(data => {
        this.setState({ pokemons: data });
      console.log(this.state.pokemons[1].name, this.state.pokemons[1].weight); // Prints result from `response.json()` in getRequest 
      })
      .catch(error => console.log('error'));
  }


  render() {    
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>All Pokemons</Text>
      <ScrollView>
           { this.state.pokemons.map(item => (

            <PokemonItem data={item} key = {item._id}/>)
            //console.log(item.name, item.weight))
            )
           } 

        </ScrollView>
        <Button
          title="Go back"
          onPress={() => this.props.navigation.goBack()}
        />
      </View>
    );
  }
}

class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      pokemons: [],
      name_cur:'',
      FLAG: false,
      flag2: false
    }
  }

  findPokemon = () => {
  
    fetch('http://178.62.4.93:8080/api/pokemons/'+this.state.name_cur)

    .then(response => response.json())

    .then(data => {

      if (data){

        this.setState({pokemons: [data], FLAG: true, flag2: false }) 

        console.log(data+this.state.FLAG)
      }
      else {
        this.setState({FLAG: false, flag2: true}) 
      }

      })

      .catch((error) => {console.log('error')});
  }
  
  render() {    
    return (
      <View>
        <TextInput

          style={{width: 100, height: 40}}

          placeholder="Enter name"

          onChangeText={(text) => this.setState({name_cur:text})}

        />

        <Button
          onPress={this.findPokemon}
          title="Search"
        />
        { this.state.FLAG && <PokemonItem data={this.state.pokemons[0]} /> }

        { this.state.flag2 && !this.state.FLAG && <Text style={{ color: 'red' }}>Not Found</Text> }
      </View>
    )
  }
}

const RootStack = createStackNavigator(
  {
  
    Home: {
      screen: HomeScreen,
    },
    SeeAll: {
      screen: SeeAll,
    },
    About: {
      screen: About,
    },
 Search: {
      screen: Search,
    },

  },
  {
    initialRouteName: 'Home',
  }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  
  render() {
    return <AppContainer />;
  }
}