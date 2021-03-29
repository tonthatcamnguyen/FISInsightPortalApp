import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import DateTimePicker from '@react-native-community/datetimepicker';
import PickerItem from '../../components/PickerItem'
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Sizes from '../../res/Sizes';
import moment from 'moment';
import stylesCreateCourse from '../../res/values/styles/course/stylesCreateCourse'
import SelectedDate from '../../components/utils/SelectedDate'

var dataToaNha = []
var tokenUser = ""
var courseId = ""
var editCourse = "false"
var isClick = false;
export default class CreateCourse extends React.Component {
    state = {
        dataBuilding: {
            toaNhaPhongHoc: [],
            phongHoc: []
        },
        course: {
            tenKhoa: "",
            giangVien: "",
            toaNha: "",
            phongHoc: "",
            dateStart: new Date(),
            dateEnd: new Date()
        },
        validate: {
            show: false,
            khoa: true,
            giangVien: true,
            ngayBatDau: true,
            ngayKetThuc: true,
            toaNha: true,
            phong: true
        },
        errorMessageEndDay: false,


    }
    checkDate = async () => {
        if (this.state.course.dateStart.getTime() >= this.state.course.dateEnd.getTime()) {
            await this.setState({
                validate: {
                    ...this.state.validate,
                    ngayKetThuc: true
                }
            })
        } else {
            await this.setState({
                validate: {
                    ...this.state.validate,
                    ngayKetThuc: false
                }
            })
        }
    }


    onValidateTextKhoa(value) {
        if (value.length) {
            this.setState(prevProps => ({
                validate: {
                    ...prevProps.validate,
                    khoa: false
                }
            }))
        } else {
            this.setState(prevProps => ({
                tenKhoa: "",
                validate: {
                    ...prevProps.validate,
                    khoa: true
                }
            }))
        }
    }
    onValidateTextGiangVien(value) {
        if (value.length) {
            this.setState(prevProps => ({
                validate: {
                    ...prevProps.validate,
                    giangVien: false
                }
            }))
        } else {
            this.setState(prevProps => ({
                course: {
                    ...prevProps.course,
                    giangVien: ""
                },
                validate: {
                    ...prevProps.validate,
                    giangVien: true
                }
            }))
        }
    }
    onValidateToaNha() {
        this.state.course.toaNha !== undefined &&
            this.setState(prevProps => ({
                validate: {
                    ...prevProps.validate,
                    toaNha: false
                }
            }))
    }
    onValidatePhongHoc() {
        this.state.course.phongHoc !== undefined &&
            this.setState(prevProps => ({
                validate: {
                    ...prevProps.validate,
                    phong: false
                }
            }))
    }

    onPressSetState(value) {
        alert(value)
    }

    componentDidMount() {
        editCourse = JSON.stringify(this.props.navigation.getParam("editCourse", "false"));
        let course = (this.props.navigation.getParam("course", "Ko có Course item"));
        if (editCourse == "true") {
            this.setState(prevProps => ({
                validate: {
                    ...prevProps.validate,
                    
                    toaNha: false,
                    phong: false,
                   
 
                },
                course: {
                    ...prevProps.course,
                    
                    toaNha: { id: course.buildingId, label: course.buildingName },
                    phongHoc: { id: course.roomId, label: course.roomName },
                    
                },
 
            }))
        }
    }
    componentWillMount()
    {
        tokenUser = this.props.navigation.getParam("tokenuser", "Ko có token user")
        editCourse = JSON.stringify(this.props.navigation.getParam("editCourse", "false"))
        let course = (this.props.navigation.getParam("course", "Ko có Course item"))
 
        courseId = course.course_id
 
        this.props.buildingAction(tokenUser)
        if (editCourse == "true") {
            this.setState(prevProps => ({
                validate: {
                    ...prevProps.validate,
                    khoa: false,
                    giangVien: false,
                    toaNha: false,
                    phong: false,
                    ngayBatDau: false,
                    ngayKetThuc: false,
 
                },
                course: {
                    ...prevProps.course,
                    tenKhoa: course.courseName,
                    giangVien: course.trainer,
                    toaNha: { id: course.buildingId, label: course.buildingName },
                    phongHoc: { id: course.roomId, label: course.roomName },
                    dateStart: new Date(course.startedDate),
                    dateEnd: new Date(course.endedDate)
                },
 
            }))
        }
    }

