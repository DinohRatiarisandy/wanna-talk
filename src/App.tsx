import { ThemeProvider } from "@/components/utils/theme-provider";
import AppContent from "./components/AppContent";
import { AuthProvider } from "./components/context/AuthProvider";

function App() {
   return (
      <ThemeProvider defaultTheme="light" storageKey="ui-theme">
         <AuthProvider>
            <AppContent />
         </AuthProvider>
      </ThemeProvider>
   );
}

export default App;
