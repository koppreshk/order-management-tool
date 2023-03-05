import { FlexBox } from "./common"
import { LoginPage } from "./modules/login/pages"
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { ErrorPage } from "./modules/login/pages";
import { DashboardPage } from "./modules/dashboard/pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "dashboard",
    element: <DashboardPage />
  },
  {
    path: "*",
    element: <ErrorPage />
  }
]);

function App() {

  return (
    <FlexBox width="100%" height="100%">
      <RouterProvider router={router} />
    </FlexBox>
  )
}

export default App
