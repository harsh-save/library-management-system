import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'

export const Search = () => {
    const [books,setBooks]=useState([])
    const [keyword,setKeyword]=useState('')

    useEffect(() =>{
        const fetchBooks=async()=>{
            const res=await fetch('http://localhost:4000/books')
            const data =await res.json()
            setBooks(data)
            
        }
        fetchBooks()
    },[])
    
  return (
    <div class="row">
        <div class="col-12">
            <br />
            <br />
            <h3>Search your books</h3>
            <hr />
        <form class="d-flex pt-4" role="search">
      <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={(e)=>setKeyword(e.target.value)}/>
      <button class="btn btn-outline-success" type="submit">Search</button>
    </form>
    <br />
    <table className="table table-striped">
            <thead>
              <tr>
                <td>Book Name</td>
                <td>Author</td>
                <td>Year of publication</td>
                <td>Books available</td>
                <td>Total Stock</td>
                <td>Lend Book</td>
                
                <td>Return book</td>
                
              </tr>
            </thead>
            <tbody>
    {
      books.filter((item)=>{
        if (keyword === ""){
          return item
        }
        else if (item.name.toLowerCase().includes(keyword.toLowerCase())){
          return item
        }
      }).map((book)=>{
        return (
          
              <tr key={book.id}>
                <td>{book.bookName}</td>
                <td>{book.author}</td>
                <td>{book.year}</td>
                <td>{book.quantity}</td>
                <td>{book.total_stock}</td>
               <td>
                 {book.quantity<1 ? <button class="btn btn-outline-success disabled" disabled>Lend Book</button> 
                 :<Link to={`/lend/${book.id}`}><a href="" className="btn btn-outline-success " >Lend Book</a></Link>}
                </td>
                <td>
                  {book.total_stock===book.quantity?<button class="btn btn-outline-primary disabled" disabled>Return Book</button>
                  :<Link to={`/return/${book.id}`}><a href="" className="btn btn-outline-primary">Return Book</a></Link>}
                  </td>
              </tr>
              
           
        )
      })
    }
     </tbody>
          </table>
        </div>
    </div>
  )
}
