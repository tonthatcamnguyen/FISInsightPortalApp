import { Sizes } from '@dungdang/react-native-basic';
import { arrayIsEmpty, stringIsEmpty } from '@dungdang/react-native-basic/src/Functions';
import React, { Component } from 'react';
import {
    Alert,
    FlatList,
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default class Picker extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            isShowModal: false,
            selectedItem: null,
        };
    }

    async componentDidUpdate(prevProps) {
        if (this.props.defaultItem != prevProps.defaultItem) {
            await this.setState({
                selectedItem: this.props.defaultItem,
            })
        }
    }

    render() {
        const { isShowModal, selectedItem } = this.state;
        const {
            data,
            title,
            style,
            defaultItem,
            modalStyle,
            placeholder,
            onChangeItem,
            value,
            position,
        } = this.props;
        //render item for flatList/////////////
        const renderItem = ({ item, index }) => {
            return (
                <TouchableOpacity
                    key={index}
                    style={styles.item}
                    onPress={() => {
                        this.setState({ selectedItem: item, isShowModal: false });
                        onChangeItem(item, index);
                    }}>
                    <Text
                        style={[
                            {color: '#4D4D4D'},
                            
                            { fontSize: Sizes.s30 },
                            (selectedItem == null
                                ? JSON.stringify(selectedItem) === JSON.stringify(item)
                                : JSON.stringify(selectedItem.id) === JSON.stringify(item.id)
                            ) ? {color: 'orange' ,fontWeight: 'bold'} : null, //custom color picker (fontWeight: 'bold', color: 'blue')
                        ]}>
                        {item.label}
                    </Text>
                    {JSON.stringify(selectedItem) === JSON.stringify(item) ? (
                        <Icon solid color={'#fff'} size={Sizes.s30} name={'check-circle'} />
                    ) : null}
                </TouchableOpacity>
            );
        };
 
        ///////////////////////////////////////////////////////////////
        return (
            <View>
                <TouchableOpacity
                    style={[styles.pickerStyle, { borderColor: 'rgba(0,0,0,0.1)', marginVertical: 0, paddingVertical: Sizes.s45 }, this.props.style]} //edit style
                    disabled={this.props.noData}
                    onPress={() => {

                        this.setState({ isShowModal: !isShowModal });
                    }}>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            paddingHorizontal: Sizes.s15,
                        }}>
                        {/* ///replace placehoder variable into items in data */}
                        {(selectedItem === null || stringIsEmpty(value)) ? (
                            <Text style={{ color: '#000' }}>{placeholder}</Text>
                        ) : (
                                <Text style={{ color: '#000' }}>{selectedItem.label}</Text>
                            )}
                        <Icon name="angle-down" size={Sizes.s25} />  
                    </View>
                </TouchableOpacity>
                <Modal visible={isShowModal} transparent={true} animationType="fade">
                    <View
                        style={{
                            flex: 1,
                            backgroundColor: '#00000036'
                        }}
                    />
                </Modal>
                <Modal visible={isShowModal} transparent={true} animationType="slide">
                    <TouchableWithoutFeedback onPress={() => this.setState({ isShowModal: !isShowModal })}>
                        <View
                            style={{
                                flex: 1,
                                justifyContent: position
                            }}>
                            <TouchableWithoutFeedback>
                                {/*//truyá» n modalStyle tÃ¹y biáº¿n cho modal */}
                                <View style={[styles.modal, modalStyle]}>
                                    {/* //title = null sáº½ khÃ´ng hiá»ƒn thá»‹ lÃªn modal */}
                                    {!stringIsEmpty(title) ? <Text style={styles.title}>{title}</Text> : null}
                                    <FlatList
                                        style={{ flex: 1 }}
                                        data={data}
                                        key={(index) => index}
                                        showsVerticalScrollIndicator={false}
                                        renderItem={(item, index) => renderItem(item, index)}
                                    />
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    title: {
        fontSize: Sizes.s40,
        fontWeight: 'bold',
        
        textAlign: 'center',
        paddingVertical: Sizes.s15,
        borderColor: '#EFEFEF',
        color: 'orange',
        borderBottomWidth: Sizes.s2,
        backgroundColor: '#4D4D4D'
    },
    item: {
        // flex: 1,
        textAlign:'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: Sizes.s30,
        marginHorizontal: Sizes.s30,
        borderColor: '#EFEFEF',
        borderBottomWidth: Sizes.s2 * 0.7,
  
    },
    pickerStyle: {
        borderWidth: 1,
        height: Sizes.s100,
        marginTop: Sizes.s10,
        marginBottom: Sizes.s10,
        borderRadius: Sizes.s15,
        justifyContent: 'center',
        paddingHorizontal: Sizes.s10,
    },
    modal: {
        height: '35%',
        borderTopRightRadius: Sizes.s40,
        borderTopLeftRadius: Sizes.s40,
        justifyContent: 'center',
        backgroundColor: 'white',
    },
});
