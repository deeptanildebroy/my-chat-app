import React, { createContext,useState, useContext, useEffect } from "react";
import { auth, db } from "../firebase/config";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { uploadFile } from "../utils/uploadFile";
import { doc, setDoc } from "firebase/firestore";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsub;
  }, []);

  const signup = async (username, email, password, profilePicture) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      if (profilePicture) {
        let imageURL = "";
        imageURL = await uploadFile(profilePicture, user.uid);
        await updateProfile(user, {
          displayName: username,
          photoURL: imageURL,
        });
      }

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        username: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
      });
    } catch (error) {
      console.error("Error occured while Signup", error);
    }
  };

  const login = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error("Error Occured while Login", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error Occured while logout", error);
    }
  };

  return (
    <AuthContext.Provider value={{ currentUser, signup, login, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
