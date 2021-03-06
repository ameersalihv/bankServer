const express = require('express');
const session = require('express-session');

const dataService = require('./services/data.service');

const app = express();

app.use(session({
  secret:'randomsecurestring',
  resave:false,
  saveUnitialized:false
}));

const logMiddleware = (req,res,next)=>{
  console.log(req.body);
  next()
}


app.use(logMiddleware);

const authMiddleware=(req,res,next)=>{
  if(!req.session.currentUser){

    return res.json({
      status:false,
      statusCode:422,
      message:"please Log in",
      
      
  })

  }
  else{
    next()
  }

}

app.use(express.json());

app.get('/', (req, res) => {
    res.status(444).send("GET METHOD UPDATED")
})

app.post('/', (req, res) => {
    res.send("POST METHOD")
})
app.post('/register', (req, res) => {
    

  const result =  dataService.register(req.body.acno,req.body.name, req.body.password)
  res.status(result.statusCode)
  console.log (res.json(result));
})
app.post('/login', (req, res) => {
    console.log(req.body);

  const result =  dataService.Login(req.body.acno, req.body.password)
  res.status(result.statusCode)
  console.log (res.json(result));
})
app.post('/deposit',authMiddleware, (req, res) => {
   // console.log(req.session.currentUser);

  const result =  dataService.Deposit(req.body.acno,req.body.password,req.body.amount)
  res.status(result.statusCode)
  console.log (res.json(result));
})
app.post('/withdraw',authMiddleware , (req, res) => {
    console.log(req.body);

  const result =  dataService.withdraw(req.body.acno,req.body.password,req.body.amount)
  res.status(result.statusCode)
  console.log (res.json(result));
})

app.put('/', (req, res) => {
    res.send("PUT METHOD")
})
app.patch('/', (req, res) => {
    res.send("PATCH METHOD")
})
app.delete('/', (req, res) => {
    res.send("DELETE METHOD")
})

app.listen(3000, () => {
    console.log("server started at port 3000")

})