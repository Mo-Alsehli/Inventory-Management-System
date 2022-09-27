import React, { useState, useEffect } from "react";
import ProductApi from "../../apis/ProductApi";
import styles from "./product.module.css";
import AddProduct from "../addProduct/AddProduct";
import jwt from "jwt-decode";
import Modal from "react-modal";
import { RiCloseFill } from "react-icons/ri";
import Loading from "../loading/ReactLoading";
//import Loading from "../loading/Loading";

const Product = () => {
  const [products, setProducts] = useState([]);
  const token = localStorage.getItem("token");
  const user = jwt(token);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [currId, setCurrId] = useState("");
  const [loading, setLoading] = useState(true);

  const deleteProduct = async (e, productId) => {
    e.preventDefault();
    await ProductApi.delete(`/${productId}`);
    const response = await ProductApi.get("/");
    setProducts(response.data.products);
  };

  const updateProduct = async (e) => {
    try {
      setLoading(true);
      await ProductApi.patch(`/${currId}`, {
        name,
        price,
        category,
      });
      setLoading(false);
      const response = await ProductApi.get("/");
      setProducts(response.data.products);
    } catch (err) {
      console.log(err);
    }
  };

  const showCurrDetails = (product) => {
    setName(product.name);
    setCategory(product.category);
    setPrice(product.price);
    setCurrId(product._id);
  };

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const response = await ProductApi.get("/");
      setProducts(response.data.products);
      setLoading(false);
    }
    fetchData();
  }, []);

  async function getMyProducts() {
    setLoading(true);
    const response = await ProductApi.get(`/${user.userId}`);
    setProducts(response.data.products);
    setLoading(false);
  }
  async function getAllProducts() {
    setLoading(true);
    const response = await ProductApi.get("/");
    setProducts(response.data.products);
    setLoading(false);
  }
  if (loading) {
    return (
      <div className={styles.loading}>
        <Loading type="spin" color="#000" />
      </div>
    );
  }

  return (
    <>
      <div className={styles.productsOptions}>
        <AddProduct />
        <div>
          <p className={styles.productsBtn} onClick={getAllProducts}>
            All Products
          </p>
          <p className={styles.productsBtn} onClick={getMyProducts}>
            My Products
          </p>
        </div>
      </div>
      <div className={styles.products}>
        {products.length ? (
          products.map((product) => (
            <div key={product._id} className={styles.wrapper}>
              <img
                src="https://ithemes.com/wp-content/uploads/2021/11/What-is-an-SVG-file-Understanding-the-SVG-Basics-Blog-Post-Feature-Image-37163.png"
                alt="product"
                className={styles.productImg}
              />
              <div>
                <h3>Name: {product.name}</h3>
                <p>Price: {product.price}$</p>
                <p>category: {product.category}</p>
              </div>
              <div className={styles.optionsBtns}>
                <button
                  className={styles.updateBtn}
                  onClick={() => {
                    setModalIsOpen(true);
                    showCurrDetails(product);
                  }}
                >
                  Update
                </button>
                <Modal
                  isOpen={modalIsOpen}
                  onRequestClose={() => setModalIsOpen(false)}
                  shouldCloseOnOverlayClick={true}
                  style={{
                    overlay: {
                      background: "#c4c2d6",
                    },
                    content: {
                      position: "absolute",
                      top: "40px",
                      left: "40px",
                      right: "40px",
                      bottom: "40px",
                      border: "1px solid #ccc",
                      background: "#fff",
                      overflow: "auto",
                      WebkitOverflowScrolling: "touch",
                      borderRadius: "4px",
                      outline: "none",
                      padding: "20px",
                      width: "60%",
                      innerHeight: "90%",
                      margin: "auto",
                      transition: "all 1.5s ease-in-out ",
                    },
                  }}
                >
                  <form className={styles.formWrapper}>
                    <label>Product Name</label>
                    <input
                      type="text"
                      placehodler="please enter product name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <label>Price</label>
                    <input
                      type="text"
                      placehodler="please enter product price"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                    <label>Category</label>
                    <input
                      type="text"
                      placehodler="please enter product category"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    />
                    <button
                      type="submit"
                      onClick={(e) => {
                        updateProduct(e);
                        setModalIsOpen(false);
                      }}
                    >
                      Update
                    </button>
                  </form>
                  <div>
                    <button
                      className={styles.closeBtn}
                      onClick={() => setModalIsOpen(false)}
                    >
                      <RiCloseFill />
                    </button>
                  </div>
                </Modal>
                <button
                  className={styles.deleteBtn}
                  onClick={(e) => deleteProduct(e, product._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <div>
            <h2>No Products To Show</h2>
          </div>
        )}
      </div>
    </>
  );
};

export default Product;
