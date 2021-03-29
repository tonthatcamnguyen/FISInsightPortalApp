import React from 'react';
import { Image, View, Text, TouchableOpacity, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { loginStr, wellcomStr } from '../../res/values/strings';
import AsyncStorage from '@react-native-community/async-storage';

import stylesLogin from '../../res/values/styles/login/stylesLogin'

const STORAGE_KEY = '@SAVEUSER'

export default class Login extends React.Component {
  state = {
    showPassword: false,
    rememberPassword: true,
    user: "",
    password: "",
    tokenuser: ""
  }


  // Lấy tên tài khoản nếu user tick vào "Ghi nhớ đăng nhập"
  readDataUser = async () => {
    try {
      const token = await AsyncStorage.getItem(STORAGE_KEY)
      if (token !== null) {
        let parsed = JSON.parse(token)
        await this.setState({
          user: parsed.username,
          rememberPassword: parsed.rememberPassword,
          tokenuser: parsed.tokenuser
        })
        // User đã tích vào ghi nhớ đăng nhập nên khi vào lại app sẽ navigate tới WelcomeScreen
        if (parsed.tokenuser != "") {
          this.props.navigation.navigate('Welcome',
            {
              tokenuser: parsed.tokenuser
            }
          )
        }
      }
    } catch (error) {
      alert("LoginComponent Lỗi readDataUser: " + error.message)
      return null
    }
  }

  saveDataUser = async (account) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(account))
    } catch (error) {
      alert("LoginComponent Lỗi saveData: " + error.message)
      return null
    }
  }

  async componentDidMount() {
    try {
      await this.readDataUser()
    } catch (error) {
      alert("componentDidMount: " + error.message)
    }
  }

  async componentDidUpdate(preProps, preState) {
    const { data, error } = this.props
    if (data !== null && data !== preProps.data) {
      await this.readDataUser()

      this.setState({
        password: "",
      })

      if (!this.state.rememberPassword) {
        this.setState({
          user: ""
        })
      } else {
        try {
          await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify({
            tokenuser: this.props.data.data.token,
            username: this.state.user,
            rememberPassword: this.state.rememberPassword,
          }))
        } catch (error) {
          alert("Lỗi saveDataTokenUser: " + error.message)
          return null
        }
      }
      this.props.navigation.navigate('Welcome',
        {
          tokenuser: this.props.data.data.token,
        }
      )
    }
    if (error !== null && error !== preProps.error) {
      console.log(error)
    }
  }

  onPressLogin = async () => {
    if (!this.state.user) {
      Alert.alert(loginStr.notification, loginStr.notUsername)
    } else {
      if (!this.state.password) 
      {
        Alert.alert(loginStr.notification, loginStr.notPassword)
      } else {
        if (this.state.rememberPassword) {
          await this.saveDataUser({
            username: this.state.user,
            rememberPassword: this.state.rememberPassword,
            tokenuser: this.state.tokenuser
          })

        } else {
          await this.saveDataUser({
            username: "",
            rememberPassword: this.state.rememberPassword,
            tokenuser: ""
          })

        }
        console.log(this.state.password,'password')
        await this.props.loginAction(this.state.user, this.state.password)
        
      }
    }
  }

  render() {
    return (
      <ScrollView contentContainerStyle = {{flexGrow:1}}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>

        <View style={{ backgroundColor: "#F4F7FC", flex: 1, }}>
       
          <View style={stylesLogin.bgr}>
            <Image
              style={stylesLogin.imgLogo}
              source={require("../../res/images/ic_logo.png")}
            />
            <Text style={stylesLogin.txtTitle}>{loginStr.title}</Text>
            <Image
              style={stylesLogin.imgStripe}
              source={require("../../res/images/stripe.png")}
            />
            <Text style={stylesLogin.txtSignInSystem}
            >{loginStr.loginSystem}</Text>
            <View style={stylesLogin.viewInputUser}>
              <FontAwesome name={"user"} size={20} color="#B7BEC7"
                style={stylesLogin.iconTextInput}
              />
              <TextInput
                placeholder={loginStr.username}
                style={stylesLogin.txtUser}
                value={this.state.user}
                onChangeText={(value) => this.setState({ user: value })}
              />
            </View>
            <View style={[stylesLogin.viewInputUser, { marginBottom: "4%" }]}>
              <FontAwesome name={"lock"} size={20} color="#B7BEC7"
                style={stylesLogin.iconTextInput}
              />
              <TextInput
                placeholder={loginStr.pass}
                style={stylesLogin.txtPassword}
                value={this.state.password}
                onChangeText={(value) => this.setState({ password: value })}
                secureTextEntry={this.state.showPassword ? false : true}
              />
              <TouchableOpacity
                onPress={() => {
                  this.setState({ showPassword: !this.state.showPassword })
                }}
              >
                <FontAwesome
                  name={this.state.showPassword ? "eye" : "eye-slash"}
                  size={20} color="#B7BEC7"
                  style={stylesLogin.iconTextInputPassword}
                />
              </TouchableOpacity>
            </View>
            <View style={stylesLogin.viewRemberSignIn}>
              <TouchableOpacity
                onPress={() => {
                  this.setState({
                    rememberPassword: !this.state.rememberPassword
                  })
                }}
              >
                <MaterialIcons
                  name={this.state.rememberPassword
                    ? "check-circle-outline" : "panorama-fish-eye"}
                  size={24}
                  color="#FF9335"
                  style={{ paddingRight: 10 }}
                />
              </TouchableOpacity>
              <Text style={{ color: "#FF9335", fontStyle: "italic" }}>
                {loginStr.rememberPassword}
              </Text>
            </View>
            <TouchableOpacity
              style={stylesLogin.btnLogIn}
              onPress={this.onPressLogin}
            >
              <Text style={{ color: '#fff', textTransform: "uppercase" }}
              >{wellcomStr.login}
              </Text>
            </TouchableOpacity>
            <Image
              style={stylesLogin.imgSwipe}
              source={require("../../res/images/swipe.png")}
            />
          </View>
        
          
          <Text style={stylesLogin.txtCopyRight}>{loginStr.coppyright}</Text>
        </View>
        
      </TouchableWithoutFeedback>
      </ScrollView>
    );
  }
}
