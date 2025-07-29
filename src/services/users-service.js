import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  onAuthStateChanged
} from "firebase/auth";
import { collection, doc, setDoc, getDoc, updateDoc, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "../firebase";

export const signUpUser = async (email, password, displayName, phone = "") => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await updateProfile(user, {
      displayName: displayName
    });

    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      email: user.email,
      displayName: displayName,
      phone: phone,
      role: "user",
      createdAt: new Date().toISOString(),
      lastLoginAt: new Date().toISOString()
    });

    return {
      success: true,
      user: {
        uid: user.uid,
        email: user.email,
        displayName: displayName,
        phone: phone,
        role: "user"
      }
    };
  } catch (error) {
    console.error("Error creating user:", error);
    return {
      success: false,
      error: getAuthErrorMessage(error.code)
    };
  }
};

export const signInUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    const userDocRef = doc(db, "users", user.uid);
    await updateDoc(userDocRef, {
      lastLoginAt: new Date().toISOString()
    });

    const userData = await getUserData(user.uid);

    return {
      success: true,
      user: userData
    };
  } catch (error) {
    console.error("Error signing in:", error);
    return {
      success: false,
      error: getAuthErrorMessage(error.code)
    };
  }
};

export const signOutUser = async () => {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error) {
    console.error("Error signing out:", error);
    return {
      success: false,
      error: "Помилка при виході з системи"
    };
  }
};

export const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return {
      success: true,
      message: "Лист для скидання пароля відправлено на вашу електронну пошту"
    };
  } catch (error) {
    console.error("Error resetting password:", error);
    return {
      success: false,
      error: getAuthErrorMessage(error.code)
    };
  }
};

export const getUserData = async (uid) => {
  try {
    const userDoc = await getDoc(doc(db, "users", uid));
    if (userDoc.exists()) {
      return userDoc.data();
    } else {
      const userData = {
        uid: uid,
        email: auth.currentUser?.email || "",
        displayName: auth.currentUser?.displayName || "",
        role: "user",
        createdAt: new Date().toISOString()
      };
      await setDoc(doc(db, "users", uid), userData);
      return userData;
    }
  } catch (error) {
    console.error("Error getting user data:", error);
    return null;
  }
};

export const updateUserProfile = async (uid, userData) => {
  try {
    const userDocRef = doc(db, "users", uid);
    await updateDoc(userDocRef, {
      ...userData,
      updatedAt: new Date().toISOString()
    });

    if (userData.displayName && auth.currentUser) {
      await updateProfile(auth.currentUser, {
        displayName: userData.displayName
      });
    }

    return { success: true };
  } catch (error) {
    console.error("Error updating user profile:", error);
    return {
      success: false,
      error: "Помилка при оновленні профілю"
    };
  }
};

export const onAuthStateChange = (callback) => {
  return onAuthStateChanged(auth, async (user) => {
    if (user) {
      const userData = await getUserData(user.uid);
      callback(userData);
    } else {
      callback(null);
    }
  });
};

export const getCurrentUser = () => {
  return auth.currentUser;
};

export const checkUserExists = async (email) => {
  try {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("email", "==", email));
    const querySnapshot = await getDocs(q);
    const exists = !querySnapshot.empty;
    return {
      success: true,
      exists: exists
    };
  } catch (error) {
    console.error("Error checking user existence:", error);
    return {
      success: false,
      error: "Помилка при перевірці користувача",
      exists: false
    };
  }
};

const getAuthErrorMessage = (errorCode) => {
  switch (errorCode) {
    case 'auth/email-already-in-use':
      return 'Користувач з таким email вже існує';
    case 'auth/weak-password':
      return 'Пароль занадто слабкий. Мінімум 6 символів';
    case 'auth/invalid-email':
      return 'Невірний формат email';
    case 'auth/user-not-found':
      return 'Користувача з таким email не знайдено';
    case 'auth/wrong-password':
      return 'Невірний пароль';
    case 'auth/invalid-credential':
      return 'Невірні дані для входу';
    case 'auth/too-many-requests':
      return 'Забагато спроб входу. Спробуйте пізніше';
    case 'auth/network-request-failed':
      return 'Помилка мережі. Перевірте підключення до інтернету';
    default:
      return 'Сталася помилка. Спробуйте ще раз';
  }
};
