import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, deleteDoc, doc } from "firebase/firestore";
import {
    getAuth,
    signOut,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
} from "firebase/auth";
import toast from "react-hot-toast";

const firebaseConfig = {
    apiKey: "AIzaSyAGwtq_8HFLS9SkCmVg8KFnj9nbhjf1C2g",
    authDomain: "react-auth-60c29.firebaseapp.com",
    projectId: "react-auth-60c29",
    storageBucket: "react-auth-60c29.appspot.com",
    messagingSenderId: "517846651489",
    appId: "1:517846651489:web:ca37827b35537ee082d020",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
export const db = getFirestore(app);

export const registerUser = async ({ email, password, name }) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);

        await updateProfile(userCredential.user, {
            displayName: name
        });

        const user = userCredential.user;
        
        return user;
    } catch (error) {
        const errorMessage = error.message;
        toast.error(errorMessage);
    }
};

export const loginUser = async ({ email, password }) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        // Signed in
        const user = userCredential.user;
        return user;
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.error(errorCode, errorMessage);
    }
};

export const logoutUser = async () => {
    try {
        await signOut(auth);
        toast.success("Logout Successfully");
        return true;
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.error(errorCode, errorMessage);
    }
};

export const addNewStudent = async (post) => {
    try {
        const docRef = await addDoc(collection(db, "Students"), post);
        return docRef;
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.error(errorCode, errorMessage);
    }
}

export const deleteStudent = async (id) => {
    try {
        const docRef = await deleteDoc(doc(db, "Students", id));
        toast.success("Öğrenci Silindi");
        return docRef;
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.error(errorCode, errorMessage);
    }
}

export default app;
