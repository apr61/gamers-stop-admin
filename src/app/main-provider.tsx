import { Provider } from "react-redux";
import { store } from "../redux/store/store";
import { Toaster } from "react-hot-toast";
import * as React from "react";

type AppProviderProps = {
	children: React.ReactNode;
};

const AppProvider = ({ children }: AppProviderProps) => {
	return (
		<Provider store={store}>
			<Toaster position="bottom-center" />
			{children}
		</Provider>
	);
};

export default AppProvider;
