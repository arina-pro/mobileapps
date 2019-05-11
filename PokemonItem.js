import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';


const PokemonItem = ({data}) => {
  const { img, name ,weight} = data
  return(
  <View style={styles.container}>
    <Image style={styles.image}
     source={{uri: img}}/>
    <Text style={styles.text}>{name}</Text>
    <Text style={styles.text}>{weight}</Text>

  </View>
  )
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#EFD8F7',
  },
  image: {
  	resizeMode: 'contain',
    flex: 1,
    width: 200,
    height: 200,
  },
  text: {
    fontSize: 18,
  }
});

export default PokemonItem;