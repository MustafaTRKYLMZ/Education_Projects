import React from 'react'


const Country =({person,setFilter}) =>{
    const handleShowClick = () => {
        setFilter(person.name)
    }

    return (
        <div>
            {person.name}<button onClick={handleShowClick}>show</button>
        </div>
        
    )
    
}

export default Country