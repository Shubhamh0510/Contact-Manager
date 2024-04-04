import React from 'react'
import SpinnerImg from '../../Assest/Image/Spinner.gif'

const Spinner = () => {
  return (
    <>
        {/* Spinner Image We can Render */}
        <img src={SpinnerImg} className='d-block m-auto' style={{width:"200px"}} alt="Spinner Not Found" />
    </>
  )
}

export default Spinner
