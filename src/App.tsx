import { ThemeProvider } from "@/components/utils/theme-provider";
import ChatList from "./components/section-chat-list/ChatList";
import ChatDetails from "./components/section-chat-details/ChatDetails";
import ChatMedia from "./components/section-media-shared/ChatMedia";

function App() {
   return (
      <ThemeProvider defaultTheme="light" storageKey="ui-theme">
         <div className="flex">
            <ChatList className="flex h-[100vh] flex-[1] flex-col gap-2 border-r border-accent" />
            <ChatDetails className="flex h-[100vh] flex-[2.5] flex-col border-accent lg:border-r" />
            <ChatMedia className="hidden h-[100vh] flex-[1] flex-col lg:flex" />
         </div>
      </ThemeProvider>
   );
}

export default App;
