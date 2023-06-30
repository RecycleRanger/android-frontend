import React from "react";
import { Stack, Slot } from "expo-router";
import { Image, Text, View, StyleSheet } from "react-native";


export default function AuthLayout() {
  return (
    <>
      <HeaderTitle />
      <Slot />
    </>
  );
}

const HeaderTitle = () => {
  return (
      <View style={styles.container}>
        <Image
          source={require("../../assets/images/RecycleRangerLogo.png")}
          style={styles.imageLogo}
        />
        <Text style={styles.title}>RecycleRanger</Text>
      </View>
  );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: "flex-start",
        marginTop: 40,
        marginLeft: 50,
        flexDirection: "row",
        alignItems: "center",
    },
    imageLogo: {
        width: 44,
        height: 44,
        alignSelf: 'center',
        justifyContent: "flex-start",
        borderRadius: 7,
    },
    title: {
		height: 58,
		fontSize: 32,
		fontWeight: '800',
		textAlign: 'center',
		color: '#6dbf50', 
        marginLeft: 7,
    },
});
