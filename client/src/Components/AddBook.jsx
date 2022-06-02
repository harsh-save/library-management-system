import React from 'react'
import axios from 'axios'
import {useState} from 'react'

export const AddBook = () => {

  const [bookName,setBookName]=useState('')
  const [author,setAuthor]=useState('')
  const [year,setYear]=useState('')
  const [quantity,setQuantity]=useState('')

  const [err,setError]=useState('')
  

  const register=(e)=>{
    e.preventDefault()
    if (bookName===''){
      setError("Book Name is required")
      
    }
    if(author===''){
      setError("Author is required")
    }
    if(year===''){
      setError("Year is required")
    }
    if(quantity===''){
      setError("Quantity is required")
    }
    else{
    const book={bookName:bookName,author:author,year:year,quantity:quantity}
    axios.post('http://localhost:4000/register',{book})
    .then((res)=>{
      console.log(res)
      
    })
    .catch((err)=>{
      console.log(err)
     
    })
  }
  }

  return (
    <div className="container">
      <br />
      {err ? <div class="alert alert-danger" role="alert">{err}</div> : null}
      
        <br />
        <br />
        <form action="">
        <div className="row">
        <div className="col-6">
              <label className="form-label">Book name:</label>
              <input type="text" className="form-control" placeholder="Book name" onChange={(e)=>{setBookName(e.target.value)}}/>
            </div>
            <div className="col-4">
              <label className="form-label">Author:</label>
              <input type="text" className="form-control" placeholder="Author" onChange={(e)=>{setAuthor(e.target.value)}}/>
            </div>
            <div className="col-2">
            <label className="form-label">Year of publishing:</label>
              <input type="text" className="form-control"  placeholder="Year of publishing" onChange={(e)=>{setYear(e.target.value)}}/>
            </div>
            <br />
            <div className="row">
            <div className="col-4">
            <label className="form-label">Quantity of books:</label>
              <input type="text" className="form-control"  placeholder="Year of publishing" onChange={(e)=>{setQuantity(e.target.value)}}/>
            </div>
            </div>
        </div>
        <br />
        <button type="submit" className="btn btn-primary" onClick={register}>Save</button>
        </form>
    </div>
  )
}
