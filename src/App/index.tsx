/////////////////
//LIBRARIES
/////////////////
import React, { Component } from "react";
import { AsyncStorage, Linking } from "react-native";
import { Router, Scene, Drawer, Actions } from "react-native-router-flux";
import Login from "./routes/Login"
import Home from "./routes/Home"


import { StyleProvider, View, Text } from "native-base";

//////////////////
//GLOBAL THEME
/////////////////
import getTheme from "../../native-base-theme/components";

/////////////////
//COMPONENTS
/////////////////

class AppContainer extends Component {
  constructor(props) {
    super(props);
  }


  render(){
    return (
      <View style={{flex:1}}>
          <StyleProvider  style={getTheme()}>
            <Router>
              <Scene key="root">
                <Scene key="login" component={Login}  hideNavBar  type="reset" initial/>
                <Scene key="home" component={Home}  hideNavBar  type="reset"/>

              </Scene>
            </Router>
          </StyleProvider>
        
      </View>
    );
  }
}


export default AppContainer