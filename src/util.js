import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  addDoc,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
export function randomName() {
  const adjectives = [
    "autumn",
    "hidden",
    "bitter",
    "misty",
    "silent",
    "empty",
    "dry",
    "dark",
    "summer",
    "icy",
    "delicate",
    "quiet",
    "white",
    "cool",
    "spring",
    "winter",
    "patient",
    "twilight",
    "dawn",
    "crimson",
    "wispy",
    "weathered",
    "blue",
    "billowing",
    "broken",
    "cold",
    "damp",
    "falling",
    "frosty",
    "green",
    "long",
    "late",
    "lingering",
    "bold",
    "little",
    "morning",
    "muddy",
    "old",
    "red",
    "rough",
    "still",
    "small",
    "sparkling",
    "shy",
    "wandering",
    "withered",
    "wild",
    "black",
    "young",
    "holy",
    "solitary",
    "fragrant",
    "aged",
    "snowy",
    "proud",
    "floral",
    "restless",
    "divine",
    "polished",
    "ancient",
    "purple",
    "lively",
    "nameless",
  ];
  const nouns = [
    "waterfall",
    "river",
    "breeze",
    "moon",
    "rain",
    "wind",
    "sea",
    "morning",
    "snow",
    "lake",
    "sunset",
    "pine",
    "shadow",
    "leaf",
    "dawn",
    "glitter",
    "forest",
    "hill",
    "cloud",
    "meadow",
    "sun",
    "glade",
    "bird",
    "brook",
    "butterfly",
    "bush",
    "dew",
    "dust",
    "field",
    "fire",
    "flower",
    "firefly",
    "feather",
    "grass",
    "haze",
    "mountain",
    "night",
    "pond",
    "darkness",
    "snowflake",
    "silence",
    "sound",
    "sky",
    "shape",
    "surf",
    "thunder",
    "violet",
    "water",
    "wildflower",
    "wave",
    "water",
    "resonance",
    "sun",
    "wood",
    "dream",
    "cherry",
    "tree",
    "fog",
    "frost",
    "voice",
    "paper",
    "frog",
    "smoke",
    "star",
  ];
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  return adjective + noun;
}

export function randomColor() {
  return "#" + Math.floor(Math.random() * 0xffffff).toString(16);
}

export const fetchBots = async () => {
  const botsCollection = collection(db, "bots");
  const botsSnapshot = await getDocs(botsCollection);
  const botsList = botsSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return botsList;
};

export const deleteBot = async (id) => {
  await deleteDoc(doc(db, "bots", id));
};

export const createBot = async (name, description, owner) => {
  try {
    const newBot = {
      botName: name,
      botDescription: description,
      createdAt: new Date().toISOString(),
      owner: owner,
    };
    const docRef = await addDoc(collection(db, "bots"), newBot);
    return docRef.id; // Return the document ID of the new bot
  } catch (error) {
    console.log("Error adding document: ", error);
  }
};

export const fetchChatsByBotName = async (botName) => {
  const chatsCollection = collection(db, "chats");
  const q = query(chatsCollection, where("bot_name", "==", botName));

  try {
    const querySnapshot = await getDocs(q);
    const chats = [];
    querySnapshot.forEach((doc) => {
      chats.push({ id: doc.id, chat_title: doc.data().chat_title });
    });
    return chats;
  } catch (error) {
    console.error("Error fetching chats: ", error);
    return [];
  }
};


export const fetchConversationsByChatAndBot = async (chatTitle, botName) => {
    if (!chatTitle || !botName) {
        console.error("Chat title and bot name are required");
        return [];
    }

    const chatsCollection = collection(db, "chats");
    const q = query(
        chatsCollection,
        where("chat_title", "==", chatTitle),
        where("bot_name", "==", botName)
    );

    try {
        const querySnapshot = await getDocs(q);
        const conversations = [];
        querySnapshot.forEach((doc) => {
            conversations.push({
                id: doc.id,
                chat_title: doc.data().chat_title,
                bot_name: doc.data().bot_name,
                conversations: doc.data().conversations
            });
        });
        return conversations;
    } catch (error) {
        console.error("Error fetching conversations: ", error);
        return [];
    }
}