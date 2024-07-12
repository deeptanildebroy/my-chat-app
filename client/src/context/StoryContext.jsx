import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, db } from '../services/firebase';
import { 
  collection, 
  addDoc, 
  onSnapshot, 
  query, 
  orderBy,
  deleteDoc, 
  doc, 
  updateDoc 
} from 'firebase/firestore';
import { uploadFile } from '../utils/uploadFile';

const StoryContext = createContext();

export const useStory = () => {
  return useContext(StoryContext);
};

export const StoryProvider = ({ children }) => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'stories'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const storiesData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setStories(storiesData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const createStory = async (file, caption = '') => {
    const userId = auth.currentUser.uid;
    const url = await uploadFile(file, `stories/${userId}/${file.name}`);
    await addDoc(collection(db, 'stories'), {
      userId,
      url,
      caption,
      createdAt: new Date(),
      views: [],
      reactions: [],
    });
  };

  const deleteStory = async (storyId) => {
    await deleteDoc(doc(db, 'stories', storyId));
  };

  const reactToStory = async (storyId, reaction) => {
    const storyRef = doc(db, 'stories', storyId);
    await updateDoc(storyRef, {
      reactions: [
        ...story.reactions, 
        { userId: auth.currentUser.uid, reaction }
      ]
    });
  };

  const viewStory = async (storyId) => {
    const storyRef = doc(db, 'stories', storyId);
    await updateDoc(storyRef, {
      views: [
        ...story.views, 
        auth.currentUser.uid
      ]
    });
  };

  const editStory = async (storyId, newCaption) => {
    const storyRef = doc(db, 'stories', storyId);
    await updateDoc(storyRef, {
      caption: newCaption,
    });
  };

  const value = {
    stories,
    createStory,
    deleteStory,
    reactToStory,
    viewStory,
    editStory,
  };

  return (
    <StoryContext.Provider value={value}>
      {!loading && children}
    </StoryContext.Provider>
  );
};
