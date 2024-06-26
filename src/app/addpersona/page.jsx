"use client"
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from "axios"
import { useRouter } from 'next/navigation';

const calculateAge = (birthDate) => {
  const today = new Date();
  const birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  return age;
};

const validateCif = (numero) => {
  if (!numero || numero.trim().length === 0) {
    return false; // Retorna falso si el número es vacío o nulo
  }
  var suma = 0;
  var residuo = 0;
  var pri = false;
  var pub = false;
  var nat = false;
  var numeroProvincias = 22;
  var modulo = 11;
  var ok = 1;

  for (let i = 0; i < numero.length && ok == 1; i++) {
    var n = parseInt(numero.charAt(i));
    if (isNaN(n)) ok = 0;
  }

  if (ok == 0) {
    return false;
  }

  if (numero.length < 10) {
    return false;
  }

  var provincia = numero.substr(0, 2);
  if (provincia < 1 || provincia > numeroProvincias) {
    return false;
  }

  var d1 = numero.substr(0, 1);
  var d2 = numero.substr(1, 1);
  var d3 = numero.substr(2, 1);
  var d4 = numero.substr(3, 1);
  var d5 = numero.substr(4, 1);
  var d6 = numero.substr(5, 1);
  var d7 = numero.substr(6, 1);
  var d8 = numero.substr(7, 1);
  var d9 = numero.substr(8, 1);
  var d10 = numero.substr(9, 1);

  if (d3 == 7 || d3 == 8) {
    return false;
  }

  if (d3 < 6) {
    nat = true;
    var p1 = d1 * 2; if (p1 >= 10) p1 -= 9;
    var p2 = d2 * 1; if (p2 >= 10) p2 -= 9;
    var p3 = d3 * 2; if (p3 >= 10) p3 -= 9;
    var p4 = d4 * 1; if (p4 >= 10) p4 -= 9;
    var p5 = d5 * 2; if (p5 >= 10) p5 -= 9;
    var p6 = d6 * 1; if (p6 >= 10) p6 -= 9;
    var p7 = d7 * 2; if (p7 >= 10) p7 -= 9;
    var p8 = d8 * 1; if (p8 >= 10) p8 -= 9;
    var p9 = d9 * 2; if (p9 >= 10) p9 -= 9;
    modulo = 10;
  } else if (d3 == 6) {
    pub = true;
    p1 = d1 * 3;
    p2 = d2 * 2;
    p3 = d3 * 7;
    p4 = d4 * 6;
    p5 = d5 * 5;
    p6 = d6 * 4;
    p7 = d7 * 3;
    p8 = d8 * 2;
    p9 = 0;
  } else if (d3 == 9) {
    pri = true;
    p1 = d1 * 4;
    p2 = d2 * 3;
    p3 = d3 * 2;
    p4 = d4 * 7;
    p5 = d5 * 6;
    p6 = d6 * 5;
    p7 = d7 * 4;
    p8 = d8 * 3;
    p9 = d9 * 2;
  }

  suma = p1 + p2 + p3 + p4 + p5 + p6 + p7 + p8 + p9;
  residuo = suma % modulo;
  var digitoVerificador = residuo == 0 ? 0 : modulo - residuo;

  if (pub == true) {
    if (digitoVerificador != d9) {
      return false;
    }
    if (numero.substr(9, 4) != '0001') {
      return false;
    }
  } else if (pri == true) {
    if (digitoVerificador != d10) {
      return false;
    }
    if (numero.substr(10, 3) != '001') {
      return false;
    }
  } else if (nat == true) {
    if (digitoVerificador != d10) {
      return false;
    }
    if (numero.length > 10 && numero.substr(10, 3) != '001') {
      return false;
    }
  }
  return true;
};

