import { RouterProvider } from "react-router-dom";
import routes from "./router/routes";
import { Provider } from "react-redux";
import { store } from "./redux/store/store";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <Provider store={store}>
      <Toaster position="bottom-center" />
      <RouterProvider router={routes} />
    </Provider>
  );
}

export default App;
