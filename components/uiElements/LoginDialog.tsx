import React from "react";
import { useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	Pressable,
	TextInput,
	KeyboardAvoidingView,
	Platform,
} from "react-native";

import LoadingAnimation from "./LoadingSpinner";


export interface StateData {
	username: string;
	password: string;
	buttonPressed: boolean;
}

export type SetStateData = React.Dispatch<React.SetStateAction<StateData>>;

interface LoginDialogProps {
	title: string;
	button: string;
	onPressFunction: (state: StateData, setState: SetStateData) => void;
}

export default function LoginDialog({ title, button, onPressFunction }: LoginDialogProps) {
	const [state, setState] = useState<StateData>({
		username: "",
		password: "",
		buttonPressed: false,
	});

	return (
		<KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
		  style={styles.container}
        >
			<Text style={styles.titleText}>{title}</Text>
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
			<Pressable style={[styles.logInButton, styles.shadowProp]} onPress={() => onPressFunction(state, setState)}>
				<Text style={styles.logInText}>{button}</Text>
			</Pressable>
			{state.buttonPressed && <LoadingAnimation message="Proccessing Request" />}
		</KeyboardAvoidingView>
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
	}
});