const schema = z.object({
  name: z.string().min(1, "Nombre es requerido"),
  lastName: z.string().min(1, "Apellido es requerido"),
  ci: z.string().min(1, "Cédula de Identidad es requerida").refine((ci) => validateCif(ci), {
    message: "Cédula de Identidad inválida",
  }),
  dateOfBirth: z
      .string()
      .min(1, "Fecha de Nacimiento es requerida")
      .refine((date) => calculateAge(date) >= 18, {
        message: "Debe ser mayor de 18 años",
      }),
  hasRuc: z.boolean(),
  rucNumber: z.string().optional().refine((ci) => validateCif(ci), {
    message: "RUC inválido",
  }),
  gender: z.enum(["Hombre", "Mujer"], "Seleccione un género"),
  hasFarm: z.boolean(),
  farmHa: z.string().optional(),
  farmName: z.string().optional(),
  crops: z.array(z.string()).optional(),
  family: z.array(
    z.object({
      name: z.string().min(1, "Nombre es requerido"),
      lastName: z.string().min(1, "Apellido es requerido"),
      ci: z.string().min(1, "Cédula de Identidad es requerida").refine((ci) => validateCif(ci), {
        message: "Cédula de Identidad inválida",
      }),
    })
  ).min(1, "Debe agregar al menos un miembro de la familia"),
  hasWorkers: z.boolean(),
  totalWorkers: z.string().optional(),
  menWorkers: z.string().optional(),
  womanWorkers: z.string().optional(),
  over18Workers: z.string().optional(),
  under18Workers: z.string().optional(),
  minorWorkersOcuppacion: z.string().optional(),
  hasPregnandWorkers: z.boolean(),
  pregnandWorkers: z.string().optional(),
  pregnandWorkersOcuppacion: z.string().optional(),
}).superRefine((data, ctx) => {
  if (data.hasFarm) {
    console.log(data.hasFarm)
    if (!data.farmHa) {
      ctx.addIssue({
        path: ['farmHa'],
        message: 'Hectáreas de la finca es requerido',
      });
    }
    if (!data.farmName) {
      ctx.addIssue({
        path: ['farmName'],
        message: 'Nombre de la finca es requerido',
      });
    }
    if (!data.crops || data.crops.length === 0) {
      ctx.addIssue({
        path: ['crops'],
        message: 'Cultivos es requerido',
      });
    }
    if (data.hasPregnandWorkers && data.womanWorkers && data.pregnandWorkers) {
      const womanWorkers = parseInt(data.womanWorkers);
      const pregnandWorkers = parseInt(data.pregnandWorkers);
  
      if (pregnandWorkers > womanWorkers) {
        ctx.addIssue({
          path: ['pregnandWorkers'],
          message: 'El número de trabajadoras embarazadas no puede ser mayor que el número de mujeres trabajadoras.',
        });
      }
      if (data.under18Workers && parseInt(data.under18Workers) > 0 && !data.minorWorkersOcuppacion) {
        ctx.addIssue({
          path: ['minorWorkersOcuppacion'],
          message: 'La ocupación de los trabajadores menores de 18 años es obligatoria.',
        });
      }
      if (pregnandWorkers > 0 && !data.pregnandWorkersOcuppacion) {
        ctx.addIssue({
          path: ['pregnandWorkersOcuppacion'],
          message: 'La ocupación de las trabajadoras embarazadas es obligatoria.',
        });
      }
    }
  }
});

