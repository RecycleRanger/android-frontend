import React from "react";
import { Text, View, Modal, StyleSheet, Button, Pressable } from "react-native";


export type setVisible = React.Dispatch<React.SetStateAction<boolean>>

interface PopUpMessageProps {
	message: string;
	visible: boolean;
	setVisible: setVisible;
}

export default function PopUpMessage({ message, visible, setVisible }: PopUpMessageProps) {
	return (
		<Modal
			animationType="fade"
			transparent={true}
			visible={visible}
			onRequestClose={() => {
				setVisible(!visible);
			}}
		>
			<View style={styles.container}>
				<View style={styles.box}>
					<Text style={styles.message}>{message}</Text>
					<View style={styles.button}>
                      <Pressable
                        style={styles.button}
                        onPress={() => setVisible(!visible)}
                      >
                        <Text style={{color: "white", fontSize: 17, fontWeight: 'bold'}}>Ok</Text>
                      </Pressable>
					</View>
				</View>
			</View>
		</Modal>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'rgba(100, 100, 100, 0.5)',
	},
	box: {
        width: '90%',
        height: '20%',
        paddingTop: 20,
        paddingLeft: 50,
        paddingRight: 50,
        paddingBottom: 10,
		borderRadius: 15,
		backgroundColor: "#d9d9d9",
        alignItems: 'center'
	},
	message: {
		color: 'black',
		fontSize: 20,
        marginBottom: 20,
	},
	button: {
        height: 40,
        width: 200,
        alignItems: 'center',
        justifyContent: 'center',
		borderRadius: 17,
		backgroundColor: "#6aad5f",
	}
});
