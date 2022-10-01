const express = require('express')
const dataBaseService = require('./dataBaseService')
const app = express()
var cors = require('cors')
app.use(express.json())

app.use(cors())


app.use(express.static('public'))

app.get('/', async function (req, res) {
    res.sendFile(__dirname+"/index.html")
})


app.get('/api/coches', async function (req, res) {
    res.status(200).send(await dataBaseService.connectionEveryShow())
})

app.get('/api/coches/:id', function (req, res) {
    const carsFind = coches.find(coche => coche.id.toString() === req.params.id)
         if (!carsFind){
             return res.status(404).send(`El coche con indice ${req.params.id} no existe`)
         }
    res.send(carsFind)
})

app.delete('/api/coches/:id', async function (req, res) {

    const carFinded= await dataBaseService.getCarById(req.params.id);
    if(carFinded.length  > 0){
        await dataBaseService.connectionDeleteShow(carFinded[0].id);
        return res.status(200).send(`El coche con indice ${req.params.id} ha sido eleiminado`)
    }
    return res.status(404).send(`El coche con indice ${req.params.id} no existe`)

})

app.post('/api/coches', async function (req, res) {
    await dataBaseService.connectionCreateShow(req.body)
    res.status(201).send("Inserted successfull")
})

app.put('/api/coches/:id', async function (req, res) {
    const carFinded= await dataBaseService.getCarById(req.params.id);
        if (carFinded){
            await dataBaseService.connectionUpdateShow(carFinded[0])
            return res.status(202).send("El coche ha sido modificado exitosamente")
        }
    return res.status(404).send("El coche no existe")
})



app.listen(process.env.PORT||3000)