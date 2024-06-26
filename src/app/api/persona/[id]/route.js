import { NextResponse } from "next/server";
import {db} from "../../../firebase"
import { getDoc,doc, deleteDoc, updateDoc}  from "firebase/firestore";
export async function GET(request, {params}){
    try {
        const docRef = doc(db, "persona", params.id);

        // Capturar el snapshot del documento
        const snapshot = await getDoc(docRef);
        if (!snapshot.exists()) {
            console.log('No existe el documento');
            return NextResponse.json({ error: 'Documento no encontrado' }, {
                status:404
            });
        }

        const data = snapshot.data();

        // Devolver respuesta JSON con los datos del documento
        return NextResponse.json(data);

    } catch (error) {
        console.error("Error fetching documento:", error);
        return NextResponse.json({ error: 'Error fetching documento' }, {
            status:500
        });
    }
}
export async function DELETE(request, {params}){
    await deleteDoc(doc(db, "persona", params.id));
    return new Response (null, { status:204})
}
export async function PUT(request, {params}){
    const data = await request.json()
    const personaRef = doc(db, "persona", params.id);
    await updateDoc(personaRef, data);
    return new Response ({"aviso":"actualizado"})
}