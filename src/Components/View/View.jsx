import React, { useContext, useEffect, useState } from 'react';
import './View.css';
import { PostContext } from '../../store/PostContext';
import { FirebaseContext } from '../../store/Context';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';

function View() {
  const [userDetails, setUserDetails] = useState(null);
  const { postDetails } = useContext(PostContext);
  const { firebase } = useContext(FirebaseContext);
  const db = getFirestore(firebase);

  useEffect(() => {
    if (postDetails && postDetails.userId) {
      const fetchUserDetails = async () => {
        try {
          const usersCollection = collection(db, 'users');
          const q = query(usersCollection, where('id', '==', postDetails.userId));
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
            setUserDetails(doc.data());
          });
        } catch (error) {
          console.error("Error fetching user details:", error);
        }
      };

      fetchUserDetails();
    }
  }, [postDetails, db]);

  if (!postDetails) {
    return <p>Loading post details...</p>;
  }

  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={postDetails.url}
          alt={postDetails.name || 'Product Image'}
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails.price} </p>
          <span>{postDetails.name}</span>
          <p>{postDetails.category}</p>
          <span>{postDetails.createAt}</span>
        </div>
        <div className="contactDetails">
          <p>Seller details</p>
          {userDetails ? (
            <>
              <p>{userDetails.username}</p>
              <p>{userDetails.phone}</p>
            </>
          ) : (
            <p>Loading seller details...</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default View;
