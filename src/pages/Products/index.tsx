import { useEffect, useState } from "react";

const Products = () => {

  const [products, setProducts] = useState([]);


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
      <ul>
      {products.map((item: any) => {
        return (
          <li key={item.id}>{item.name}</li>
        )
      })}
      </ul>
    </div>
    </>
  )
}

export default Products;