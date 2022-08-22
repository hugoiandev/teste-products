import { useEffect, useState } from "react";
import styles from "./styles.module.css";

interface Image {
  alt: string;
  asset: { url: string };
}
interface Category {
  name: string;
  _id: string;
}

interface IProducts {
  name: string;
  shortDescription: string;
  id: string;
  images: Image[];
  category: Category;
}

const Products = () => {
  const [products, setProducts] = useState<IProducts[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<IProducts[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const getProducts = async () => {
    const response = await fetch("productsCategory.json");

    const json = await response.json();
    console.log(json.data.nodes);

    setProducts(json.data.nodes);
    setFilteredProducts(json.data.nodes);

    const filteredIds: string[] = [];
    const filteredCategories: Category[] = [];

    json.data.nodes.forEach((item: IProducts) => {
      const exist = filteredIds.includes(item.category.name);

      if (!exist) {
        filteredIds.push(item.category.name);

        filteredCategories.push(item.category);
      }
    });

    setCategories(filteredCategories);
  };

  const filterProducts = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (event.target.value === "Todos") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter((item) => item.category._id === event.target.value)
      );
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <header className={styles.header}>
        <form className={styles.form}>
          <select className={styles.select} onChange={filterProducts}>
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
          {filteredProducts.map((item) => {
            return (
              <li className={styles.listItem} key={item.id}>
                <p className={styles.description}>{item.name}</p>
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
