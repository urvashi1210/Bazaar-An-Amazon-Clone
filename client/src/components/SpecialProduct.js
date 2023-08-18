import React from 'react'
import ReactStars from "react-rating-stars-component";

const SpecialProduct = () => {
  return (
    <div className='col-4'>
      <div className="special-product-card">
       <div className="d-flex justify-content-between">
        <div>
          <img className="img-fluid" src="images/watch.jpg" alt="watch" />
        </div>
        <div className='special-product-content'>
        <h5 classname="brand">Havels</h5>
        <h6 className="title">Samsung Galaxy Note+ Mobile Phone; Sim...</h6>
        <ReactStars
    count={5}
    value={4} edit={false}
    size={24}
    activeColor="#ffd700"
  />
  <p className="price"><span className="red">$100</span>&nbsp;<strike>$200</strike></p>
  {/* &nbsp(non breaking space) - used to create space between words or elements that should remain together on the same line. */}
  <div className="discount-till d-flex align-items-center gap-10">
    <p className="mb-0">
      <b>5 </b>days
    </p>
    <div className="d-flex gap-10 align-items-center">
      <span className="badge rounded-circle p-3 bg-warning">1</span>:
      <span className="badge rounded-circle p-3 bg-warning">1</span>:
      <span className="badge rounded-circle p-3 bg-warning">1</span>
    </div>
  </div>
  <div className="prod-count mt-3">
      <p>Products : 5</p>
      <div class="progress">
  <div className="progress-bar" role="progressbar" style={{width:"25%"}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
</div>
    </div>
        </div>
        </div> 
      </div>
    </div>
  )
}

export default SpecialProduct
