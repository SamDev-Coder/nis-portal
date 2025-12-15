// ===== Import Firebase SDKs =====
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

// ===== Firebase Configuration =====
const firebaseConfig = {
  apiKey: "AIzaSyB9YWjRJgRSfV7vBHphSv7J91aTj7fqf_k",
  authDomain: "immigration-service-3c678.firebaseapp.com",
  projectId: "immigration-service-3c678",
  storageBucket: "immigration-service-3c678.firebasestorage.app",
  messagingSenderId: "389923817622",
  appId: "1:389923817622:web:21d4137eb01428db33dab7"
};

// ===== Initialize Firebase =====
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ===== Populate States Dropdown =====
const states = [
  "Abia","Adamawa","Akwa Ibom","Anambra","Bauchi","Bayelsa","Benue",
  "Borno","Cross River","Delta","Ebonyi","Edo","Ekiti","Enugu",
  "Gombe","Imo","Jigawa","Kaduna","Kano","Katsina","Kebbi","Kogi",
  "Kwara","Lagos","Nasarawa","Niger","Ogun","Ondo","Osun","Oyo",
  "Plateau","Rivers","Sokoto","Taraba","Yobe","Zamfara","FCT - Abuja"
];

const stateSelect = document.getElementById("state");
states.forEach(state => {
    const option = document.createElement("option");
    option.value = state;
    option.textContent = state;
    stateSelect.appendChild(option);
});

// ===== Form Submission =====
const regForm = document.getElementById("regForm");
regForm.addEventListener("submit", async function(e){
    e.preventDefault();

    const data = {
        fullname: document.getElementById("fullname").value,
        passportNo: document.getElementById("passportNo").value,
        nin: document.getElementById("nin").value,
        state: document.getElementById("state").value,
        lga: document.getElementById("lga").value,
        nextOfKin: document.getElementById("nok").value,
        email: document.getElementById("email").value,
        address: document.getElementById("address").value,
        qualification: document.getElementById("qualification").value,
        maritalStatus: document.getElementById("marital").value,
        status: "Pending"
    };

    try {
        await addDoc(collection(db, "immigration_applications"), data);

        // Show success popup
        const popup = document.getElementById("successPopup");
        popup.classList.add("show");
        setTimeout(() => popup.classList.remove("show"), 3000);

        this.reset();
    } catch (err) {
        alert("Error submitting application: " + err.message);
    }
});
