import React from 'react'
import { Formik, Form, Field } from 'formik'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import Alerta from './Alerta'
import Spinner from './Spinner'

function Formulario({ cliente, cargando }) {
  const navigate = useNavigate()

  const nuevoClienteSchema = Yup.object().shape({
    nombre: Yup.string()
      .min(3, 'El Nombre es muy corto')
      .max(20, 'El Nombre es muy largo')
      .required('El Nombre del Cliente es obligatorio'),
    empresa: Yup.string().required('El Nombre de la Empresa es obligatorio'),
    email: Yup.string()
      .email('Email no válido')
      .required('El Email es obligatorio'),
    telefono: Yup.number()
      .positive('Número no válido')
      .integer('Número no válido')
      .typeError('Número no válido'),
    notas: '',
  })

  const handleSubmit = async (values) => {
    try {
      if (cliente.id) {
        // Editar registra
        const url = `http://localhost:4000/clientes/${cliente.id}`

        const response = await fetch(url, {
          method: 'PUT',
          body: JSON.stringify(values),
          headers: {
            'Content-Type': 'application/json',
          },
        })
        await response.json()
        navigate('/clientes')
      } else {
        // Nuevo registro
        const url = 'http://localhost:4000/clientes'

        const response = await fetch(url, {
          method: 'POST',
          body: JSON.stringify(values),
          headers: {
            'Content-Type': 'application/json',
          },
        })

        await response.json()
      }
    } catch (error) {
      console.log(error)
    }
  }

  return cargando ? (
    <Spinner />
  ) : (
    <div className="bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto">
      <h1 className="text-gray-600 font-bold text-xl uppercase text-center">
        {cliente?.nombre ? 'Editar Cliente' : 'Agregar Cliente'}
      </h1>
      <Formik
        initialValues={{
          nombre: cliente?.nombre ?? '',
          empresa: cliente?.empresa ?? '',
          email: cliente?.email ?? '',
          telefono: cliente?.telefono ?? '',
          notas: cliente?.notas ?? '',
        }}
        enableReinitialize={true}
        onSubmit={async (values, { resetForm }) => {
          handleSubmit(values)

          resetForm()
        }}
        validationSchema={nuevoClienteSchema}>
        {({ errors, touched }) => {
          return (
            <Form className="mt-10">
              <div className="mb-4">
                <label className="text-gray-800" htmlFor="nombre">
                  Nombre:
                </label>
                <Field
                  id="nombre"
                  className="mt-2 block w-full p-3 bg-gray-50"
                  type="text"
                  placeholder="Nombre del Cliente"
                  name="nombre"
                />
                {errors.nombre && touched.nombre ? (
                  <Alerta>{errors.nombre}</Alerta>
                ) : null}
              </div>
              <div className="mb-4">
                <label className="text-gray-800" htmlFor="empresa">
                  Empresa:
                </label>
                <Field
                  id="empresa"
                  className="mt-2 block w-full p-3 bg-gray-50"
                  type="text"
                  placeholder="Empresa del Cliente"
                  name="empresa"
                />
                {errors.empresa && touched.empresa ? (
                  <Alerta>{errors.empresa}</Alerta>
                ) : null}
              </div>
              <div className="mb-4">
                <label className="text-gray-800" htmlFor="email">
                  Email:
                </label>
                <Field
                  id="email"
                  className="mt-2 block w-full p-3 bg-gray-50"
                  type="email"
                  placeholder="Email del Cliente"
                  name="email"
                />
                {errors.email && touched.email ? (
                  <Alerta>{errors.email}</Alerta>
                ) : null}
              </div>
              <div className="mb-4">
                <label className="text-gray-800" htmlFor="telefono">
                  Teléfono:
                </label>
                <Field
                  id="telefono"
                  className="mt-2 block w-full p-3 bg-gray-50"
                  type="tel"
                  placeholder="Teléfono del Cliente"
                  name="telefono"
                />
              </div>
              <div className="mb-4">
                <label className="text-gray-800" htmlFor="notas">
                  Notas:
                </label>
                <Field
                  as="textarea"
                  id="notas"
                  className="mt-2 block w-full p-3 bg-gray-50 h-40"
                  type="text"
                  placeholder="Notas del Cliente"
                  name="notas"
                />
              </div>

              <input
                type="submit"
                value={cliente?.nombre ? 'Editar Cliente' : 'Agregar Cliente'}
                className="mt-5 w-full bg-blue-900 p-3 text-white uppercase font-bold text-lg cursor-pointer hover:bg-blue-800"></input>
            </Form>
          )
        }}
      </Formik>
    </div>
  )
}

Formulario.defaultProps = {
  cliente: {},
  cargando: false,
}

export default Formulario
