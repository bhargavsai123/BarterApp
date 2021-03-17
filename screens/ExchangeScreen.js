/** @format */

import { StatusBar } from "expo-status-bar";
import * as React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Modal,
  Alert,
  FlatList,
  KeyboardAvoidingViewComponent,
} from "react-native";
import { ListItem } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import db from "../config";
import firebase from "firebase";
import TouchableScale from "react-native-touchable-scale";
import LinearGradient from "react-native-linear-gradient";
import { FloatingAction } from "react-native-floating-action";
import { FAB } from "react-native-paper";
import MyHeader from "../components/header";

export default class ExchangeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: firebase.auth().currentUser.email,
      itemName: "",
      description: "",
      isModalVisible: false,
      trades: [],
    };
    this.tradeRef = null;
  }
  createUniqueId() {
    return Math.random().toString(36).substring(7);
  }
  addItem = (itemName, description) => {
    if (this.state.itemName === "" || this.state.description === "") {
      Alert.alert("Please enter the Item you want to Exchange");
    } else {
      var userName = this.state.userName;
      exchangeId = this.createUniqueId();
      db.collection("trades").add({
        user_name: userName,
        item_name: itemName,
        description_d: description,
        exchange_id: exchangeId,
      });
      this.setState({ itemName: "", description: "" });
      return Alert.alert("Item Ready to Exchange");
    }
  };
  showModal = () => {
    return (
      <Modal
        animationType='slide'
        transparent={true}
        visible={this.state.isModalVisible}
      >
        <KeyboardAvoidingView style={styles.modal}>
          <ScrollView>
            <Text style={styles.title}>Add Item</Text>
            <View
              style={{
                backgroundColor: "#428DFC",
                borderRadius: 10,
                borderBottomStartRadius: 3,
                borderBottomEndRadius: 3,
              }}
            >
              <TextInput
                placeholder='Item Name'
                style={[styles.input, { marginTop: 50 }]}
                onChangeText={(text) => {
                  this.setState({ itemName: text });
                }}
              />
              <TextInput
                placeholder='Description'
                multiline={true}
                style={[
                  styles.input,
                  { height: 140, marginTop: 30, marginBottom: 20 },
                ]}
                onChangeText={(text) => {
                  this.setState({ description: text });
                }}
              />
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  this.addItem(this.state.itemName, this.state.description);
                }}
              >
                <Text style={styles.text}>Add Item</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ marginBottom: 20 }}
                onPress={() => {
                  this.setState({ isModalVisible: false });
                }}
              >
                <Text
                  style={[
                    styles.text,
                    { fontSize: 15, textDecorationLine: "underline" },
                  ]}
                >
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </Modal>
    );
  };
  getTradeList = () => {
    this.tradeRef = db.collection("trades").onSnapshot((snapshot) => {
      var requestedTrades = snapshot.docs.map((document) => document.data());
      this.setState({ trades: requestedTrades });
    });
  };
  UNSAFE_componentWillMount() {
    this.getTradeList();
  }
  componentWillMount() {
    this.tradeRef;
  }
  keyExtractor = (item, index) => index.toString();
  renderItem = ({ item, i }) => {
    return (
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
        onPress={() => {
          this.props.navigation.navigate("UserDetails", { details: item });
          console.log(item.item_name);
        }}
      >
        <ListItem.Content>
          <ListItem.Title style={{ color: "#f1f1f1", fontWeight: "bold" }}>
            {item.item_name}
          </ListItem.Title>
          <ListItem.Subtitle style={{ color: "#f1f1f1" }}>
            {item.user_name}
          </ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Chevron color='white' />
      </ListItem>
    );
  };
  render() {
    return (
      <View style={styles.container}>
        {this.showModal()}
        <MyHeader title='Exchange' navigation={this.props.navigation} />
        <ScrollView>
          <FlatList
            keyExtractor={this.keyExtractor}
            data={this.state.trades}
            renderItem={this.renderItem}
          />
        </ScrollView>
        <FAB
          style={styles.fab}
          label={"Add Items"}
          icon='plus'
          onPress={() => {
            this.setState({ isModalVisible: true });
          }}
        />
        <StatusBar style='light' backgroundColor='transparent' />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
    backgroundColor: "#A1C3FC",
  },
  modal: {
    backgroundColor: "#1972f7",
    width: "80%",
    justifyContent: "center",
    alignContent: "center",
    alignSelf: "center",
    borderRadius: 5,
    marginVertical: 70,
    shadowColor: "#000",
    shadowOffset: {
      width: 8,
      height: 8,
    },
    shadowOpacity: 0.5,
    shadowRadius: 102,
    elevation: 16,
  },
  title: {
    fontSize: 25,
    padding: 20,
    color: "#f1f1f1",
    alignSelf: "center",
  },
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
  input: {
    width: 280,
    height: 35,
    fontSize: 20,
    padding: 5,
    borderRadius: 5,
    paddingLeft: 10,
    margin: 30,
    backgroundColor: "#f1f1f1",
    color: "#999999",
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 8,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10.32,
    elevation: 16,
  },
  text: {
    color: "#f1f1f1",
    fontSize: 20,
    padding: 5,
    alignSelf: "center",
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: "#1972f7",
    shadowColor: "#000",
    shadowOffset: {
      width: 8,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10.32,
    elevation: 4,
  },
});
