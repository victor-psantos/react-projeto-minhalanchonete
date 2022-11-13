import { useState, useEffect } from "react";
import axios from "axios";
import Item from "../../components/Item";

import "./SanduichsPage.css";

export default function SanduichsPage() {
  const [sanduichs, setSanduichs] = useState([]);

  useEffect(() => {
    const promise = axios.get(`${process.env.REACT_APP_BACKEND_URI}/sanduichs`);
    promise.then((response) => setSanduichs(response.data));
    promise.catch((erro) => console.log("error", erro));
  }, []);

  function getSanduichs() {
    return sanduichs.map((sanduich) => {
      return (
        <Item
          key={sanduich.id}
          id={sanduich.id}
          name={sanduich.name}
          type="sanduichs"
          image={sanduich.image}
        />
      );
    });
  }
  const lanches = getSanduichs();

  return (
    <div className="SanduichsPage">
      <h1>Aqui estão nossos sanduiches:</h1>
      {lanches}
    </div>
  );
}
