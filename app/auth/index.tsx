import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Link } from "expo-router";


export default function SelectUser() {
    return (
        <View style={styles.root}>
          <Text style={styles.title}>Select User</Text>
          <View style={styles.container}>
            <View style={[styles.buttonContainer, styles.shadowProp]}>
              <Link href="auth/student/login">
                <Text style={styles.buttonTitle}>Student</Text>
              </Link>
            </View>
            <Text style={styles.orText}>or</Text>
            <View style={[styles.buttonContainer, styles.shadowProp]}>
              <Link href="auth/teacher/login">
                <Text style={styles.buttonTitle}>Teacher</Text>
              </Link>
            </View>
          </View>
        </View>
    );
}

const styles = StyleSheet.create({
    root: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		display: "flex",
    },
    title: {
        fontSize: 24,
        fontWeight: "600",
        textAlign: "center",
        marginBottom: 40,
    },
    container: {
        display: "flex",
        flexDirection: "column",
        width: 271,
        height: 255,
        borderRadius: 20,
        backgroundColor: "#D9D9D9",
        justifyContent: "center",
        alignItems: "center",
		margin: 30,
    },
    buttonContainer: {
        width: 198,
        height: 47,
        borderRadius: 17,
        backgroundColor: "#6AAD5F",
        justifyContent: "center",
        alignItems: "center",
    },
    buttonTitle: {
        fontSize: 20,
        fontWeight: '700',
        textAlign: "center",
        color: "#ffffff",
    },
    orText: {
        fontSize: 20,
        fontWeight: '500',
        textAlign: "center",
        color: "#9a8f8f",
        margin: 25,
    },
	shadowProp: {
		shadowColor: '#171717',
		elevation: 20,
	}
});
