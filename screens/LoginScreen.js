import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image
} from "react-native";
import React, { useState, useEffect } from "react";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useNavigation } from "@react-navigation/core";
import MainBackgroundImage from "../components/background";


const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.replace("Main");
      }
    });
    return unsubscribe;
  }, []);

  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // User creation successful
        const user = userCredential.user;
        console.log("User created:", user);
      })
      .catch((error) => {
        // Handle any errors that occurred during user creation
        const errorCode = error.code;
        const errorMessage = error.message;
        setError(errorMessage);
        console.error("Error creating user:", errorCode, errorMessage);
      });
  };

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // User sign in successful
        const user = userCredential.user;
        console.log("Logged in with:", user);
      })
      .catch((error) => {
        // Handle any errors that occurred during user creation
        const errorCode = error.code;
        const errorMessage = error.message;
        setError(errorMessage);
        console.error("Error creating user:", errorCode, errorMessage);
      });
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <MainBackgroundImage />
      <Image
        source={require("../assets/image/logo.png")}
        style={{ position: "relative", height: "30%", width: "70%" }}
      />
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="  Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
        />

        <TextInput
          placeholder="  Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleSignIn} style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleSignUp}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Register</Text>
        </TouchableOpacity>
        {error !== "" && <Text style={styles.errorText}>{error}</Text>}
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    width: "80%",
  },
  input: {
    backgroundColor: "white",
    marginHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 45,
  },
  button: {
    backgroundColor: "#008080",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
    textAlign: "center",
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "#008080",
    borderWidth: 2,
  },
  buttonOutlineText: {
    color: "#008080",
    fontWeight: "700",
    fontSize: 16,
  },
  errorText: {
    paddingVertical: 10,
    color: "red",
  },
});