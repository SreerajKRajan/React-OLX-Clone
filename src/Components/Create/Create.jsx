import React, { Fragment, useContext, useState } from "react";
import "./Create.css";
import Header from "../Header/Header";
import { FirebaseContext, AuthContext } from "../../store/Context";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"; 
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom"; 

const Create = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const { storage } = useContext(FirebaseContext);
  const { user } = useContext(AuthContext);
  const date = new Date();
  const db = getFirestore();
  const navigate = useNavigate()

  const handleSubmit = () => {
    if (!image) {
      console.error("No image selected");
      return;
    }

    const storageRef = ref(storage, `images/${image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // You can handle the progress here if needed
      },
      (error) => {
        console.error("Upload failed:", error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          console.log("File available at:", url);
          // After getting the download URL, add the product to Firestore
          addDoc(collection(db, "products"), {
            name,
            category,
            price,
            url,
            userId: user.uid,
            createAt: date.toDateString(),
          }).then(() => {
            console.log("Product added successfully");
          }).catch((error) => {
            console.error("Error adding product:", error);
          });
        });
        navigate('/')
      }
    );
  };

  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
          <label htmlFor="fname">Name</label>
          <br />
          <input
            className="input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            id="fname"
            name="Name"
          />
          <br />
          <label htmlFor="fname">Category</label>
          <br />
          <input
            className="input"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            type="text"
            id="fname"
            name="category"
          />
          <br />
          <label htmlFor="fname">Price</label>
          <br />
          <input
            className="input"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            type="number"
            id="fname"
            name="Price"
          />
          <br />
          <br />
          <img
            alt="Posts"
            width="200px"
            height="200px"
            src={image ? URL.createObjectURL(image) : ""}
          ></img>
          <br />
          <input onChange={(e) => setImage(e.target.files[0])} type="file" />
          <br />
          <button onClick={handleSubmit} className="uploadBtn">
            upload and Submit
          </button>
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
