import AppContent from "./components/AppContent";
import { AuthProvider } from "./store/AuthProvider";

function App() {
   return (
      <AuthProvider>
         <AppContent />
      </AuthProvider>
   );
}

export default App;
