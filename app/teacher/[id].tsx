import React from 'react';
import { useEffect, useState } from 'react';
import { View, Text, Pressable, TextInput, StyleSheet, ToastAndroid, Image } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

import { useStudentOfClass } from './_layout';
import LoadingAnimation from '../../components/uiElements/LoadingSpinner';
import { StudentService } from '../../components/services/student-service';
import { Student } from '../../components/custom-types/UserTypes';
import { useAuth } from '../../components/atoms/UserContext';

// export type StudentsOfClass = {
//   student_name: string;
//   id: number;
//   score: number;
//   class_id: number;
// }

export default function StudentInfo() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { studentOf, setStudentOf } = useStudentOfClass();
  const [request, setRequest] = useState({
    username: "",
    isButtonPressed: false
  });
  const { currUsr, setCurrUsr } = useAuth();
  let token: string = "";
  if (currUsr) {
    token = currUsr.token;
  }

  const changeStudentName = () => {
    if (request.username == "") {
      ToastAndroid.show("Username can't be empty.", ToastAndroid.LONG);
    } else if (!request.isButtonPressed && studentOf) {
      setRequest({ ...request, isButtonPressed: true });
      StudentService
        .updateName(studentOf.id, request.username, token)
        .then((res) => {
          ToastAndroid.show("Successfully changed student's name!", ToastAndroid.LONG);
          router.back();
        })
        .catch((err) => {
          ToastAndroid.show(err, ToastAndroid.LONG);
        })
        .finally(() => {
          setRequest({ ...request, isButtonPressed: false });
        });
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/RecycleRangerLogo.png')}
        style={styles.image}
      />
      <View style={styles.studentView}>
        <Text style={styles.teacherText}>Tap to change your Username</Text>
        <View style={styles.studentBox}>
          <Text style={styles.teacherText}>Username:  </Text>
          <TextInput
            placeholder={studentOf?.student_name ? studentOf?.student_name : "Not Set"}
            onChangeText={(text) => setRequest({ ...request, username: text })}
            style={styles.teacherText}
          />
        </View>
        <Pressable onPress={changeStudentName} style={styles.changeNameButton}>
          <Text style={styles.changeNameButtonText}>Change Name</Text>
        </Pressable>
        {request.isButtonPressed && <LoadingAnimation message="Contacting Server..." />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 110,
    height: 110,
    borderRadius: 7,
    margin: '5%',
  },
  teacherText: {
    fontSize: 20,
    fontWeight: "400",
    color: '#878787',
  },
  teacherBox: {
    width: 330,
    height: 70,
    fontSize: 14,
    backgroundColor: "#ececec",
    borderRadius: 40,
    margin: 30,
    justifyContent: "center",
    alignItems: 'center',
    padding: 20,
  },
  studentBox: {
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: 'center',
    width: 330,
    height: 70,
    fontSize: 14,
    backgroundColor: "#ececec",
    borderRadius: 40,
    margin: 20,
    padding: 10,
  },
  studentView: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  changeNameButton: {
    width: 222,
    height: 53,
    backgroundColor: "#6aad5f",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  changeNameButtonText: {
    fontWeight: "bold",
    fontSize: 20,
    color: 'white',
  }
});
