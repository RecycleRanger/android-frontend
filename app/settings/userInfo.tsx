import React from 'react';
import { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Image, Pressable, ToastAndroid } from "react-native";

import { useAuth } from "../../components/atoms/UserContext";
import { UsrType, Teacher, Student, CurrentUsrType } from '../../components/custom-types/UserTypes';
import LoadingAnimation from '../../components/LoadingSpinner';
import { StudentService } from '../../components/services/student-service';


export default function UserInfo() {
    const { currUsr, setCurrUsr } = useAuth();
    let token: string = "";
    if (currUsr) {
        token = currUsr.token;
    }
    const [isTeacher, setIsTeacher] = useState(false);
    const [request, setRequest] = useState({
        username: "",
        isButtonPressed: false
    });
    let student: Student = (currUsr?.user as Student);
    if (currUsr) {
        switch (currUsr.type) {
            case UsrType.student: {
                student = { ...(currUsr.user as Student) };
                break;
            }
            case UsrType.teacher: {
                break;
            }
        }
    }

    const changeStudentName = () => {
        if (request.username == "") {
            ToastAndroid.show("Username can't be empty.", ToastAndroid.LONG);
        } else if (!request.isButtonPressed && student) {
            setRequest({ ...request, isButtonPressed: true });
            StudentService
                .updateName(student.id, request.username, token)
                .then((res) => {
                    student = { ...student, student_name: request.username };
                    let usr: CurrentUsrType = ({ ...currUsr, user: student } as CurrentUsrType);
                    setCurrUsr(usr);
                })
                .catch((err) => {
                    ToastAndroid.show(err, ToastAndroid.LONG);
                })
                .finally(() => {
                    setRequest({ ...request, isButtonPressed: false });
                });
        }
    };

    useEffect(() => {
        switch (currUsr?.type) {
            case UsrType.teacher: {
                setIsTeacher(true);
                break;
            }
            case UsrType.student: {
                setIsTeacher(false);
                break;
            }
        }
    });

    return (
        <View style={styles.container}>
            <Image
                source={require('../../assets/images/RecycleRangerLogo.png')}
                style={styles.image}
            />
            {isTeacher ? (
                <View>
                    <View style={styles.teacherBox}>
                        <Text style={styles.teacherText}>Username: {(currUsr?.user as Teacher).username}</Text>
                    </View>
                    <View style={styles.teacherBox}>
                        <Text style={styles.teacherText}>Class: {(currUsr?.user as Teacher).id}</Text>
                    </View>
                </View>
            ) : (
                <View style={styles.studentView}>
                    <Text style={styles.teacherText}>Tap to change your Username</Text>
                    <View style={styles.studentBox}>
                        <Text style={styles.teacherText}>Username:  </Text>
                        <TextInput
                            placeholder={(currUsr?.user as Student).student_name ? (currUsr?.user as Student).student_name : "Not Set"}
                            onChangeText={(text) => setRequest({ ...request, username: text })}
                            style={styles.teacherText}
                        />
                    </View>
                    <Pressable onPress={changeStudentName} style={styles.changeNameButton}>
                        <Text style={styles.changeNameButtonText}>Change Name</Text>
                    </Pressable>
                    {request.isButtonPressed && <LoadingAnimation message="Contacting Server..." />}
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '30%',
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
