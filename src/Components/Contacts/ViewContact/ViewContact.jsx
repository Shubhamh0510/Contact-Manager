import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { ContactServices } from '../../Services/ContactServices';
import Spinner from '../../Spinner/Spinner';

const ViewContact = () => {
  // Using use params hook we can fetch dynamic url key and value pair
  let{contactID}=useParams();
  let[state,setState]=useState({
    loading:false,
    contact:{},
    errorMessage:""
  })
  useEffect(()=>{
    
    let prom = new Promise((res,rej)=>{
      setState({...state,loading:true})
      let response = ContactServices.getContact(contactID);
      res(response);
      rej();
    })
    prom.then((res)=>{
      setState({...state,loading:false,contact:res.data});
      console.log(res.data);
    }).catch((error)=>{
      setState({...state,loading:false,errorMessage:error});
      alert("Data will not be fetch!");
    })
  },[contactID])

  let {loading,contact}=state

  return (
    <>
        {/* VIEW CONTACT PAGE */}
        {/* Section 1st */}
        <section className="view-contact-intro p-3">
          <div className="container">
            <div className="row">
              <div className="col">
                <p className='h4 fw-bold text-warning'>View Contact</p>
                <p className='fst-italic'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos veritatis ratione, dolore voluptatum quod repellendus numquam dolor nemo recusandae nihil cumque odit, corporis impedit nulla commodi distinctio saepe excepturi laboriosam!</p>
              </div>
            </div>
          </div>
        </section>
        {/* Section 2nd */}
          {
            loading ? <Spinner/> : 
              <React.Fragment>
                {
                  Object.keys(contactID).length > 0 && 
                    <section className="view-contact-data">
                      <div className="container">
                        {/* 1st Row */}
                        <div className="row">
                          <div className="col-md-12 d-flex justify-content-center">
                            <img src={contact.photo} className='contact-img' alt="" />
                          </div>
                        </div>
                        {/* 2nd Row */}
                        <div className="row my-2 d-flex justify-content-center">
                          <div className="col-md-6">
                            <ul className='list-group'>
                              <li className='list-group-item list-group-item-action '>
                                Name: <span className='fw-bold'> {contact.name}</span>
                              </li>
                              <li className='list-group-item list-group-item-action '>
                                Contact: <span className='fw-bold'> {contact.contact}</span>
                              </li>
                              <li className='list-group-item list-group-item-action '>
                                Email: <span className='fw-bold'> {contact.mail}</span>
                              </li>
                              <li className='list-group-item list-group-item-action '>
                                Title: <span className='fw-bold'> {contact.title}</span>
                              </li>
                              <li className='list-group-item list-group-item-action '>
                                Company: <span className='fw-bold'> {contact.company}</span>
                              </li>
                              <li className='list-group-item list-group-item-action '>
                                Group: <span className='fw-bold'> {contact.group}</span>
                              </li>
                            </ul>
                          </div>
                        </div>
                        {/* 3rd Row */}
                        <div className="row">
                          <div className="col-md-12 d-flex justify-content-center">
                            <Link to={`/`} className='btn btn-warning'>Back</Link>
                          </div>
                        </div>
                      </div>
                    </section>
                }
              </React.Fragment>
          }
    </>
  )
}

export default ViewContact;