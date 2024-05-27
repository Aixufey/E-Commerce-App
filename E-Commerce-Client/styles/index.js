import {StyleSheet, Platform, StatusBar} from "react-native";

export const colors = {
    red1: '#c70049',
    red2: 'rgb(227,25,99)',
    red3: 'rgba(199,0,73,0.8)',
    white: '#fff',
    gray: 'rgb(45,45,45)',
    transparent: 'rgba(0,0,0,0)',
    light1: '#f2f2f2',
    light2: '#f7f7f7'
}

export const defaultStyles = StyleSheet.create({
    padding: 35,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    flex: 1,
    backgroundColor: colors.white,
})

export const inputStyles = StyleSheet.create({
    height: 50,
    backgroundColor: colors.white,
    marginVertical: 10,
    marginHorizontal: 20
})