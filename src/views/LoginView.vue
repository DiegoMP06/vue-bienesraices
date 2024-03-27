<script setup>
    import {useForm, useField} from 'vee-validate';
    import {loginSchema as validationSchema} from '../validation/loginSchema';
    import { useAuthStore } from '@/stores/auth';

    const {handleSubmit} = useForm({validationSchema});
    const authStore = useAuthStore();

    const email = useField('email');
    const password = useField('password');
    
    const submit = handleSubmit((values) => {
        authStore.login(values)
    });
</script>

<template>
    <v-card
        flat
        max-width="600"
        class="mx-auto my-10"
    >
        <v-card-title
            class="text-h4 font-weight-bold"
            tag="h3"
        >
            Iniciar Sesion
        </v-card-title>

        <v-card-subtitle
            class="text-h5"
            tag="p"
        >
            Inicia Sesion con Tu Cuenta
        </v-card-subtitle>

        <v-alert
            v-if="authStore.hasError"
            class="my-5"
            type="error"
            :title="authStore.errorMsg"
        ></v-alert>

        <v-form class="mt-10">
            <v-text-field 
                type="email"
                v-model="email.value.value"
                label="Email: "
                placeholder="Tu Email"
                bg-color="blue-grey-lighten-5"
                class="mb-4"
                :error-messages="email.errorMessage.value"
            />

            <v-text-field 
                type="password"
                v-model="password.value.value"
                label="Password: "
                placeholder="Tu Password"
                bg-color="blue-grey-lighten-5"
                class="mb-4"
                :error-messages="password.errorMessage.value"
            />

            <v-btn
                @click="submit"
                block
                color="indigo-darken-1"
            >
                Iniciar Sesion
            </v-btn>
        </v-form>
    </v-card>
</template>