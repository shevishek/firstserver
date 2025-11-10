import { books, lends } from "../db.js";

export const getAllBooks=('/books', (req, res,next) => {
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

export const getById=('/books/:id', (req, res,next) => {
  console.log('id:', req.params.id);
const b = books.find(x => x.id == req.params.id);
  console.log('found:', b);
  if(!b)
     next({ status: 404, message: `book ${req.params.id} not found!` });
  else
    res.json(b);
});

export const update=('/books', (req, res,next) => {
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
export const partupdate=('/books/:id', (req, res,next) => {
  const idtoupdate= +req.params.id;
  const update= req.body;

  const booktoupdate=books.find(x => x.id==req.params.id);
  if(!booktoupdate)
     next({ status: 404, message: `book ${req.params.id} not found!` });
  else
  {
    booktoupdate.name = update.name;
    booktoupdate.category = update.category;
    booktoupdate.price = update.price;      
    res.json(booktoupdate);
  }
});

export const lend=('/books/lend', (req, res,next) => {
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

export const returns=('/books/return', (req, res,next) => {
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

export const deleteBook=('/books/:id', (req, res,next) => {
  const idbook= +req.params.id;
  const booktoremove=books.findIndex(x => x.id==idbook);
  if (booktoremove === -1) {
     next({ status: 404, message: `book ${req.params.id} not found!` });
  }
  else
  {
    const newbooks=books.splice(booktoremove,1)[0];
    console.log("the update succeed");
    res.json(books)
  }
});
