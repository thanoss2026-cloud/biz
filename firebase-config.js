// --- Firebase Yapılandırması ---
// BizSolutions Cloud Database Ayarları

const firebaseConfig = {
  apiKey: "AIzaSyBLsfZ3EKe2NZf0eN12kv85Knvyzxrm4-8",
  authDomain: "bizsolutions-84ecb.firebaseapp.com",
  databaseURL: "https://bizsolutions-84ecb-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "bizsolutions-84ecb",
  storageBucket: "bizsolutions-84ecb.firebasestorage.app",
  messagingSenderId: "599667040007",
  appId: "1:599667040007:web:cbff48d9d3db004c8c6fa2",
  measurementId: "G-PX1EE3M36Q"
};

// Yapılandırma kontrolü
const isFirebaseConfigured = () => {
    return firebaseConfig.apiKey !== "YOUR_API_KEY";
};
