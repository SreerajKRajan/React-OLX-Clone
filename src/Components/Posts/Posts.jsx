import React, { useContext, useEffect, useState } from "react";
import Heart from "../../assets/Heart";
import "./Post.css";
import { db } from "../../firebase/config";
import { collection, getDocs } from "firebase/firestore";
import { PostContext } from "../../store/PostContext";
import { useNavigate } from "react-router-dom";

function ShimmerCard() {
  return (
    <div className="card shimmer-wrapper">
      <div className="shimmer" style={{ height: '100px', marginBottom: '10px' }}></div>
      <div className="shimmer" style={{ height: '20px', marginBottom: '10px', width: '60%' }}></div>
      <div className="shimmer" style={{ height: '20px', marginBottom: '10px', width: '80%' }}></div>
      <div className="shimmer" style={{ height: '20px', marginBottom: '10px', width: '50%' }}></div>
    </div>
  );
}

function Posts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { setPostDetails } = useContext(PostContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const allPost = querySnapshot.docs.map((doc) => {
          return {
            ...doc.data(),
            id: doc.id,
          };
        });
        setProducts(allPost);
        setLoading(false); // Stop loading when products are fetched
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
          {loading
            ? [...Array(10)].map((_, index) => <ShimmerCard key={index} />) // Show 4 shimmer cards
            : products.map((product) => (
                <div
                  key={product.id}
                  className="card"
                  onClick={() => {
                    setPostDetails(product);
                    navigate("/view");
                  }}
                >
                  <div className="favorite">
                    <Heart />
                  </div>
                  <div className="image">
                    <img src={product.url} alt="" />
                  </div>
                  <div className="content">
                    <p className="rate">&#x20B9; {product.price}</p>
                    <span className="kilometer">{product.category}</span>
                    <p className="name">{product.name}</p>
                  </div>
                  <div className="date">
                    <span>{product.createAt}</span>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
}

export default Posts;
