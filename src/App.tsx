import { ThemeProvider } from "@/components/utils/theme-provider";
import ChatList from "./components/section-chat-list/ChatList";
import ChatDetails from "./components/section-chat-details/ChatDetails";
import ChatMedia from "./components/section-media-shared/ChatMedia";

function App() {
   return (
      <ThemeProvider defaultTheme="light" storageKey="ui-theme">
         <div className="space-between flex w-full">
            <ChatList />
            <ChatDetails />
            <ChatMedia />
         </div>
      </ThemeProvider>
   );
}

export default App;
