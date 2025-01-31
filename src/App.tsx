import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { ellipse, square, triangle } from "ionicons/icons";
import Tab1 from "./pages/Tasks";
import { Storage } from "@ionic/storage-angular";
import { useEffect } from "react";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.scss";

/* Tailwind CSS */
import "./theme/tailwind.scss";
import Providers from "./components/Providers";
import Tasks from "./pages/Tasks";
import { useStorage } from "./hooks/useStorage";

setupIonicReact();

const App: React.FC = () => {
  const { isReady } = useStorage();

  if (!isReady) {
    return <div>Loading...</div>; // Ou un composant de chargement
  }

  return (
    <Providers>
      <IonApp>
        <IonReactRouter>
          <IonTabs>
            <IonRouterOutlet>
              <Route exact path="/tasks">
                <Tasks />
              </Route>
              <Route exact path="/">
                <Redirect to="/tasks" />
              </Route>
            </IonRouterOutlet>
            <IonTabBar slot="bottom">
              <IonTabButton tab="tasks" href="/tasks">
                <IonIcon aria-hidden="true" icon={triangle} />
                <IonLabel>Tasks</IonLabel>
              </IonTabButton>
              {/* <IonTabButton tab="tab2" href="/tab2">
                <IonIcon aria-hidden="true" icon={ellipse} />
                <IonLabel>Tab 2</IonLabel>
              </IonTabButton>
              <IonTabButton tab="tab3" href="/tab3">
                <IonIcon aria-hidden="true" icon={square} />
                <IonLabel>Tab 3</IonLabel>
              </IonTabButton> */}
            </IonTabBar>
          </IonTabs>
        </IonReactRouter>
      </IonApp>
    </Providers>
  );
};

export default App;
