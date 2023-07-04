import React from 'react';
import { useState } from 'react';
import {
	View,
	Text,
	StyleSheet,
	Pressable,
	TextInput,
	ToastAndroid,
	KeyboardAvoidingView,
	Platform,
	Switch,
} from "react-native";
import { useRouter, Link } from "expo-router";

import AuthService from "../../../components/services/auth-services";
import { StateData, SetStateData } from "../../../components/uiElements/LoginDialog";
import { UsrType } from '../../../components/custom-types/UserTypes';
import PopUpMessage from '../../../components/uiElements/PopUpMessage';
import LoadingAnimation from '../../../components/uiElements/LoadingSpinner';


export default function StudentLogin() {
	const [state, setState] = useState<StateData>({
		username: "",
		password: "",
		buttonPressed: false,
	});
	const [switchIsEnabled, setSwitchIsEnabled] = useState<boolean>(false);
    const [visible, setVisible] = useState<boolean>(false);
    
	const router = useRouter();

	const logInRequest = () => {
		console.log(state);
		if (state.username == "") {
			ToastAndroid.show("Please provide a username or id. Can't be empty", ToastAndroid.LONG);
		} else if (state.password == "") {
			ToastAndroid.show("Please provide password. Can't be empty", ToastAndroid.LONG);
		} else {
			if (!state.buttonPressed) {
				setState({ ...state, buttonPressed: true });
				let id: number = +state.username;

				switchIsEnabled ?
					AuthService.login(UsrType.student, state.password, "/ss", id)
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
						}) :
					AuthService.login(UsrType.student, state.password, state.username)
						.then(async (res) => {
							ToastAndroid.show("Successfully loged in!", ToastAndroid.LONG);
							router.push("/");
							console.log(res);
						})
						.catch((err) => {
							console.log(err);
							ToastAndroid.show(err, ToastAndroid.LONG);
							console.log("err");
						})
						.finally(() => {
							setState({ ...state, buttonPressed: false });
							console.log("Done with request");
							console.log(state);
						});
			}
		}
	};

	return (
		<View style={styles.root}>
			<KeyboardAvoidingView
				behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
				style={styles.container}
			>
				<Text style={styles.titleText}>Log In</Text>
				<View style={styles.box}>
					<View style={styles.inputView}>
						<TextInput
							style={styles.inputText}
							placeholder={switchIsEnabled ? 'id' : 'username'}
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
					<View style={styles.switchContainer}>
						<Text>Log In with id instead </Text>
						<Switch
							trackColor={{ false: '#767577', true: '#6aad5f' }}
							thumbColor={switchIsEnabled ? "#ffffff" : "#f4f3f4"}
							onValueChange={(value) => setSwitchIsEnabled(value)}
							value={switchIsEnabled}
						/>
					</View>
				</View>
				<Pressable style={[styles.logInButton, styles.shadowProp]} onPress={logInRequest}>
					<Text style={styles.logInText}>Log In</Text>
				</Pressable>
				{state.buttonPressed && <LoadingAnimation message="Proccessing Request" />}
			</KeyboardAvoidingView>
			<View style={styles.signUpContainer}>
              <Pressable onPress={() => setVisible(!visible)}>
                <Text style={[styles.text, styles.signUpText]}>Don't have an accout?</Text>
                { visible && <PopUpMessage message="Please ask your teacher to make you an accout." visible={visible} setVisible={setVisible}/>}
              </Pressable>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	root: {
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
	},
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
		padding: 0,
		width: 271,
		height: 264,
		backgroundColor: "#d9d9d9",
		borderRadius: 15,
		marginBottom: 30,
	},
	logInButton: {
		width: 222,
		height: 53,
		backgroundColor: "#6aad5f",
		borderRadius: 15,
		justifyContent: "center",
		alignItems: "center",
	},
	logInText: {
		fontWeight: "bold",
		fontSize: 20,
		color: "white",
	},
	shadowProp: {
		shadowColor: '#171717',
		elevation: 20,
	},
	switchContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'row',
	}
});