export default function AddPersona() {
  const router =useRouter()
  const { register, handleSubmit,getValues, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async data => {
    data.totalWorkers = totalWorkers; 
    data.farmHa=parseFloat(data.farmHa)
    data.menWorkers=parseInt(data.menWorkers)
    data.womanWorkers=parseInt(data.womanWorkers)
    data.over18Workers=parseInt(data.over18Workers)
    data.under18Workers=parseInt(data.under18Workers)
    data.pregnandWorkers=parseInt(data.pregnandWorkers)

    const res=await axios.post('api/persona',data)
    router.refresh()
    router.push('/personas')
    router.refresh()

  };
  const [hasRuc, setHasRuc] = useState(false);
  const [ hasFarm, setHasFarm] = useState(false);
  const [ hasWorkers, setHasWorkers] = useState(false);
  const [hasPregnandWorkers, setHasPregnandWorkers]=useState(false)
  const [totalWorkers, setTotalWorkers] = useState(0); // Estado para mantener la suma total

  // Función para manejar el cambio en los campos de suma
  const handleSumChange = () => {
    const menWorkers = parseInt(getValues('menWorkers')) || 0;
    const womanWorkers = parseInt(getValues('womanWorkers')) || 0;
    const over18Workers = parseInt(getValues('over18Workers')) || 0;
    const under18Workers = parseInt(getValues('under18Workers')) || 0;
   

    const sum = menWorkers + womanWorkers + over18Workers + under18Workers;
    setTotalWorkers(sum);
  };

  return (
    <div className='flex justify-center items-center'>
      <form className='bg-white shadow-md rounded-md px-8 pt-6 pb-8 mb-4' onSubmit={handleSubmit(onSubmit)}>
        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="name">Nombre</label>
        <input className='shadow appearance-none border rounded w-full py-2 px-3' {...register('name')} placeholder="Nombre" />
        {errors.name && <span>{errors.name.message}</span>}

        <label className='block text-gray-700 text-sm font-bold mb-2 mt-2'   htmlFor="lastName">Apellido</label>
        <input className='shadow appearance-none border rounded w-full py-2 px-3' {...register('lastName')} placeholder="Apellido" />
        {errors.lastName && <span>{errors.lastName.message}</span>}

        <label  className='block text-gray-700 text-sm font-bold mb-2 mt-2'  htmlFor="ci">Cédula de Identidad</label>
        <input className='shadow appearance-none border rounded w-full py-2 px-3 mt-2' {...register('ci')} placeholder="Cédula de Identidad" />
        {errors.ci && <span>{errors.ci.message}</span>}

        <label className='block text-gray-700 text-sm font-bold mb-2 mt-2'  htmlFor="dateOfBirth">Fecha de Nacimiento</label>
        <input className='shadow appearance-none border rounded w-full py-2 px-3 mt-2' type="date"  {...register('dateOfBirth')} placeholder="Fecha de Nacimiento" />
        {errors.dateOfBirth && <span>{errors.dateOfBirth.message}</span>}

        <label className='block text-gray-700 text-sm font-bold mb-2 mt-2' htmlFor="hasRuc">¿Tiene RUC?</label>
        <input className='block text-gray-700 text-sm font-bold mb-2 mt-2' 
          type="checkbox" 
          {...register('hasRuc')}
          checked={hasRuc}
          onChange={(e) => setHasRuc(e.target.checked)} 
        />
        {errors.hasRuc && <span>{errors.hasRuc.message}</span>}

        <label className='block text-gray-700 text-sm font-bold mb-2 mt-2' htmlFor="rucNumber">Número de RUC</label>
        <input 
       className='shadow appearance-none border rounded w-full py-2 px-3 mt-2'
          {...register('rucNumber')} 
          placeholder="Número de RUC" 
          disabled={!hasRuc} 
        />
        {errors.rucNumber && <span>{errors.rucNumber.message}</span>}

        <label className='block text-gray-700 text-sm font-bold mb-2 mt-2'  htmlFor="gender">Género</label>
        <select {...register('gender')}>
          <option value="Hombre">Hombre</option>
          <option value="Mujer">Mujer</option>
        </select>
        {errors.gender && <span>{errors.gender.message}</span>}

        <label  className='block text-gray-700 text-sm font-bold mb-2 mt-2'  htmlFor="hasFarm">¿Tiene finca?</label>
        <input   className='block text-gray-700 text-sm font-bold mb-2 mt-2'  type="checkbox" {...register('hasFarm')} 
        checked={hasFarm}
        onChange={(e) => setHasFarm(e.target.checked)} />
        {errors.hasFarm && <span>{errors.hasFarm.message}</span>}

        <label className='block text-gray-700 text-sm font-bold mb-2 mt-2'  htmlFor="farmHa" >Hectáreas de la finca</label>
        <input
          disabled={!hasFarm}
          className='shadow appearance-none border rounded w-full py-2 px-3 mt-2'
          type="number"
          step="0.1"  
          {...register('farmHa')}
          placeholder="Hectáreas de la finca"
        />
        {errors.farmHa && <span>{errors.farmHa.message}</span>}

        <label className='block text-gray-700 text-sm font-bold mb-2 mt-2'  htmlFor="farmName">Nombre de la finca</label>
        <input disabled={!hasFarm}  className='shadow appearance-none border rounded w-full py-2 px-3 mt-2' {...register('farmName')} placeholder="Nombre de la finca" />
        {errors.farmName && <span>{errors.farmName.message}</span>}
  

        <label className='block text-gray-700 text-sm font-bold mb-2 mt-2'  htmlFor="crops">Cultivos</label>
        <input disabled={!hasFarm}  className='shadow appearance-none border rounded w-full py-2 px-3 mt-2' {...register('crops.0')} placeholder="Cultivos" />
        <input disabled={!hasFarm}  className='shadow appearance-none border rounded w-full py-2 px-3 mt-2' {...register('crops.1')} placeholder="Cultivos" />
        {errors.crops && <span>{errors.crops.message}</span>}

        <label className='block text-gray-700 text-sm font-bold mb-2 mt-2' htmlFor="family">Familia</label>
        <div>
          <label  className='block text-gray-700 text-sm font-bold mb-2 ml-4 mt-2' htmlFor="familyName">Nombre del miembro</label>
          <input className='shadow appearance-none border rounded w-full py-2 px-3  ml-4 mt-2' {...register('family.0.name')} placeholder="Nombre del miembro" />
          {errors.family?.[0]?.name && <span>{errors.family[0].name.message}</span>}

          <label  className='block text-gray-700 text-sm font-bold mb-2  ml-4 mt-2' htmlFor="familyLastName">Apellido del miembro</label>
          <input className='shadow appearance-none border rounded w-full py-2 px-3  ml-4 mt-2' {...register('family.0.lastName')} placeholder="Apellido del miembro" />
          {errors.family?.[0]?.lastName && <span>{errors.family[0].lastName.message}</span>}

          <label  className='block text-gray-700 text-sm font-bold mb-2  ml-4 mt-2' htmlFor="familyCi">Cédula del miembro</label>
          <input className='shadow appearance-none border rounded w-full py-2 px-3  ml-4 mt-2' {...register('family.0.ci')} placeholder="Cédula del miembro" />
          {errors.family?.[0]?.ci && <span>{errors.family[0].ci.message}</span>}
        </div>

        <label className='block text-gray-700 text-sm font-bold mb-2 mt-2 mt-2'  htmlFor="hasWorkers">¿Tiene trabajadores?</label>
        {errors.hasWorkers && <span>{errors.hasWorkers.message}</span>}

        <input className='block text-gray-700 text-sm font-bold mb-2 mt-2 mt-2' type="checkbox" {...register('hasWorkers')} 
          checked={hasWorkers}
          onChange={(e) => setHasWorkers(e.target.checked)} 

        />
        <label  className='block text-gray-700 text-sm font-bold mb-2 mt-2'  htmlFor="totalWorkers">Número total de trabajadores</label>
        <input value={totalWorkers} // Mostrar la suma total
          disabled={!hasWorkers} className='shadow appearance-none border rounded w-full py-2 px-3 mt-2' type="number" {...register('totalWorkers')} placeholder="Número total de trabajadores" onChange={() => handleSumChange()} />
        {errors.totalWorkers && <span>{errors.totalWorkers.message}</span>}

       
        <label  className='block text-gray-700 text-sm font-bold mb-2 mt-2' htmlFor="menWorkers">Número de trabajadores hombres</label>
        <input  disabled={!hasWorkers} className='shadow appearance-none border rounded w-full py-2 px-3 mt-2' type="number" {...register('menWorkers')} placeholder="Número de trabajadores hombres" onBlur={() => handleSumChange()}/>
        {errors.menWorkers && <span>{errors.menWorkers.message}</span>}

        <label  className='block text-gray-700 text-sm font-bold mb-2 mt-2' htmlFor="womanWorkers">Número de trabajadoras mujeres</label>
        <input disabled={!hasWorkers} className='shadow appearance-none border rounded w-full py-2 px-3 mt-2' type="number" {...register('womanWorkers')} placeholder="Número de trabajadoras mujeres" onBlur={() => handleSumChange()} />
        {errors.womanWorkers && <span>{errors.womanWorkers.message}</span>}

        <label  className='block text-gray-700 text-sm font-bold mb-2 mt-2' htmlFor="over18Workers">Número de trabajadores mayores de 18 años</label>
        <input disabled={!hasWorkers} className='shadow appearance-none border rounded w-full py-2 px-3 mt-2' type="number" {...register('over18Workers')} placeholder="Número de trabajadores mayores de 18 años" onBlur={() => handleSumChange()} />
        {errors.over18Workers && <span>{errors.over18Workers.message}</span>}

        <label className='block text-gray-700 text-sm font-bold mb-2 mt-2' htmlFor="under18Workers">Número de trabajadores menores de 18 años</label>
        <input disabled={!hasWorkers} className='shadow appearance-none border rounded w-full py-2 px-3 mt-2' type="number" {...register('under18Workers')} placeholder="Número de trabajadores menores de 18 años" onBlur={() => {
          handleSumChange();
         
        }} />
        {errors.under18Workers && <span>{errors.under18Workers.message}</span>}

        <label className='block text-gray-700 text-sm font-bold mb-2 mt-2' htmlFor="minorWorkersOcuppacion">Ocupación de los trabajadores menores de edad</label>
        <input disabled={!hasWorkers} className='shadow appearance-none border rounded w-full py-2 px-3 mt-2' {...register('minorWorkersOcuppacion')} placeholder="Ocupación de los trabajadores menores de edad" onBlur={() => handleSumChange()} />
        {errors.minorWorkersOcuppacion && <span>{errors.minorWorkersOcuppacion.message}</span>}

        <label  className='block text-gray-700 text-sm font-bold mb-2 mt-2' htmlFor="hasPregnandWorkers">¿Tiene trabajadoras embarazadas?</label>
        <input disabled={!hasWorkers} className='block text-gray-700 text-sm font-bold mb-2 mt-2' type="checkbox" {...register('hasPregnandWorkers')}  checked={hasPregnandWorkers}
          onChange={(e) => setHasPregnandWorkers(e.target.checked)}   />
        {errors.hasPregnandWorkers && <span>{errors.hasPregnandWorkers.message}</span>}

        <label  className='block text-gray-700 text-sm font-bold mb-2 mt-2' htmlFor="pregnandWorkers">Número de trabajadoras embarazadas</label>
        <input disabled={!hasPregnandWorkers} className='shadow appearance-none border rounded w-full py-2 px-3 mt-2' type="number" {...register('pregnandWorkers')} placeholder="Número de trabajadoras embarazadas"/>
        {errors.pregnandWorkers && <span>{errors.pregnandWorkers.message}</span>}

        <label  className='block text-gray-700 text-sm font-bold mb-2 mt-2' htmlFor="pregnandWorkersOcuppacion">Ocupación de las trabajadoras embarazadas</label>
        <input disabled={!hasPregnandWorkers} className='shadow appearance-none border rounded w-full py-2 px-3 mt-2' {...register('pregnandWorkersOcuppacion')} placeholder="Ocupación de las trabajadoras embarazadas" />
        {errors.pregnandWorkersOcuppacion && <span>{errors.pregnandWorkersOcuppacion.message}</span>}
        <div>
        <button type="submit" className='bg-blue-500 hover-:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5'>Enviar</button>
        </div>
        
      </form>
    </div>
  );
}