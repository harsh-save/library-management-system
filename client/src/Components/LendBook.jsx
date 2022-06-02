import React from 'react'
import { useParams } from 'react-router-dom'
import {useEffect, useState} from 'react'
import axios from 'axios'

export const LendBook = () => {

  
  const {id}=useParams()
 
  const [bookName,setBookName]=useState('')
  const [author,setAuthor]=useState('')
  const[year,setYear]=useState('')
  const [borrowed,setBorrowed]=useState('')
  const [fromDate,setFromDate]=useState('')
  const [toDate,setToDate]=useState('')
 
  const [err,setErr]=useState('')

  useEffect(()=>{
    
    const fetchbook=async()=>{
      
      axios.get(`http://localhost:4000/books/${id}`).then((response)=>{
        response.data.map(book=>{
          setBookName(book.bookName)
          setAuthor(book.author)
          setYear(book.year)
        })
      })
      
      
    }
    fetchbook()
  },[])

  
const lendbook=(e)=>{
e.preventDefault()
if (id==='' || bookName===''||author===''||year===''){
  setErr("ID, Book Name, Author and Year must be provided")
}
if(borrowed===''||fromDate===''||toDate===''){
  setErr("Borrowed name, From date , To date must be provided")
}
else{

  const obj={
    id:id,
    bookName:bookName,
    author:author,
    year:year,
    borrowed:borrowed,
    fromDate:fromDate,
    toDate:toDate
  }
  axios.post(`http://localhost:4000/lend`,{obj}).then(res=>console.log(res))
}
}
  return (
    <div className="container">
      <br />
      <h3>Borrow books</h3>
      <hr />
      <br />
      <br />
      <br />
      {err ? <div class="alert alert-danger" role="alert">{err}</div> : null}
      <br />
      
        <form action="">
          <div className="row">
            <div className="col-4">
            <label className="form-label">Book ID:</label>
              <input type="text" className="form-control" value={id} disabled/>
            </div>
          </div>
          <br />
           
          <div className="row">
            
            
                
            <div className="col-6">
              
              
              
              <label className="form-label">Book name:</label>
              <input type="text" className="form-control" value={bookName}   disabled/>
              
            </div>
            <div className="col-4">
            <label className="form-label">Author:</label>
              <input type="text" className="form-control" value={author}  disabled/>
            </div>
            <div className="col-2">
            <label className="form-label">Year of publishing:</label>
              <input type="text" className="form-control" value={year} disabled/>
            </div>
          
            
           
          </div>
        
          <br />
          <div className="row">
            <div className="col-8">
            <label className="form-label">Book borrowed by:</label>
              <input type="text" className="form-control" onChange={(e)=>{setBorrowed(e.target.value)}} />
            </div>
          </div>
          <br />
          
          <div className="row">
            <div className="col-4">
            <label className="form-label">From date:</label>
              <input type="text" className="form-control" placeholder="DD-MM-YYYY" onChange={(e)=>{setFromDate(e.target.value)}}/>
            </div>
            <div className="col-4">
            <label className="form-label">To date:</label>
              <input type="text" className="form-control" placeholder="DD-MM-YYYY" onChange={(e)=>{setToDate(e.target.value)}}/>
            </div>
          </div>
          <br />
          <button type="submit" className="btn btn-primary" onClick={lendbook}>Lend Book</button>
        </form>
    </div>
  )
}
