import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { ContactServices } from '../../Services/ContactServices';
import Spinner from '../../Spinner/Spinner';

const ContactList = () => {
  // let{contactID}=useParams()
  let[state,setState]=useState({
    loading:false,
    contacts:[],
    errorMessage:""
  });

  useEffect(()=>{
    let promise1=new Promise((res,rej)=>{
      // Before update the data we are perform Loading
      setState({...state,loading:true})
      let response=ContactServices.getAllContacts()

      res(response);
      rej();
    })
    promise1.then((res1)=>{
      // After update the data we cannot perform loading
      setState({...state,loading:false,contacts:res1.data})
      console.log(res1.data);
    }).catch((error)=>{
      // After reject the promise we cannot perform loading 
      setState({...state,loading:false,errorMessage:error})
      alert("Data will not be fetch!!!")
    })
  },[])

  let clickDelete = (contactId)=>{
    let prom1 = new Promise((resolve,reject)=>{

      let deleteContact = ContactServices.deleteContact(contactId)
      resolve(deleteContact);
      reject();

    })
    prom1.then((res1)=>{
      // We can check the data will delete then we can rerender the component or data
      if(res1){
        let prom2=new Promise((resolve1,reject1)=>{
          // Before update the data we are perform Loading
          setState({...state,loading:true,contacts:[]})
          let response1=ContactServices.getAllContacts()
    
          resolve1(response1);
          reject1();
        })
        prom2.then((res2)=>{
          // After update the data we cannot perform loading
          setState({...state,loading:false,contacts:res2.data})
          console.log(res2.data);
        }).catch((error)=>{
          // After reject the promise we cannot perform loading 
          setState({...state,loading:false,errorMessage:error})
          alert("Data not Found!!!")
        })
      }
      
    })
  }

  let {loading,contacts} = state;
  return (
    <>
      {/* CONTACT LIST PAGE (HOME PAGE) */}

      {/* 1st Section */}
      {/* <pre>{JSON.stringify(contacts)}</pre> */}
      <section className="contact-search p-3 ">
        <div className="container">
          {/* Gird Model */}
          <div className="grid">
            {/* 1st Row */}
            <div className="row">
              <div className="col">
                <p className='h3'>Contact Manager <Link className='btn btn-primary ms-2' to={'/contact/add'}><i className='fa fa-plus-circle me-2 ' />ADD</Link></p>
                <p className='fst-italic'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus, nisi impedit eos id sint aliquid dolorum pariatur debitis possimus aspernatur officia, natus eligendi? Exercitationem, officia? Odio asperiores expedita numquam consequuntur!</p>
              </div>
            </div>
            {/* 2nd Row */}
            <div className="row">
              {/* 1st Col */}
              {/* col-md-6 means column midum size-8 */}
              <div className="col-md-6">
                {/* Inside 2nd row 1st row */}
                <form action="" className='row'>
                  {/* 1st Col */}
                  <div className="col-md-8 mb-2">
                    <input type="text" className='form-control' placeholder="Search" name="" id="" />
                  </div>
                  {/* 2nd Col */}
                  <div className="col mb-2">
                    <input type="submit" className='btn btn-outline-dark ' value="Search" />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2nd Section */}
      {
        // In this we can do the loading is true then we can fetch the spinner and where the loading is false we can fetch the contactlist
        loading ? <Spinner/> : 
            <section className="contact-list">
              <div className="container">
                <div className="row">
                {
                            // Here we can use short circuit operator
                            // When the contact array list length is greter than 0 then we can fetch the contacts...
                            contacts.length > 0 && contacts.map((data)=>{
                              return(
                                <React.Fragment>
                                  <div className="col-md-6" key={data.id}>
                                    <div className="card my-2 ">
                                      <div className="card-body">
                                        <div className="row align-items-center ">
                                          <div className="col-md-4">
                                            <img src={data.photo} className='contact-img' alt="" />
                                          </div>
                                          <div className="col-md-7">
                                            <ul className="list-group">
                                              <li className='list-group-item list-group-item-action '>
                                                Name: <span className='fw-bold'>{data.name}</span>
                                              </li>
                                              <li className='list-group-item list-group-item-action '>
                                                Contact: <span className='fw-bold'>{data.contact}</span>
                                              </li>
                                              <li className='list-group-item list-group-item-action '>
                                                Email Id: <span className='fw-bold'>{data.mail}</span>
                                              </li>
                                            </ul>
                                          </div>
                                          <div className="col-md-1 d-flex flex-column align-items-center ">
                                            {/* We can pass dynamic URL */}
                                              <Link to={`/contact/view/${data.id}`} className='btn btn-warning my-1 '><i className='fa fa-eye'/></Link>
                                              <Link to={`/contact/edit/${data.id}`} className='btn btn-primary my-1'><i className='fa fa-pen'/></Link>
                                              <button className='btn btn-danger my-1' onClick={()=>{clickDelete(data.id)}}><i className='fa fa-trash'/></button>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </React.Fragment>
                              )
                            })
                          }
                  
                </div>
              </div>
            </section>

      }
      
    </>
  )
}

export default ContactList;