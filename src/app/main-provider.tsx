import { Provider } from "react-redux";
import { store } from "@/store/store";
import { Toaster } from "react-hot-toast";
import * as React from "react";
import AuthProvider from "@/features/auth/AuthProvider";

type AppProviderProps = {
  children: React.ReactNode;
};

const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <Provider store={store}>
      <AuthProvider>
        <Toaster position="bottom-center" />
        {children}
      </AuthProvider>
    </Provider>
  );
};

export default AppProvider;
