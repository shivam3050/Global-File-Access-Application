import { createBrowserRouter } from 'react-router-dom'
import { App } from "../App.jsx"
import { LocalWifiSearchPage } from '../components/shareTab/localwifisearchpage.jsx'
import { ConnectedWifiPage } from '../components/shareTab/localwificonnectedwifipage.jsx'

const myUserRouter = createBrowserRouter(
    [
      {
        path: "/",
        element: <App />,
        children: [
          {
            path: "",
            element: <></>
          },
          {
            path: "/searchWifi",
            element: <LocalWifiSearchPage />
          },
          {
            path: "/connectedWifiPage",
            element: <ConnectedWifiPage />
          },
        ]
      }
    ]
  )


export { myUserRouter }