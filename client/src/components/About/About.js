import { useRef, useState, useEffect } from "react";
import {Container,Grid} from "@material-ui/core";
import Profile from "../Profile/Profile.js";

const About = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState('');
  const fileInputRef = useRef(HTMLInputElement);

  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(image);
    } else {
      setPreview(null);
    }
  }, [image]);

  return (
    // <div className={styles.container}>
    //   <form>
    //     {preview ? (
    //       <img
    //         src={preview}
    //         style={{ objectFit: "cover" }}
    //         onClick={() => {
    //           setImage(null);
    //         }}
    //       />
    //     ) : (
    //       <button className={styles.button}
    //         onClick={(event) => {
    //           event.preventDefault();
    //           fileInputRef.current.click();
    //         }}
    //       >
    //         Add Image
    //       </button>
    //     )}
    //     <input
    //       type="file"
    //       style={{ display: "none" }}
    //       ref={fileInputRef}
    //       accept="image/*"
    //       onChange={(event) => {
    //         const file = event.target.files[0];
    //         if (file && file.type.substr(0, 5) === "image") {
    //           setImage(file);
    //         } else {
    //           setImage(null);
    //         }
    //       }}
    //     />
    //   </form>
    // </div>

    
        <Grid Container > 
            <Grid item xs={12} sm={12} md={4} lg={3} style={{backgroundColor:'red'}}> 
            <Profile />
            </Grid>
            <Grid item xs style={{backgroundColor:'blue'}}> XXX</Grid>

        </Grid>
   
  );
}

export default About;