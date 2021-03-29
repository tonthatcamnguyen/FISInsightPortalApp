import { StyleSheet } from "react-native";
import Sizes from '../../../Sizes';

export default stylesCreateCourse = StyleSheet.create({
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
        paddingVertical: Sizes.s15,
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
        padding: Sizes.s30
    },
    iconAddCourse: {
        alignItems: "flex-end",
        paddingRight: Sizes.s30,
        opacity: 0
    },
    txtValidate: {
        fontSize: Sizes.h30,
        color: "red",
        fontWeight: 'bold'
            // marginBottom: Sizes.s5
    },
    txtStyleBasic: {
        color: "#465C6F",
        fontWeight: "bold",
        margin: Sizes.s10,
        marginRight: 15,
        fontSize: Sizes.s40
    }
})