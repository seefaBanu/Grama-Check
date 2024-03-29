import { useFonts } from 'expo-font';
import RootNavigation from './navigation/index';
import { AuthProvider } from './context/AuthContext';
export default function App() {
  const [fonts] = useFonts({
    Poppins: require('./assets/fonts/Poppins-Medium.ttf'),
    PoppinsRegular: require('./assets/fonts/Poppins-Regular.ttf'),
    PoppinsBold: require('./assets/fonts/Poppins-Bold.ttf'),
  });
  if (!fonts) return null;
  return (
    <AuthProvider>
      <RootNavigation />
    </AuthProvider>
  );
}
