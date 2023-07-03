import React from 'react';
import { StyleSheet } from "react-native";
import { Text, View, ToastAndroid } from "react-native";
import { useRouter, Link } from "expo-router";

import AuthService from "../../../components/services/auth-services";
import LoginDialog, { StateData, SetStateData } from "../../../components/uiElements/LoginDialog";
import { UsrType } from '../../../components/custom-types/UserTypes';


export default function TeacherLogin() {
    const router = useRouter();

	const logInRequest = (state: StateData, setState: SetStateData) => {
		console.log(state);
		if (state.username == "") {
			ToastAndroid.show("Please provide username. Can't be empty", ToastAndroid.LONG);
		} else if (state.password == "") {
			ToastAndroid.show("Please provide password. Can't be empty", ToastAndroid.LONG);
		} else {
			if (!state.buttonPressed) {
				setState({ ...state, buttonPressed: true });

				AuthService.login(UsrType.teacher, state.password, state.username)
					.then(async (res) => {
						// TODO: Link to new page
						ToastAndroid.show("Successfully loged in!", ToastAndroid.LONG);
                        router.push('/');
						console.log(res);
					})
					.catch((err) => {
						console.log(err);
						ToastAndroid.show(err, ToastAndroid.LONG);
						console.log("err");
					})
					.finally(() => {
						setState({ ...state, buttonPressed: false });
						console.log('Done with request');
						console.log(state);
					});
			}
		}
	};

	return (
        <View style={styles.container}>
			<LoginDialog
				title="Log In"
				button="Log In"
				onPressFunction={logInRequest}
			/>
			<View style={styles.signUpContainer}>
              <Text style={styles.text}>Don't have an account? </Text>
              <Link href='../signup'><Text style={[styles.signUpText, styles.text]}>Sign Up</Text></Link>
			</View>
        </View>
	);
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        flexGrow: 1,
        justifyContent: 'space-between',
    },
    signUpContainer: {
        justifyContent: 'center',
        flexDirection: 'row',
        marginBottom: 20,
    },
    text: {
        fontSize: 16,
    },
    signUpText: {
        color: "#6aad5f",
        textDecorationLine: 'underline'
    }
});
