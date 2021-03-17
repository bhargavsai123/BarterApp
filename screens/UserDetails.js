/** @format */

import firebase from "firebase";
import React from "react";
import { SafeAreaView, View, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import db from "../config.js";
import MyHeader from "../components/header";
import { StatusBar } from "expo-status-bar";

export default class UserDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: firebase.auth().currentUser.email,
      userName: "",
      recieverId: this.props.navigation.getParam("details")["user_name"],
      exchangeId: this.props.navigation.getParam("details")["exchange_id"],
      itemName: this.props.navigation.getParam("details")["item_name"],
      description: this.props.navigation.getParam("details")["description_d"],
      recieverName: "",
      recieverContact: "",
      receiverAddress: "",
      receiverRequestDocId: "",
    };
  }
  addBarters = () => {
    db.collection("barters").add({
      item_name: this.state.itemName,
      exchange_id: this.state.exchangeId,
      description_d: this.state.description,
      reciever_id: this.state.recieverId,
      barter_id: this.state.userId,
      request_status: "Barter Interested",
    });
  };
  getUserDetails = (userId) => {
    db.collection("users")
      .where("email_id", "==", userId)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          console.log(doc.data().first_name);
          this.setState({
            userName: doc.data().first_name + " " + doc.data().last_name,
          });
        });
      });
  };
  render() {
    return (
      <View>
        <MyHeader title='User Details' navigation={this.props.navigation} />
        <StatusBar style='light' backgroundColor='transparent' />
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            this.addBarters();
            this.props.navigation.navigate("Barter's List");
          }}
        >
          <Text
            style={{
              fontSize: 20,
              alignSelf: "center",
              color: "#f1f1f1",
            }}
          >
            Exchange
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    width: 280,
    height: 35,
    fontSize: 20,
    borderRadius: 5,
    margin: 10,
    marginVertical: 20,
    backgroundColor: "#1972f7",
    alignSelf: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 8,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10.32,
    elevation: 16,
  },
});
