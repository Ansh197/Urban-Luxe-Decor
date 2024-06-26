import axios from "axios";
import React, { useContext, useEffect } from "react";
import { useState } from "react";
import AddressList from "./AddressList";
import CheckoutSummary from "./CheckoutSummary";
import { UserContext } from "../context/UserContext";

export default function Checkout() {
  const [addressData , setAddressData] = useState([]);
  const [selectedAddress , setSelectedAddress] = useState();
  const {userData} = useContext(UserContext);
  const [totalPrice,setTotalPrice] = useState(0);

  async function placeOrder(){
    const obj = {userData:userData,address:selectedAddress,totalPrice:totalPrice};
    if(selectedAddress)
    {
      await axios.post('http://localhost:5000/cart/placeOrder',obj);
      // console.log(result);
    }
    else
    console.log('Please select an address first');
}

  const fetchAddress = async()=>{
    await axios.post("http://localhost:5000/address/get",userData)
    .then(res=>{
      setAddressData(res.data);
    })
    .catch(error=>{
      console.log(error);
    })
  }

  useEffect(()=>{
    fetchAddress();
  },[]);

  const changeFormData = (e)=>{
    const {name,value} = e.target;
    setFormData(prevState=>({
      ...prevState,
      [name]: value,
    }));
  };

  const formSubmit = async (e) =>{
    e.preventDefault();
    await axios.post('http://localhost:5000/address/add',formData)
    await axios.post("http://localhost:5000/address/get",userData)
    .then(res=>{
      setAddressData(res.data);
    })
    .catch(error=>{
      console.log(error);
    })
  }

  const [formData, setFormData] = useState({
    full_name: "",
    phone_number: "",
    street_address: "",
    city: "",
    province: "",
    zip: "",
    user_id:userData.userid,
    address_id:''
  });

  return (
    <React.Fragment>
      <div className="checkoutContainer">
        <div className="checkoutFormContainer">
          <div className="checkoutFormInnerContainer1">
            <div className="checkoutFormHeading">
              <h1>Personal Information</h1>
              <p>Use a permanant address where you can recieve the package</p>
            </div>
            <form className="checkoutForm" method="post" onSubmit={formSubmit}>
              <label htmlFor="full_name">Full Name</label>
              <input
                type="text"
                name="full_name"
                value={formData.full_name}
                onChange={changeFormData}
                required
              />
              <label htmlFor="phone_number">Phone Number</label>
              <input
                type="text"
                name="phone_number"
                value={formData.phone_number}
                onChange={changeFormData}
                required
              />
              <label htmlFor="street_address">Street Address</label>
              <input
                type="text"
                name="street_address"
                value={formData.street_address}
                onChange={changeFormData}
                required
              />
              <div className="localAddress">
                <div className="localAddressInput">
                  <label htmlFor="city">City</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={changeFormData}
                    required
                  />
                </div>
                <div className="localAddressInput">
                  <label htmlFor="province">State / Province</label>
                  <input
                    type="text"
                    name="province"
                    value={formData.province}
                    onChange={changeFormData}
                    required
                  />
                </div>
                <div className="localAddressInput">
                  <label htmlFor="zip">Zip / Postal Code</label>
                  <input
                    type="text"
                    name="zip"
                    value={formData.zip}
                    onChange={changeFormData}
                    required
                  />
                </div>
              </div>
              <input type="submit" value="Add Address"/>
            </form>
            <div className="existingAddress">
              <h1>Address</h1>
              <p>Choose from existing addresses</p>
              <AddressList setSelectedAddress={setSelectedAddress} addressData = {addressData}/>
            </div>
          </div>
          <div className="checkoutFormInnerContainer2">
            <CheckoutSummary totalPrice={totalPrice} setTotalPrice={setTotalPrice} placeOrder={placeOrder} />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
