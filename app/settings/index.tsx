import React from 'react';
import { View, Text, StyleSheet, Image, Pressable, SafeAreaView } from 'react-native';
import { Slot, useRouter } from 'expo-router';

import { useAuth } from '../../components/atoms/UserContext';
import AuthService from '../../components/services/auth-services';

export default function Settings() {
  const router = useRouter();
  const { currUsr, setCurrUsr } = useAuth();

  const pressLogOut = () => {
    console.log("hello");
    AuthService.logout();
    setCurrUsr(null);
  };

  return (
    <View>
      <View style={styles.root}>
        <Pressable onPress={() => router.push('/settings/userInfo')}>
          <Text style={styles.text}>User Info</Text>
        </Pressable>
      </View>
      <View>
        <Pressable onPress={() => pressLogOut()}>
          <Text style={styles.text}>Log Out</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '20%',
  },
  text: {
    marginTop: '20%',
    fontSize: 23,
    color: "#878787",
  }
});
