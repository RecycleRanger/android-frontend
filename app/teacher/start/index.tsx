import React from "react";
import { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, Pressable, ToastAndroid } from 'react-native';


export default function StartGame() {
	const [num, setNum] = useState(0);

	useEffect(() => {
		console.log(num);
	}, [num]);

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
              <Pressable style={styles.button}>
                <Text style={styles.buttonText}>Make class</Text>
              </Pressable>
			</View>
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
    }
});
