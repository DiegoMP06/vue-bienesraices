import {ref} from 'vue'

export default function useLocationMap() {    
    const zoom = ref(15);
    const center = ref([19.3165417,-98.2363151]);

    function pin(e) {
        const ubicacion = e.target.getLatLng();
        center.value = [ubicacion.lat, ubicacion.lng];
    }

    return {
        zoom,
        center,
        pin,
    };
}