import React from 'react'
import { useState , useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ProfileForm from './ProfileForm';

export default function Profile(props) {

    const [addressData , setAddressData] = useState([]);
    const [showForm, setShowForm] = useState(false);

    const fetchAddress = async()=>{
        await axios.post("http://localhost:5000/getAddress",props.userData)
        .then(res=>{
        setAddressData(res.data);
        })
        .catch(error=>{
        console.log(error);
        })
    }

    const removeAddress = async (index) =>{
        await axios.post('http://localhost:5000/removeAddress',addressData[index])
        fetchAddress();
    }

    useEffect(()=>{
        fetchAddress();
    },[]);

  return (
    <React.Fragment>
        <div className='profileContainer'>
            <div style={{display:'flex',flexDirection:'column',gap:'0.4rem',textAlign:'left',marginBottom:'2rem',borderBottom:'1px solid black',paddingBottom:'2rem'}}>
            <h1>{`Welcome, ${props.userData.username}`}</h1>
            <h3>{`Registered Email: ${props.userData.email}`}</h3>
            </div>
            <div style={{margin:'auto'}}>

                
            

                <button className='profileContainerButton' onClick={()=>setShowForm(true)}>Add New Address</button>

                <div style={{marginBottom:'3rem',marginTop:'4rem'}}>
                {showForm ? <ProfileForm setShowForm={setShowForm} userData={props.userData} setAddressData={setAddressData}/> : null}
                </div>


                <div style={{margin:'auto',display:'flex',flexDirection:'column',alignItems:'flex-start',justifyContent:'flex-start',width:'100%'}}>
                        {addressData.map((elem,index)=>
                        <div className="radio" style={{margin:'0.5rem 0',width:'100%'}}>
                        <label>
                        <div className='addressListInfo'>
                            <div className='addressInfo'>
                                <h1>{elem.full_name}</h1>
                                <h3>{elem.street_address}</h3>
                                <h3>{elem.zip}</h3>
                            </div>
                            <div style={{textAlign:'right'}} className='addressInfo'> 
                                <h1>{elem.phone_number}</h1>
                                <h3>{`${elem.city}, ${elem.province}`}</h3>
                            </div>
                            <div className='addressInfo'>
                                <a>Edit</a>
                                <a onClick={()=>removeAddress(index)}>Remove</a>
                            </div>
                        </div>
                    </label>
                </div>
                )}
                </div>
                
                
            </div>
        </div>
    </React.Fragment>
  )
}
