import { NextResponse } from "next/server";
import {db} from "../../firebase"
import { collection, getDocs, updateDoc,doc, onSnapshot,addDoc }  from "firebase/firestore";

export async function GET() {
    try {
        // Referencia a la colección "persona"
        const q = collection(db, "persona");

        // Obtener los documentos de la colección
        const querySnapshot = await getDocs(q);
        const personas = [];

        // Iterar sobre los documentos y extraer los datos
        querySnapshot.forEach((doc) => {
            personas.push(doc.data());
        });

        console.log("Current cities in CA: ", personas);

        // Devolver respuesta JSON con los datos obtenidos
        return NextResponse.json(personas);

    } catch (error) {
        console.error("Error fetching documents:", error);
        return NextResponse.json({ error: 'Error fetching documents' });
    }
}
export async function POST(request){
    const data=await request.json()
    console.log(data)
    const docRef = await addDoc(collection(db, "persona"), data);
      console.log("Document written with ID: ", docRef.id);
      await updateDoc(doc(db, "persona", docRef.id), {
        id: docRef.id,
      });
    return NextResponse.json('creando persona')   
}