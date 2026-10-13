import { getRates } from "@/api/currency";
import { Header } from "@/components/Header";
import { store } from "@/store";
import { useAppDispatch } from "@/store/hooks";
import { setRates } from "@/store/settingsSlice";
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
import { useEffect } from "react";
import { Provider } from "react-redux";

function AppShell() {
  const { t, name } = useTheme();
  const dispatch = useAppDispatch();

  useEffect(() => {
    getRates()
      .then((data) =>
        dispatch(setRates({ rates: data.rates, date: data.date })),
      )
      .catch(() => {
        // No network or API is down → hardcoded fallback rates get used automaticly
      });
  }, [dispatch]);

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
