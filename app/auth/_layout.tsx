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
      </View>
  );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: "flex-start",
        marginTop: 40,
    },
    imageLogo: {
        width: 44,
        height: 44,
        alignSelf: 'center',
        justifyContent: "flex-start",
    },
});
