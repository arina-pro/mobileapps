import React from 'react';
import { Flatlist, StyleSheet, Text, View, TextInput, Button, Image, ScrollView ,Input} from 'react-native';

import PokemonItem from './PokemonItem'

export default class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      isLoading: true,
      pokemons: [],
      name_cur:'',
      FLAG: true

    }
  }

  addBear = () => {
    fetch('http://178.62.4.93:8080/api/pokemons', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'name': this.state.title,
        'img':this.state.img,
      })
    }).then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson);
        })
        .catch((error) => {
          console.error(error);
        });
  }


getPokemon = ()=>{
  console.log(this.state.name_cur)
fetch('http://178.62.4.93:8080/api/pokemons/'+this.state.name_cur)
.then(response => response.json())
.then(data => {
  if (data){
    this.setState({FLAG: true}) 
console.error(data)
this.setState({pokemons: [data]})
  } else{
    this.setState({FLAG: false}) 
    console.error('i am hereeeeeeeeeeeeeee')
this.setState({name_cur: 'Pikachu'}) 
fetch('http://178.62.4.93:8080/api/pokemons/'+this.state.name_cur)
.then(response => response.json())
.then(data => {

this.setState({pokemons: [data]}) 
//console.log(this.state.pokemons.name)// Prints result from `response.json()` in getRequest

      })
  }
//console.log(this.state.pokemons.name)// Prints result from `response.json()` in getRequest

      })
        .catch((error) => {
          console.error(error)

          
          
        });
  }







  render() {
    const { pokemons } = this.state
    if (this.state.FLAG){
    return (
      <View style={styles.container}>
        <Image
          style={{resizeMode: 'contain',
    flex: 1,
    width: 50,
    height: 50,}}
          source={this.state.img}
        />


        <TextInput
          style={{height: 40}}
          placeholder="Type here to find your pokeweight!"
          //this.setState({pokemons: [data]}) 
          onChangeText={(text) => this.setState({name_cur:text})}
          
        />

        <Button
        style={styles.button}
        onPress={this.getPokemon}
        title='Get pokemon'/>
        <ScrollView>
           { pokemons.map(item => (
           <PokemonItem data={item} key = {item._id}/>))} 
        </ScrollView>
      </View>
    );
    }else{
    return (
      <View style={styles.container}>
        <Image
          style={{resizeMode: 'contain'}}
          source={this.state.img}
        />


        <TextInput
          style={{height: 40}}
          placeholder="Type here to translate!"
          //this.setState({pokemons: [data]}) 
          onChangeText={(text) => this.setState({name_cur:text})}
          
        />

        <Button
        style={styles.button}
        onPress={this.getPokemon}
        title='Get pokemon'/>
        <Text> not found</Text>

      </View>
    );

    }
  }
}


const styles = StyleSheet.create({ 
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop:10,
    flexDirection:'column'
  },
  input: {
  	flex: 1,
  	backgroundColor: '#aaa',
  	
  },
  /*stretch: {
    width: 50,
    height: 50
  },
  item: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 30,
      margin: 2,
      borderColor: '#2a4944',
      borderWidth: 1,
      backgroundColor: '#d2f7f1'
   },*/
   button: {
   	backgroundColor: '#f0f8ff'
   }
});