"use client"
import axios from "axios";
import { useRouter } from "next/navigation";
export default function Buttons({personaId}) {
    const router=useRouter()
    return (
        <div className="flex gap-x-2 justify-end mt-5">
        <button className="text-white bg-red-500 hover:bg-red-700 py-2 px-3 rounded" onClick={async ()=>{
            if(confirm('Seguro quieres eliminar este producto?')){
                console.log('borrando')
                const res=await axios.delete('/api/persona/'+personaId)
                if(res.status==204)
                {
                    router.push('/personas')
                    router.refresh()
                }
                            }
        }}>Eliminar</button>
        <button className="text-white bg-gray-500 hover:bg-gray-700 py-2 px-3 rounded" onClick={()=>{
            router.push('/personas/edit/'+personaId)
        }}>Editar</button>
        </div>
    );
  }
  