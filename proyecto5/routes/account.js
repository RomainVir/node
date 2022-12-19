// importamos express
import express from 'express'

// importamos el archivo bddd.js
import { USERS_BBDD } from '../bbdd.js'
// Creamos un router
const accountRouter = express.Router()
// importamos accountRouter

// middleware. Se ejecutará siempre antes del endpoint al que se llama
accountRouter.use((req, res, next) => {
  // Aquí le pasaremos la función que vamos a ejecutar
  console.log('entramos el middleware')
  // siguiente funcion
  next()
})

// Obtener los detalles de una cuenta a partir del guid
accountRouter.get('/account/:guid', (req, res) => {
  // Buscamos los detalles de la cuenta a través del guid recibido por req.params
  const { guid } = req.params
  const user = USERS_BBDD.find((user) => user.guid === guid)
  // Si no existe el usuario respondemos con un 404 (not found)
  if (!user) return res.status(404).send()
  // Si existe respondemos con los detalles de la cuenta
  res.send(user)
})

// Crear una nueva cuenta a partir del guid y name
accountRouter.post('/account', (req, res) => {
  const { guid, name } = req.body
  if (!guid || !name) return res.status(400).send()
  const user = USERS_BBDD.find(user => user.guid === guid)
  if (user) return res.status(409).send()
  USERS_BBDD.push({
    guid,
    name
  })

  res.send()
})

// Actualizar una nueva cuenta (en lugar de patch también se puede usar put, que si no existe lo crea)
accountRouter.patch('/account/:guid', (req, res) => {
  // Extraemos el guid de params
  const { guid } = req.params
  // Extraemos el nombre del body
  const { name } = req.body
  const user = USERS_BBDD.find((user) => user.guid === guid)
  // Si no existe named evolvemos 400 (bad request)

  if (!name) return res.status(400).send()
  if (!user) return res.status(404).send()
  // Buscamos los detalles de la cuenta a través del guid recibido por req.params

  // Si no existe el usuario respondemos con un 404 (not found)

  // Añadimos el nombre modificado y enviamos la respuesta
  user.name = name
  res.send(user)
})
// Eliminar una cuenta
accountRouter.delete('/account/:guid', (req, res) => {
  const { guid } = req.params
  const userIndex = USERS_BBDD.findIndex((user) => user.guid === guid)
  // Si no encuentra el guid (retorna -1 si no existe) respondemos con un 404
  if (userIndex === -1) return res.status(404).send()
  // Eliminamos el índice de ese usuario del array
  USERS_BBDD.splice(userIndex, 1)
  // Enviamos simplemente una respuesta
  res.send('Account deleted')
})

export default accountRouter
