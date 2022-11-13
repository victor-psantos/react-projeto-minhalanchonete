import { useState, useEffect } from "react";
import axios from "axios";
import Item from "../../components/Item";

import "./PortionsPage.css";

export default function PortionsPage() {
  const [portions, setPortions] = useState([]);

  useEffect(() => {
    const promise = axios.get(`${process.env.REACT_APP_BACKEND_URI}/portions`);
    promise.then((response) => setPortions(response.data));
    promise.catch((erro) => console.log("error", erro));
  }, []);

  function getPortions() {
    return portions.map((portion) => {
      return (
        <Item
          key={portion.id}
          id={portion.id}
          name={portion.name}
          type="portions"
          image={portion.image}
        />
      );
    });
  }
  const porcoes = getPortions();

  return (
    <div className="PortionsPage">
      <h1>Aqui estão nossas porções:</h1>
      {porcoes}
    </div>
  );
}
