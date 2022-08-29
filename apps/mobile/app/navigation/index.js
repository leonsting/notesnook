import React from "react";
import { SafeAreaView } from "react-native";
import DelayLayout from "../components/delay-layout";
import DialogProvider from "../components/dialog-provider";
import { Header } from "../components/header";
import { Toast } from "../components/toast";
import { useNoteStore } from "../stores/use-notes-store";
import { useSettingStore } from "../stores/use-setting-store";
import { useThemeStore } from "../stores/use-theme-store";
import { TabHolder } from "./tabs-holder";

const _ApplicationHolder = () => {
  const loading = useNoteStore((state) => state.loading);
  const introCompleted = useSettingStore(
    (state) => state.settings.introCompleted
  );
  const colors = useThemeStore((state) => state.colors);

  return (
    <>
      {loading && introCompleted ? (
        <>
          <SafeAreaView
            style={{
              flex: 1,
              backgroundColor: colors.bg
            }}
          >
            <Header />
            <DelayLayout animated={false} wait={loading} />
          </SafeAreaView>
        </>
      ) : (
        <>
          <TabHolder />
          <Toast />
        </>
      )}
      <DialogProvider />
    </>
  );
};
export const ApplicationHolder = React.memo(_ApplicationHolder, () => true);