import { createRouter, createWebHistory } from 'vue-router'
import {onAuthStateChanged} from 'firebase/auth'
import {useFirebaseAuth} from 'vuefire';
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
    }, 
    {
      path: '/propiedades/:id',
      name: 'propiedad',
      component: () => import('../views/PropiedadView.vue'),
    }, 
    {
      path: '/admin',
      name: 'admin',
      meta: {
        requiresAuth: true,
      },
      component: () => import('../views/admin/AdminLayout.vue'),
      children: [
        {
          path: 'propiedades',
          name: 'admin.propiedades',
          component: () => import('../views/admin/AdminView.vue'),
        },
        {
          path: 'propiedades/crear',
          name: 'admin.propiedades.crear',
          component: () => import('../views/admin/NuevaPropiedadView.vue'),
        },
        {
          path: 'propiedades/editar/:id',
          name: 'admin.propiedades.editar',
          component: () => import('../views/admin/EditarPropiedadView.vue'),
        },
      ]
    }
  ]
});

router.beforeEach(async (to, from , next) => {
  const requiresAuth = to.matched.some(url => url.meta.requiresAuth);

  if(requiresAuth) {
    try {
      await authenticateUser();
      next();
    } catch (error) {
      next({name: 'login'})
    }
  } else {
    next();
  }
});

function authenticateUser() {
  const auth = useFirebaseAuth();

  return new Promise((resolve, reject) => {
    const unSuscribe = onAuthStateChanged(auth, (user) => {
      unSuscribe();
      if(user) {
        resolve();
      } else {
        reject()
      }
    });
  });
}

export default router