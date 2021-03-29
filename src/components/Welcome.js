import React from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  BackHandler,
  Alert
} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { Sizes } from '@dungdang/react-native-basic';
import AsyncStorage from '@react-native-community/async-storage';


const STORAGE_KEY = '@SAVEUSER'

const Btn = ({ onPress, title }) => (
  <TouchableOpacity onPress={onPress} style={styles.btnContainer}>
    <Text style={styles.btn}>{title}</Text>
  </TouchableOpacity>
);

export default class Welcome extends React.Component {
  state = ({
    test: new Date(),
    validateTest: true
  })
  backAction = () => {
    // Link: https://stackoverflow.com/questions/58935216/react-native-stack-navigation-when-back-handler-is-used
    if (!this.props.navigation.isFocused()) {
      return false;
    }

    Alert.alert(
      "Đăng xuất",
      "Bạn có muốn đăng xuất không", [
      {
        text: "Hủy"
      }, {
        text: "Có",
        onPress: async () => {
          try {
            const token = await AsyncStorage.getItem(STORAGE_KEY)
            if (token !== null) {
              let parsed = JSON.parse(token)
              try {
                await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify({
                  username: parsed.username,
                  rememberPassword: parsed.rememberPassword,
                  tokenuser: ""
                }))
              } catch (error) {
                alert("Lỗi saveData WelcomeScreen: " + error.message)
                return null
              }
            }
          } catch (error) {
            alert('Lỗi readDataUser WelcomeScreen: ' + error.message)
            return null
          }
          this.props.navigation.goBack()
        }
      }
    ])
    return true; 
  };

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      this.backAction
    )
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.backAction)
  }
  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('dataUser');
      console.log('dataUser', value);
      if (value !== null) {
        let data = JSON.parse(value);
        data.isLogin = false;
        AsyncStorage.setItem('dataUser', JSON.stringify(data));
      }
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#F4F7FC' }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginHorizontal: Sizes.s60,
          }}>
          <Text
            style={{ fontSize: Sizes.s70, color: '#E5844E', fontWeight: 'bold', marginBottom: '10%' }}>
            FIS INSIGHT PORTAL
          </Text>
          <Btn
            title="Quản lý khóa học"
            onPress={() => {
              this.props.navigation.navigate('CourseContainer', {
                tokenuser: this.props.navigation.getParam("tokenuser", "Ko có token user")
              })
            }}
          />
          <Btn
            title="Đăng xuất"
            onPress={() => {
              Alert.alert(
                "Đăng xuất",
                "Bạn có muốn đăng xuất không", [
                {
                  text: "Hủy bỏ"
                }, {
                  text: "Đồng ý",
                  onPress: async () => { 
                    try {
                      const token = await AsyncStorage.getItem(STORAGE_KEY)
                      if (token !== null) {
                        let parsed = JSON.parse(token)
                        try {
                          await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify({
                            username: parsed.username,
                            rememberPassword: parsed.rememberPassword,
                            tokenuser: ""
                          }))
                        } catch (error) {
                          alert("Lỗi saveData WelcomeScreen: " + error.message)
                          return null
                        }
                      }        
                    } catch (error) {     
                      alert('Lỗi readDataUser WelcomeScreen: ' + error.message)
                      return null
                    }
                    this.props.navigation.goBack()
                  }
                }
              ])
            }}
          />
          {/* <ActivityIndicator /> */}
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({    
  btn: {
    color: 'white',
    fontSize: Sizes.h42,
    fontWeight: 'bold',
  },
  btnContainer: {
    elevation: 3,    
    backgroundColor: '#F5A33E',
    alignItems: 'center', 
    justifyContent: 'center',     
    height: Sizes.s100,
    width: '100%',
    borderRadius: 5,
    marginTop: Sizes.h52,
  },
  txtValidate: {
    fontSize: Sizes.h26,
    color: "red",
  },
});