import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { ChatProvider } from "./context/ChatContext";
import { AuthProvider } from "./context/AuthContext";
import { MessageProvider } from "./context/MessageContext";
import DirectChat from "./components/createchat/DirectChat";
import GroupChat from "./components/createchat/GroupChat";
import HomeLayout from "./pages/layout/HomeLayout";
import ChatList from "./components/ChatList";
import CombineChat from "./components/DirectCombineChat/CombineChat";
import { UserProvider } from "./context/UserContext";
import Logout from "./pages/Logout";

function App() {
  return (
    <>
      <AuthProvider>
        <UserProvider>
          <ChatProvider>
            <MessageProvider>
              <BrowserRouter>
                <Routes>
                  <Route path="/register" element={<Register />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/logout" element={<Logout/>} />
                  <Route path="/home" element={<HomeLayout />}>
                    <Route path="chats" element={<CombineChat />} />
                    <Route path="groups" element={<GroupChat />} />
                    <Route path="newchat" element={<DirectChat />} />
                    <Route path="chat/:chatid" element={<CombineChat />} />
                  </Route>
                  <Route path="/groupchat/:groupid" element={<></>} />
                  <Route path="/newgroupchat" element={<GroupChat />} />
                </Routes>
              </BrowserRouter>
            </MessageProvider>
          </ChatProvider>
        </UserProvider>
      </AuthProvider>
    </>
  );
}

export default App;
