import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import CartContext from "../../contexts/CartContext";

import "./Item.css";

export default function Item(props) {
  const { id, name, type, image } = props;
  const navigate = useNavigate();
  const { cart } = useContext(CartContext);

  const selected = cart.find((itemOnCart) => itemOnCart.id === id);

  function handleSelect() {
    navigate(`/item/${type}/${id}`);
  }

  return (
    <div className="Item">
      <div
        className={selected ? "item selected" : "item"}
        onClick={handleSelect}
      >
        <img src={image}></img>
        <p>{name}</p>
      </div>
    </div>
  );
}
