import React, { useState } from "react";
import Modal from "react-modal";
import styles from "./add-product.module.css";
import { GoPlus } from "react-icons/go";
import { RiCloseFill } from "react-icons/ri";
import jwt from "jwt-decode";
import ProductApi from "../../apis/ProductApi";
import { useNavigate } from "react-router-dom";

Modal.setAppElement("#root");
function ModalPackage() {
  const token = localStorage.getItem("token");
  const user = jwt(token);
  const navigate = useNavigate();

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const addProduct = async (e) => {
    e.preventDefault();
    try {
      const response = await ProductApi.post(`/${user.userId}`, {
        name,
        price,
        category,
      });
      console.log(response);
      if (response) {
        setModalIsOpen(false);
        setName("");
        setPrice("");
        setCategory("");
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.addProductWrapper}>
      <button
        className={styles.addProductBtn}
        onClick={() => setModalIsOpen(true)}
      >
        <GoPlus />
        Add Product
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
          <button type="submit" onClick={(e) => addProduct(e)}>
            Add
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
    </div>
  );
}

export default ModalPackage;
