import { auth, storage } from "./firebase-config.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js";
import { ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-storage.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js";

const db = getFirestore();

document.getElementById("upload-btn").addEventListener("click", async () => {
  const subject = document.getElementById("subject").value;
  const category = document.getElementById("category").value;
  const fileInput = document.getElementById("file-input");
  const file = fileInput.files[0];

  if (!file) {
    document.getElementById("upload-msg").textContent = "يرجى اختيار ملف";
    return;
  }

  const storageRef = ref(storage, `${subject}/${category}/${file.name}`);

  try {
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);

    // حفظ الرابط في Firestore
    await addDoc(collection(db, subject, category, "files"), {
      name: file.name,
      url: url,
      timestamp: serverTimestamp()
    });

    document.getElementById("upload-msg").textContent = "تم رفع الملف وتخزينه في القاعدة بنجاح ✅";
  } catch (err) {
    document.getElementById("upload-msg").textContent = "خطأ أثناء الرفع: " + err.message;
  }
});
