/** @format */

import React from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  TouchableOpacity,
} from "react-native";
import firebase from "firebase";
import db from "../config";
import TouchableScale from "react-native-touchable-scale";
import MyHeader from "../components/header";
import { StatusBar } from "expo-status-bar";
import { ListItem } from "react-native-elements";

export default class Barters extends React.Component {
  constructor() {
    super();
    this.state = {
      userId: firebase.auth().currentUser.email,
      allBarters: [],
    };
    this.requestRef = null;
  }
  getAllBarters = () => {
    this.requestRef = db
      .collection("barters")
      .where("barter_id", "==", this.state.userId)
      .onSnapshot((snapshot) => {
        var allBarters = snapshot.docs.map((doc) => doc.data());
        this.setState({
          allBarters: allBarters,
        });
      });
  };

  keyExtractor = (item, index) => index.toString();

  renderItem = ({ item, i }) => (
    <ListItem
      containerStyle={{
        borderRadius: 5,
        margin: 10,
        shadowColor: "#000",
        shadowOffset: {
          width: 8,
          height: 8,
        },
        shadowOpacity: 0.3,
        shadowRadius: 10.32,
        elevation: 12,
      }}
      Component={TouchableScale}
      linearGradientProps={{
        colors: ["#70abff", "#428DFC"],
        start: { x: 1, y: 0 },
        end: { x: 0.2, y: 0 },
      }}
    >
      <ListItem.Content>
        <ListItem.Title style={{ color: "#f1f1f1", fontWeight: "bold" }}>
          {item.item_name}
        </ListItem.Title>
        <ListItem.Subtitle style={{ color: "#f1f1f1" }}>
          {"Requested By : " +
            item.reciever_id +
            "\nStatus : " +
            item.request_status}
        </ListItem.Subtitle>
      </ListItem.Content>
      <ListItem.Chevron color='white' />
    </ListItem>
  );

  componentDidMount() {
    this.getAllBarters();
  }

  componentWillUnmount() {
    this.requestRef();
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          alignContent: "center",
          backgroundColor: "#A1C3FC",
        }}
      >
        <MyHeader title="Barter's List" navigation={this.props.navigation} />
        <StatusBar style='light' backgroundColor='transparent' />
        <View style={{ flex: 1 }}>
          {this.state.allBarters.length === 0 ? (
            <View>
              <Text
                style={{
                  fontSize: 20,
                  alignSelf: "center",
                  color: "#f1f1f1",
                  marginTop: 20,
                }}
              >
                List of all Barters
              </Text>
            </View>
          ) : (
            <FlatList
              keyExtractor={this.keyExtractor}
              data={this.state.allBarters}
              renderItem={this.renderItem}
            />
          )}
        </View>
      </View>
    );
  }
}
