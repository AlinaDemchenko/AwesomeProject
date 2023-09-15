import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db, storage } from "./firebase-config";


export const writeDataToFirestore = async (post) => {
  try {
    const photoId = new Date().getTime();
    const imagePath = `images/${photoId}.jpg`;
    await uploadPhotoToFirebase(post.photo, imagePath);
    const imageURL = await getDownloadURL(ref(storage, imagePath));
    const newPost = { ...post, photo: imageURL };
    const docRef = await addDoc(collection(db, "Posts"), newPost);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
    throw e;
  }
};

export const addCommentToFirestore = async (newComment) => {
    try {
      const commentRef = await addDoc(
        collection(db, "Comments"),
        newComment
      );
      console.log("Document written with ID: ", commentRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
      throw e;
    }
  };

export const uploadPhotoToFirebase = async (uri, name) => {
  const fetchResponse = await fetch(uri);
  const theBlob = await fetchResponse.blob();
  const imageRef = ref(storage, name);
  const uploadTask = uploadBytesResumable(imageRef, theBlob);
  return new Promise((resolve, reject) => {
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(progress);
      },
      (error) => {
        reject(error);
      },
      async () => {
        const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
        resolve({ downloadUrl, metadata: uploadTask.snapshot.metadata });
      }
    );
  });
};

export const getPostsFromFireStore = async () => {
  const snapshot = await getDocs(collection(db, "Posts"));
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const getCommentsFromFireStore = async () => {
    const snapshot = await getDocs(collection(db, "Comments"));
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  };
