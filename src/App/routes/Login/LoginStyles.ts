import { StyleSheet, Dimensions } from "react-native";
const {width, height} = Dimensions.get("window");
  const styles = StyleSheet.create({
  content:{
    padding:15,
  },
  view:{
    flex:1,
    justifyContent:"space-between",
    alignItems:"center",
    flexDirection:"column",
    paddingTop:"50%"
  },
  heading:{
    fontWeight:"bold"
  },
  paragraph:{
    marginTop:15,
    fontSize:18
  },
  noteBottom:{
    alignItems:"flex-end"
  },
  phoneForm: {
    marginTop: (height * 1) / 5,
    flex: 1,
    paddingHorizontal: 10,
  },
  statusContainer: {
    marginVertical: 20,
  }

});
export default styles;