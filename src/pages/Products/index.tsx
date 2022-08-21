import { useEffect, useState } from "react";
import styles from "./styles.module.css";

interface ICategory {
  name: string;
  _id: string;
}

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState<ICategory[]>([]);

  const getProducts = async () => {
    const response = await fetch("productsCategory.json");

    const json = await response.json();
    console.log(json.data.nodes);

    setProducts(json.data.nodes);
    setFilteredProducts(json.data.nodes);

    const filteredIds: string[] = [];
    const filteredCategories: ICategory[] = [];

    json.data.nodes.forEach((item: any) => {
      const exist = filteredIds.includes(item.category.name);

      if (!exist) {
        filteredIds.push(item.category.name);

        filteredCategories.push(item.category);
      }
    });

    setCategories(filteredCategories);
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <header>
        <form>
          <select
            onChange={(event) => {
              if (event.target.value === "Todos") {
                setFilteredProducts(products);
              } else {
                setFilteredProducts(
                  products.filter(
                    (item: any) => item.category._id === event.target.value
                  )
                );
              }
            }}
          >
            <option value="Todos">Todos</option>
            {categories.map((category) => {
              return (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              );
            })}
          </select>
        </form>
      </header>
      <div>
        <ul className={styles.containerItens}>
          {filteredProducts.map((item: any) => {
            return (
              <li className={styles.listItem} key={item.id}>
                <p className={styles.title}>{item.name}</p>
                <img
                  className={styles.photo}
                  src={item.images[0].asset.url}
                  alt={item.images[0].alt}
                />
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default Products;
