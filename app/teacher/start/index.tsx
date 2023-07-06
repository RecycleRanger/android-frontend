import React from "react";
import { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, Pressable, ToastAndroid, FlatList } from 'react-native';
import * as Clipboard from 'expo-clipboard';

import { useAuth } from "../../../components/atoms/UserContext";
import LoadingAnimation from "../../../components/uiElements/LoadingSpinner";
import { GeneratedPasscode, StudentService } from "../../../components/services/student-service";
import { Teacher } from '../../../components/custom-types/UserTypes';
import { useRouter } from "expo-router";


export default function StartGame() {
	const [num, setNum] = useState(0);
	const [visible, setVisible] = useState(false);
	const [buttonPressed, setButtonPressed] = useState(false);
	const [passcodes, setPasscodes] = useState<GeneratedPasscode[]>();
	const { currUsr, setCurrUsr } = useAuth();
    const router = useRouter();

	const submit = () => {
		if (num < 0) {
			ToastAndroid.show("You need to enter a valid number", ToastAndroid.LONG);
		} else if (!buttonPressed && currUsr) {
			setButtonPressed(true);
			StudentService.autogenerateClass(num, currUsr.token)
				.then((res) => {
					setPasscodes(res);
					setVisible(true);
				})
				.catch((err) => {
					ToastAndroid.show(err, ToastAndroid.LONG);
				})
				.finally(() => {
					setButtonPressed(false);
				});
		}
	};

    const copyText = async () => {
        let text: string = "";
        passcodes?.map((item) => {
            text += `${item.student_id}   ${item.passcode}\n`;
        });
        await Clipboard.setStringAsync(text);
        ToastAndroid.show("Copied to Clipboard", ToastAndroid.SHORT);
    };

    const finish = () => {
        if (currUsr && !(currUsr.user as Teacher).date_started) {
            let teacher: Teacher = { ...(currUsr.user as Teacher), date_started: "bb" };
            setCurrUsr({ ...currUsr, user: teacher});
            router.back();
        }
    };

	return (
		<View style={styles.container}>
			<View style={styles.containerView}>
				<Text style={styles.text}>Write the number of sudents in your class</Text>
				<TextInput
					inputMode="numeric"
					keyboardType="number-pad"
					placeholder="0"
					onChangeText={(text) => setNum(+text)}
					style={styles.textInput}
				/>
				<Pressable style={styles.button} onPress={submit}>
					<Text style={styles.buttonText}>Make class</Text>
				</Pressable>
			</View>
			{visible && <View style={{
				flex: 1,
				alignItems: 'center',
			}}>
				<FlatList
					ItemSeparatorComponent={() => (
						<View style={{
							width: '95%',
							borderBottomWidth: 2,
							borderBottomColor: '#878787',
							marginTop: '2%',
							marginBottom: '2%',
							alignSelf: 'center',
						}}></View>
					)}
					data={passcodes}
					renderItem={({ item }) => (
						<View style={styles.listContainer}>
							<Text selectable={true} style={styles.text2}>Id: {item.student_id.toString()}</Text>
							<Text selectable={true} style={styles.text2}>Code: {item.passcode}</Text>
						</View>
					)}
					contentContainerStyle={styles.List}
				/>
				<View style={{
                    marginBottom: "3%",
				}}>
					<Pressable style={styles.button} onPress={copyText}>
						<Text style={styles.buttonText}>Copy</Text>
					</Pressable>
					<Pressable style={styles.button} onPress={finish}>
						<Text style={styles.buttonText}>Finish</Text>
					</Pressable>
				</View>
			</View>}
			{buttonPressed && <LoadingAnimation message="Contacting the server..." />}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
	},
	containerView: {
		flexDirection: 'column',
		alignItems: 'center',
		padding: '2%',
		marginTop: '2%',
	},
	textInput: {
		width: 230,
		height: 50,
		fontSize: 20,
		backgroundColor: "#ececec",
		borderRadius: 25,
		margin: 15,
		justifyContent: "center",
		padding: 10,
		paddingLeft: 30,
		paddingRight: 30,
	},
	button: {
		width: 200,
		height: 53,
		backgroundColor: "#6aad5f",
		borderRadius: 28,
		justifyContent: "center",
		alignItems: "center",
        margin: 8,
	},
	buttonText: {
		fontWeight: "bold",
		fontSize: 20,
		color: "white",
	},
	text: {
		fontSize: 20,
		fontWeight: '500',
		color: "#878787"
	},
	List: {
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: "#e7e6e5",
		width: 340,
		borderRadius: 18,
		padding: '6%',
	},
	listContainer: {
		margin: "2%",
	},
	text2: {
		fontSize: 16,
		fontWeight: '500',
	}
});
