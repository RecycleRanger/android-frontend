import React from "react";
import { ActivityIndicator, View, Modal, StyleSheet } from "react-native";


export default function LoadingAnimation() {
	return (
		<Modal transparent={true}>
			<View style={styles.indicatorWrapper}>
				<ActivityIndicator size="large" />
			</View>
		</Modal>
	);
}

const styles = StyleSheet.create({
	indicatorWrapper: {
        flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'rgba(100, 100, 100, 0.6)',
	},
});
