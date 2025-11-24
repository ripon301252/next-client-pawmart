"use client";

import axios from "axios"
import { useEffect, useState } from "react"


export const useApps = () => {
    const [apps, setApps] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(()=>{
        setLoading(true)
        axios('/easy.json')
            .then(api => setApps(api.data))
            .catch(err => setError(err))
            .finally(() => setLoading(false))
    }, [])

    return{apps, loading, error}
}