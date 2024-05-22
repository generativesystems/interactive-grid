// sketch.js

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDa5-slGAm42n1EorGsliQPfCqAiEv7gEY",
  authDomain: "dotgridnetwork.firebaseapp.com",
  projectId: "dotgridnetwork",
  storageBucket: "dotgridnetwork.appspot.com",
  messagingSenderId: "623837857203",
  appId: "1:623837857203:web:67fe2f0149420d050c77c6",
  measurementId: "G-JE9K988WNJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

let cols = 10;
let rows = 10;
let grid = [];

function setup() {
    createCanvas(400, 400);
    for (let i = 0; i < cols; i++) {
        grid[i] = [];
        for (let j = 0; j < rows; j++) {
            grid[i][j] = false;
        }
    }

    // Load initial grid state from Firebase
    let gridRef = database.ref('grid');
    gridRef.on('value', (snapshot) => {
        if (snapshot.val()) {
            grid = snapshot.val();
        }
    });
}

function draw() {
    background(0);
    let w = width / cols;
    let h = height / rows;
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            if (grid[i][j]) {
                fill(0);
            } else {
                fill(255);
            }
            stroke(255);
            ellipse(i * w + w / 2, j * h + h / 2, w, h);
        }
    }
}

function mousePressed() {
    let w = width / cols;
    let h = height / rows;
    let i = floor(mouseX / w);
    let j = floor(mouseY / h);
    if (i >= 0 && i < cols && j >= 0 && j < rows) {
        grid[i][j] = !grid[i][j];

        // Update the grid state in Firebase
        let gridRef = database.ref('grid');
        gridRef.set(grid);
    }
}
