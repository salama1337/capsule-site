import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  orderBy
} from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js";

// 🔐 Firebase Config — حسب مشروعك
const firebaseConfig = {
  apiKey: "AIzaSyDW-qG3Ph5cuy8fLALPWbTWXR68qYRWT2o",
  authDomain: "capsule-admin-85e14.firebaseapp.com",
  projectId: "capsule-admin-85e14",
  storageBucket: "capsule-admin-85e14.appspot.com",
  messagingSenderId: "827933611543",
  appId: "1:827933611543:web:5ab6c6cfccb3becd296e52"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 🧠 قراءه الملفات لقسم معين
async function fetchSection(subject, category, containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = "جاري التحميل...";

  const q = query(collection(db, subject, category, "files"), orderBy("timestamp"));
  const snapshot = await getDocs(q);

  if (snapshot.empty) {
    container.innerHTML = "لا توجد ملفات حتى الآن.";
    return;
  }

  container.innerHTML = "";
  snapshot.forEach(doc => {
    const data = doc.data();
    const div = document.createElement("div");
    div.className = "resource";
    div.innerHTML = `
      <span>${data.name}</span>
      <a href="${data.url}" target="_blank" class="btn-view">تشغيل</a>
      <a href="${data.url}" download class="btn-download">تحميل</a>
    `;
    container.appendChild(div);
  });
}

// 🧩 جلب بيانات المادة من الـ HTML
const subject = document.body.dataset.subject;

// 🟦 عرض كل الأقسام
fetchSection(subject, "lectures", "lectures-list");
fetchSection(subject, "summaries", "summaries-list");
fetchSection(subject, "sections", "sections-list");
fetchSection(subject, "exams", "exams-list");
