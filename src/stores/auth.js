import { ref, computed, onMounted } from 'vue';
import {defineStore} from 'pinia'
import {signInWithEmailAndPassword, onAuthStateChanged, signOut} from 'firebase/auth'
import {useFirebaseAuth} from 'vuefire'
import {useRouter} from 'vue-router';

export const useAuthStore = defineStore('auth', () => {
    const errorMsg = ref('');
    const authUser = ref(null);
    const auth = useFirebaseAuth();
    const router = useRouter();

    onMounted(() => {
        onAuthStateChanged(auth, (user) => {
            if(user) {
                authUser.value = user;
            }
        });
    });

    const errorCodes = {
        'auth/invalid-credential': 'Credenciales Incorrectas',
        'auth/wrong-password': 'Password Incorrecoto',
        'auth/user-not-found': 'Usuario No Encontrado',
    }

    const login = ({email, password}) => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                errorMsg.value = "";
                authUser.value = userCredential.user;
                router.push({name: 'admin.propiedades'});
            })
            .catch(error => errorMsg.value = errorCodes[error.code]);
    }

    const logout = () => {
        signOut(auth)
            .then(() => {
                authUser.value = null;
                router.push({name: 'login'});
            })
            .catch(error => console.log(error));
    }

    const hasError = computed(() => {
        return errorMsg.value
    });

    const isAuth = computed(() => {
        return authUser.value;
    });

    return {
        errorMsg,
        authUser,
        auth,
        login,
        logout,
        hasError,
        isAuth,
    };
});