import { computed, ref } from 'vue';
import {collection, doc, deleteDoc} from 'firebase/firestore';
import {ref as storageRef, deleteObject} from 'firebase/storage';
import {useFirestore, useCollection, useFirebaseStorage} from 'vuefire';

export default function usePropiedades() {
    const storage = useFirebaseStorage();

    const alberca = ref(false);
    const db = useFirestore();
    const propiedadesCollection = useCollection(collection(db, 'propiedades'));

    async function deleteItem(id, urlImage) {
        if(!confirm('¿Deseas Eliminar esta Propiedad?')) return;
        const docRef = doc(db, 'propiedades', id);
        const imageRef = storageRef(storage, urlImage);

        await Promise.all([
            deleteDoc(docRef),
            deleteObject(imageRef)
        ]);
    }

    const propiedadesFiltradas = computed(() => {
        return alberca.value ? propiedadesCollection.value.filter(propiedad => propiedad.alberca) : propiedadesCollection.value;
    });

    return {
        alberca,
        propiedadesCollection,
        deleteItem,
        propiedadesFiltradas,
    };
}