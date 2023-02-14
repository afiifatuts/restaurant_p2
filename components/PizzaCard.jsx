import Image from "next/image";
import styles from "../styles/PizzaCard.module.css";
//import Link to link each item of PizzaCard 
import Link from "next/link";
//destructur pizza from pizzaList then call it 
const PizzaCard = ({pizza}) => {
  return (
    //using Link we call pizza base on its {._id}
    <Link href={`/product/${pizza._id}`}>
    <div className={styles.container}>
      <Image src={pizza.img} alt="" width="500" height="500" />
      <h1 className={styles.title}>{pizza.title}</h1>
      <span className={styles.price}>${pizza.prices[0]}</span>
      <p className={styles.desc}>
        {pizza.desc}
      </p>
    </div>
    </Link>
  );
};

export default PizzaCard;
