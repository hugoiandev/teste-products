import { useEffect, useState } from "react";
import styles from "./styles.module.css";

interface ICategory {
  name: string;
  _id: string;
}

const Products = () => {

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState<ICategory[]>([]);


  const getProducts = async () => {
    const response = await fetch('productsCategory.json');

    const json = await response.json();
    console.log(json.data.nodes);

    setProducts(json.data.nodes);


  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
    <header>
      <form>
        <select>
          {<option value=""></option>}
        </select>
      </form>
    </header>
    <div>
      <ul className={styles.containerItens}>
      {products.map((item: any) => {
        return (
          <li className={styles.listItem} key={item.id}>
            <p className={styles.title}>{item.name}</p>
            <img className={styles.photo} src={item.images[0].asset.url} alt={item.images[0].alt} />
          </li>
        )
      })}
      </ul>
    </div>
    </>
  )
}

export default Products;