import React, { createContext, useEffect } from 'react';
import { useState, useContext } from "react";
import { View, Text, StyleSheet, Image, Pressable, SafeAreaView } from 'react-native';
import { Slot, useRouter } from 'expo-router';

import { StudentsOfClass } from "../../components/services/student-service";
import { useAuth } from '../../components/atoms/UserContext';
import { Teacher } from '../../components/custom-types/UserTypes';


export type StudentOfClassContextType = {
  studentOf: StudentsOfClass | null;
  setStudentOf: React.Dispatch<React.SetStateAction<StudentsOfClass | null>>;
}

const StudentContext = createContext<StudentOfClassContextType>({
  studentOf: null,
  setStudentOf: () => { },
});

export function useStudentOfClass() {
  return useContext(StudentContext);
}

type Children = {
  children: JSX.Element;
}

function StudentProvider({ children }: Children) {
  const [student, setStudent] = useState<StudentsOfClass | null>(null);
  const value: StudentOfClassContextType = {
    studentOf: student,
    setStudentOf: setStudent,
  };

  return (
    <StudentContext.Provider
      value={value}
    >
      {children}
    </StudentContext.Provider>
  );
}

export default function teacherLayout() {
  return (
    <StudentProvider>
      <View style={styles.root}>
        <TeacherNavBar />
        <Slot />
      </View>
    </StudentProvider>
  );
}

const styles = StyleSheet.create({
  root: {
    flexDirection: 'column',
    flexGrow: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  }
});

function TeacherNavBar() {
  const router = useRouter();
  const [name, setName] = useState("");
  const { currUsr, setCurrUsr } = useAuth();

  useEffect(() => {
    if (currUsr) {
      setName(`#${(currUsr.user as Teacher).id.toString()}`);
    }
  }, []);

  return (
    <View style={navStyles.container}>
      <Pressable style={{ marginRight: 10 }} onPress={() => router.push('/settings/')}>
        <Image
          source={require("../../assets/images/Gear-icon.png")}
        />
      </Pressable>
      <Text style={navStyles.text}>Class {name}</Text>
    </View>
  );
}

const navStyles = StyleSheet.create({
  container: {
    width: '100%',
    height: 100,
    flexDirection: "row-reverse",
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: "#d9d9d9",
    paddingTop: 27,
  },
  text: {
    marginLeft: '30%',
    fontSize: 26,
    fontWeight: 'bold',
    color: "#878787",
  },
  safeArea: {
    height: 300,
  }
});
