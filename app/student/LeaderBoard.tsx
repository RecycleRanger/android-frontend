import React, { useContext, useEffect, useState, useCallback } from "react";
import { View, Text, StyleSheet, FlatList, RefreshControl } from "react-native";

import { StudentService, StudentsOfClass, Class } from "../../components/services/student-service";
import { quickSort } from "../../components/helpers/quicksort";
import { useAuth } from "../../components/atoms/UserContext";
import { Student } from "../../components/custom-types/UserTypes";


export default function LeaderBoardPreview() {
  const { currUsr, setCurrUsr } = useAuth();
  const [studentClass, setStudentClass] = useState<Class>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (currUsr) {
      StudentService.getClass((currUsr.user as Student).class_id, currUsr.token)
        .then((res) => {
          console.log(res);
          quickSort(res, 0, res.length - 1);
          setStudentClass(res);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setRefreshing(false);
        });
    }
  }, [count]);

  return (
    <View style={leaderStyles.root}>
      <Text style={leaderStyles.scoreTitle}>Your score: {(currUsr && (currUsr.user as Student).score) ? (currUsr.user as Student).score.toString() : "0"}</Text>
      <View style={leaderStyles.container}>
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
          data={studentClass}
          renderItem={({ item, index }) => (
            <StudentL student={item} num={index} />
          )}
          style={{ width: '100%' }}
          contentContainerStyle={leaderStyles.List}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => {
                setRefreshing(true);
                setCount(count + 1);
              }}
            />
          }
        />
      </View>
    </View>
  );
}

const leaderStyles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#e7e6e5",
    width: 340,
    borderRadius: 18,
  },
  List: {
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 10,
  },
  scoreTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: "#6aad5f",
    justifyContent: 'flex-start',
  },
});

interface StudentLProps {
  student: StudentsOfClass;
  num: number;
}

function StudentL({ student, num }: StudentLProps) {
  return (
    <View style={studentStyles.container}>
      <Text style={[studentStyles.text]}>{`#${num + 1}`}</Text>
      <Text style={[studentStyles.text]}>{student.student_name ? student.student_name : "No Name"}</Text>
      <Text style={[studentStyles.text, studentStyles.scoreText]}>{student.score.toString()}</Text>
    </View>
  );
}

const studentStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: '2%',
    marginRight: '2%',
    marginBottom: '3%',
    marginTop: '3%',
  },
  text: {
    fontSize: 25,
    fontWeight: '500',
  },
  scoreText: {
    color: '#71b467'
  }
});
