import { Dimensions, StyleSheet } from "react-native";

const windowWidth = Dimensions.get('window').width;
const windowHieght = Dimensions.get('window').height;

export const categoryStyle = StyleSheet.create({

    textInput: {
        borderWidth: 0.6,
        borderRadius: 4,
        width: windowWidth * 0.8,
        height: 35,
        padding: 5,
    },

    textInputView: {
        flexDirection: 'row',
        margin: 10,
    },

    addButton: {
        borderWidth: 0.6,
        borderRadius: 4,
        marginLeft: 10,
        height: 35,
        width: windowWidth * 0.1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    addButtonText: {
        fontSize: 24,
        textAlign: 'center',
    },

    deleteButton: {
        borderWidth: 0.3,
        borderRadius: 4,
        marginTop: 5,
        height: 25,
    }, 

    deleButtonText: {
        padding: 3,
        alignSelf: 'center',
        color: 'red',
    }, 

    flatList: {
        marginLeft: windowWidth * 0.03,
        marginRight: windowWidth * 0.03,
        
    },

    renderItem: {
        marginTop: 10,
        marginRight: 10,
    },

    boxStyle: {
        width: windowWidth * 0.45,
        height: windowHieght * 0.25,
        borderWidth: 0.4,
        borderRadius: 4,
        flexDirection: 'column',   
    },

    boxTitle: {
        alignSelf: 'center',
        paddingTop: 10,
        fontSize: 18,
        fontWeight: '500',
    },

    divider: {
        height: 1,
        backgroundColor: '#ccc',
        marginVertical: 10,
        marginHorizontal: 10
    },

    boxText: {
        marginLeft: 10,
    },
})