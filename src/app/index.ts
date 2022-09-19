import dotenv from 'dotenv'

import { BackendApp } from './backend-app'

try {
  dotenv.config()
  console.log('BackendApp starting 👾👾👾. Environments: ', process.env.NODE_ENV)

  BackendApp.build()
    .start()
    .then(() => {
      console.log('BackendApp started 🥳🥳🥳')
    })
} catch (error) {
  console.log(error)
  process.exit(1)
}

process.on('uncaughtException', (error) => {
  console.log('uncaughtException', error)
  process.exit(1)
})
