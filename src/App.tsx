import { AppRoutes } from "./router";
import { BrowserRouter } from "react-router-dom";
import { usePageTracking } from "./hooks/usePageTracking";
import Chatbot from "./components/Chatbot/Chatbot";
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

function AppContent() {
  usePageTracking();
  return <AppRoutes />;
}

function App() {
  // Debug: Vérifier la clé reCAPTCHA
  const recaptchaKey = import.meta.env.VITE_PUBLIC_RECAPTCHA_SITE_KEY;
  console.log('🔑 reCAPTCHA Site Key:', recaptchaKey);
  console.log('🔍 Key starts with 6Lc:', recaptchaKey?.startsWith('6L'));
  console.log('📏 Key length:', recaptchaKey?.length);

  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={recaptchaKey}
      scriptProps={{
        async: true,
        defer: true,
        appendTo: 'head',
      }}
    >
      <BrowserRouter basename={__BASE_PATH__}>
        <AppContent />
        <Chatbot />
      </BrowserRouter>
    </GoogleReCaptchaProvider>
  );
}

export default App;