    async componentDidUpdate(prevProps) {
        const { data, error, loading } = this.props
        if (error !== null && error !== prevProps.error) {
            alert(error)
            return
        }
        if (data !== null && data !== prevProps.data) {
            // dataToaNha: chứa id và tên của tòa nhà
            dataToaNha = this.props.data.data.map((value) => {
                return {
                    id: value._id,
                    label: value.buildingName,
                }
            })
            // dataToaNhaPhongHoc: chứa id tòa nhà và mảng phòng học
            let dataToaNhaPhongHoc = this.props.data.data.map((value) => {
                return {
                    id: value._id,
                    value: value.room.map((item) => {
                        return { id: item._id, label: item.roomName + " - " + item.location }
                    })
                }
            })
            await this.setState(prevProps => ({
                dataBuilding: {
                    ...prevProps.dataBuilding,
                    toaNhaPhongHoc: dataToaNhaPhongHoc
                }
            }))

            if (editCourse == "true") {
                let idToaNha = this.state.course.toaNha.id
                let dataPhongHoc = (idToaNha) => {
                    for (let i = 0; i < this.state.dataBuilding.toaNhaPhongHoc.length; i++) {
                        if (this.state.dataBuilding.toaNhaPhongHoc[i].id == idToaNha) {
                            return this.state.dataBuilding.toaNhaPhongHoc[i]
                        }
                    }
                } 
                await this.setState(prevProps => ({
                    dataBuilding: {
                        ...prevProps.dataBuilding,
                        phongHoc: dataPhongHoc(idToaNha).value
                    }
                }))
            }
        }
    }

    checkValidate() {
        for (let item of Object.values(this.state.validate)) {
            if (item == true) {
                return true
            }
        }
        return false
    }

