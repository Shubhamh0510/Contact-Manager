import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ContactServices } from '../../Services/ContactServices';
import Spinner from '../../Spinner/Spinner';

const EditContact = () => {
  let navigate = useNavigate();
  let{contactID}=useParams();
  let[state,setState]=useState({
    loading:false,
    contact:{
      name:"",
      photo:"",
      contact:"",
      mail:"",
      title:"",
      company:"",
      group:""
    },
    groups:[],
    errorMessage:""
  })
  useEffect(()=>{
    let prom = new Promise((res,rej)=>{
      setState({...state,loading:true});
      let response = ContactServices.getContact(contactID);
      res(response);
      rej();
    })
    prom.then((res1)=>{
      console.log(res1.data);
      setState({...state,loading:false,contact:res1.data});
      // We can use nested Promise
      return new Promise((resolve, reject) => {
        let groupResponse = ContactServices.getGroup();
        resolve(groupResponse);
        reject();
      }).then((res2)=>{
        console.log(res2.data);
        setState({...state,loading:false,contact:res1.data,groups:res2.data});
      })
    })

  },[contactID])

  let submitForm = (event)=>{
    event.preventDefault();
    let prom = new Promise((res,rej)=>{

      let putContact = ContactServices.updateContact(contactID,state.contact);
      res(putContact);
      rej();
    })
    prom.then((res1)=>{
      if(res1){
        setState({...state,contact:res1.data})
        navigate('/Contact/List',{replace:true})
      }
      else{
        navigate(`/Contact/edit${contactID}`,{replace:false})
      }
    }).catch(()=>{
      alert("Data Cannot be Post!!!")
    })
  }

  let updateInput = (event)=>{
    setState({
      ...state,
      contact:{
        ...state.contact,
        [event.target.name]:event.target.value
      }
    })
  }

  let{loading,contact,groups,errorMessage}=state;
  return (
    <>
      {/* <pre>{JSON.stringify(contact)}</pre>
      <pre>{JSON.stringify(groups)}</pre> */}
        {/* EDIT CONTACT PAGE */}
        <section className="edit-contact p-3">
          <div className="container">
            {/* 1st Row */}
            <div className="row">
              <div className="col">
                <p className='h4 fw-bold text-primary '>Edit Contact</p>
                <p className='fst-italic'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor sed eaque neque fugiat sint numquam, nisi eum nobis vero molestias repudiandae perferendis quas repellendus minus quidem necessitatibus temporibus debitis recusandae!</p>
              </div>
            </div>
            {/* 2nd Row */}
            {
              loading ? <Spinner/> :
              <React.Fragment>
                  <div className="row">
                    {/* 1st Column */}
                    <div className="col-md-4">
                      {/* Edit Form */}
                      <form action="" onSubmit={submitForm}>
                        <div className="mb-2">
                          <input type="text" className='form-control' placeholder="Name" onChange={updateInput} name="name" value={contact.name} id="" />
                        </div>
                        <div className="mb-2">
                          <input type="text" className='form-control' placeholder="Photo Url" onChange={updateInput} name="photo" value={contact.photo} id="" />
                        </div>
                        <div className="mb-2">
                          <input type="text" className='form-control' placeholder="Mobile Number" onChange={updateInput} name="contact" value={contact.contact} id="" />
                        </div>
                        <div className="mb-2">
                          <input type="text" className='form-control' placeholder="Email" onChange={updateInput} name="mail" value={contact.mail} id="" />
                        </div>
                        <div className="mb-2">
                          <input type="text" className='form-control' placeholder="Title" onChange={updateInput} name="title" value={contact.title} id="" />
                        </div>
                        <div className="mb-2">
                          <input type="text" className='form-control' placeholder="Company" onChange={updateInput} name="company" value={contact.company} id="" />
                        </div>
                        <div className="mb-2">
                          {/* Drop down list */}
                          <select id="" className='form-control' onChange={updateInput} name="group" value={contact.group} >
                            <option value="">Select a Group</option>
                            {
                              groups.length > 0 &&
                              groups.map((data)=>{
                                return(
                                  <option key={data.id} value={data.id}>{data.group}</option>
                                )
                              })
                            }
                          </select>
                        </div>
                        <div className="mb-2">
                          <input type="submit" className='btn btn-primary' value={"Update"} />
                          <Link to={`/`} className='btn btn-dark ms-3'>Cancel</Link>
                        </div>
                      </form>
                    </div>
                    {/* 2nd Column */}
                    <div className="col-md-4 d-flex align-items-center">
                      <img src={contact.photo} className='contact-img' alt="" />
                    </div>
                  </div>
              </React.Fragment>
            }
          </div>
        </section>
    </>
  )
}

export default EditContact;