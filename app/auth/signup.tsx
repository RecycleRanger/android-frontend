import React from 'react';
import { StyleSheet } from "react-native";
import { Text, View, TextInput, Pressable, ToastAndroid } from "react-native";
import { useRouter } from "expo-router";

import AuthService from "../../components/services/auth-services";
import LoginDialog, { StateData, SetStateData } from "../../components/uiElements/LoginDialog";


export default function SignUp() {
    const router = useRouter();

	const signUpRequest = (state: StateData, setState: SetStateData) => {
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
                        ToastAndroid.show("Successfully signed up!", ToastAndroid.LONG);
						console.log(res.username);
                        router.push(".");
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
        <LoginDialog
          title="Sign Up"
          button="Sign Up"
          onPressFunction={signUpRequest}
        />
    );
}
