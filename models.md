users (collection)
|-- userId (document)
|   |-- displayName: "User Name"
|   |-- email: "user@example.com"
|   |-- profilePicture: "url"
|
chats (collection)
|-- chatId (document)
|   |-- name: "Chat Name"
|   |-- members: [userId1, userId2, ...]
|   |-- messages (subcollection)
|       |-- messageId (document)
|           |-- text: "Message Text"
|           |-- timestamp: Timestamp
