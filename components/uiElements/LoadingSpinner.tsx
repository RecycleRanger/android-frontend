import React from "react";
import { ActivityIndicator, Text, View, Modal, StyleSheet } from "react-native";


interface LoadingAnimationProps {
	message: string;
}

const LoadingAnimation: React.FC<LoadingAnimationProps> = ({ message }) => {
	return (
		<Modal transparent={true}>
			<View style={styles.indicatorWrapper}>
				<ActivityIndicator size="large" color="#00ff00" />
				<Text style={styles.message}>{ message }</Text>
			</View>
		</Modal>
	);
};

const styles = StyleSheet.create({
	indicatorWrapper: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'rgba(100, 100, 100, 0.6)',
	},
    message: {
		fontWeight: "bold",
        fontSize: 19,
    },
});

export default LoadingAnimation;
