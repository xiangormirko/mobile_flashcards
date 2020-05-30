// import React, { useState } from 'react';
// import {
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   View,
//   TextInput,
// } from 'react-native';
// import { white, purple } from '../utils/colors';

// export default function Card({ title, text, inputMode }) {
//   const [titleInput, setTitle] = useState('');

//   return (
//     <View style={style.card}>
//       {/* <Text style={{ color: purple, fontSize: 25 }}>{title} "Ciao"</Text> */}
//       <Text style={style.title}>{title}</Text>
//       <TextInput
//         style={style.textInput}
//         onChangeText={(text) => setTitle(text)}
//         value={titleInput}
//       />
//     </View>
//   );
// }

// const style = StyleSheet.create({
//   card: {
//     padding: 20,
//     margin: 10,
//     backgroundColor: white,
//     borderWidth: 2,
//     borderColor: '#20232a',
//     borderRadius: 6,
//   },
//   title: {
//     fontSize: 25,
//     marginBottom: 15,
//   },
//   textInput: {
//     height: 40,
//     borderColor: 'gray',
//     borderWidth: 1,
//   },
// });
