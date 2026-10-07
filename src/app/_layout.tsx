import { Header } from "@/components/Header";
import { store } from "@/store";
import { useTheme } from "@/theme/useTheme";
import { BebasNeue_400Regular } from "@expo-google-fonts/bebas-neue";
import {
  CourierPrime_400Regular,
  CourierPrime_700Bold,
} from "@expo-google-fonts/courier-prime";
import {
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
} from "@expo-google-fonts/inter";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";

function AppShell() {
  const { t, name } = useTheme();

  return (
    <>
      <StatusBar style={name === "dark" ? "light" : "dark"} />
      <Stack
        screenOptions={{
          headerShown: true,
          header: () => <Header />,
          contentStyle: { backgroundColor: t.app },
        }}
      />
    </>
  );
}

export default function RootLayout() {
  const [loaded, error] = useFonts({
    BebasNeue_400Regular,
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    CourierPrime_400Regular,
    CourierPrime_700Bold,
  });

  if (!loaded && !error) return null;

  return (
    <Provider store={store}>
      <AppShell />
    </Provider>
  );
}
