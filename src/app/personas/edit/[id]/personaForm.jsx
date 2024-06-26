"use client"
import { useRef, useState, useEffect } from "react";

import { useParams, useRouter} from "next/navigation";
import axios from "axios";
import { } from "next/router";

export default function PersonaForm() {
    const params =useParams()
    const router=useRouter()
    useEffect(()=>{
        if(params.id){
          axios.get('http://localhost:3000/api/persona/'+params.id).then(res=>{
            console.log(res.data)
            
            setPersona({
              name:res.data.name,
              lastName:res.data.lastName,
              ci:res.data.ci,
              dateOfBirth:res.data.dateOfBirth,
              hasRuc:res.data.hasRuc,
              rucNumber:res.data.rucNumber,
              gender:res.data.gender,
              hasFarm: res.data.hasFarm,
              farmHa:res.data.farmHa,
              farmName:res.data.farmName,
              crops:res.data.crops,
              family:res.data.family,
              hasWorkers:res.data.hasWorkers,
              totalWorkers:res.data.totalWorkers,
              menWorkers:res.data.menWorkers,
              womanWorkers:res.data.womanWorkers,
              over18Workers:res.data.over18Workers,
              under18Workers:res.data.under18Workers,
              minorWorkersOcuppacion:res.data.minorWorkersOcuppacion,
              hasPregnandWorkers:res.data.hasPregnandWorkers,
              pregnandWorkers:res.data.pregnandWorkers,
              pregnandWorkersOcuppacion:res.data.pregnandWorkersOcuppacion
    
            })
          })
        }
      },[])

     const [persona, setPersona]=useState({
    name:"",
    lastName:"",
    ci:"",
    dateOfBirth:"",
    hasRuc:"",
    rucNumber:"",
    gender:"",
    hasFarm:"",
    farmHa:"",
    farmName:"",
    crops:["",""],
    family:[{ name: "", lastName: "", ci: "" }],
    hasWorkers:"",
    totalWorkers:"",
    menWorkers:"",
    womanWorkers:"",
    over18Workers:"",
    under18Workers:"",
    minorWorkersOcuppacion:"",
    hasPregnandWorkers:"",
    pregnandWorkers:"",
    pregnandWorkersOcuppacion:""

  })
    const form=useRef(null)

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const path = name.split('.');
      
        setPersona((prevState) => {
          // Si el nombre del campo contiene una ruta (como 'family.0.name')
          if (path.length > 1) {
            const newPersona = { ...prevState };
            let current = newPersona;
      
            // Itera sobre la ruta para llegar al campo anidado
            for (let i = 0; i < path.length - 1; i++) {
              current = current[path[i]];
            }
      
            // Actualiza el valor del campo anidado
            current[path[path.length - 1]] = type === "checkbox" ? checked : value;
      
            return newPersona;
          } else {
            // Si el nombre del campo no contiene una ruta, actualiza el estado de manera normal
            return {
              ...prevState,
              [name]: type === "checkbox" ? checked : value,
            };
          }
        });
      };

    const handleSubmit=async (e)=>{
        e.preventDefault()

        if(!params.id){
          const res= await axios.post('/api/persona', persona);
          console.log(res)
          form.current.reset()
        }
        else{
            const res= await axios.put('/api/persona/'+params.id, persona)
            console.log(res)

        }
        router.refresh()
        router.push('/personas')
        router.refresh()
    }
    
   
      const [hasRuc, setHasRuc] = useState(persona.hasRuc);
      const handleChecked = (event) => {
        console.log(e)
        setHasRuc(event.target.checked);
      };
    

    return (
        <form ref={form} className='bg-white shadow-md rounded-md px-8 pt-6 pb-8 mb-4' onSubmit={handleSubmit}>
        <label  className='block text-gray-700 text-sm font-bold mb-2'  htmlFor="name">Nombre:</label>
        <input value={persona.name} name="name" className='shadow appearance-none border rounded w-full py-2 px-3' type="text" placeholder="nombre"  onChange={handleChange}></input>
        <label className='block text-gray-700 text-sm font-bold mb-2'  htmlFor="lastName">Apellido:</label>
        <input value={persona.lastName} name="lastName" className='shadow appearance-none border rounded w-full py-2 px-3'   type="text" placeholder="Apellido" onChange={handleChange} ></input>
        <label className='block text-gray-700 text-sm font-bold mb-2'  htmlFor="ci">ci:</label>
        <input value={persona.ci} name="ci" className='shadow appearance-none border rounded w-full py-2 px-3' type="text" placeholder="ci" onChange={handleChange} ></input>
        <label className='block text-gray-700 text-sm font-bold mb-2 mt-2'  htmlFor="dateOfBirth">Fecha de Nacimiento</label>
        <input value={persona.dateOfBirth} name="dateOfBirth" className='shadow appearance-none border rounded w-full py-2 px-3 mt-2'  type="date" placeholder="Fecha de Nacimiento" onChange={handleChange} />
        <label className='block text-gray-700 text-sm font-bold mb-2 mt-2' htmlFor="hasRuc">¿Tiene RUC?</label>
        <input 
        className='block text-gray-700 text-sm font-bold mb-2 mt-2' 
          type="checkbox" 
          name="hasRuc"
          checked={persona.hasRuc} // Vincula el estado con el valor del checkbox
          onChange={handleChange} // Asegúrate de pasar el evento correctamente
        />
         <label className='block text-gray-700 text-sm font-bold mb-2 mt-2' htmlFor="rucNumber">Número de RUC</label>
        <input value={persona.rucNumber}
            className='shadow appearance-none border rounded w-full py-2 px-3 mt-2'
            name="rucNumber"
              placeholder="Número de RUC" 
            onChange={handleChange}/>
        <label className='block text-gray-700 text-sm font-bold mb-2 mt-2'  htmlFor="gender">Género</label>
        <select name="gender" value={persona.gender} className='shadow appearance-none border rounded w-full py-2 px-3 mt-2' onChange={handleChange}>
            <option value="">Seleccionar</option>
            <option value="Hombre">Hombre</option>
            <option value="Mujer">Mujer</option>
        </select>
        
        
        <label  className='block text-gray-700 text-sm font-bold mb-2 mt-2'  htmlFor="hasFarm">¿Tiene finca?</label>
        <input  className='block text-gray-700 text-sm font-bold mb-2 mt-2'  type="checkbox" 
          name="hasFarm"
          checked={persona.hasFarm} // Vincula el estado con el valor del checkbox
          onChange={handleChange} //
         />

         <label className='block text-gray-700 text-sm font-bold mb-2 mt-2'  htmlFor="farmHa" >Hectáreas de la finca</label>
        <input
        
          value={persona.farmHa}
          className='shadow appearance-none border rounded w-full py-2 px-3 mt-2'
          type="number"
          step="0.1"  
          name="farmHa"
          placeholder="Hectáreas de la finca"
          onChange={handleChange}
        /> 

        <label className='block text-gray-700 text-sm font-bold mb-2 mt-2'  htmlFor="farmName">Nombre de la finca</label>
        <input   value={persona.farmName} className='shadow appearance-none border rounded w-full py-2 px-3 mt-2' name="farmName" placeholder="Nombre de la finca" onChange={handleChange}/>

        <label className='block text-gray-700 text-sm font-bold mb-2 mt-2'  htmlFor="crops">Cultivos</label>
        <input  value={persona.crops[0]} className='shadow appearance-none border rounded w-full py-2 px-3 mt-2' name="crops.0" placeholder="Cultivos" onChange={handleChange} />
        <input  value={persona.crops[1]}  className='shadow appearance-none border rounded w-full py-2 px-3 mt-2' name="crops.1" placeholder="Cultivos" onChange={handleChange} />

        <label className='block text-gray-700 text-sm font-bold mb-2 mt-2' htmlFor="family">Familia</label>
        <div>
          <label  className='block text-gray-700 text-sm font-bold mb-2 ml-4 mt-2' htmlFor="familyName">Nombre del familiar</label>
          <input value={persona.family[0].name} className='shadow appearance-none border rounded w-full py-2 px-3  ml-4 mt-2' name="family.0.name" placeholder="Nombre del familiar" onChange={handleChange}/>
          

          <label  className='block text-gray-700 text-sm font-bold mb-2  ml-4 mt-2' htmlFor="familyLastName">Apellido del familiar</label>
          <input value={persona.family[0].lastName}  className='shadow appearance-none border rounded w-full py-2 px-3  ml-4 mt-2' name="family.0.lastName" placeholder="Apellido del familiar" onChange={handleChange} />
      

          <label  className='block text-gray-700 text-sm font-bold mb-2  ml-4 mt-2' htmlFor="familyCi">Cédula del familiar</label>
          <input value={persona.family[0].ci}  className='shadow appearance-none border rounded w-full py-2 px-3  ml-4 mt-2' name="family.0.ci" placeholder="Cédula del familiar" onChange={handleChange} />
          
        </div>

        <label className='block text-gray-700 text-sm font-bold mb-2 mt-2 mt-2'  htmlFor="hasWorkers">¿Tiene trabajadores?</label>
        <input className='block text-gray-700 text-sm font-bold mb-2 mt-2 mt-2' type="checkbox" name="hasWorkers" 
        checked={persona.hasWorkers}
        onChange={handleChange}/>

        <label  className='block text-gray-700 text-sm font-bold mb-2 mt-2'  htmlFor="totalWorkers">Número total de trabajadores</label>
        <input value={persona.totalWorkers} // Mostrar la suma total
         className='shadow appearance-none border rounded w-full py-2 px-3 mt-2' type="number" name="totalWorkers" placeholder="Número total de trabajadores" onChange={handleChange} />

        <label  className='block text-gray-700 text-sm font-bold mb-2 mt-2' htmlFor="menWorkers">Número de trabajadores hombres</label>
        <input  value={persona.menWorkers} className='shadow appearance-none border rounded w-full py-2 px-3 mt-2' type="number" name="menWorkers" placeholder="Número de trabajadores hombres" onChange={handleChange}/>
        
        <label  className='block text-gray-700 text-sm font-bold mb-2 mt-2' htmlFor="womanWorkers">Número de trabajadoras mujeres</label>
        <input value={persona.womanWorkers} className='shadow appearance-none border rounded w-full py-2 px-3 mt-2' type="number" name="womanWorkers" placeholder="Número de trabajadoras mujeres" onChange={handleChange} />
        

        <label  className='block text-gray-700 text-sm font-bold mb-2 mt-2' htmlFor="over18Workers">Número de trabajadores mayores de 18 años</label>
        <input value={persona.over18Workers} className='shadow appearance-none border rounded w-full py-2 px-3 mt-2' type="number" name="over18Workers" placeholder="Número de trabajadores mayores de 18 años" onChange={handleChange} />

        <label className='block text-gray-700 text-sm font-bold mb-2 mt-2' htmlFor="under18Workers">Número de trabajadores menores de 18 años</label>
        <input value={persona.under18Workers} className='shadow appearance-none border rounded w-full py-2 px-3 mt-2' type="number" name="under18Workers" placeholder="Número de trabajadores menores de 18 años" onChange={handleChange} />
    

        <label className='block text-gray-700 text-sm font-bold mb-2 mt-2' htmlFor="minorWorkersOcuppacion">Ocupación de los trabajadores menores de edad</label>
        <input value={persona.minorWorkersOcuppacion} className='shadow appearance-none border rounded w-full py-2 px-3 mt-2' name="minorWorkersOcuppacion" placeholder="Ocupación de los trabajadores menores de edad" onChange={handleChange} />
        
        <label  className='block text-gray-700 text-sm font-bold mb-2 mt-2' htmlFor="hasPregnandWorkers">¿Tiene trabajadoras embarazadas?</label>
        <input  className='block text-gray-700 text-sm font-bold mb-2 mt-2' type="checkbox"   checked={persona.hasPregnandWorkers} name="hasPregnandWorkers"
        onChange={handleChange} />
     

        <label  className='block text-gray-700 text-sm font-bold mb-2 mt-2' htmlFor="pregnandWorkers">Número de trabajadoras embarazadas</label>
        <input value={persona.pregnandWorkers} className='shadow appearance-none border rounded w-full py-2 px-3 mt-2' type="number" name="pregnandWorkers" placeholder="Número de trabajadoras embarazadas" onChange={handleChange}/>

        <label  className='block text-gray-700 text-sm font-bold mb-2 mt-2' htmlFor="pregnandWorkersOcuppacion">Ocupación de las trabajadoras embarazadas</label>
        <input value={persona.pregnandWorkersOcuppacion} className='shadow appearance-none border rounded w-full py-2 px-3 mt-2' name="pregnandWorkersOcuppacion" placeholder="Ocupación de las trabajadoras embarazadas" onChange={handleChange}/>
        <div className="flex-end">

        <button type="submit" className='bg-blue-500 hover-:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5'>Actualizar</button>

        </div>    

       
    </form>

    );
  }
  