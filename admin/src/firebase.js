import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCwctu39z7Gc5-C-GXYFGp2SSdF7tpTK60",
    authDomain: "neflix1-2cf45.firebaseapp.com",
    projectId: "neflix1-2cf45",
    storageBucket: "neflix1-2cf45.firebasestorage.app",
    messagingSenderId: "402799684358",
    appId: "1:402799684358:web:04ca91d861955061e08c87",
    measurementId: "G-2FJRX91S3R"
};

const firebase = initializeApp(firebaseConfig)
const storage = getStorage(firebase)

export default storage;
