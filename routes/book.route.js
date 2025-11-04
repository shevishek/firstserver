import express from 'express'
import { getAllBooks, getById, lend, partupdate, update ,returns,deleteBook} from '../conrollers/book.controller.js';
const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
const router=express.Router();


router.get('/',getAllBooks);
router.get('/:id',getById)
router.post('/',update)
router.patch('/',partupdate)
router.post('/lend',lend)
router.post('/return',returns)
router.delete('/:id',deleteBook)


export default router