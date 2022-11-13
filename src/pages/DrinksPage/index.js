import { useState, useEffect } from "react";
import axios from "axios";
import Item from "../../components/Item";

import "./DrinksPage.css";

export default function DrinksPage() {
  const [drinks, setDrinks] = useState([]);

  useEffect(() => {
    const promise = axios.get(`${process.env.REACT_APP_BACKEND_URI}/drinks`);
    promise.then((response) => setDrinks(response.data));
    promise.catch((erro) => console.log("error", erro));
  }, []);

  function getDrinks() {
    return drinks.map((drink) => {
      return (
        <Item
          key={drink.id}
          id={drink.id}
          name={drink.name}
          image={drink.image}
          type="drinks"
        />
      );
    });
  }
  const bebidas = getDrinks();

  return (
    <div className="DrinksPage">
      <h1>Aqui estão nossas bebidas:</h1>
      {bebidas}
    </div>
  );
}
