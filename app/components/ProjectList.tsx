// /* eslint-disable react-native/no-unused-styles */
// import React from "react"
// import { View, FlatList, StyleSheet, Text, Pressable, Platform } from "react-native"
// import { Project } from "../models/Project"
// // import colors from "../styles/colors"

// function ProjectList({ projects, onDelete }) {
//   return (
//     <View style={styles.listContainer}>
//       <FlatList
//         data={projects}
//         keyExtractor={(Project) => Project._id.toString()}
//         renderItem={({ item }) => (
//           <View style={styles.project}>
//             <View style={styles.projectContainer}>
//               <Text style={styles.projectDescription} numberOfLines={1}>
//                 {item.name} {item.tasks?.length}
//               </Text>
//               <Text style={styles.projectCreatedAt} numberOfLines={1}>
//                 {item.createdAt.toString()}
//               </Text>
//             </View>
//             <Pressable onPress={() => onDelete(item)} style={styles.deleteButton}>
//               <Text style={styles.deleteText}>Delete</Text>
//             </Pressable>
//           </View>
//         )}
//       />
//     </View>
//   )
// }

// const styles = StyleSheet.create({
//   completed: {
//     backgroundColor: colors.purple,
//   },
//   deleteButton: {
//     justifyContent: "center",
//   },
//   deleteText: {
//     color: colors.gray,
//     fontSize: 17,
//     marginHorizontal: 10,
//   },
//   icon: {
//     color: colors.white,
//     fontSize: 17,
//     fontWeight: "bold",
//     textAlign: "center",
//   },
//   listContainer: {
//     flex: 1,
//     justifyContent: "center",
//     width: "100%",
//   },
//   project: {
//     alignSelf: "stretch",
//     backgroundColor: colors.white,
//     borderRadius: 5,
//     flex: 1,
//     flexDirection: "row",
//     height: 50,
//     marginVertical: 8,
//     ...Platform.select({
//       ios: {
//         shadowColor: colors.black,
//         shadowOffset: {
//           width: 0,
//           height: 4,
//         },
//         shadowOpacity: 0.7,
//         shadowRadius: 3,
//       },
//       android: {
//         elevation: 3,
//       },
//     }),
//   },
//   projectContainer: {
//     flex: 1,
//     justifyContent: "center",
//   },
//   projectCreatedAt: {
//     color: colors.black,
//     fontSize: 12,
//     paddingHorizontal: 10,
//   },
//   projectDescription: {
//     color: colors.black,
//     fontSize: 17,
//     paddingHorizontal: 10,
//   },
//   status: {
//     backgroundColor: colors.gray,
//     borderBottomLeftRadius: 5,
//     borderTopLeftRadius: 5,
//     height: "100%",
//     justifyContent: "center",
//     width: 50,
//   },
// })

// export default ProjectList
