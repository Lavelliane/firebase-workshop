// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  Timestamp,
  query,
  where,
  onSnapshot,
  orderBy,
  getDoc,
  updateDoc,
} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB-wb2LwX7nj5ChOGlcG9ygRqswlgAYImw",
  authDomain: "fir-workshop-fd9f6.firebaseapp.com",
  projectId: "fir-workshop-fd9f6",
  storageBucket: "fir-workshop-fd9f6.appspot.com",
  messagingSenderId: "627473734951",
  appId: "1:627473734951:web:f3b13a0c33a225ced89d02",
};

// Initialize Firebase
initializeApp(firebaseConfig);

//init firestore service
const db = getFirestore();

// Create Prospects reference
const prospectRef = collection(db, "Prospects");

// DOM Manipulation
const table = document.getElementById("prospects-table-body");
const addProspectForm = document.getElementById("add-prospect-form");
const deleteProspectForm = document.getElementById("delete-prospect-form");

addProspectForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData.entries());
  data.askedAt = Timestamp.fromDate(new Date(data.askedAt));
  data.saidYes = data.saidYes === "on";

  console.log(data);

  addDoc(prospectRef, data)
    .then(() => {
      location.reload();
    })
    .catch((err) => {
      console.log(err.message);
    });
});

deleteProspectForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const id = formData.get("id");

  const docRef = doc(db, "Prospects", id);
  deleteDoc(docRef)
    .then(() => {
      location.reload();
    })
    .catch((err) => {
      console.log(err.message);
    });
});

getDocs(prospectRef)
  .then((snapshot) => {
    const prospects = snapshot.docs.map((doc) => {
      const { askedAt, name, saidYes } = doc.data();

      return `<tr>
                <th scope="row">${doc.id}</th>
                <td>${name}</td>
                <td>${
                  askedAt
                    ? askedAt.toDate().toLocaleDateString()
                    : "Not yet asked."
                }</td>
                <td>${saidYes ? "♥" : "😭"}</td>
              </tr>`;
    });

    table.innerHTML = prospects.join("\n");
  })
  .catch((err) => {
    console.log(err.message);
  });

// Create query table
const queryProspectForm = document.getElementById("query-prospect-form");
const qTable = document.getElementById("query-table-body");

queryProspectForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const name = formData.get("name");

  // Prospects query
  const q = query(
    prospectRef,
    where("name", "==", name),
    orderBy("askedAt", "desc")
  );

  onSnapshot(q, (snapshot) => {
    const prospects = snapshot.docs.map((doc) => {
      const { askedAt, name, saidYes } = doc.data();

      return `<tr>
                  <th scope="row">${doc.id}</th>
                  <td>${name}</td>
                  <td>${
                    askedAt
                      ? askedAt.toDate().toLocaleDateString()
                      : "Not yet asked."
                  }</td>
                  <td>${saidYes ? "♥" : "😭"}</td>
                </tr>`;
    });

    qTable.innerHTML = prospects.join("\n");
  });
});

// Create query table
const prospectForm = document.getElementById("prospect-form");
const pTable = document.getElementById("prospect-table-body");

prospectForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const id = formData.get("prospect-id");

  // Get one document
  const docRef = doc(db, "Prospects", id);

  getDoc(docRef).then((doc) => {
    const { askedAt, name, saidYes } = doc.data();

    pTable.innerHTML = `<tr>
                <th scope="row">${doc.id}</th>
                <td>${name}</td>
                <td>${
                  askedAt
                    ? askedAt.toDate().toLocaleDateString()
                    : "Not yet asked."
                }</td>
                <td>${saidYes ? "♥" : "😭"}</td>
              </tr>`;
  });

  onSnapshot(docRef, (doc) => {
    const { askedAt, name, saidYes } = doc.data();

    pTable.innerHTML = `<tr>
                <th scope="row">${doc.id}</th>
                <td>${name}</td>
                <td>${
                  askedAt
                    ? askedAt.toDate().toLocaleDateString()
                    : "Not yet asked."
                }</td>
                <td>${saidYes ? "♥" : "😭"}</td>
              </tr>`;
  });
});

// Update doc
// updateDoc(docRef, {
//   name: "Zach Riane Machopapi",
// });
