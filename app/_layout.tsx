import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack, Slot, useRouter } from 'expo-router';
import React, { useEffect, useState, useContext } from 'react';
import { StatusBar, useColorScheme, Text } from 'react-native';

import { LightTheme } from '../components/Themes';
import AuthService from "../components/services/auth-services";
import { UsrType, Teacher, Student, CurrentUsrType } from '../components/custom-types/UserTypes';
import LoadingAnimation from '../components/LoadingSpinner';
import { UserContext, Provider, useAuth } from '../components/atoms/UserContext';


export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: 'auth/signup',
};

export default function RootLayout() {

  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  return (
      <>
        {/* Keep the splash screen open until the assets have loaded. In the future, we should just support async font loading with a native version of font-display. */}
        {!loaded && <SplashScreen />}
        {loaded && <AppRoot />}
      </>
  );
}

function AppRoot() {
  return (
	<Provider>
	  <RootLayoutNav />
	</Provider>
  );
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const {currUsr, setCurrUsr} = useAuth();

  useEffect(() => {
    console.log("i run");
    AuthService.getCurrentUser()
      .then((res) => {
        console.log("i run");

        setCurrUsr(res);
      })
      .catch((err) => {
        router.push('/auth/')
      })
      .finally(() => {
        setLoading(false);
      })
  }, []);

  return (
        <>
          <ThemeProvider value={colorScheme === 'dark' ? LightTheme : DefaultTheme}>
            <Slot />
          </ThemeProvider>
          <StatusBar barStyle='dark-content' hidden={false} />
          {loading && <LoadingAnimation message='Getting User info' />}
        </>
  );
}
