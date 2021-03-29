import { StyleSheet } from "react-native";
import { colors } from '../../../values/styles/themes/baseTheme'
import Sizes from '../../../Sizes';

export default stylesLogin = StyleSheet.create({
    bgr: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        // marginVertical: Sizes.s75,
        marginVertical: "10%",
    },
    imgLogo: {
        // width: Sizes.s340,
        // height: Sizes.s100,
        width: "50%",
        height: "10%",
        resizeMode: 'contain',
        // margin: Sizes.s40
        margin: "4%",
    },
    txtTitle: {
        height: "6%",
        color: colors.blue,
        fontWeight: 'bold',
        fontSize: Sizes.s40,

    },
    imgStripe: {
        width: "30%",
        height: "1%",
        resizeMode: 'contain',
        // marginBottom: Sizes.s20
        marginBottom: "4%"
    },
    txtSignInSystem: {
        height: "6%",
        color: "#FF9335",
        fontWeight: 'bold',
        fontSize: Sizes.s40,
        // margin: Sizes.s20
        marginBottom: "3%"
    },
    viewInputUser: {
        width: "80%",
        height: Sizes.s110,
        borderRadius: Sizes.s10,
        backgroundColor: "#E8E9EC",
        flexDirection: "row",
        alignItems: "center",
        // marginBottom: Sizes.s20,
        marginBottom: "4%"
    },
    iconTextInput: {
        alignItems: "flex-start",
        // padding: 10,
        paddingHorizontal: "6%"
    },
    iconTextInputPassword: {
        justifyContent: "space-between",
        alignItems: "flex-end",
        // padding: 10,    
        paddingHorizontal: "6%"
    },
    viewRemberSignIn: {
        width: "80%",
        flexDirection: "row",
        alignItems: "center",
        // paddingBottom: "1%"
    },
    txtUser: {
        height: "80%",
        width: "65%",
        textAlign: "center",
        fontSize: Sizes.s35
    },
    txtPassword: {
        height: "80%",
        width: "65%",
        textAlign: "center",
        fontSize: Sizes.s35
    },
    btnLogIn: {
        backgroundColor: "#FF9335",
        // padding: 10,
        padding: "3%",
        alignItems: "center",
        width: "80%",
        // marginTop: 10,
        borderRadius: Sizes.s10,
        marginTop: "2%",
    },
    imgSwipe: {
        // margin: Sizes.s30,
        // height: Sizes.s200,
        marginTop: "16%",
        height: "20%",
        resizeMode: "contain",
    },
    txtCopyRight: {
        marginTop: '5%',
        color: "rgba(0,0,0,0.5)",
        textAlign: "center",
        marginBottom: "2%",
        width: '100%',
    }
})