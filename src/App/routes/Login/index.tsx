import React, { Component, useEffect, useState, useRef } from 'react';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, H1, H2, H3, View, Item, Input } from 'native-base';
////////////////
//STYLES
////////////////
import styles from "./LoginStyles";
import * as RNEP from '@estimote/react-native-proximity'
import PhoneInput from 'react-native-phone-input'
import firebase from "react-native-firebase"
import { Actions } from "react-native-router-flux";



type IView = "OPTIN" | "MSISDNENTRY" | "PINENTRY" | "CONSENT" | "PERMISSIONS"
 
const Login = ()=> {

  let unsubscribe = null;
  const [view, setView] = useState<IView>("OPTIN")
  const refPhone = useRef(null);
  const [msisdn, setMsisdn] = useState<string>("");
  const [confirmResult, setConfirmResult] = useState(null);
  const [pin, setPin] = useState(null);

  const submitMsisdn = async()=>{
    const phoneNumber = refPhone.current.getValue();
    console.log("phoneNumber", phoneNumber)
    setMsisdn(phoneNumber)
    const confirmResult = await firebase.auth().signInWithPhoneNumber(phoneNumber);
    setConfirmResult(confirmResult)
    setView("PINENTRY")
  }

  const submitPin = async()=>{
    console.log("pin", pin)
    const user = await confirmResult.confirm(pin);
    console.log("user", user.toJSON())
    Actions.home();
  }

  const checkLoggedIn = ()=>{
    
    unsubscribe = firebase.auth().onAuthStateChanged((currentUser) => {
      //console.log("currentUser", currentUser)
      if (currentUser) {
        const user = currentUser.toJSON();
        Actions.home();
      }
    });
  }

  useEffect(()=>{
    checkLoggedIn()
    // this will trigger a popup with "allow this app to access your location?"
    RNEP.locationPermission.request()
    .then(permission => { // this is the user's decision
      // permission can be equal to:
      // * RNEP.locationPermission.DENIED - proximity detection won't work
      // * RNEP.locationPermission.WHEN_IN_USE - only when the app is active
      // * RNEP.locationPermission.ALWAYS - even when the app is not active
    })
  },[])

  return (
    <Container>
      <Content contentContainerStyle={styles.content}>

        {
          view === "OPTIN" &&
          <View style={styles.view}>
            <H3 style={styles.heading}>
              Help to stop the spread of COVID-19 by turning Bluetooth on
            </H3>
            <Text style={styles.paragraph}>If you had close contact with a COVID-19 case, we help the Ministry of Health call you quickly</Text>
            <Text note style={styles.noteBottom}>Your data is never accessed unless you were near a confirmed case</Text>

           </View>
        }
        {
          view === "MSISDNENTRY" &&
          <View>
            <H3 style={styles.heading}>
              Enter your mobile number to be connected
            </H3>
            <Item>
              <PhoneInput ref={refPhone}/>
            </Item>
            
           </View>
        }

        {
          view === "PINENTRY" &&
          <View>
            <H3 style={styles.heading}>
              Enter OTP that was sent to <Text>{msisdn}</Text>
            </H3>
            <Item success>
              <Input placeholder='------' onChangeText={(pin)=>setPin(pin)}/>
              <Icon name='checkmark-circle' />
            </Item>
            
           </View>
        }


      </Content>
      <Footer>
        <FooterTab>
          {
            view === "OPTIN" &&
            <Button full onPress={()=>setView("MSISDNENTRY")}>
              <Text>I want to help</Text>
            </Button>
          }
          {
            view === "MSISDNENTRY" &&
            <Button full onPress={()=>submitMsisdn()}>
              <Text>Submit</Text>
            </Button>
          }
          {
            view === "PINENTRY" &&
            <Button full onPress={()=>submitPin()}>
              <Text>Submit Pin</Text>
            </Button>
          }
          
          {
            view === "CONSENT" &&
            <Button full>
              <Text>I agree</Text>
            </Button>
          }
          {
            view === "PERMISSIONS" &&
            <Button full>
              <Text>Proceed</Text>
            </Button>
          }
        </FooterTab>
      </Footer>
    </Container>
  );
}

export default Login
