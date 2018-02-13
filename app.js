// Tutorial https://www.youtube.com/watch?v=5T1YDRWaa3k

// connect to db at mongodb://<dbuser>:<dbpassword>@ds231568.mlab.com:31568/url_short


// get requirements and set instances
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const mongodb = require('mongodb')
// set up model
const shortUrl = require('./models/shortUrl')

app.use(bodyParser.json())
app.use(cors())

// connect to db
mongoose.connect(process.env.MONGOLAB_URI, {useMongoClient: true}|| 'mongodb://localhost/shortUrls')


// allows Node to get static content
app.use(express.static(__dirname + '/public'))

// create db entry
app.get('/new/:urlToShorten(*)', (req, res, next) => {
    
    // ES5 var urlToShorten = req.params.urlToShorten
    var { urlToShorten } = req.params
    //console.log(urlToShorten)
    // regex for url
    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = expression
    
    if (regex.test(urlToShorten)===true) {
        var short = Math.floor(Math.random()*100000).toString()

        var data = new shortUrl(
            {
                originalUrl: urlToShorten,
                shorterUrl: short
            }
        )

        data.save(err => {
            if (err) 
            {
              return res.send('Error saving to database')
            }
        })

        return res.json(data)
    }
    var data = new shortUrl(
      {
        originalUrl: 'Request URL does not match format',
        shorterUrl: 'Invalid URL'
    }
    )
    return res.json(data)
})


// query db and forward to originalUrl
app.get('/:urlToForward', (req, res, next) => {
        // stores value of param
    var shorterUrl = req.params.urlToForward
// see if object already exists
shortUrl.findOne({'shorterUrl': shorterUrl}, (err, data)=>  {
    if (err) {
      return res.send('Error reading database')
    }
    var re = new RegExp("^(http|https)://", "i")

    var strToCheck = data.originalUrl
    if (re.test(strToCheck)) {
        res.redirect(301, data.originalUrl)
    }
    else {
        res.redirect(301, 'http://' + data.originalUrl)
    }
  })
})

// Listen to server
var port = process.env.PORT || 3000
app.listen(port, () => {
    console.log("Server is running on port " + port )
})