import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { ContactServices } from '../../Services/ContactServices';
import Spinner from '../../Spinner/Spinner';

const AddContact = () => {
  let navigate = useNavigate();

  let [state,setState] = useState({
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
        let groupResponse = ContactServices.getGroup();

        res(groupResponse);
        rej();
    })
    prom.then((res1)=>{
        setState({...state,loading:false,groups:res1.data});
        console.log(res1.data);
    }).catch((error)=>{
        setState({...state,loading:false,errorMessage:error});
        alert("Data can not be fetch!!!");
    })
  },[])

  let updateInput = (event)=>{
    setState({
      ...state,
      contact:{
        ...state.contact,
        [event.target.name]:event.target.value
      }
    })
  }

  let submitForm = (event)=>{
    event.preventDefault();
    let prom = new Promise((res,rej)=>{

      let postContact = ContactServices.createContact(state.contact);
      res(postContact);
      rej();
    })
    prom.then((res1)=>{
      if(res1){
        setState({...state,contact:res1.data})
        navigate('/Contact/List',{replace:true})
      }
      else{
        navigate('/Contact/Add',{replace:false})
      }
    }).catch(()=>{
      alert("Data Cannot be Post!!!")
    })
  }
    let {loading,contact,groups,errorMessage} = state;
  return (
    <>
        {/* <pre>{JSON.stringify(contact)}</pre> */}
        {/* ADD CONTACT PAGE */}
        {/* 1st Section */}
        <section className="create-contact p-3">
          <div className="container">
            {/* 1st Row */}
            <div className="row">
              <div className="col">
                <p className='h4 text-success fw-bold'>Create Contact</p>
                <p className='fst-italic'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aliquid laborum natus, dolor doloremque obcaecati maxime eum veritatis veniam quod. Ducimus, tempore quibusdam eveniet delectus aliquid dolore? Dolor odit beatae rerum.</p>
              </div>
            </div>
            {/* 2nd Row */}
            {
              loading ? <Spinner/> :
              <React.Fragment>
                  <div className="row">
                    {/* 1st Column */}
                    <div className="col-md-4">
                      {/* Create Form */}
                      <form action="" onSubmit={submitForm}>
                        <div className="mb-2">
                          <input type="text" className='form-control' placeholder="Name" required={true} name="name" value={contact.name} onChange={updateInput} id="" />
                        </div>
                        <div className="mb-2">
                          <input type="text" className='form-control' placeholder="Photo" name="photo" value={contact.photo} onChange={updateInput} id="" />
                        </div>
                        <div className="mb-2">
                          <input type="number" className='form-control' placeholder="Mobile Number" name="contact" value={contact.contact} onChange={updateInput} id="" />
                        </div>
                        <div className="mb-2">
                          <input type="email" className='form-control' placeholder="Email" name="mail" value={contact.mail} onChange={updateInput} id="" />
                        </div>
                        <div className="mb-2">
                          <input type="text" className='form-control' placeholder="Title" name="title" value={contact.title} onChange={updateInput} id="" />
                        </div>
                        <div className="mb-2">
                          <input type="text" className='form-control' placeholder="Company" name="company" value={contact.company} onChange={updateInput} id="" />
                        </div>
                        {/* Drop Down List */}
                        <div className="mb-2">
                          <select id="" className='form-control' name="group" value={contact.group} onChange={updateInput}>
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
                          <input type="submit" className='btn btn-success ' value="Create" />
                          <Link to={`/`} className='btn btn-dark ms-4'>Cancel</Link>
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

export default AddContact;