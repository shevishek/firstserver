import {books,lends} from './db.js'
import express from'express'

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

app.get('/books', (req, res) => {
  const {page=1,limit=10,search=""}=req.query;
  let searchbook=books
  if(search!="")
  {
    searchbook=books.filter(x=>x.name==search);
  }

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + +limit; // +limit כדי להמיר למספר
  const paginatedBooks = searchbook.slice(startIndex, endIndex);

  // 4️⃣ החזרת התוצאה ללקוח
  res.json({
    total: searchbook.length,  // מספר ספרים אחרי הסינון
    page: +page,
    limit: +limit,
    books: paginatedBooks
  });
  // res.json(books);
});

app.get('/books/:id', (req, res) => {
  console.log('id:', req.params.id);
const b = books.find(x => x.id == req.params.id);
  console.log('found:', b);
  res.json(b);
});

app.post('/books', (req, res) => {
  const { id, name, category, price, status} = req.body
  const book=
  {
    id,
    name,
    category,
    price,
    status
  }
  books.push(book)
  res.json(book);
});

app.patch('/books/:id', (req, res) => {
  const idtoupdate= +req.params.id;
  const update= req.body;

  const booktoupdate=books.find(x => x.id==req.params.id);
    booktoupdate.name = update.name;
    booktoupdate.category = update.category;
    booktoupdate.price = update.price;      
    res.json(booktoupdate);
});
app.post('/books/lend', (req, res) => {
  const{idbook,idcust}=req.body;  
  const booktoupdate=books.find(x => x.id==idbook);
  if(  booktoupdate.status == true)
  {
     booktoupdate.status = true;
     console.log("lend succeed");
     const d=new Date().toISOString().split("T")[0];
  const newlend=
  {
    d,
    idcust,
  }  
  lends.push(newlend)
  res.json(newlend);
  }
  else
  {
    console.log("lend isnt succeed");
    res.json({ message: 'lend isnt succeed' });
  }
  
});
app.post('/books/return', (req, res) => {
  const{idbook}=req.body;  
  const booktoupdate=books.find(x => x.id==idbook);
  if(!booktoupdate)
  {
    res.json({ message: 'error there is not exsit that book in our library' });
  }
  else
  {
    booktoupdate.status = false;
    console.log("the update succeed");
  }
  res.json(booktoupdate); 
});

app.delete('/books/:id', (req, res) => {
  const idbook= +req.params.id;
  const booktoremove=books.findIndex(x => x.id==idbook);
  if (booktoremove === -1) {
    res.json({ message: "Book not found" });
  }
  else
  {
    const newbooks=books.splice(booktoremove,1)[0];
    console.log("the update succeed");
    res.json(books)
  }
});
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

console.log(books)
