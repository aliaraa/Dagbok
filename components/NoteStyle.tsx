import { Dimensions, StyleSheet } from "react-native";

const windowWidth = Dimensions.get('window').width;
const windowHieght = Dimensions.get('window').height;

export const noteStyle = StyleSheet.create({

    categoryText: {
        fontSize: 32,
        marginLeft: 10,
        fontWeight: '500',
    },

    textInput: {
        borderWidth: 0.6,
        borderRadius: 4,
        width: windowWidth * 0.8,
        height: 35,
        padding: 5,
    },

    textInputView: {
        flexDirection: 'row',
        marginLeft: 10,
        marginBottom: 8,
        marginTop: 5,
    },
    tasktView: {
        flexDirection: 'row',
        marginLeft: 5,
    },
    addButton: {
        borderWidth: 0.6,
        borderRadius: 4,
        marginLeft: 10,
        height: 35,
        width: windowWidth * 0.1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    addButtonText: {
        fontSize: 24,
        textAlign: 'center',
    },

    deleteButton: {
        borderWidth: 0.3,
        borderRadius: 4,
        marginTop: 5,
        marginLeft: 10,
        width: windowWidth * 0.12,
        height: windowHieght * 0.04,
        alignItems: 'center',
        justifyContent: 'center',
    }, 

    deleButtonText: {
        paddingVertical: 6,
        paddingHorizontal: 5,
        color: 'red',
        fontSize: 12,
        textAlign: 'center',
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
        width: windowWidth * 0.8,
        height: windowHieght * 0.04,
        borderWidth: 0.4,
        borderRadius: 4,
        marginTop: 5, 
        marginLeft: 5,
        justifyContent: 'center',
        
    },

    boxTitle: {
        textAlign: 'center',
        paddingTop: 10,
    },

    divider: {
        height: 1,
        backgroundColor: '#ccc',
        marginVertical: 10,
        marginHorizontal: 10
    },
})