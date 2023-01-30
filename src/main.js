import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";
/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
    faPlay,
    faPencil,
    faStop,
    faStopCircle,
    faXmark,
    faMicrophone,
    faSpinner,
    faList,
    faSliders,
    faMicrophoneLines,
    faBullseye,
    faGear,
    faBook,
    faFileContract,
    faPuzzlePiece,
    faEye
} from "@fortawesome/free-solid-svg-icons";
library.add(
    faPlay,
    faPencil,
    faStop,
    faStopCircle,
    faXmark,
    faMicrophone,
    faList,
    faSliders,
    faMicrophoneLines,
    faBullseye,
    faGear,
    faBook,
    faFileContract,
    faPuzzlePiece,
    faEye,
    faSpinner
);

import "bootstrap/dist/css/bootstrap.min.css";

import "bootstrap";

import "./assets/main.css";

const app = createApp(App, { visible: false });

app.use(createPinia());
app.use(router);
app.component("font-awesome-icon", FontAwesomeIcon);
app.mount("#app");