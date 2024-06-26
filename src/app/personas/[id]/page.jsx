import axios from "axios";
import Buttons from "./buttons";
async function  loadpersona (personaId){
    console.log(personaId)
    const {data}= await axios.get('http://localhost:3000/api/persona/'+personaId)
    return data
}

export default async function PersonaPage({params}) {
    console.log(params.id)
    const persona= await loadpersona(params.id)
    return (
        <section className="flex justify-center items-center">
     <div className="p-6 bg-white">
  <p><span className="font-bold">Nombre:</span> {persona.name}</p>
  <p><span className="font-bold">Apellido:</span> {persona.lastName}</p>
  <p><span className="font-bold">Cédula de Identidad (CI):</span> {persona.ci}</p>
  <p><span className="font-bold">Fecha de Nacimiento:</span> {persona.dateOfBirth}</p>
  <p><span className="font-bold">Tiene RUC:</span> {persona.hasRuc ? "Sí" : "No"}</p>
  <p><span className="font-bold">RUC:</span> {persona.rucNumber}</p>
  <p><span className="font-bold">Género:</span> {persona.gender}</p>
  <p><span className="font-bold">Tiene finca:</span> {persona.hasFarm ? "Sí" : "No"}</p>
  <p><span className="font-bold">Hectáreas de la finca:</span> {persona.farmHa}</p>
  <p><span className="font-bold">Nombre de la finca:</span> {persona.farmName}</p>
  <p><span className="font-bold">Cultivos:</span></p>
  {persona.crops.map((cultivos, index) => (
    <div key={index} className="ml-5">
      <p>{cultivos}</p>
    </div>
  ))}
  <h1 className="font-bold">Familia</h1>
  {persona.family.map(familia => (
    <div key={familia.ci} className="ml-5">
      <p><span className="font-bold">Nombre:</span> {familia.name}</p>
      <p><span className="font-bold">Apellido:</span> {familia.lastName}</p>
      <p><span className="font-bold">Cédula de Identidad (CI):</span> {familia.ci}</p>
    </div>
  ))}
  <p><span className="font-bold">Tiene trabajadores:</span> {persona.hasWorkers ? "Sí" : "No"}</p>
  <p><span className="font-bold">Número total de trabajadores:</span> {persona.totalWorkers}</p>
  <p><span className="font-bold">Número de trabajadores hombres:</span> {persona.menWorkers}</p>
  <p><span className="font-bold">Número de trabajadoras mujeres:</span> {persona.womanWorkers}</p>
  <p><span className="font-bold">Número de trabajadores mayores de 18 años:</span> {persona.over18Workers}</p>
  <p><span className="font-bold">Número de trabajadores menores de 18 años:</span> {persona.under18Workers}</p>
  <p><span className="font-bold">Ocupación de los trabajadores menores de edad:</span> {persona.minorWorkersOcuppacion}</p>
  <p><span className="font-bold">Tiene trabajadoras embarazadas:</span> {persona.hasPregnandWorkers ? "Sí" : "No"}</p>
  <p><span className="font-bold">Número de trabajadoras embarazadas:</span> {persona.pregnandWorkers}</p>
  <p><span className="font-bold">Ocupación de las trabajadoras embarazadas:</span> {persona.pregnandWorkersOcuppacion}</p>

        <Buttons personaId={persona.id}/>
      </div>
      </section>
    );
  }
  