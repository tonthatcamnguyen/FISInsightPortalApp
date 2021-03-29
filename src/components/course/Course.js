import React from 'react';
import { View, Text, TouchableOpacity, FlatList, Alert, Button } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import moment from 'moment';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Sizes from '../../res/Sizes';
import stylesCourse from '../../res/values/styles/course/stylesCourse'
import {
  MenuProvider,
  Menu,
  MenuTrigger,
  MenuOptions,
  MenuOption,
} from 'react-native-popup-menu';

// Componment hiển thị dữ liệu trong từng dòng của khóa học
function ItemContent(props) {
  return (
    <View style={stylesCourse.cardItem} >
      <FontAwesome5 name={props.icon} size={20}
        style={[{ paddingRight: 20 }, props.styleIcon]} />
      <Text style={{ color: "#3F5268" }}>{props.title}</Text>
      <Text style={[{
         color: "#637890", fontWeight: "bold"
      }, props.styleContent]} numberOfLines={1}>{props.content} </Text>
    </View>
  )
}
const touchableOpacityProps = {
  activeOpacity: 0.6,
};
const optionsStyles = {
  optionsContainer: {
    marginRight: Sizes.s50,
    maxWidth: "70%",
    borderRadius: Sizes.s10,
    alignItems: 'center',
    paddingVertical: Sizes.s5,
  },
};


export default class Course extends React.Component {
  state = {
    token: "",
    listCourse: [],
    selectedOption: new Map()
  }

  resetMapSelected() {
    let mapSelected = this.state.selectedOption

    // Set toàn bộ values về false khi nhấn nhiều select sẽ hiện 1 select  
    mapSelected.forEach((key) => {
      mapSelected.set(key, false);
    })

    this.setState({
      selectedOption: mapSelected
    })
  }

  async componentDidMount() {
    let token = await this.props.navigation
      .getParam("tokenuser", "Ko có token user")
    await this.setState({
      token: token
    })

    await this.props.courseAction(this.state.token)
  }

  componentDidUpdate(prevProps) {
    const { data, error, loading } = this.props
    if (error !== null && error !== prevProps.error) {
      alert(error)
      return
    }
    if (data !== null && data !== prevProps.data) {
      // Map lưu toàn bộ select của từng card
      let mapSelected = new Map()
      mapSelected.forEach((key) => {
        mapSelected.set(key, false);
      })

      this.setState({
        selectedOption: mapSelected,
        listCourse: this.props.data["data"]
      })
    }
  }

  renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        this.resetMapSelected()
        this.props.navigation.navigate("ClassContainer",
          {
            courseDate: { start: item.startedDate, end: item.endedDate },
            course: item,
            token: this.props.navigation.getParam("tokenuser", "Ko có token user"),
          })
      }}
    >
      <View style={stylesCourse.background}>
        <View style={stylesCourse.headerItem}>
          <Text
            style={{
              fontWeight: "bold",
              width: "72%",
              color: "#576976",
              fontSize: Sizes.s40
            }}
            numberOfLines={2}
          >{item.courseName}</Text>
          <View >
            <Menu onSelect={async value => {
              if (value == "suaKhoaHoc") {
                this.props.navigation.navigate('CreateCourseContainer',
                  {
                    editCourse: true,
                    course: item,
                    tokenuser: this.props.navigation
                      .getParam("tokenuser", "Ko có token user"),
                  })
              }
              if (value == "XoaKhoaHoc") {
                Alert.alert(
                  "Xóa khóa học",
                  "Bạn muốn xóa khóa học",
                  [{
                    text: "Hủy bỏ"
                  },
                  {
                    text: "Đồng ý",
                    onPress: async () => {
                      await this.props.deleteCourseAction(
                        this.state.token, item.course_id.toString()
                      )
                      await this.props.courseAction(this.state.token)

                    }
                  }]
                )
              }
            }}>
              <MenuTrigger
                children={<Entypo name={"dots-three-vertical"}
                  size={20} color="rgba(0,0,0,0.6)" style={{ padding: Sizes.s10 }} />}
                customStyles={{
                  TriggerTouchableComponent: TouchableOpacity,
                  triggerTouchable: touchableOpacityProps,
                }}
              />
              <MenuOptions customStyles={optionsStyles}>
                <MenuOption customStyles={{
                  optionWrapper: {
                    paddingHorizontal: Sizes.s50,
                  },
                  OptionTouchableComponent: TouchableOpacity,
                  optionTouchable: touchableOpacityProps,
                }} value="suaKhoaHoc" text="Cập nhật" />
                <MenuOption customStyles={{
                  optionWrapper: {
                    paddingHorizontal: Sizes.s50,
                  },
                  OptionTouchableComponent: TouchableOpacity,
                  optionTouchable: touchableOpacityProps,
                }} value="XoaKhoaHoc" text="Xóa" />
              </MenuOptions>
            </Menu>
          </View>
        </View>
        <View>
          <ItemContent
            icon={"user-tie"}
            title={"Giảng viên: "} content={item.trainer}
            styleIcon={{ color: "#FBD13F" }}
            styleContent={{ color: "#4DA4C6", fontWeight: "bold", width: "64%" }}
          >
          </ItemContent>
          <ItemContent
            icon={"id-card"}
            title={"Cán bộ quản lý: "}
            content={item.created_by}
            styleIcon={{color: "#3B2943"}}
            styleContent={{ color: "#F8943E", fontWeight: "bold", width: "56%" }}
          >
          </ItemContent>
          <ItemContent
            icon={"calendar-check"}
            title={"Thời gian: "}
            content={moment(item.startedDate).format(
              'DD/MM/YYYY') + " - " + moment(item.endedDate).format('DD/MM/YYYY')}
            styleIcon={{ color: "#4DA4C6" }}
            styleContent={{ fontWeight: "bold", width: "64%" }}
          >
          </ItemContent>
          <ItemContent
            icon={"building"}
            title={"Tòa nhà: "} content={item.buildingName}
            styleIcon={{ color: "#4DA4C6" }}
            styleContent={{ fontWeight: "bold", width: "64%" }}
          >
          </ItemContent>
          <ItemContent
            icon={"chalkboard-teacher"}
            title={"Phòng: "} content={item.roomName}
            styleIcon={{ color: "#F8943E" }}
            styleContent={{ fontWeight: "bold", width: "64%" }}
          >
          </ItemContent>
        </View>
      </View>
    </TouchableOpacity>
  );

  render() {
    return (
      <MenuProvider >
        <SafeAreaView>
          <View style={{ height: "100%", backgroundColor: "#F4F7FC" }}>
            <View style={stylesCourse.headerNavigation}>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.goBack()
                }}
              >
                <MaterialIcons name={"arrow-back-ios"} size={25} color="#B7BEC7"
                  style={stylesCourse.iconBack} />
              </TouchableOpacity>
              <Text style={[stylesCourse.txtStyleBasic, {
                textTransform: "uppercase",
                color: "#364D67",
              }]}
              >Quản lý khóa học</Text>
              <TouchableOpacity
                onPress={async () => {
                  this.resetMapSelected()
                  this.props.navigation.navigate('CreateCourseContainer',
                    {
                      tokenuser: this.props.navigation.getParam("tokenuser", "Ko có token user"),
                      editCourse: false
                    })
                }
                }
              >
                <Entypo name={"plus"} size={30} color="#B7BEC7"
                  style={stylesCourse.iconAddCourse} />
              </TouchableOpacity>
            </View>
            <FlatList
              data={this.state.listCourse}
              style={{ marginVertical: Sizes.s15 }}
              renderItem={this.renderItem}
              keyExtractor={item => item.course_id}
              extraData={this.state.listCourse}
              onRefresh={() => this.props.courseAction(this.state.token)}
              refreshing={this.props.loading}
            />
          </View>
        </SafeAreaView>
      </MenuProvider>
    );
  }
}

