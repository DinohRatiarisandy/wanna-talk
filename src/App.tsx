import { ThemeProvider } from "@/components/utils/theme-provider";
import ChatList from "./components/section-chat-list/ChatList";
import ChatDetails from "./components/section-chat-details/ChatDetails";
import ChatMedia from "./components/section-media-shared/ChatMedia";
import { ToggleTheme } from "./components/utils/ToggleTheme";

function App() {
   return (
      <ThemeProvider defaultTheme="light" storageKey="ui-theme">
         <div className="flex">
            <ChatList className="flex h-[100vh] flex-[1] flex-col gap-2 border-r" />
            <ChatDetails className="flex h-[100vh] flex-[2.5] flex-col lg:border-r" />
            <ChatMedia className="hidden h-[100vh] flex-[1] flex-col lg:flex" />
            <ToggleTheme className="absolute left-4 top-[92vh]" />
         </div>
      </ThemeProvider>
   );
}

export default App;
