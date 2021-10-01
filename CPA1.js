import * as React from 'react';
import { Text, View, StyleSheet, Image, Button, TextInput} from 'react-native';
import Constants from 'expo-constants';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  return(
    <View style={styles.container}>
    <MyStack/>
 </View>
  );
}

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

function MainScreen  ({ navigation })  {
  return (

<View style={{ flex:2,backgroundColor: "lightgray", flexDirection: "column"}} >
    <View style = {{flex:1, backgroundColor:"lightgray", flexDirection:"column", alignItems:"center"}}>
    <TextInput
    placeholder="Name Your Company"
    />
    </View>
    <View style={{ flex:2,backgroundColor: "lightgray", flexDirection: "row", justifyContent:"center"}} >
<Text style = {{fontSize:50, color:"#50C878"}}> $1 </Text>
    </View>
    <Button
    title = "Buy Business"
    color = "blue"

  >
    /></Button>
     <View style={{ flex:3,backgroundColor: "lightgray", flexDirection: "column", alignItems:"center"}} >
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
};
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
   onPress={() =>

     color = "black"
   }
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
