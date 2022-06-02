import  express  from "express";
import mysql from "mysql";
import cors from "cors";


const app = express();

//Middleware
app.use(express.json())
app.use(cors());

// Database connection
const db=mysql.createConnection({
    user: 'root',
    password: '',
    host: 'localhost',
    database: 'books',
    multipleStatements:true,
})
db.connect()

//Routes

app.post('/register',(req,res)=>{
    const bookName=req.body.book.bookName
    const author=req.body.book.author
    const year=req.body.book.year
    const quantity=req.body.book.quantity

    

    db.query(
        "INSERT INTO lib_books (bookName, author, year,quantity,total_stock) VALUES(?,?,?,?,?)",[bookName,author,year,quantity,quantity],(err,res)=>{
            if (err){console.log(err)}
            if(res){console.log(res)}
        }
    )
})

app.get('/books/', (req, res)=>{
    db.query("SELECT * FROM lib_books",(err,result)=>{
        if (err) {
           console.log(err)
        }
        else {
        res.send(result)
        
        }
    })
    
})

app.get("/books/:id",(req,res)=>{
    const id =req.params.id
    db.query("SELECT * FROM lib_books WHERE id=?",[id],(err,result)=>{
        if(err) {
            console.log(err)
        }
        else{
            res.send(result)
        }
    })
})

app.post('/lend',(req, res)=>{
    const id=req.body.obj.id
    const bookName=req.body.obj.bookName
    const author=req.body.obj.author
    const year=req.body.obj.year
    const name=req.body.obj.borrowed
    const fromdate=req.body.obj.fromDate
    const todate=req.body.obj.toDate
    const action="lend"

   

    // query1="UPDATE lib_books set quantity=quantity+1 WHERE id=? "
    // query2="INSERT INTO records (id,bookName,author,year,name,fromdate,todate,action) VALUES[?,?,?,?,?,?,?,?] "

    db.query("UPDATE lib_books set quantity=quantity-1 WHERE id=? ;INSERT INTO records (id,bookName,author,year,name,fromdate,todate,action) VALUES(?,?,?,?,?,?,?,?)",[id,id,bookName,author,year,name,fromdate,todate,action],(err,result)=>{
        if (err) {
            console.log(err)
        }
    })
})

app.post('/return',(req, res)=>{
    const id=req.body.obj.id
    const bookName=req.body.obj.bookName
    const author=req.body.obj.author
    const year=req.body.obj.year
    const name=req.body.obj.borrowed
    const fromdate=req.body.obj.fromDate
    const todate=req.body.obj.toDate
    const action="return"

   

    // query1="UPDATE lib_books set quantity=quantity+1 WHERE id=? "
    // query2="INSERT INTO records (id,bookName,author,year,name,fromdate,todate,action) VALUES[?,?,?,?,?,?,?,?] "

    db.query("UPDATE lib_books set quantity=quantity+1 WHERE id=? ;INSERT INTO records (id,bookName,author,year,name,fromdate,todate,action) VALUES(?,?,?,?,?,?,?,?)",[id,id,bookName,author,year,name,fromdate,todate,action],(err,result)=>{
        if (err) {
            console.log(err)
        }
    })
})

app.listen(4000,()=>{
    console.log("server running on 4000")
});