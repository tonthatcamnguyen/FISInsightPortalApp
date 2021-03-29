import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import DateTimePicker from '@react-native-community/datetimepicker';
import PickerItem from '../../components/PickerItem'
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Sizes from '../../res/Sizes';
import moment from 'moment';

export default class CreateClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            courseId: "",
            editCourse: false,
            tokenUser: "",
            dataToaNha: [],
            dataToaNhaPhongHoc: [],
            dataPhongHoc: [],
            className: "",
            giangVien: "",
            toaNha: "",
            phongHoc: "",
            showTimeStart: false,
            showTimeEnd: false,
            timeStart: new Date(2020, 20, 2, 0, 0),
            timeEnd: new Date(2020, 20, 2, 23, 59),
            showValidate: false,
            validateKhoa: true,
            validateGiangVien: true,
            validateNgay: true,
            validateBatDau: true,
            validateKetThuc: true,
            validateToaNha: true,
            validatePhong: true,
            validateTimeKetThuc: false,

            courseTimeStart: "",
            courseTimeEnd: "",
            dateClass: new Date(),
            showDateClass: false,

            classItem: "",
            classId: "",
            className: "",

            pressDateClass: false,
            pressTimeStart: false,
            pressTimeEnd: false,
        }
    }

    onChangeTimeStart = (event, selectedDate) => {
        if (selectedDate != undefined) {
            this.setState({
                timeStart: selectedDate,
                showTimeStart: false,
                validateBatDau: false,
                pressTimeStart: true
            })
        }
        this.setState({
            showTimeStart: false
        })
    }
    onChangeDateClass = (event, selectedDate) => {
        if (selectedDate != undefined) {
            this.setState({
                dateClass: selectedDate,
                showDateClass: false,
                showTimeStart: false,
                showTimeEnd: false,
                pressDateClass: true,
                validateNgay: false
            })
        }
        this.setState({
            showDateClass: false,
            showTimeStart: false,
            showTimeEnd: false
        })
    }
    onChangeTimeEnd = (event, selectedDate) => {
        if (selectedDate != undefined) {
            if (this.state.timeStart.getTime() >= selectedDate.getTime()) {
                this.setState({
                    timeEnd: selectedDate,
                    showTimeEnd: false,
                    validateKetThuc: false,
                    pressTimeEnd: true,
                    validateTimeKetThuc: true
                })
            }
            else {
                this.setState({
                    timeEnd: selectedDate,
                    showTimeEnd: false,
                    validateKetThuc: false,
                    pressTimeEnd: true,
                    validateTimeKetThuc: false
                })
            }
        }
        this.setState({
            showTimeEnd: false
        })
    }

    convertDate(date) {

        return date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();
    }

    onValidateTextKhoa(value) {
        if (value.length) {
            this.setState({
                validateKhoa: false
            })
        } else {
            this.setState({
                validateKhoa: true,
                className: ""
            })
        }
    }
    onValidateTextGiangVien(value) {
        if (value.length) {
            this.setState({
                validateGiangVien: false
            })
        } else {
            this.setState({
                validateGiangVien: true,
                giangVien: ""
            })
        }
    }
    onValidateToaNha() {
        if (this.state.toaNha !== undefined) {
            this.setState({
                validateToaNha: false,
                validatePhong: true
            })
        } else {
            this.setState({
                validateToaNha: true,
                validatePhong: true
            })
        }
    }
    onValidatePhongHoc() {
        if (this.state.phongHoc !== undefined) {
            this.setState({
                validatePhong: false
            })
        } else {
            this.setState({
                validatePhong: true,
            })
        }
    }

    async componentDidMount() {
        let courseId = await this.props.navigation.getParam("courseId", "Ko có courseId")
        let courseTimeStart = await new Date(this.props.navigation.getParam("courseTimeStart", "Ko có course"))
        let courseTimeEnd = await new Date(this.props.navigation.getParam("courseTimeEnd", "Ko có course"))
        let editCourse = await JSON.stringify(this.props.navigation.getParam("editCourse", "false"))
        let tokenuser = await (this.props.navigation.getParam("tokenuser", "Ko có tokenuser"))
        let classItem = await (this.props.navigation.getParam("classItem", "Ko có tokenuser"))

        if (courseTimeStart.getTime() == courseTimeEnd.getTime()) {
            courseTimeEnd.setMilliseconds(courseTimeEnd.getMilliseconds() + 1)
        }

        await this.props.buildingAction(tokenuser)
        await this.setState({
            tokenUser: tokenuser,
            editCourse: editCourse,
            courseId: courseId,
            courseTimeStart: courseTimeStart,
            courseTimeEnd: courseTimeEnd,
            // dateClass: courseTimeStart
        })
        if (editCourse == "true") {
            // Lấy thời gian bắt đấu và thời gian kết thúc


            let classItemTimeStarted = classItem.startedTime.split(":")
            let classItemTimeEnd = classItem.endedTime.split(":")


            await this.setState({
                courseId: courseId,
                validateKhoa: false,
                validateGiangVien: false,
                validateToaNha: false,
                validatePhong: false,
                validateNgay: false,
                validateBatDau: false,
                validateKetThuc: false,

                classItem: classItem,
                classId: classItem.classId,
                className: classItem.className,
                giangVien: classItem.trainer,
                dateClass: new Date(classItem.date),
                timeStart: new Date(2020, 20, 2, classItemTimeStarted[0], classItemTimeStarted[1]),
                timeEnd: new Date(2020, 20, 2, classItemTimeEnd[0], classItemTimeEnd[1]),
                toaNha: { id: classItem.buildingId, label: classItem.buildingName },
                phongHoc: { id: classItem.roomId, label: classItem.roomName },
                pressTimeStart: true,
                pressTimeEnd: true,
                pressDateClass: true

            })
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
            let dataToaNha = this.props.data.data.map((value) => {
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
            await this.setState({
                dataToaNha: dataToaNha,
                dataToaNhaPhongHoc: dataToaNhaPhongHoc
            })
            if (this.state.editCourse == "true") {
                let idToaNha = this.state.toaNha.id
                let dataPhongHoc = (idToaNha) => {
                    for (let i = 0; i < this.state.dataToaNhaPhongHoc.length; i++) {
                        if (this.state.dataToaNhaPhongHoc[i].id == idToaNha) {
                            return this.state.dataToaNhaPhongHoc[i]
                        }
                    }
                }
                await this.setState({
                    dataPhongHoc: dataPhongHoc(idToaNha).value
                })
            }
        }
    }

    render() {
        return (
            <SafeAreaView style={{
                backgroundColor: "#fff",
                flex: 1
            }} >
                <View>
                    <View style={styles.headerNavigation}>
                        <TouchableOpacity
                            onPress={() => {
                                this.props.navigation.goBack()
                            }}
                        >
                            <MaterialIcons name={"arrow-back-ios"} size={25} color="#B7BEC7" style={styles.iconBack} />
                        </TouchableOpacity>
                        <Text style={[{
                            textTransform: "uppercase",
                        }, styles.txtStyleBasic]}
                        >Tạo mới buổi học</Text>
                        <TouchableOpacity>
                            <Entypo name={"plus"} size={25} color="#B7BEC7" style={styles.iconAddCourse} />
                        </TouchableOpacity>
                    </View>
                </View>
                <ScrollView >
                    <View
                        style={styles.background}
                    // style={{ height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: "#eee" }}
                    >
                        <Text style={styles.txtStyleBasic}>Tên buổi học: </Text>
                        {/* Validate */}
                        {(this.state.showValidate && this.state.validateKhoa) && (
                            <Text style={styles.txtValidate}>* Tên buổi học không được để trống</Text>)
                        }
                        <TextInput
                            placeholder={"Nhập tên buổi học"}
                            style={styles.txtInput}
                            value={this.state.className}
                            onChangeText={(value) => {
                                this.onValidateTextKhoa(value.trim())
                                this.setState({ className: value })
                            }}
                        />
                     

                        <Text style={styles.txtStyleBasic}>Giảng viên:</Text>
                         {/* Validate */}
                         {(this.state.showValidate && this.state.validateGiangVien) && (
                            <Text style={styles.txtValidate}>* Tên giảng viên không được để trống</Text>)
                        }
                        <TextInput
                            placeholder={"Nhập tên giảng viên"}
                            style={styles.txtInput}
                            value={this.state.giangVien}
                            onChangeText={(value) => {
                                this.onValidateTextGiangVien(value.trim())
                                this.setState({ giangVien: value })
                            }}
                        />
                       
                        <View style={{ flex: 1 }}>
                            <Text style={styles.txtStyleBasic}>Ngày học:</Text>
                             {/* Validate */}
                             {(this.state.showValidate && this.state.validateNgay) && (
                                <Text style={styles.txtValidate}>* Chưa chọn ngày học</Text>)
                            }
                            <Text
                                onPress={() => this.setState({ showDateClass: true })}
                                style={[styles.txtInput, { textAlign: "center", paddingVertical: Sizes.s20 }]}
                            >
                                {this.state.pressDateClass ? moment(this.state.dateClass).format('DD/MM/YYYY') : "Chọn ngày học"}
                            </Text>
                            {
                                this.state.showDateClass && (
                                    <DateTimePicker
                                        value={this.state.dateClass}
                                        mode="date"
                                        onChange={this.onChangeDateClass}
                                        display="default"
                                        minimumDate={this.state.courseTimeStart}
                                        maximumDate={this.state.courseTimeEnd}
                                    />   
                                )
                            }
                           
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <View style={{ flex: 1, marginRight: Sizes.s50 }}>
                                <Text style={styles.txtStyleBasic}>Từ:</Text>
                                <Text
                                    onPress={() => this.setState({ showTimeStart: true })}
                                    style={styles.txtTimePicker}
                                >
                                    {this.state.pressTimeStart ? moment(this.state.timeStart).format('hh:mm A') : "Chọn thời gian học"}
                                </Text>
                                {/* Validate */}
                                {(this.state.showValidate && this.state.validateBatDau) && (
                                    <Text style={styles.txtValidate}>* Chưa chọn thời gian</Text>)
                                }
                                {
                                    this.state.showTimeStart && (
                                        <DateTimePicker
                                            value={this.state.timeStart}
                                            mode="time"
                                            onChange={this.onChangeTimeStart}
                                            display="clock"
                                        />
                                    )
                                }
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.txtStyleBasic}>Đến:</Text>
                                <Text
                                    onPress={() => this.setState({ showTimeEnd: true })}
                                    style={styles.txtTimePicker}
                                >
                                    {this.state.pressTimeEnd ? moment(this.state.timeEnd).format('hh:mm A') : "Chọn thời gian học"}
                                </Text>
                                {/* Validate */}
                                {(this.state.showValidate && this.state.validateKetThuc) ?
                                    (<Text style={styles.txtValidate}>* Chưa chọn thời gian</Text>)
                                    : (this.state.validateTimeKetThuc && (<Text style={styles.txtValidate}>* Thời gian phải muộn hơn</Text>))
                                }
                                {
                                    this.state.showTimeEnd && (
                                        <DateTimePicker
                                            value={this.state.timeEnd}
                                            mode="time"
                                            onChange={this.onChangeTimeEnd}
                                            display="clock"
                                        />
                                    )
                                }
                            </View>
                        </View>
                        <Text style={[styles.txtStyleBasic, { marginBottom: 0 }]}>Tòa nhà: </Text>
                        {/* Validate */}
                        {(this.state.showValidate && this.state.validateToaNha) && (<Text style={styles.txtValidate}>* Chưa chọn tòa nhà</Text>)}
                        <PickerItem
                            noDataMessage={"Ko fetch data tòa nhà dc"}
                            data={this.state.dataToaNha}
                            title={"Danh sách tòa nhà"}
                            placeholder={"Chọn tòa nhà"}
                            position={"flex-end"}
                            defaultItem={this.state.toaNha}
                            value={
                                this.state.toaNha.id
                            }
                            onChangeItem={async (value) => {
                                await this.setState({
                                    toaNha: value,
                                    phongHoc: []
                                })
                                await this.onValidateToaNha()

                                // Tạo mảng phòng học tương ứng với từng tòa nhà 
                                let idToaNha = await this.state.toaNha.id
                                let dataPhongHoc = (idToaNha) => {
                                    for (let i = 0; i < this.state.dataToaNhaPhongHoc.length; i++) {
                                        if (this.state.dataToaNhaPhongHoc[i].id == idToaNha) {
                                            return this.state.dataToaNhaPhongHoc[i]
                                        }
                                    }
                                }
                                await this.setState({
                                    dataPhongHoc: dataPhongHoc(idToaNha).value,
                                    validatePhong: true
                                })
                            }}
                        />
                        

                        <Text style={[styles.txtStyleBasic, { marginBottom: 0 }]}>Phòng: </Text>
                           {/* Validate */}
                           {(this.state.showValidate && this.state.validatePhong) && (<Text style={styles.txtValidate}>* Chưa chọn phòng</Text>)}
                        <PickerItem
                            data={this.state.dataPhongHoc}
                            noDataMessage={"Ko fetch data phòng học dc"}
                            title={"Danh sách phòng học"}
                            position={"flex-end"}
                            placeholder="Chọn phòng học"
                            defaultItem={this.state.phongHoc}
                            onChangeItem={(value) => {
                                this.setState({
                                    phongHoc: value
                                })
                                this.onValidatePhongHoc()
                            }}
                            value={this.state.phongHoc.label}
                            style={{ marginBottom: Sizes.s2 }}
                        />
                     
                        <TouchableOpacity
                            style={styles.btnSave}
                            onPress={async () => {
                                if (this.state.timeStart.getTime() >= this.state.timeEnd.getTime()) {
                                    await this.setState({
                                        validateTimeKetThuc: true
                                    })
                                }

                                if (this.state.validateKhoa == false &&
                                    this.state.validateGiangVien == false &&
                                    this.state.validateToaNha == false &&
                                    this.state.validateNgay == false &&
                                    this.state.validateBatDau == false &&
                                    this.state.validateKetThuc == false &&
                                    this.state.validateTimeKetThuc == false &&
                                    this.state.validatePhong == false) {
                                    Alert.alert(
                                        this.state.editCourse == "true" ? "Cập nhật buổi học" : "Tạo mới buổi học",
                                        this.state.editCourse == "true" ? "Bạn muốn cập nhật buổi học" : "Bạn muốn tạo buổi học",
                                        [
                                            {
                                                text: "Hủy bỏ",
                                            },
                                            {
                                                text: "Đồng ý",
                                                onPress: () => {
                                                    if (this.state.editCourse == "true") {
                                                        const newCourse = {
                                                            classId: this.state.classId,
                                                            className: this.state.className,
                                                            trainer: this.state.giangVien,
                                                            date: this.state.dateClass.toString(),
                                                            startedTime: moment(this.state.timeStart).format('HH:mm'),
                                                            endedTime: moment(this.state.timeEnd).format('HH:mm'),
                                                            buildingId: this.state.toaNha.id,
                                                            roomId: this.state.phongHoc.id,
                                                        }

                                                        this.props.editClassAction(
                                                            this.state.tokenUser,
                                                            newCourse
                                                        )
                                                        this.props.classAction(this.state.tokenUser, this.state.courseId)
                                                        this.props.navigation.goBack()
                                                    } else {
                                                        const newCourse = {
                                                            courseId: this.state.courseId,
                                                            className: this.state.className.trim(),
                                                            trainer: this.state.giangVien.trim(),
                                                            date: this.state.dateClass.toString().trim(),
                                                            startedTime: moment(this.state.timeStart).format('HH:mm'),
                                                            endedTime: moment(this.state.timeEnd).format('HH:mm'),
                                                            buildingId: this.state.toaNha.id,
                                                            roomId: this.state.phongHoc.id,
                                                        }

                                                        this.props.addClassAction(
                                                            this.state.tokenUser,
                                                            newCourse
                                                        )
                                                        this.props.classAction(this.state.tokenUser, this.state.courseId)
                                                        this.props.navigation.goBack()
                                                    }
                                                }
                                            }
                                        ],
                                        { cancelable: false }
                                    )
                                } else {
                                    this.setState({
                                        showValidate: true
                                    })
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

            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    background: {
        paddingHorizontal: Sizes.s40,
        paddingTop: Sizes.s10,
        flex: 1,
        height: "100%"
    },
    txtInput: {
        borderWidth: 1,
        color: "#000",
        borderRadius: 4,
        paddingLeft: 8,
        marginLeft: 0,
        marginBottom: 0,
        borderColor: "rgba(0,0,0,0.1)",
        paddingVertical: Sizes.s15,
    },
    txtTimePicker: {
        borderWidth: 1,
        textAlign: "center",
        borderRadius: 4,
        borderColor: "rgba(0,0,0,0.1)",
        paddingVertical: 4,
        paddingVertical: Sizes.s20,
    },
    btnSave: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "flex-end",
        width: "32%",
        borderRadius: 4,
        backgroundColor: "#FF9335",
        // padding: 4,
        // marginTop: 8,
        paddingVertical: Sizes.s15,
        margin: Sizes.s30,
        marginRight: 0
    },
    headerNavigation: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottomStartRadius: 1,
        borderBottomEndRadius: 1,
        borderBottomColor: '#ddd',
        borderBottomWidth: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 0,
    },
    iconBack: {
        alignItems: "flex-start",
        padding: Sizes.s40
    },
    iconAddCourse: {
        alignItems: "flex-end",
        paddingRight: Sizes.s30,
        opacity: 0
    },
    txtValidate: {
        
        fontWeight: 'bold',
        fontSize: Sizes.h30,
        color: "red",
    },
    txtStyleBasic: {
        color: "#637890",
        fontWeight: "bold",
        margin: Sizes.s10,
        marginRight: Sizes.s50,
        fontSize: Sizes.h38
    }
})
