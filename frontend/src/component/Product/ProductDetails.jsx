import Carousel from "react-material-ui-carousel"
import './ProductDetails.css'
import { clear_Errors, getProductDetails } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import React, { Fragment, useEffect } from "react";
import { useParams } from 'react-router-dom';
import Loader from "../layout/Loader/Loader";
import ReactStars from "react-rating-stars-component";
import ReviewCard from "./ReviewCard.js"
import { useState } from "react";
import { addItemstoCart } from "../../actions/cartAction";

const ProductDetails = ({req}) => 
{
  const dispatch=useDispatch();
  let id=useParams().id;
  const {product,loading,error}= 
    useSelector((state)=>state.productdetails
  );
  const[quantity,setquantity]=useState(1);

  const add_quantity=()=>{
    if(product.Stock>=quantity+1)
    {
      const qty=quantity+1;
      setquantity(qty)
    }
    else{
      alert(`Only ${quantity} in Stock`)
    }
  }

  const subtract_quantity=()=>{
    if(quantity>2)
    {
      const qty=quantity-1;
      setquantity(qty)
    }
  }

  const addtocartHandler=()=>{
    dispatch(addItemstoCart(id,quantity));
    alert("Item Added to Cart");
  }
  useEffect(()=>{
      dispatch(getProductDetails(id));
  },[dispatch,id,error]);

  const options ={
    edit:false,
    color:"rgba(20,20,20,0.1)",
    activeColor:"tomato",
    size:window.innerWidth<600 ? 20 :25,
    value:product.ratings,
    isHalf:true,
  }
  return (
    <Fragment>
    {loading ?(
      <Loader/>
    ):
    (
      <Fragment>
        <div className='ProductDetails'>
          <div>
            <Carousel className="CarouselImage">
              {
                product.images && product.images.map((item,i)=>(
                  <img 
                  
                  key={item.url}
                  src={item.url}
                  alt={`${i} Slide`}
                  />
                ))
              }
            </Carousel>
          </div>
          <div>
           <div className="detailsBlock-1">
            <h2>{product.name}</h2>
            <p>Product # {product._id}</p>
            </div> 
            <div className="detailsBlock-2">
              <ReactStars {...options}></ReactStars>
              <span>({product.numberofReviews} Reviews)</span>
            </div> 


            <div className="detailsBlock-3">
              <h2>{`Rs ${product.price}`}</h2>
              <div className="detailsBlock-3-1">
                <div className="detailsBlock-3-1-1">
                <button onClick={subtract_quantity}>-</button>
                <input className="quantity" value={quantity} />
                <button onClick={add_quantity}>+</button>
                </div>{""}
                <br></br>
                <br></br>
                  <button id="addtocart" onClick={addtocartHandler}>Add To Cart</button>
                </div>
                <br></br>
                <p>
                  Status:{" "}
                  <b className={product.Stock<1 ? "redColor" : "greenColor"}>
                      {
                      product.Stock< 1 ? "Out of Stock" 
                      : "In stock"
                      }
                  </b>
                </p>
            </div>
            <div className="detailsBlock-4">
              <h4>Description : {product.description}</h4>
            </div>
            <button  className="submitReview">Submit Review</button>
            </div>
            </div>
            <h3 className="reviewsHeading">Reviews</h3>

          {
            product.reviews && product.reviews[0] ?(
              <div className="reviews">
                {
                  product.reviews && product.reviews.map((review)=> 
                  <ReviewCard review={review}/>)
                }
              </div>
            ):
            (
              <p className="noReviews">No Reviews Yet</p>
            )
          }
            </Fragment>
    )}
    </Fragment>
  );
}

export default ProductDetails;


// 6 16