import styles from "../../styles/Product.module.css";
import Image from "next/image";
import { useState } from "react";
//to making connection with API
import axios from "axios";
//to use dispatch with redux in cart
import { useDispatch } from "react-redux";
import {addProduct} from "../../redux/cartSlice"

const Product = ({pizza}) => {
  const [size, setSize] = useState(0);
  const [price, setPrice] = useState(pizza.prices[0]);
  const [extras, setExtras] = useState([])
  const [quantity, setQuantity] = useState(1)
  const dispatch = useDispatch()

  const changePrize = (number) =>{
    setPrice(price+number)
  }

  const handleSize = (sizeIndex)=>{
    const difference = pizza.prices[sizeIndex] - pizza.prices[size]
    setSize(sizeIndex)
    changePrize(difference)

  }
  

  // const pizza = {
  //   id: 1,
  //   img: "/img/pizza.png",
  //   name: "CAMPAGNOLA",
  //   price: [19.9, 23.9, 27.9],
  //   desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis arcu purus, rhoncus fringilla vestibulum vel, dignissim vel ante. Nulla facilisi. Nullam a urna sit amet tellus pellentesque egestas in in ante.",
  // };

  // create handleChange to handle price from extra topping options
  const handleChange = (e,option)=>{
    //target checked or not 
    const checked = e.target.checked;

    if(checked){
      changePrize(option.price)
      setExtras(prev=>[...prev,option])
    }else{
      changePrize(-option.price)
      setExtras(extras.filter((extra)=> extra._id !== option._id))
    }
  }
//setting dispatch cart qty with react-redux
  const handleClick=()=>{
    dispatch(addProduct({...pizza,extras,price,quantity}))
  }
  const handelQtyChange=(e)=>{
    const qty = e.target.value
    if (qty > 0){
    setQuantity(qty)
  }else{
    alert("qty cannot above 0")
  }
  }

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.imgContainer}>
          <Image src={pizza.img} objectFit="contain" layout="fill" alt="" />
        </div>
      </div>
      <div className={styles.right}>
        <h1 className={styles.title}>{pizza.title}</h1>
        <span className={styles.price}>${price}</span>
        <p className={styles.desc}>{pizza.desc}</p>
        <h3 className={styles.choose}>Choose the size</h3>
        <div className={styles.sizes}>
          <div className={styles.size} onClick={() => handleSize(0)}>
            <Image src="/img/size.png" layout="fill" alt="" />
            <span className={styles.number}>Small</span>
          </div>
          <div className={styles.size} onClick={() => handleSize(1)}>
            <Image src="/img/size.png" layout="fill" alt="" />
            <span className={styles.number}>Medium</span>
          </div>
          <div className={styles.size} onClick={() => handleSize(2)}>
            <Image src="/img/size.png" layout="fill" alt="" />
            <span className={styles.number}>Large</span>
          </div>
        </div>
        <h3 className={styles.choose}>Choose additional ingredients</h3>
        <div className={styles.ingredients}>
          {pizza.extraOptions.map((option)=>(
          <div className={styles.option} key={option._id}>
            <input
              type="checkbox"
              id={option.text}
              name={option.text}
              className={styles.checkbox}
              onChange={(e)=>handleChange(e,option)}
            />
            <label htmlFor="double">{option.text}</label>
          </div>
          ))}
        </div>
        <div className={styles.add}>
            {/* <input 
            onChange={(e)=>setQuantity(e.target.value)}
            type="number" defaultValue={1} className={styles.quantity}
            /> */}
            <input 
            onChange={handelQtyChange}
            type="number" defaultValue={1} className={styles.quantity}
            />π
            
            <button className={styles.button} onClick={handleClick}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

//using axios to connect Api and render it
//using params to get its {_id}
//and then we have to set API endpoint in [id]
export const getServerSideProps = async ({params}) => {
  //Get data from product API
  const res = await axios.get(`http://localhost:3000/api/products/${params.id}`);
  return {
    props: {
      pizza: res.data,
    },
  };
};

export default Product;
