import React, { Component, useEffect, useState, useRef } from 'react';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, H1, H2, H3, View, Item, Input } from 'native-base';
import { Actions } from "react-native-router-flux";

////////////////
//STYLES
////////////////
import styles from "./HomeStyles";
import * as RNEP from '@estimote/react-native-proximity'
import PhoneInput from 'react-native-phone-input'
import firebase from "react-native-firebase"


type IView = "OPTIN" | "MSISDNENTRY" | "PINENTRY" | "CONSENT" | "PERMISSIONS"
 
const Home = ()=> {

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
    console.log("user", user)
  }
  useEffect(()=>{
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
        <H3>
          You are tracing
        </H3>
      </Content>
        
    </Container>
  );
}

export default Home
