

import React, { useState, useEffect } from "react";
import { View,
Text,
FlatList,
StyleSheet,
Alert,
TextInput,
Button,
TouchableOpacity } from "react-native";
import axios from "axios";


export default function Quiz() {
 const BBoardURL = "https://glacial-hamlet-05511.herokuapp.com";

 const [boards, setBoards] = useState([]);
 const [board, setBoard] = useState();
 const [posts, setPosts] = useState([]);

 useEffect(() => {
       fetchBBoard();
       updateContent();
 }, []);


 async function fetchBBoard() {
   axios.get(BBoardURL + "/bboardNames").then((response) => {
     setBoards(response.data.map((board) => ({ name: board })));
   })
     .catch((error) => {
       console.error(error);
     });
 }

 async function updateContent(bboard) {
   setBoard(bboard);
   axios
     .post(BBoardURL + "/posts", { bboard })
     .then((response) => setPosts(response.data));
 }


 function renderBBoard(bboard) {
   console.log(boards[bboard.index].name)
   if(boards[bboard.index].name !=""){
   return (

     <TouchableOpacity style={styles.board}>

       <Text
       style={styles.boardText}

       onPress={() =>
       updateContent(bboard.item.name)}
       >
       {bboard.item.name}</Text>
     </TouchableOpacity>




   );
   }
   else{
     return null
   }
 }

 function renderPost(postIndex){

   return(

 <View style={styles.postBox}>
      <Text style={styles.postTitle}>{posts[postIndex].title}</Text>
    <Text style={styles.postText}>{posts[postIndex].text}</Text>

  </View>

   );
 }

 return (

   <View style={styles.container}>
   <View style={{flex:1}}>
     <View style={styles.headingBackground}>
       <Text style={styles.headingText}>BB Viewer</Text>
     </View>
     <View>
       <View style={styles.refreshButtonLine}>
        <View style={styles.refreshButtonBackground}>
        <TouchableOpacity style={styles.refreshButtonTextPadding}>
           <Text style={styles.refreshButtonText} onPress={() => fetchBBoard()}>
             REFRESH BOARDS
           </Text>
         </TouchableOpacity>
         </View>

        <FlatList
          data = {boards}
          renderItem={(item) => renderBBoard(item)}
          keyExtractor={item => item.name}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          horizontal={true}
      />

       </View>
       <View style={styles.selectedBoardContainer}>
      <Text style={styles.selectedBoardText}>SelectedBoard: </Text>
      <Text style={styles.selectedBoard}>{board}</Text>
      </View>
         <FlatList
           data={posts}
           renderItem={(item) => renderPost(item.index)}
           keyExtractor={(item) => item._id}
          />





     </View>
     </View>
     <View>
                   <Text>DEBUGGING</Text>
                   <Text>bb: {board}</Text>
                   <Text>bbs.length: {boards.length}</Text>
                   <Text>posts = </Text>
                   <Text>{JSON.stringify(posts)}</Text>
                   </View>
   </View>
 );
}

const styles = StyleSheet.create({
 container: {
   justifyContent: "center",
   backgroundColor: "#f3f2f5",
   marginVertical:20,
   borderWidth:20,
   borderColor:"white",
 },

 headingBackground:{
   backgroundColor: "black",
 alignItems: "center",
 justifyContent:"center",
 height: 150,},

 headingText:{
   color: "red",
   fontSize: 40,},

 board:{
   backgroundColor: "black", color:"red",
   padding: 5,
   margin: 1,
   marginRight: 20,},

 selectedBoard:{
   backgroundColor: "black", color:"red",
   fontSize:40,
   justifyContent:"center"},

   boardText:{fontSize:20,color:"red"},

   postBox:{flex:2,backgroundColor: "lightgray",
      padding: 50,
     margin: 20,
     marginBottom:50,
   },

   postTitle:{fontSize:25},
    postText:{fontSize:20},

    refreshButtonLine:{
      flexDirection:"row",
      height:50},

  refreshButtonBackground:{
    backgroundColor:"blue",
    justifyContent:"center"},

  refreshButtonTextPadding:{padding:5},

  refreshButtonText:{fontSize:20,
    color:"white"},

  selectedBoardContainer:{flexDirection:"row"},

  selectedBoardText:{fontSize:35},

});
