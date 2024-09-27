import React, { useEffect, useState } from 'react'
import { createLazyFileRoute } from '@tanstack/react-router'
import axios from 'axios'

import './App.css'

const HelloWunderdog = () => {
  const [hello, setHello] = useState<string | undefined>(undefined)

  useEffect(() => {
    axios.get<{ hello: string }>('/hello').then((response) => {
      setHello(response.data.hello)
    })
  }, [])

  return (
    <div className="App">
      <h1>wunderdog-starter</h1>
      {hello && <p>Hello: {hello}</p>}
    </div>
  )
}
export const Route = createLazyFileRoute('/hello')({
  component: HelloWunderdog,
})
