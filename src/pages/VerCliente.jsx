import React from 'react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Spinner from '../components/Spinner'

function VerCliente() {
  const [cliente, setCliente] = useState({})
  const [cargando, setCargando] = useState(true)

  const { id } = useParams()

  useEffect(() => {
    const getClienteAPI = async () => {
      try {
        const url = `http://localhost:4000/clientes/${id}`
        const response = await fetch(url)
        const result = await response.json()

        setCliente(result)
      } catch (error) {
        console.log(error)
      }
      setTimeout(() => {
        setCargando(!cargando)
      }, 1000)
    }

    getClienteAPI()
  }, [])

  return cargando ? (
    <Spinner />
  ) : Object.keys(cliente).length === 0 ? (
    <p>No hay resultados</p>
  ) : (
    <div>
      <h1 className="font-black text-4xl text-blue-900">
        Ver Cliente: {cliente.nombre}
      </h1>
      <p className="mt-3">Información del Cliente</p>
      <p className="text-4xl text-gray-600 mt-10">
        <span className="uppercase font-bold text-gray-800">Cliente:</span>{' '}
        {cliente.nombre}
      </p>
      <p className="text-2xl text-gray-600 mt-4">
        <span className="uppercase font-bold text-gray-800">Email:</span>{' '}
        {cliente.email}
      </p>
      {cliente.telefono && (
        <p className="text-2xl text-gray-600 mt-4">
          <span className="uppercase font-bold text-gray-800">Telefono:</span>{' '}
          {cliente.telefono}
        </p>
      )}

      {cliente.empresa && (
        <p className="text-2xl text-gray-600 mt-4">
          <span className="uppercase font-bold text-gray-800">Empresa:</span>{' '}
          {cliente.empresa}
        </p>
      )}

      {cliente.notas && (
        <p className="text-2xl text-gray-600 mt-4">
          <span className="uppercase font-bold text-gray-800">Notas:</span>{' '}
          {cliente.notas}
        </p>
      )}
    </div>
  )
}

export default VerCliente
