import { View, Text, StyleSheet } from "react-native";
import { Link, useRouter } from "expo-router";
import React from "react";


export default function Root() {
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>Root</Text>
      </View>
      <View style={styles.container2}>
        <Link style={styles.signup} href="auth/signup">Signup</Link>
        <Link href="auth/">Link</Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 50,
    marginBottom: 40,
  },
  container2: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signup: {
    marginBottom: 50,
  }
});
