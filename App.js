import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Feather } from '@expo/vector-icons'; 
import { useState, useEffect } from 'react';
import MainCard from './components/MainCard'
import InfoCard from './components/InfoCard'

import * as Location from 'expo-location'

import getCurrentWeather from './Api/ConsultApi';

export default function App() {

  const [darkTheme, setDarkTheme] = useState(true)
  const [currentTemperature, setCurrentTemperature] = useState('27')
  const [location, setLocation] = useState("BR, Fortaleza")
  const [currentHour, setCurrentHour] = useState('13:00')


  const [locationCoords, setLocationCoords] = useState([])

  const [wind, setWind] = useState('65')
  const [umidity, setUmidity] = useState('80')
  const [TemMin, setTempMin] = useState('21')
  const [TemMax, setTempMax] = useState('31')



  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: darkTheme ? '#232634' : '#f2f2f2',
    alignItems: 'center',
  },
  temperature:{
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 10,
  },
  temperatureText: {
    color: darkTheme ? '#e0e0e0' : 'black',
    fontSize: 50,
  },
  refreshButton: {
    position: 'absolute',
    margin: 30,
    alignSelf: 'flex-start'
  },
  cardView: {
    color: darkTheme ? 'black' : 'white',
    margin: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  info:{
    alignItems: 'center',
    backgroundColor: darkTheme ? '#393e54' : '#8f8f8f',
    borderRadius: 20,
    width: 350,
    height: 230  },

    infoText: {
      color: darkTheme ? '#e0e0e0' : 'white',
      margin: 15,
      fontSize:20,
      fontWeight: 'bold'

    },

    CardsInfo: {
      flexDirection: 'row',
      flexWrap: 'wrap'
    },

    themeButton:{
      margin: 10,
      marginLeft: 300,
      justifyContent: 'center',
      width:50,
      height: 50,
      borderRadius: 25
    },
    squareButton: {
      backgroundColor: darkTheme ? '#f2f2f2' : '#8f8f8f',
      justifyContent: 'center',
      borderRadius: 20,
      marginRight: 20,
      width: 50,
      height: 25,
    },

    circleButton: {
      backgroundColor: darkTheme ? '#232634' : '#f2f2f2',
      alignSelf: darkTheme ? 'flex-end' : 'flex-start',
      margin: 5,
      width: 20,
      height:20,
      borderRadius: 50,
    }
 
});

async function setCurrentWeather(){
  getLocation()

  const data = await getCurrentWeather(locationCoords)

  let date = new Date()

  setCurrentHour(date.getHours() + ':' + date.getMinutes())

  setCurrentTemperature(ConvertKelvinInC(data[0]))
  setTempMin(ConvertKelvinInC(data[1]))
  setTempMax(ConvertKelvinInC(data[2]))
  setLocation(data[3])
  setWind(data[4])
  setUmidity(data[5])

}

function ConvertKelvinInC(kelvin){
  return parseInt(kelvin - 273)
}

async function getLocation(){
  let { status } = await Location.requestBackgroundPermissionsAsync()
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied')
    }else{
      let location = await Location.getCurrentPositionAsync({})
      await setLocationCoords(location.coords)
    }
}
  useEffect(() => {
    setCurrentWeather()
  }, [])


  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.refreshButton}>
      <Feather onPress={() => setCurrentWeather()} name="refresh-ccw" size={30} color={darkTheme ? 'white' : 'dark'} />
      </TouchableOpacity>

      <Feather name="sun" style={{marginTop: 55, }} color='yellow' size={40} />

      <View style={styles.temperature}>
        <Text style={styles.temperatureText}>{currentTemperature}</Text>
        <Text style={[styles.temperatureText, {fontSize: 15}]}>°C</Text>
      </View>

      <Text style={[styles.temperatureText, {fontSize: 14} ]}>{location}, {currentHour}</Text>

      <View style={styles.cardView}>
        <MainCard title={"Manhã"} backgroundColor={darkTheme ? '#ff873d' : '#cc6f30'} icon={'morning'} temperature={'21°'}/>
        <MainCard title={"Tarde"} backgroundColor={darkTheme ? '#d29600' : '#Fcc63f'} icon={'afternoon'} temperature={'35°'}/>
        <MainCard title={"Noite"} backgroundColor={darkTheme ? '#008081' : '#38B7B8'} icon={'night'} temperature={'19°'}/>
      </View>

      <View style={styles.info}>
    <Text style={styles.infoText}>Informações Adicionais</Text>
    
    <View style={styles.CardsInfo}>

      <InfoCard title={'Vento'} value={wind + ' m/h'}/>
      <InfoCard title={'Umidade'} value={umidity + '%'}/>
      <InfoCard title={'Temp. Min'} value={TemMin + ' °C'}/>
      <InfoCard title={'Temp. Max'} value={TemMax + '°C'}/>
    </View>
    </View>

    <View style={styles.themeButton}>
    <View style={styles.squareButton}>
      <TouchableOpacity style={styles.circleButton} onPress={() => darkTheme ? setDarkTheme(false): setDarkTheme(true)}></TouchableOpacity>
    </View>
    </View>
     

    </View>
  );
}
