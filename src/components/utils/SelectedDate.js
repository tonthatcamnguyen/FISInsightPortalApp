import React, { Component } from 'react'
import { Text, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import Sizes from '../../res/Sizes';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

export default class SelectedDate extends Component {
    state = ({
        dateStart: {
            showDate: false,
            valueDate: this.props.value,
            pressDate: false
        },
    })

    onChangeDateStart = (event, selectedDate) => {
        if (selectedDate !== undefined) {
            this.setState(prevProps => ({
                dateStart: {
                    ...prevProps.dateStart,
                    show: false,
                    pressDate: true,
                    valueDate: selectedDate
                }
            }))
            this.props.onChange(selectedDate)
            this.props.onValidate(false)
        }
        this.setState(prevProps => ({
            dateStart: {
                ...prevProps.dateStart,
                show: false
            }
        }))
    }
    render() {
        return (
            <View  >
                <Text style={styles.txtStyleBasic}>{this.props.title}</Text>
                <TouchableOpacity>
                    <Text
                        onPress={() => {
                            this.setState(prevProps => ({
                                dateStart: {
                                    ...prevProps.dateStart,
                                    show: true
                                }
                            }))
                        }}
                        style={styles.txtTimePicker}
                    >
                        {this.state.dateStart.pressDate == true ? moment(this.state.dateStart.valueDate).format('DD/MM/YYYY') : this.props.placeholder}
                    </Text>
                </TouchableOpacity>
                {
                    this.state.dateStart.show && (
                        
                            <DateTimePicker

                                value={this.state.dateStart.valueDate}
                                mode="date"
                                onChange={this.onChangeDateStart}
                                display="default"
                                maximumDate={this.props.maximumdate}
                                minimumDate={this.props.minimumdate}
                                mode={this.props.mode}
                                display={this.props.display}
                            />
                       

                    )
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    txtStyleBasic: {
        color: "#637890",
        fontWeight: "bold",
        margin: Sizes.s20,
        marginLeft: 0,
        marginBottom: Sizes.s10,
    },

    txtTimePicker: {
        borderWidth: 1,
        textAlign: "center",
        borderRadius: 4,
        borderColor: "rgba(0,0,0,0.1)",
        paddingVertical: 4,
        paddingVertical: Sizes.s25,
    },
})