    render() {
        return (
            <SafeAreaView style={{ backgroundColor: "#fff", flex: 1 }}>
                <View>
                    <View style={stylesCreateCourse.headerNavigation}>
                        <TouchableOpacity onPress={() => { this.props.navigation.goBack() }}>
                            <MaterialIcons name={"arrow-back-ios"} size={25}
                                color="#B7BEC7" style={stylesCreateCourse.iconBack} />
                        </TouchableOpacity>
                        <Text style={[{ textTransform: "uppercase" }, stylesCreateCourse.txtStyleBasic]}  >Tạo mới khóa học</Text>
                        <TouchableOpacity>
                            <Entypo name={"plus"} size={20} color="#B7BEC7" style={stylesCreateCourse.iconAddCourse} />
                        </TouchableOpacity>
                    </View>
                </View>
                <ScrollView >
                    <View style={stylesCreateCourse.background}>
                        <Text style={stylesCreateCourse.txtStyleBasic}>Tên khóa</Text>
                        {/* Validate */}
                        {(this.state.validate.show && this.state.validate.khoa) && (
                            <Text style={stylesCreateCourse.txtValidate}>* Tên khóa học không được để trống</Text>)
                        }
                        <TextInput
                            placeholder={"Nhập tên khóa học"}
                            style={stylesCreateCourse.txtInput}
                            value={this.state.course.tenKhoa}
                            onChangeText={(value) => {
                                this.onValidateTextKhoa(value.trim())
                                this.setState(prevProps => ({
                                    course: {
                                        ...prevProps.course,
                                        tenKhoa: value
                                    }
                                }))
                            }}
                        />


                        <Text style={stylesCreateCourse.txtStyleBasic}>Giảng viên</Text>
                        {/* Validate */}
                        {(this.state.validate.show && this.state.validate.giangVien) && (
                            <Text style={stylesCreateCourse.txtValidate}>* Tên giảng viên không được để trống</Text>)
                        }
                        <TextInput
                            placeholder={"Nhập tên giảng viên"}
                            style={stylesCreateCourse.txtInput}
                            value={this.state.course.giangVien}
                            onChangeText={(value) => {
                                this.onValidateTextGiangVien(value.trim())
                                this.setState(prevProps => ({
                                    course: {
                                        ...prevProps.course,
                                        giangVien: value
                                    }
                                }))
                            }}
                        />


                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <View style={{ flex: 1, marginRight: Sizes.s30 }}>

                                <SelectedDate
                                    value={this.state.course.dateStart}
                                    title={"Từ ngày"}
                                    placeholder={editCourse == "true"
                                        ? moment(this.state.course.dateStart).format('DD/MM/YYYY')
                                        : "Chọn ngày bắt đầu"}
                                    onChange={value => {
                                        let val = new Date(Date.parse(value));

                                        var dStart = new Date();
                                        dStart.setFullYear(val.getFullYear(), val.getMonth(), val.getDate());
                                        var dEnd = new Date();
                                        console.log(dStart,value);
                                        console.log(dStart,this.state.course.dateEnd);
                                        
                                        if (dStart > dEnd) {
                                           
                                            this.setState(prevProps => ({
                                                course: {
                                                    ...prevProps.course,
                                                    dateStart: val
                                                },
                                                validate: {
                                                    ...prevProps.validate,
                                                    ngayKetThuc: true
                                                },
                                                errorMessageEndDay: true
                                            }), () => console.log("DOne"))
                                        }
                                        else {
                                            this.setState(prevProps => ({

                                                course: {
                                                    ...prevProps.course,
                                                    dateStart: val
                                                }
                                            }))
                                        }


                                    }


                                    }
                                    onValidate={() => {
                                        this.setState(prevProps => ({
                                            validate: {
                                                ...prevProps.validate,
                                                ngayBatDau: false
                                            }
                                        }))
                                    }}
                                    // maximumdate={this.state.course.dateEnd}  
                                    mode="date"
                                    display="default"
                                />
                                {/* Validate */}
                                {(this.state.validate.show && this.state.validate.ngayBatDau) && (
                                    <Text style={stylesCreateCourse.txtValidate}>* Chưa chọn ngày</Text>)
                                }
                            </View>
                            <View style={{ flex: 1 }}>
                                <SelectedDate
                                    value={this.state.course.dateEnd}
                                    title={"Đến ngày"}
                                    placeholder={
                                        editCourse == "true" ?
                                            moment(this.state.course.dateEnd).format('DD/MM/YYYY') :
                                            "Chọn ngày kết thúc"
                                    }
                                    onChange={value => {
                                        console.log(this.state.course.dateStart)
                                        let val = new Date(Date.parse(value));

                                        var dStart = new Date();
                                        var dEnd = new Date();
                                        dEnd.setFullYear(val.getFullYear(), val.getMonth(), val.getDay());

                                        dStart.setFullYear(this.state.course.dateStart.getFullYear(), this.state.course.dateStart.getMonth(), this.state.course.dateStart.getDay());
                                        if (dStart > dEnd) {
                                            this.setState(prevProps => ({
                                                course: {
                                                    ...prevProps.course,
                                                    dateEnd: val
                                                },
                                                validate: {
                                                    ...prevProps.validate,
                                                    ngayKetThuc: true
                                                },
                                                errorMessageEndDay: true
                                            }), () => console.log("DOne"))
                                        }
                                        else {

                                            this.setState(prevProps => ({

                                                course: {
                                                    ...prevProps.course,
                                                    dateEnd: val
                                                },
                                                errorMessageEndDay: false
                                            }))
                                        }

                                    }


                                    }
                                    onValidate={() => {
                                        this.setState(prevProps => ({
                                            validate: {
                                                ...prevProps.validate,
                                                ngayKetThuc: false
                                            }
                                        }))
                                    }}
                                    minimumdate={this.state.course.dateStart}
                                    mode="date"
                                    display="default"
                                />
                                {/* Validate */}
                                {(this.state.validate.show && this.state.validate.ngayKetThuc) && (
                                    <Text style={stylesCreateCourse.txtValidate}> {this.state.errorMessageEndDay == true ? "* Ngày kết thúc phải lớn hơn" : "* Chưa chọn ngày"}</Text>)
                                }
                            </View>
                        </View>
                        <Text style={[stylesCreateCourse.txtStyleBasic, { marginBottom: 0 }]}>Tòa nhà</Text>
                        {/* Validate */}
                        {(this.state.validate.show && this.state.validate.toaNha) && (
                            <Text style={stylesCreateCourse.txtValidate}>* Chưa chọn tòa nhà</Text>)
                        }
                        <PickerItem
                            noDataMessage={"Ko fetch data tòa nhà dc"}
                            data={dataToaNha}
                            title={"Danh sách tòa nhà"}
                            placeholder={"Chọn tòa nhà"}
                            position={"flex-end"}
                            defaultItem={this.state.course.toaNha}
                            value={
                                this.state.course.toaNha.id
                            }
                            onChangeItem={async (value) => {

                                await this.onValidateToaNha()
                                // alert(this.state.course.phongHoc)
                                // Tạo mảng phòng học tương ứng với từng tòa nhà 
                                let idToaNha = value.id
                                let dataPhongHoc = (idToaNha) => {
                                    for (let i = 0; i < this.state.dataBuilding.toaNhaPhongHoc.length; i++) {
                                        if (this.state.dataBuilding.toaNhaPhongHoc[i].id == idToaNha) {
                                            return this.state.dataBuilding.toaNhaPhongHoc[i]
                                        }
                                    }
                                }
                                await this.setState(prevProps => ({
                                    dataBuilding: {
                                        ...prevProps.dataBuilding,
                                        phongHoc: dataPhongHoc(idToaNha).value
                                    },
                                    course: {
                                        ...prevProps.course,
                                        phongHoc: "",
                                        toaNha: value
                                    },
                                    validate: {
                                        ...prevProps.validate,
                                        phong: true
                                    }
                                }))
                            }}
                        />


                        <Text style={[stylesCreateCourse.txtStyleBasic, { marginTop: Sizes.s10, marginBottom: 0 }]}>Phòng</Text>
                        {/* Validate */}
                        {(this.state.validate.show && this.state.validate.phong) && (
                            <Text style={stylesCreateCourse.txtValidate}>* Chưa chọn phòng</Text>)
                        }
                        <PickerItem
                            data={this.state.dataBuilding.phongHoc}
                            noDataMessage={"Ko fetch data phòng học dc"}
                            title={"Danh sách phòng học"}
                            position={"flex-end"}
                            placeholder={"Chọn phòng học"}
                            defaultItem={this.state.course.phongHoc}
                            onChangeItem={async (value) => {
                                await this.setState(prevProps => ({
                                    course: {
                                        ...prevProps.course,
                                        phongHoc: value
                                    }
                                }))
                                // console.log("phong hoc", this.state.course.phongHoc)
                                this.onValidatePhongHoc()
                            }}
                            value={this.state.course.phongHoc.label}
                            style={{ marginBottom: Sizes.s2 }}
                        />

                        <TouchableOpacity
                            style={stylesCreateCourse.btnSave}
                            onPress={() => {


                                // alert(this.checkValidate())
                                if (
                                    // this.state.validate.show == false &&
                                    this.state.validate.khoa == false &&
                                    this.state.validate.giangVien == false &&
                                    this.state.validate.ngayBatDau == false &&
                                    this.state.validate.ngayKetThuc == false &&
                                    this.state.validate.toaNha == false &&
                                    this.state.validate.phong == false) {

                                    Alert.alert(
                                        JSON.stringify(this.props.navigation.getParam("editCourse", "false")) == "true" ? "Cập nhật khóa học" : "Tạo mới khóa học",
                                        JSON.stringify(this.props.navigation.getParam("editCourse", "false")) == "true" ? "Bạn muốn cập nhật khóa học" : "Bạn muốn tạo khóa học",
                                        [
                                            { text: "Hủy bỏ" },
                                            {
                                                text: "Đồng ý",
                                                onPress: async () => {
                                                    console.log(JSON.stringify(this.state.validate))
                                                    const newCourse = {
                                                        courseName: this.state.course.tenKhoa.trim(),
                                                        trainer: this.state.course.giangVien.trim(),
                                                        startedDate: this.state.course.dateStart,
                                                        endedDate: this.state.course.dateEnd,
                                                        buildingId: this.state.course.toaNha.id,
                                                        roomId: this.state.course.phongHoc.id,
                                                    }
                                                    if (JSON.stringify(this.props.navigation.getParam("editCourse", "false")) == "true") {
                                                        newCourse.courseId = courseId
                                                        this.props.editCourseAction(
                                                            tokenUser,
                                                            newCourse
                                                        )
                                                    } else {
                                                        this.props.addCourseAction(
                                                            tokenUser,
                                                            newCourse
                                                        )
                                                    }
                                                    await this.props.courseAction(tokenUser)
                                                    await this.props.navigation.goBack()
                                                }
                                            }
                                        ],
                                        { cancelable: false }
                                    )
                                } else {
                                    this.setState(prevProps => ({
                                        validate: {
                                            ...prevProps.validate,
                                            show: true
                                        }
                                    }))
                                }
                            }}
                        >
                            <FontAwesome name={"save"} size={16} color={"#fff"} />
                            <Text
                                style={{ color: "#fff", fontWeight: "bold", marginLeft: 8 }}
                            >Lưu</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </SafeAreaView >
        )
    }
}

// Update state object 
// https://stackoverflow.com/questions/43638938/updating-an-object-with-setstate-in-react

// Get value ftoom custom component
// https://stackoverflow.com/questions/64134105/react-how-do-i-get-the-value-of-a-custom-textinput-component