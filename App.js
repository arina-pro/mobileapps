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



  addPokemon = () => {

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


  getPokemons = () => {
    console.log('All Pokemons are below');
    fetch('http://178.62.4.93:8080/api/pokemons')
      .then(response => response.json())
      .then(data => {
        this.setState({ pokemons: data });
        console.log(this.state.pokemons[1].name, this.state.pokemons[1].weight); // Prints result from `response.json()` in getRequest
      })
      .catch(error => console.error(error));
  };



  findPokemon = () => {

    console.log(this.state.name_cur)

    fetch('http://178.62.4.93:8080/api/pokemons/'+this.state.name_cur)

    .then(response => response.json())

    .then(data => {

      if (data){

        this.setState({pokemons: [data], FLAG: true}) 

        console.log(data)


      } else {

        this.setState({FLAG: false}) 

        console.log(this.state.pokemons[1].name)

      }

    })

    .catch((error) => {

       console.error(error)                 

    });

  }






  render() {

    const { pokemons } = this.state

    return (
      <View style={styles.container}>


        <TextInput

          style={{height: 40}}

          placeholder="Enter name"

          onChangeText={(text) => this.setState({name_cur:text})}

          
        />

        <Button
          style={styles.button}
          onPress={this.findPokemon}
          title="Search"
        />
        { this.state.FLAG && <Text style={{ color: 'red' }}>Not Found</Text> }
        <Button
          style={styles.button}
          onPress={this.getPokemons}
          title="Show all"
        />
        
        <ScrollView>

           { pokemons.map(item => (

           <PokemonItem data={item} key = {item._id}/>))} 

        </ScrollView>

      </View>

    );
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


   button: {

    backgroundColor: '#f0f8ff'

   }

});
