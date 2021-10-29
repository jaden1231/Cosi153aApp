import React,  {useState, useEffect } from 'react';
import { Text, View, StyleSheet, Image, Button, TextInput, Alert} from 'react-native';
import Constants from 'expo-constants';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

/*
Ideas:
1) Replace Buy Business Button with a flexbox
containing images for each potential business you can
buy at the moment, and a button beneath each to buy interval
The business titles and their images are data pulled from a
Google Docs I can write and update whenever I want to expand
the game. An iterator will run down the list of Businesses
avaiable as the game goes on and use two/three card slots
at a time shifting down by one every milestone crossed($1 million,
for example)
2) International market will be another screen you unlock after a milestone,
with additional businesses that open up. But now you can buy numberBusinesses
from one country and sell in another. Currency exchange rates are real
pulled from internet for that country. Country Selection is a map with links
on it.
3) An inventory of business you have, to make selling possible. Use async StorageKeys
4) Businesses you own can scale up a certain number of times. Developed country Businesses
scale up more than developing country, making buying from both for the purpose of selling
viable
5) As I said below, money counter should be async data so your progress is saved
for when you come back
6) As the money count grows, it'll have to be abbrievated to "$5.00 million" or $7.00 
quadrillion to avoid numbers going off screen and have them make sense
*/


export default function App() {
  const[moneyAmount, setMoneyAmount] = useState(0);
  const[moneyPerSecond, setMoneyPerSecond] = useState(2);
  const[numberBusinessesOwned, setNumberBusinessesOwned] = useState(0);
  const[companyName, setCompanyName] = useState();
 //default price value of a business set at $20
  const[defaultPrice,setDefaultPrice] = useState(20);

  const[myScreen, setMyScreen] = useState('Main');

  const Timer_MS = 600;
const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Main"
          component={MainScreen}
          options={{ title: 'Biz Sim', justifyContent:"center" }}
        />
        <Stack.Screen name="About" component={AboutScreen} />

      <Stack.Screen name="Options" component={OptionsScreen} />
    </Stack.Navigator>
    </NavigationContainer>
  );
};
useEffect(() => {
    const interval = setInterval(() => {
      console.log('Logs every interval of Timer');
      moneyUpdate();
       //moneyAmoun = this.moneyAmount;
      //setMoneyAmount(moneyAmount + moneyPerSecond);
    }, Timer_MS);
      return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  }, [moneyAmount])
//NOTE: ADD AN ASYNC FUNCTION THAT STORES THE MONEYCOUNTER AMOUNT, SO IT KEEPS OFFLINE FOR WHEN YOU COME BACK

  return(
    <View style={styles.container}>
    <MyStack/>
 </View>
  );

function moneyUpdate(){
setMoneyAmount(moneyAmount + moneyPerSecond);
}
//Supposed to update the moneycounter
//when buy businesss pressed
function moneyCounter(){
  console.log(companyName);
if(moneyAmount>=defaultPrice){
  //The moneyPerSecond can't handle decimals at the moment,
  //.toFixed(2) keeps tacking on two more decimals instead
  //of doing its job
  setMoneyPerSecond((moneyPerSecond*1.1/*(this #is the increase factor per business gained)*/)/*Math.pow(moneyPerSecond,2)*/);
  setNumberBusinessesOwned(numberBusinessesOwned+1);
  setMoneyAmount(moneyAmount-defaultPrice);
  console.log(moneyPerSecond);

}}





function MainScreen  ({ navigation })  {
  return (

<View style={{ flex:2,backgroundColor: "lightgray", flexDirection: "column"}} >
    <View style = {{flex:1, backgroundColor:"lightgray", flexDirection:"column", alignItems:"center"}}>
    <TextInput
    placeholder="Name Your Company"
    onChangeText={setCompanyName}
    />
    </View>
    <View style={{ flex:2,backgroundColor: "lightgray", flexDirection: "row", justifyContent:"center"}} >
<Text style = {{fontSize:50, color:"#50C878"}}> ${moneyAmount.toFixed(2)} </Text>
    </View>
    <Button
    title = "Buy Business"
    color = "blue"
    onPress = {() =>
      moneyCounter()


    }


  >
    /></Button>

     <View style={{ flex:3,backgroundColor: "lightgray", flexDirection: "column", alignItems:"center"}} >
    <Text style = {{fontSize:20, color:"blue"}}>{numberBusinessesOwned} Businesses Owned</Text>
     <Text style = {{fontSize:20}}>Invest in businesses to increase your money earned per second
</Text>

     </View>
     <View style={{ flex:1, flexDirection: "row", alignItems:"flex-start"}} >

     </View>
    <View style={{ flex:2,backgroundColor: "lightgray", flexDirection: "row", justifyContent:"space-around"}} >
     <Button

      title="About Page"
      onPress={() =>
        navigation.navigate('About')

      }
     ></Button>
     <Button

      title="Preferences"
      onPress={() =>
        navigation.navigate('Options')

      }
     ></Button>
     </View>
      <View style={{ flex:3,backgroundColor: "lightgray", flexDirection: "row", }} >
      <Image source={{
                 uri: 'https://g.foolcdn.com/editorial/images/633894/stack-of-one-hundred-dollar-bills-cash-money-stimulus-invest-retire-getty.jpg',
               }}
               style={{flex:1 }}/>
      </View>
</View>

  );
}
function AboutScreen ({ navigation}) {
return(
  <View style={{ flex:2,backgroundColor: "#F5F5DC", flexDirection: "column", justifyContent:"space-between", alignItems:"center"}} >
  <View style={{ flex:1,backgroundColor: "#F5F5DC", flexDirection: "row"}} >

    <Text style = {{fontSize:20}}> Tutorial </Text>


  </View>
  <View style={{ flex:2,backgroundColor: "#F5F5DC", flexDirection: "row", justifyContent:"Space-around"}} >


    <Text style = {{fontSize:12}}> You own a company! Buy businesses to make your income grow faster. Cool features to come, different types of businesses,
    or even a forex market, so I could practice using data from websites to get live exchange rates of currencies in different countries!</Text>

  </View>
  <View style={{ flex:2,backgroundColor: "#F5F5DC", flexDirection: "row", alignItems:"flex-start"}} >

      <Button

       title="Back"
       onPress={() =>
         navigation.navigate('Main')

       }
      ></Button>
    </View>
    <View style = {{flex:1, backgroundColor:"white", flexDirection:"row", justifyContent:"flex-start"}}>
    <TextInput
    placeholder="Add any additional ideas here"
    />
    </View>
    <View style = {{flex:2, flexDirection:"row", justifyContent:"flex-start", alignItems:"center"}}>

    </View>
  </View>
)
}
function OptionsScreen ({ navigation }) {

  return(
  <View style={{ flex:2,backgroundColor: "lightblue", flexDirection: "column", justifyContent:"center"}} >

<View style={{ flex:2,backgroundColor: "lightblue", flexDirection: "column", justifyContent:"center"}} >
<Button

   title="Dark Mode"
   onPress={() => Alert.alert('Dark Mode Activated')}
  ></Button>
</View>


  <View style={{ flex:2,backgroundColor: "lightblue", flexDirection: "column", justifyContent:"center"}} >
  <Button

   title="Back"
   onPress={() =>
     navigation.navigate('Main')

   }
  ></Button>
  </View>
  <View style = {{flex:3, flexDirection:"row", justifyContent:"flex-start", alignItems:"center"}}>

  </View>

  </View>
  )}
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    margin:0,
    borderWidth:0,
  },

});
