import { createRouter, createWebHashHistory } from "vue-router";


const routes = [
  {
    name: "HomePage",
    path: "/",    
    component : () => import("@/views/AppHome")
    
  },
  // {
  //   name : "NewItem",
  //   path : "/new",
  //   component: () => import("@/views/newItem")
  // },

]

const router = createRouter ({
  routes,
  history: createWebHashHistory(),
  
})

export default router;