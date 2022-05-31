import { React, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Formulario from '../components/Formulario'

function EditarCliente() {
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
      setCargando(!cargando)
    }

    getClienteAPI()
  }, [])

  return (
    <>
      <h1 className="font-black text-4xl text-blue-900">Editar Cliente</h1>
      <p className="mt-3 font-bold">
        Utiliza este formulario para editar el cliente
      </p>
      {cliente?.nombre ? (
        <Formulario cliente={cliente} cargando={cargando} />
      ) : (
        <p>Cliente ID no válido</p>
      )}
    </>
  )
}

export default EditarCliente
