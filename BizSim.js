import React,  {useState, useEffect } from 'react';
import { Text, View, StyleSheet, Image, Button, TextInput, Alert,FlatList} from 'react-native';
import Constants from 'expo-constants';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();



export default function App() {




 //default price value of a business set at $20


  const[myScreen, setMyScreen] = useState('Main');


   return(
    <View style={styles.container}>
    <MyStack/>
 </View>
  );




}const MyStack = () => {
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

//NOTE: ADD AN ASYNC FUNCTION THAT STORES THE MONEYCOUNTER AMOUNT, SO IT KEEPS OFFLINE FOR WHEN YOU COME BACK









function MainScreen  ({ navigation })  {
  const[moneyAmount, setMoneyAmount] = useState(0);
  const[moneyPerSecond, setMoneyPerSecond] = useState(2);
  const Timer_MS = 600;
  const[numberBusinessesOwned, setNumberBusinessesOwned] = useState(0);
  const[companyName, setCompanyName] = useState();
  const[defaultPrice,setDefaultPrice] = useState(20);
//Turns out google docs API is pretty difficult to integrate into react native, takes lots of steps
  const gDocsURL = "https://docs.google.com/document/d/1W5fna59AnsTiGUybGCmC_qZox0E3EfDDTXEa5zy_di8/edit";
 const [gDocsApiResult, setGDocsApiResult] = useState([]);

 const [showBusinesses, setShowBusinesses] = useState(true);

 const offlineDATA = [
 {
  id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
  title: 'First Item',
  color: "red",
  imageurl:"https://img.imageboss.me/fourwinds/width/425/dpr:2/s/files/1/2336/3219/products/shutterstock_336818993meyer.jpg?v=1614965965",
  price: 20,
  rateOfReturn:1.1,
},
{
  id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
  title: 'Second Item',
  color: "blue",
  imageurl:"https://media.dior.com/couture/ecommerce/media/catalog/product/9/e/1594849779_043J615A0589_C980_E08_GHC.jpg?imwidth=800",
  price: 50,
  rateOfReturn:1.4,
},
{
  id: '58694a0f-3da1-471f-bd96-145571e29d72',
  title: 'Third Item',
  color: "black",
  imageurl:"https://roarblogs.s3.amazonaws.com/borgata/casino/en/blog/wp-content/uploads/2020/01/28094359/image5-4.jpg",
  price: 200,
  rateOfReturn:1.7,
},
];

const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

  useEffect(() => {
    const interval = setInterval(() => {
      console.log('Logs every interval of Timer');
      moneyUpdate();
       //moneyAmoun = this.moneyAmount;
      //setMoneyAmount(moneyAmount + moneyPerSecond);
    }, Timer_MS);
      return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  }, [moneyAmount])

async function fetchGithub(url) {
   await fetch(url)
     .then((apiResponse) => apiResponse.json())
     .then((jsonResponse) => {
       setGDocsApiResult(jsonResponse);
     })
     .catch((error) => {
       console.error(error);
     });
 }

 function renderBusiness(business) {
   return (
    /* <View style={{backgroundColor: "white",
   padding: 10,
   margin: 10,
   marginRight: 30,}}>
       <Text style={{fontSize:20,color: "black"}}>{business.item.title}</Text>
     </View>*/
     <View style={styles.businessBar}>
   <Image
        style={styles.businessImage}
        source={business.item.imageurl}
      />
<Button
    title = {business.item.title}
    color = {business.item.color}

    onPress = {() =>
      moneyCounter(business.item.price,business.item.rateOfReturn)


    }


  >
    /></Button>
     </View>
   );
 }

  function moneyUpdate(){
setMoneyAmount(moneyAmount + moneyPerSecond);
}
//Supposed to update the moneycounter
//when buy businesss pressed
function moneyCounter(price,rateOfReturn){
  console.log(companyName);
if(moneyAmount>=price){
  //The moneyPerSecond can't handle decimals at the moment,
  //.toFixed(2) keeps tacking on two more decimals instead
  //of doing its job
  setMoneyPerSecond((moneyPerSecond*rateOfReturn/*(this #is the increase factor per business gained)*/)/*Math.pow(moneyPerSecond,2)*/);
  setNumberBusinessesOwned(numberBusinessesOwned+1);
  setMoneyAmount(moneyAmount-price);
  //setDefaultPrice(defaultPrice*2);
  console.log(moneyPerSecond);

}}
  return (

<View style={{ flex:2,backgroundColor: "lightgray", flexDirection: "column"}} >
    <View style = {{flex:1, backgroundColor:"lightgray", flexDirection:"column", alignItems:"center"}}>
    <TextInput
    placeholder="Name Your Company"
    onChangeText={setCompanyName}
    />
    </View>
    <View style={{ flex:2,backgroundColor: "lightgray", flexDirection: "row", justifyContent:"center"}} >
<Text style = {styles.moneyText}> ${moneyAmount.toFixed(2)} </Text>
    </View>


     <View style={{ flex:4,backgroundColor: "lightgray", flexDirection: "column", alignItems:"center"}} >
    <Text style = {styles.blueStandardText}>{numberBusinessesOwned} Businesses Owned</Text>
     <Text style = {styles.standardText}>Invest in businesses to increase your money earned per second
</Text>
  {showBusinesses ?
         <FlatList
           /*data={gDocsApiResult}
           keyExtractor={(item, index) => index.toString()}
           renderItem={(item) => renderBusiness(item)}*/
           horizontal={true}
           data = {offlineDATA}
           renderItem={(item) => renderBusiness(item)}
           keyExtractor={item => item.id}

       /> :
     <View style={{backgroundColor: "lightgray", padding: 10}}>
             <Text style={styles.standardText}>NONE</Text>
     </View>
         }
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

    <Text style = {styles.standardText}> Tutorial </Text>


  </View>
  <View style={{ flex:2,backgroundColor: "#F5F5DC", flexDirection: "row", justifyContent:"Space-around"}} >


    <Text style = {styles.smallStandardText}> You own a company! Buy businesses to make your income grow faster. Cool features to come, different types of businesses,
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    margin:0,
    borderWidth:0,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  businessBar:{
padding: 0,
margin: 10,
marginRight: 30,
},
  businessImage:{
    height:50
  },
  blueStandardText:{
    fontSize:20, color:"blue"
  },
  standardText:{
    fontSize:20
  },
  smallStandardText:{
    fontSize:12
  },
  moneyText:{
    fontSize:50, color:"#50C878"
  },
});
