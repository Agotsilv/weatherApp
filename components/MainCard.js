import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import { FontAwesome } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons'; 

const MainCard = (props) => {

    const Icon = () => {
        if(props.icon === 'morning'){
            return (
                 <Feather name="sun" style={styles.carIcon} color='orange' size={40} />

            )
        }
        if(props.icon === 'afternoon'){
            return (
                 <FontAwesome name="sun-o" style={styles.carIcon} color='orange' size={40} />

            )
        }
        if(props.icon === 'night'){
            return (
                <Ionicons style={styles.carIcon} name="cloudy-night-outline" size={40} color="orange" />

            )
        }
    }

    const styles = StyleSheet.create({
        card:{
            backgroundColor: props.backgroundColor,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 20,
            margin: 10,
            width: 110,
            height: 210,
        },
        temperature:{
          alignItems: 'center',
          flexDirection: 'row',
          marginTop: 10,
        },
     reshButton: {
          position: 'absolute',
          margin: 30,
          alignSelf: 'flex-start'
        },
        cardText:{
            color: 'white',
            margin: 15,
            fontSize: 20,
        },
        carIcon: {
            color: 'white',
            margin: 15
        },
        
      });
      


  return (
  <View style={styles.card}>
    <Text style={styles.cardText}>{props.title}</Text>
    <Icon/>
    <Text style={styles.cardText}>{props.temperature}</Text>

  </View>);
};

export default MainCard;
