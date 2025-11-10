import {books,lends} from './db.js'
import express from'express'
import userroute from './routes/user.route.js'
import bookroute from './routes/book.route.js'
import { addDate, printDate } from './middlewares/addDate.middleware.js'
import { handlerror, notFound } from './middlewares/errors.middleware.js'


app.use(addDate)
app.use(printDate)
const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.get('/', (req, res) => {
  res.json({ message: 'Hello from server!' });
})
app.post('/', (req, res) => {
  res.json({ message: 'Hello from server!' });
})
app.put('/', (req, res) => {
  res.json({ message: 'Hello from server!' });
})
app.delete('/', (req, res) => {
  res.json({ message: 'Hello from server!' });
})
app.patch('/', (req, res) => {
  res.json({ message: 'Hello from server!' });
})

app.use('/users',userroute)
app.use('/books',bookroute)
app.use(handlerror)
app.use(notFound)
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

console.log(books)
