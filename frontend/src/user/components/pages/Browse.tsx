import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { useLocation } from 'react-router-dom'
import * as api from "../../../helpers/api"
import { Loader, Container, SimpleGrid } from '@mantine/core';




const Browse = () => {

    const { id } = useParams()
    const location = useLocation()

    type LocationState = { type: string; };  
    const {type} = location.state as LocationState
   

 
        

/* useEffect(() => {
    testingType()
   
}, []) */

    return (
        <div>
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
        </div>
    )
}

export default Browse
