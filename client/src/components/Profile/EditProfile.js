import React,{ useRef, useState, useEffect} from "react";
import { useHistory } from "react-router";
import {useDispatch} from 'react-redux';
import { updateuser } from '../../actions/user';
import "./EditProfile.css";

// import Sidebar from "../../components/sidebar/Sidebar";

const EditProfile = () => {

  const [user,setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const history=useHistory();
  const dispatch = useDispatch();

  const [firstName,setFirstName] = useState('');
  const [lastName,setLastName] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [confirmPassword,setConfirmPassword] = useState('');
  const [about,setAbout]=useState('');

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState('');
  const fileInputRef = useRef(HTMLInputElement);

  useEffect(() => {
      setLastName(user.result.lastName);
      setEmail(user.result.email);
      setFirstName(user.result.firstName);
      setAbout(user.result.about);
      setPassword(user.result.password);

      if (image) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result);
          console.log(reader.result);
        };
        reader.readAsDataURL(image);
      } else {
        setPreview(null);
      }
      
  },[history,user,image]);


  
  const handleSubmit = (event) => {
    event.preventDefault();
    
    if(password===!confirmPassword){
        console.log("Passwords do not match");
    }else{
      const updatedUser ={
        id:user.result._id,
        firstName,lastName,email,password,about,image:preview
      };
      console.log(updatedUser.image);
      dispatch(updateuser(updatedUser,user.result.id));
      window.location.replace('/');
    }
  };
  
  return (
    <div className="profile">
      <div className="profileWrapper">
        <div className="profileTitle">
          <span className="profileTitleUpdate">Update Your Account</span>
        </div>
        <form className="profileForm" onSubmit={handleSubmit}>
          <label>Profile Picture</label>
          
          {preview ? (
              <img
                src={preview}
                style={{ objectFit: "cover" }}
                onClick={() => {
                  setImage(null);
                }}
              />
            ) : (
              <button
                onClick={(event) => {
                  event.preventDefault();
                  fileInputRef.current.click();
                }}
              >
                Add Image
              </button>
            )}
            <input
              type="file"
              style={{ display: "none" }}
              ref={fileInputRef}
              accept="image/*"
              onChange={(event) => {
                const file = event.target.files[0];
                if (file && file.type.substr(0, 5) === "image") {
                  setImage(file);
                } else {
                  setImage(null);
                }
              }}
            />

          <label>First name</label>
          <input class="esize" type="text" placeholder="First Name" name="First name" value={firstName} onChange={(e)=> setFirstName(e.target.value)} />
          <label>Last name</label>
          <input class="esize"  type="text" placeholder="Last Name" name="Last name" value={lastName} onChange={(e)=> setLastName(e.target.value)} />
          <label>Email</label>
          <input class="esize"  type="email" placeholder="Email" name="email" value={email} onChange={(e)=> setEmail(e.target.value)} />
          <label>Password</label>
          <input class="esize"  type="password" placeholder="Password" name="password" onChange={(e)=> setPassword(e.target.value)}/>
          <label>Comfirm Password</label>
          <input class="esize"  type="password" placeholder="Confirm Password" name="comnfirmPassword" onChange={(e)=> setConfirmPassword(e.target.value)} />
          <label>About</label>
          <input  class="esize"  type="text" placeholder="About Me" name="about" value={about} onChange={(e)=> setAbout(e.target.value)} />
          <button className="profileSubmitButton" type="submit">
            Update
          </button>
        </form>
      </div>

    </div>
  );
}

export default EditProfile;