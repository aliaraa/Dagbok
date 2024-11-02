import { Dimensions, StyleSheet } from "react-native";

const windowWidth = Dimensions.get('window').width;
const windowHieght = Dimensions.get('window').height;

export const contentStyle = StyleSheet.create({

    noteText: {
        fontSize: 32,
        marginLeft: 10,
        fontWeight: '500',
    },

    textInput: {
        padding: 10,
        fontSize: 16,
        textAlignVertical: 'top',
    },

    divider: {
        height: 1,
        backgroundColor: '#ccc',
        marginVertical: 10,
        marginHorizontal: 10
    },
    

})