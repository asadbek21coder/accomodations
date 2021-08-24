const express = require('express')
const app = express()
PORT = process.env.PORT || 8080
const fileUpload = require('express-fileupload')
const path = require('path')
const bodyParser = require('body-parser')

const {
  GET: classifiedsGetController,
  POST: classifiedsPostController,
  PUT: classifiedsPutController,
  DELETE: classifiedsDeleteController
} = require('./controllers/classifieds/classifieds-controller.js')
const { registrationController } = require('./controllers/classifieds/registration.js')
const { loginController } = require('./controllers/classifieds/login.js')
const { dashboardController } = require('./controllers/classifieds/dashboardController.js')

// Midllewares
// app.use(bodyParser.urlencoded({ extended: true }))
app.use(fileUpload())
const { adminCheckMidlleware, holdersCheckMidlleware } = require('./midllewares.js')
app.use(express.json())


app.get('/classified/:id?', classifiedsGetController)
app.post('/classified', holdersCheckMidlleware , classifiedsPostController)
app.put('/classified', holdersCheckMidlleware, classifiedsPutController)
app.delete('/classified', holdersCheckMidlleware, classifiedsDeleteController)

app.post('/registration', registrationController)

app.post('/login', loginController)

app.get('/dashboard/users', adminCheckMidlleware, dashboardController)

app.post('/upload', async function (req, res) {

  console.log(req.files)

  let sampleFile =  req.files.sampleFile
        let uploadPath =  path.join(__dirname, '/upload', sampleFile.name)
        console.log(uploadPath)

         sampleFile.mv(uploadPath,  (err) => {
            if (err) {
                // return res.status(500).send(err)
                console.log(err)
            }
        })


  res.send('OK')

});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))

