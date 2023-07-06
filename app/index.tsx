import { useRouter } from "expo-router";
import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";


export default function NotLoggedIn() {
  const router = useRouter();

  // useEffect(() => {
  // 	console.log("i run");
  // 	AuthService.getCurrentUser()
  // 		.then((res) => {
  // 			console.log("i run");

  // 			setCurrUsr(res);
  // 			switch (res.type) {
  // 				case UsrType.teacher: {
  // 					router.push('/teacher/');
  // 					break;
  // 				}
  // 				case UsrType.student: {
  // 					router.push('/student/');
  // 					break;
  // 				}
  // 			}
  // 		})
  // 		.catch((err) => {
  // 			router.push('/auth/');
  // 		})
  // 		.finally(() => {
  // 			setLoading(false);
  // 		});
  // }, [currUsr]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>You are not Loged In</Text>
      <Pressable style={styles.button} onPress={() => router.push("/auth/")}>
        <Text style={styles.buttonText}>Press here to move to log in page!</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  button: {
    height: 50,
    width: 300,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 17,
    backgroundColor: "#6aad5f",
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  }
});
