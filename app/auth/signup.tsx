import { useCallback, useState } from "react";
import React from 'react';
import { StyleSheet } from "react-native";
import { Text, View, TextInput, Pressable, ToastAndroid } from "react-native";

import AuthService from "../../components/services/auth-services";
import LoadingAnimation from "components/LoadingSpinner";
// import { SuccessResponseSignUpTeacher } from "../../components/services/auth-services";


interface StateData {
	username: string;
	password: string;
	buttonPressed: boolean;
}

export default function SignUp() {
	const [state, setState] = useState<StateData>({
		username: "",
		password: "",
		buttonPressed: false,
	});
    const [isLoading, setIsLoading] = useState<boolean>(false);

	const signUpRequest = () => {
		console.log(state);
		if (state.username == "") {
			ToastAndroid.show("Please provide username. Can't be empty", ToastAndroid.LONG);
		} else if (state.password == "") {
			ToastAndroid.show("Please provide password. Can't be empty", ToastAndroid.LONG);
		} else {
			if (!state.buttonPressed) {
				setState({ ...state, buttonPressed: true });
				AuthService.register(state.username, state.password)
					.then(async (res) => {
						// TODO: Link to new page
						console.log(res.username);
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
			<Text style={styles.titleText}>Sign Up</Text>
			<View style={styles.box}>
				<View style={styles.inputView}>
					<TextInput
						style={styles.inputText}
						placeholder="username"
						onChangeText={text => setState({ ...state, username: text })}
					/>
				</View>
				<View style={styles.inputView}>
					<TextInput
						style={styles.inputText}
						secureTextEntry
						placeholder="password"
						onChangeText={text => setState({ ...state, password: text })}
					/>
				</View>
			</View>
			<Pressable style={[styles.signUpButton, styles.shadowProp]} onPress={signUpRequest}>
				<Text style={styles.signUpText}>Sign Up</Text>
			</Pressable>
			{ state.buttonPressed && <LoadingAnimation />}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		display: "flex",
	},
	titleText: {
		fontWeight: 'bold',
		fontSize: 50,
		marginBottom: 40,
		color: "black"
	},
	inputView: {
		width: 199,
		height: 42,
		fontSize: 14,
		backgroundColor: "#ececec",
		borderRadius: 25,
		margin: 30,
		justifyContent: "center",
		padding: 20,
	},
	inputText: {
		height: 50,
	},
	box: {
		justifyContent: "center",
		alignItems: "center",
		padding: 50,
		width: 271,
		height: 264,
		backgroundColor: "#d9d9d9",
		borderRadius: 15,
		marginBottom: 30,
	},
	signUpButton: {
		width: 222,
		height: 53,
		backgroundColor: "#6aad5f",
		borderRadius: 15,
		justifyContent: "center",
		alignItems: "center",
	},
	signUpText: {
		fontWeight: "bold",
		fontSize: 20,
		color: "white",
	},
	shadowProp: {
		shadowColor: '#171717',
		elevation: 20,
	}
});
