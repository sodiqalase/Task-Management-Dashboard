import { createApp } from "vue";
import "./styles/tailwind.scss";
import "./styles/index.scss";
import App from "./App.vue";
import router from "./router";
import VueAwesomePaginate from "vue-awesome-paginate";

import "vue-awesome-paginate/dist/style.css";

createApp(App).use(router).use(VueAwesomePaginate).mount("#app");
