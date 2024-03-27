<script setup>
    defineProps({
        propiedad: {
            required: true,
            type: Object,
        },
        price: {
            required: true,
            type: Function,
        }
    });
</script>

<template>
    <v-col
        cols="12"
        md="4"
    >
        <v-card>
            <v-img 
                :src="propiedad.imagen"
                :height="250"
                cover
            />

            <v-card-title>
                {{ propiedad.titulo }}
            </v-card-title>

            <v-card-text class="text-truncate">
                {{ propiedad.descripcion }}
            </v-card-text>

            <v-card-text class="text-h5 font-weight-bold text-truncate">
                Precio: {{ price(propiedad.precio) }}
            </v-card-text>

            <template v-slot:actions>
                <v-btn 
                    color="info" 
                    block
                    variant="flat"
                    :to="{name: 'propiedad', params: {id: propiedad.id}}"
                >
                    Ver Informacion
                </v-btn>
            </template>
        </v-card>
    </v-col>
</template>