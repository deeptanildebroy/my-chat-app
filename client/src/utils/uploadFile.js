import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase/config";

export const fileUpload = async(chatId,author,file) => {
  if (!file) return null;

  // Create a storage reference
  const storageRef = ref(storage, `chats/${chatId}/${author}/${file.name}`);

  // Upload the file
  const snapshot = await uploadBytes(storageRef, file);

  // Get the download URL
  const downloadURL = await getDownloadURL(snapshot.ref);

  return downloadURL;
}

export const uploadFile = async (file, userId) => {
  if (!file) return null;

  // Create a storage reference
  const storageRef = ref(storage, `users/${userId}/${file.name}`);

  // Upload the file
  const snapshot = await uploadBytes(storageRef, file);

  // Get the download URL
  const downloadURL = await getDownloadURL(snapshot.ref);

  return downloadURL;
};
