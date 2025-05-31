import { Stack } from "expo-router";
import { RootStoreProvider } from "./stores/RootStoreProvider";

export default function RootLayout() {
  return (
    <RootStoreProvider>
      <Stack screenOptions={{
        headerShown: false
      }}/>
    </RootStoreProvider>
  );
}
