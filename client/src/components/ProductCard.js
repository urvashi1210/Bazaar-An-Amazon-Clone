import React from 'react'
import ReactStars from "react-rating-stars-component";
import {Link, useLocation} from 'react-router-dom';

const ProductCard = (props) => {
  let location=useLocation();
const {grid}=props;
  return (
    <>
    <div className={`${location.pathname==`/store`?`gr-${grid}`:`col-3`}`}>
      <Link className="product-card position-relative">
        <div className="wishlist-icon position-absolute">
          <Link>
          <img src="images/wish.svg" alt="wishlist" />
          </Link>
        </div>
        <div className="product-image">
        <img src="images/watch.jpg" alt="product img" />
        <img className="img-fluid" src="images/watch-1.jpeg" alt="product img " />
      </div>
      <div className="product-details">
        <h6 className="brand">Havels</h6>
        <h5 className="product-title">
         Kids headphones bulk 10 pack multi colored for students 
        </h5>
        <ReactStars
    count={5}
    value={4} edit={false}
    size={24}
    activeColor="#ffd700"
  />
  <p className={`description ${grid===12?"d-block":"d-none"}`}>Elevate your students' learning experience with our Kids Headphones Bulk 10 Pack, designed with young learners in mind. These colorful and reliable headphones are the perfect addition to any classroom, library, or educational environment.</p>
        <p className="price">$100.00</p>
      </div>
      <div className="action-bar position-absolute">
        <div className="d-flex flex-column">
          <Link>
          <img src="images/prodcompare.svg" alt="compare" />
          </Link>
          <Link>
          <img src="images/view.svg" alt="addCart"/>
          </Link>
          <Link>
          <img src="images/add-cart.svg" alt="addCart" />
          </Link>
        </div>
      </div>
    </Link>
    </div>
    <div className={`${location.pathname=="/store"?`gr-${grid}`:"col-3"}`}>
    <Link className="product-card position-relative">
      <div className="wishlist-icon position-absolute">
        <Link>
        <img src="images/wish.svg" alt="wishlist" />
        </Link>
      </div>
      <div className="product-image">
      <img src="images/watch.jpg" alt="product img" />
      <img className="img-fluid" src="images/watch-1.jpeg" alt="product img " />
    </div>
    <div className="product-details">
      <h6 className="brand">Havels</h6>
      <h5 className="product-title">
        Kids headphones bulk 10 pack multi colored for students
      </h5>
      <ReactStars
  count={5}
  value={4} edit={false}
  size={24}
  activeColor="#ffd700"
/>
<p className={`description ${grid===12?"d-block":"d-none"}`}>Enhance your everyday with the Apple Watch Series 2 - 42 mm Stainless Steel Case. Crafted with precision and innovation, this remarkable smartwatch seamlessly combines cutting-edge technology with a timeless design.</p>
      <p className="price">$100.00</p>
    </div>
    <div className="action-bar position-absolute">
      <div className="d-flex flex-column">
        <Link>
        <img src="images/prodcompare.svg" alt="compare" />
        </Link>
        <Link>
        <img src="images/view.svg" alt="addCart"/>
        </Link>
        <Link>
        <img src="images/add-cart.svg" alt="addCart" />
        </Link>
      </div>
    </div>
  </Link>
  </div>
  </>
  )
}

export default ProductCard
