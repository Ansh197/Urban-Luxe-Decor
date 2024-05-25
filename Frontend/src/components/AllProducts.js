import React, { useEffect, useState } from 'react'
import axios from 'axios';
import testImage from '../images/test3.jpg'
import expandArrow from '../images/icons8-expand-arrow-50.png'
import Filter from './Filter';

export default function AllProducts(props) {

  function addToCart(index){
    if(props.userData.isLoggedIn)
      {
        var sendData = {
          product_id:productData[index].product_id,
          user_id: props.userData.userid
        }
        axios.post('http://localhost:5000/addtocart',sendData)
      }
      else
      {
        console.log('You are not logged in');
      }
  }

  const effectFunction = async() =>{
    await axios.get('http://localhost:5000/allproducts')
      .then(res=>{
        setProductData(res.data);
      })
      .catch(error=>{
        console.log(error);
      })
  }

  useEffect(()=>{
    effectFunction();
  },[])

  const [filter,setfilter] = useState({
    color:false,
    category:false,
    brand:false
  });

  const [productData,setProductData] = useState([]);

  return (
    <React.Fragment>
        <div className='productsContainer'>

          <div className='filters'>
            <h1>Filters</h1>
            <div className='filter-innerdiv' onClick={()=>{setfilter({...filter,color:filter.color^1})}}>Color <img src={expandArrow} alt='expand arrow'/></div>
            <div>{filter.color?<Filter/>:null}</div>
            <div className='filter-innerdiv' onClick={()=>{setfilter({...filter,brand:filter.brand^1})}}>Brand <img src={expandArrow} alt='expand arrow'/></div>
            <div className='filter-innerdiv' onClick={()=>{setfilter({...filter,category:filter.category^1})}}>Category <img src={expandArrow} alt='expand arrow'/></div>
          </div>

            <div className='productsGrid'>

                {productData.map((card,index)=>(
                  <div className='productCard'>
                  <div className='productImageContainer'>
                    <img src={card.image_url} alt={`test-Image-${index}`}/>
                  </div>
                  <div className='productDescriptionContainer'>
                    <h3>{card.description}</h3>
                    <h1>{card.price}</h1>
                  </div>
                  <button  onClick={()=> addToCart(index)}>Add to Cart</button>
                </div>
                ))}
            </div>
        </div>
    </React.Fragment>
  )
}