import { StyleSheet } from "react-native";
import Sizes from '../../../Sizes';

export default stylesCourse = StyleSheet.create({
    background: {
        backgroundColor: "white",
        margin: 7,
        padding: 10,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: "rgba(0,0,0,0.1)"
    },
    headerNavigation: {
        flexDirection: "row",
        backgroundColor: "white",
        justifyContent: "space-between",
        alignItems: "center",
        // borderBottomStartRadius: 1,
        // borderBottomEndRadius: 1,
        // borderBottomColor: '#ddd',
        // borderBottomWidth: 1,

        // Box shadow
        // shadowColor: "#000",
        // shadowOffset: {
        //     width: 0,
        //     height: 4,
        // },
        // shadowOpacity: 0.3,
        // // shadowRadius: 4.65,
        // elevation: 0,
    },
    headerItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingLeft: 5,
    },
    cardItem: {
        flexDirection: "row",
        alignItems: "center",
        padding: 6,
    },
    iconBack: {
        alignItems: "flex-start",
        padding: Sizes.s30,
    },
    iconAddCourse: {
        alignItems: "flex-end",
        padding: Sizes.s30,
    },
    txtStyleBasic: {
        color: "#637890",
        fontWeight: "bold",
        margin: Sizes.s5,
        marginLeft: 0,
        fontSize: Sizes.s40
            // marginBottom: Sizes.s10,
    },
    menuSelected: {
        position: "absolute",
        end: 20,
        top: 20,
        backgroundColor: "#fff",
        elevation: 8,
        borderRadius: 8,
        zIndex: 999
    }
})