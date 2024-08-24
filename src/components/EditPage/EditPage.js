import React,{useState} from "react";
import './EditPage.css';
import {useLocation, useNavigate} from "react-router-dom";

const EditPage=()=>{
    const location=useLocation();
    const navigate=useNavigate();
    const {user}=location.state;

    const [email,setEmail]=useState(user.email);
    const [name,setName]=useState(user.name);
    const [surName,setSurName]=useState(user.surName);


    const handleUpdate=async ()=>{
        const response=await fetch(`/users/${user.id}`,{
            method:'PUT',
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify({name,surName,email}),
        });
        if (response.ok){
            alert('User updated successfully');
            navigate('/userPage', { state: { user: { ...user, email,name, surName,  } } });
        }else {
            const responseData = await response.json();
            console.log(responseData);  // Hata mesajını konsola yazdır
            alert(responseData.message || 'Failed to update user');
        }
    };
    return(
        <div className="editPage">
            <h2>Edit Your Details</h2>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
            />
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="First Name"
            />
            <input
                type="text"
                value={surName}
                onChange={(e) => setSurName(e.target.value)}
                placeholder="Sur Name"
            />
            <button onClick={handleUpdate}>Update</button>
        </div>
    );
};

export default EditPage;