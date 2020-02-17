import express from 'express'
import { json, urlencoded } from 'body-parser'
import morgan from 'morgan'
import cors from 'cors'

export const app = express()

app.disable('x-powered-by')

app.use(cors())
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(morgan('dev'))

const log = (req, res, next) => {
    req.mydata = "my error";
  console.log('logging')
  next() // if argument then it is that error
}

// app.use(log);

app.get('/data',log, (req, res) => {
  res.send({ data: [1, 2, 3] });
  console.log(req.mydata);
})

app.post('/data',[log,log,log], (req, res) => {
  console.log(req.body)
  res.send({ ok: true })
})

export const start = () => {
  app.listen(3000, () => {
    console.log('server is on 3000')
  })
}
