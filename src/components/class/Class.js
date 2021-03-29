import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import moment from 'moment';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Sizes from '../../res/Sizes';
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
    <View style={styles.cardItem} >
      <FontAwesome5 name={props.icon} size={19} style={[{ paddingRight: 16 }, props.styleIcon]} />
      <Text style={{ color: "#637890", fontWeight: 'bold' }}>{props.title}</Text>
      <Text style={[{ color: "#576976",  }, props.styleContent]} numberOfLines={1}>{props.content} </Text>
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
    borderRadius: Sizes.s15,
    alignItems: 'center',
    paddingVertical: Sizes.s10,
  },
};

export default class Class extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      token: "",
      course: "",
      courseDate: "",
      listClass: [],
      selectedOption: new Map()
    }
  }

  async componentDidMount() {
    let token = await this.props.navigation.getParam("token", "Ko có token user")
    let course = await this.props.navigation.getParam("course", "Ko có course")
    let courseDate = await this.props.navigation.getParam("courseDate", "Ko có courseDate")
    await this.setState({
      token: token,
      course: course,
      courseDate: courseDate,
    })
    await this.props.classAction(this.state.token, this.state.course["course_id"])
  }

  async componentDidUpdate(prevProps) {
    const { data, error, loading } = this.props
    if (error !== null && error !== prevProps.error) {
      alert(error)
      return
    }
    if (data !== null && data !== prevProps.data) {
      await this.setState({
        listClass: this.props.data["data"]
      })

      // Map lưu toàn bộ select của từng card
      let mapSelected = new Map()
      for (let i = 0; i < this.state.listClass.length; i++) {
        mapSelected.set(this.state.listClass[i].classId, false)
      }
      await this.setState({
        selectedOption: mapSelected
      })
    }
  }
  renderItem = ({ item }) => (
    <View
      onStartShouldSetResponder={async () => {
        let mapSelected = await this.state.selectedOption
        // Set toàn bộ values về false khi nhấn nhiều select sẽ hiện 1 select   
        for (let key of mapSelected.keys()) {
          mapSelected.set(key, false)
        }
        await this.setState({
          selectedOption: mapSelected
        })

      }}
    >
      <View style={styles.background}>
        <View style={styles.headerItem}>
          <Text
            style={{
              fontWeight: "bold",
              width: "72%",
              color: "#576976",
              fontSize: Sizes.s35
            }}
            numberOfLines={2}
          >{item.className}</Text>
          <Menu onSelect={async value => {
            if (value == "suaKhoaHoc") {
              this.props.navigation.navigate('CreateClassContainer',
                {
                  editCourse: true,
                  courseId: this.state.course.course_id,
                  courseTimeStart: this.state.courseDate.start,
                  courseTimeEnd: this.state.courseDate.end,
                  tokenuser: this.props.navigation.getParam("tokenuser", "Ko có token user"),
                  classItem: item
                })
            }
            if (value == "XoaKhoaHoc") {
              Alert.alert(
                "Xóa buổi học ?",
                "Bạn muốn xóa buổi học",
                [{
                  text: "Hủy bỏ"
                },
                {
                  text: "Đồng ý",
                  onPress: async () => {
                    await this.props.deleteClassAction(this.state.token, item.classId.toString())
                    await this.props.classAction(this.state.token, this.state.course.course_id)

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
                  paddingHorizontal: Sizes.s35,
                },
                OptionTouchableComponent: TouchableOpacity,
                optionTouchable: touchableOpacityProps,
              }} value="suaKhoaHoc" text="Sửa" />
              <MenuOption customStyles={{
                optionWrapper: {
                  paddingHorizontal: Sizes.s35,
                },
                OptionTouchableComponent: TouchableOpacity,
                optionTouchable: touchableOpacityProps,
              }} value="XoaKhoaHoc" text="Xóa" />
            </MenuOptions>
          </Menu>

        </View>
        <ItemContent
          icon={"user-tie"}
          title={"Giảng viên: "} content={item.trainer}
          styleIcon={{ color: "#FF9335" }}
          styleContent={{ color: "#4DA4C6", fontWeight: "bold", width: "64%" }}
        >
        </ItemContent>
        <ItemContent
          icon={"id-card"}
          title={"Cán bộ quản lý: "}
          content={item.created_by}
          styleContent={{ color: "#FF9335", fontWeight: "bold", width: "56%" }}
        >
        </ItemContent>
        <ItemContent
          icon={"calendar-check"}
          title={"Ngày: "}
          content={moment(item.date).format('DD/MM/YYYY')}
          styleIcon={{ color: "#4DA4C6" }}
          styleContent={{ fontWeight: "bold", width: "64%" }}
        >
        </ItemContent>
        <ItemContent
          icon={"clock"}
          title={"Thời gian: "}
          content={item.startedTime + " - " + item.endedTime}
          styleIcon={{ color: "#d9687c" }}
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
          styleIcon={{ color: "#FF9335" }}
          styleContent={{ fontWeight: "bold", width: "64%" }}
        >
        </ItemContent>
        <ItemContent
          icon={"wifi"}
          title={"Wifi: "} content={item.wifi}
          styleIcon={{ color: "#2ebd96" }}
          styleContent={{ fontWeight: "bold", width: "64%" }}
        >
        </ItemContent>
        <Text
          style={{
            position: "absolute",
            right: 20,
            bottom: 20,
            paddingHorizontal: 16,
            paddingVertical: 8,
            borderRadius: 16,
            fontWeight: "bold",
            color: "#FF9335",
            backgroundColor: "#E7EBEE"
          }}
        >{item.code}</Text>
      </View>
    </View>
  );

  render() {   
    return (
      <MenuProvider>
        <SafeAreaView >
          <View style={{ height: "100%", backgroundColor: "#F4F7FC" }}>
            <View style={styles.headerNavigation}>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.goBack()
                }}
              >
                <MaterialIcons name={"arrow-back-ios"} size={24} color="#B7BEC7" style={styles.iconBack} />
              </TouchableOpacity>
              <Text style={[stylesCourse.txtStyleBasic, {
                textTransform: "uppercase",
                color: "#637890",
                fontSize: Sizes.s40
              }]}
              >Quản lý buổi học</Text>
              <TouchableOpacity
                onPress={
                  async () => {
                    let mapSelected = await this.state.selectedOption
                    // Set toàn bộ values về false khi nhấn nhiều select sẽ hiện 1 select   
                    for (let key of mapSelected.keys()) {
                      mapSelected.set(key, false)
                    }
                    await this.setState({
                      selectedOption: mapSelected
                    })
                    this.props.navigation.navigate("CreateClassContainer", {
                      editCourse: false,
                      courseId: this.state.course.course_id,
                      courseTimeStart: this.state.courseDate.start,
                      courseTimeEnd: this.state.courseDate.end,
                      tokenuser: this.props.navigation.getParam("tokenuser", "Ko có token user"),
                    }
                    )
                  }}
              >
                <Entypo name={"plus"} size={30} color="#B7BEC7" style={styles.iconAddCourse} />
              </TouchableOpacity>
            </View>
            <View>
              <Text
                style={{
                  width: '100%',
                  fontSize: Sizes.s50,

                  // paddingVertical: 1,
                  // borderRadius: 5,
                  fontWeight: "bold",
                  color: "#FF9335",
                  backgroundColor: "#4D4D4D",
                  textAlign: "center"
                }}
              >{this.state.course.courseName}</Text>
            </View>
            <FlatList
              data={this.state.listClass}
              // data={data}
              renderItem={this.renderItem}
              keyExtractor={item => item.classId}
              extraData={this.state.listClass}
              onRefresh={() => this.props.classAction(this.state.token, this.state.course.course_id)}
              refreshing={this.props.loading}
            />
          </View>
        </SafeAreaView>
      </MenuProvider>
    );
  }


}

const styles = StyleSheet.create({
  background: {
    backgroundColor: "#fff",
    margin: 10,
    padding: 8,
    paddingBottom: "5%",
    borderRadius: 8,
    // Box shadow
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 6,
  },
  headerNavigation: {
    flexDirection: "row",
    backgroundColor: "#fff",
    justifyContent: "space-between",
    alignItems: "center",
    // borderBottomStartRadius: 1,
    // borderBottomEndRadius: 1,
    // borderBottomColor: '#ddd',
    // borderBottomWidth: 2,
    // // paddingVertical: Sizes.s30,

    // // Box shadow
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 4,
    // },
    // shadowOpacity: 0.3,
    // // shadowRadius: 4.65,
    // elevation: 0,
  },
  headerItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 10,
  },
  cardItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 7,
  },
  iconBack: {
    alignItems: "flex-start",
    padding: Sizes.s40
  },
  iconAddCourse: {
    alignItems: "flex-end",
    padding: Sizes.s30

    // opacity: 0
  }
})
