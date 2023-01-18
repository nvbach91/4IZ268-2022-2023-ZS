import React from 'react'

function TopButtons({setQuery}) {
    const cities=[
        {
            id:1,
            title: "Yerevan"
        },
        {
            id:2,
            title: "Tbilisi"
        },
        {
            id:3,
            title: "Tehran"
        },
        {
            id:4,
            title: "Beijing"
        },
        {
            id:5,
            title: "Prague"
        },
    ]
  return (
    <div className='flex items-center justify-around my-6'>
        {cities.map(city=>(
            <button 
                key={city.id} 
                className='text-white text-lg font-medium'
                onClick={()=>setQuery({q: city.title})
                }
                >{city.title}</button>
        ))}
    </div>
  )
}

export default TopButtons