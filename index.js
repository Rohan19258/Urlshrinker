const express=require('express')
const mongoose=require('mongoose')
const port=process.env.PORT || 8000
const ShortUrl=require('./models/shorturl')
const app=express()

app.set('view engine','ejs')
app.set('views','view')
app.use(express.urlencoded({ extended: false }))


const db="mongodb+srv://1234:feeditnot@cluster0.ihvrjfh.mongodb.net/urlshortner?retryWrites=true&w=majority"
mongoose.connect(db,{Usenewurlparser: true, useUnifiedTopology:true})

app.get('/', async (req, res) => {
    const shortUrls = await ShortUrl.find()
    res.render('index', { shortUrls: shortUrls })
  })
  
  app.post('/shortUrls', async (req, res) => {
    await ShortUrl.create({ full: req.body.fullUrl })
  
    res.redirect('/')
  })
  
  app.get('/:shortUrl', async (req, res) => {
    const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl })
    if (shortUrl == null) return res.sendStatus(404)
  
    shortUrl.clicks++
    shortUrl.save()
  
    res.redirect(shortUrl.full)
  })


app.listen(port,console.log(`server is listening on ${port}`))
