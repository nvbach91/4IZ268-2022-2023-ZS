import React, { useState } from 'react'
import { UilSearch, UilLocationPoint } from '@iconscout/react-unicons'
import { toast } from 'react-toastify';

function Inputs({setQuery, units, setUnits}) {
  const[city, setCity]=useState('');

  const handleSearchClick = () =>{
    if(city !== '') setQuery({q: city})
  }

  const handleUnitsChange=(e)=>{
    const selectedUnit=e.currentTarget.name;
    if(units !== selectedUnit) setUnits(selectedUnit);
  }
const handleLocationClick =()=>{
  if(navigator.geolocation){
    toast.info(`Fetching users location`);
    navigator.geolocation.getCurrentPosition((position)=>{
      toast.success('Location fetched!')
      let lat = position.coords.latitude
      let lon = position.coords.longitude

      setQuery({
        lat,
        lon,
      })
    })
  }
}
  return (
    <div className='flex flex-row justify-center my-6'>
        <div className='flex flex-row w-3/4 items-center justify-center space-x-4'>
            <input 
                type="text" 
                className='text-xl font-light p-2 w-full shadow-xl focus:outline-none capitalize placeholder:lowercase'
                placeholder='Search for city...'
                value={city}
                onChange={(e)=>setCity(e.currentTarget.value)}
                />
                <UilSearch
                  size={25} 
                  className="text-white cursor-pointer transition ease-out hover:scale-125"
                  onClick={handleSearchClick}/>
                <UilLocationPoint 
                size={25} 
                className="text-white cursor-pointer transition ease-out hover:scale-125"
                onClick={handleLocationClick}/>

                <div className='flex flex-row w-1/4 items-center justify-center'>
                    <button 
                        name="metric" 
                        className='text-xl text-white font-light transition ease-out hover:scale-125'
                        onClick={handleUnitsChange} 
                        >°C</button>
                    <p className='text-xl text-white mx-1'>|</p>
                    <button 
                        name="imperial" 
                        className='text-xl text-white font-light transition ease-out hover:scale-125'
                        onClick={handleUnitsChange} 
                        >°F</button>
                </div>
        </div>
    </div>
  )
}

export default Inputs