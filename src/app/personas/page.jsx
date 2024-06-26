import axios from "axios"
import Link from "next/link"
async function loadPersonas(){
   const {data}= await axios.get('http://localhost:3000/api/persona')

   return data
}

export default async function PersonasPage() {
    const personas=await loadPersonas()

    return (
      <div className="grid gap-4 grid-cols-4" >
        {personas.map(persona=>(
            <Link key={persona.id} className="bg-white rounded-lg border-gray-800 mb-3 p-4 hover:bg-gray-200"
            href={`personas/${persona.id}`}
            >
                <h1 className="text-lg font-bold">{persona.name} {persona.lastName}</h1>
                <h1 className="text-1xl text-slate-600">Finca: {persona.farmName}</h1>
                <p>Total trabajadores: {persona.totalWorkers}</p>
            </Link>

        ))}

      </div>
    );
  }
  