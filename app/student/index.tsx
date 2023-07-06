import { View, Text, StyleSheet } from "react-native";
import { Link, useRouter } from "expo-router";
import React, { useContext, useEffect, useState } from "react";

import { useAuth } from "../../components/atoms/UserContext";
import { Student } from "../../components/custom-types/UserTypes";


export default function StudentRoot() {
    const {currUsr, setCurrUsr} = useAuth();
    const [score, setScore] = useState(0);

    useEffect(() => {
        if (currUsr && (currUsr.user as Student).score) {
            setScore((currUsr.user as Student).score);
        }
    }, [score]);

	return (
		<View style={styles.container}>
			<View style={styles.scoreContainer}>
				<Text style={styles.scoreNumText}>{score.toString()}</Text>
				<Text style={styles.scoreText}>Score</Text>
			</View>
		  <View style={[styles.navContainer, styles.shadowProp]}>
				<Link href="student/LeaderBoard"><Text style={styles.text}>Leader board</Text></Link>
				<View style={styles.line}></View>
				<Link href="student/newTrash"><Text style={styles.text}>Add new Trash</Text></Link>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		alignItems: "center",
		justifyContent: "space-around",
	},
	scoreContainer: {
		flexDirection: 'column',
		alignItems: "center",
		justifyContent: 'center',
		marginTop: '10%',
	},
	scoreText: {
		color: "#6aad5f",
		fontSize: 38,
		fontWeight: '500',
	},
	scoreNumText: {
		color: '#6aad5f',
		fontSize: 128,
		fontWeight: "600",
	},
	navContainer: {
		width: 340,
		height: 130,
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: "#e7e6e5",
		borderRadius: 10,
		marginTop: '60%',
		marginBottom: '5%',
	},
	text: {
		fontSize: 30,
		fontWeight: '500',
		color: 'black',
	},
	line: {
		width: '90%',
		borderBottomWidth: 2,
		borderBottomColor: '#878787',
		marginTop: '2%',
		marginBottom: '2%',
	},
	shadowProp: {
		shadowColor: '#171717',
		elevation: 10,
	},
});
