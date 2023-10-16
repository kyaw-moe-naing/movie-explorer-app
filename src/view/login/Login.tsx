import { SafeAreaView, StyleSheet, Text, View } from "react-native"
import Button from "../../components/Button";
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { useState } from "react";
import { useTheme } from "@react-navigation/native";

GoogleSignin.configure({
  webClientId: '412574812768-15i7i5pa93b7fmu5dki4u67bqiunvsh4.apps.googleusercontent.com',
});

const LoginScreen = () => {
  const { colors } = useTheme();

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<FirebaseAuthTypes.NativeFirebaseAuthError>();

  async function onGoogleButtonPress() {
    setError(undefined);
    setLoading(true);
    try {
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      const { idToken } = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      const credential = await auth().signInWithCredential(googleCredential);
      setLoading(false);
    } catch (e) {
      console.log(e);
      setError(e as FirebaseAuthTypes.NativeFirebaseAuthError)
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.appName}>Movie Explorer App</Text>
      </View>
      <Button
        loading={loading}
        selected
        width={'90%'}
        height={40}
        title={"Google Sign-In"}
        onPress={onGoogleButtonPress}
      />
      <View style={styles.errorContainer}>
        <Text style={{ color: colors.notification }}>{error?.message}</Text>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  appName: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  errorContainer: {
    position: 'absolute',
    bottom: 80,
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignSelf: 'flex-start',
  }
});

export default LoginScreen;