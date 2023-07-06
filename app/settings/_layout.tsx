import React from 'react';
import { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, Image, Pressable, SafeAreaView } from 'react-native';
import { Slot } from 'expo-router';


export default function SettingsLayout() {
    return (
        <View style={styles.root}>
          <Text style={styles.text}>Settings</Text>
          <Slot />
        </View>
    );
}

const styles = StyleSheet.create({
    root: {
        flexDirection: 'column',
        flexGrow: 1,
        backgroundColor: "#d9d9d9",
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    text: {
        fontSize: 30,
        fontWeight: 'bold',
        color: "#878787",
        marginTop: 50,
    }
});
