import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import ItemDetail from "../../components/ItemDetail";
import CartContext from "../../contexts/CartContext";

import "./ItemPage.css";

export default function ItemPage() {
  const params = useParams();
  const [item, setItem] = useState({
    id: 0,
    name: "",
    description: "",
    price: 0,
    quantity: 0,
  });
  const [qtde, setQtde] = useState(0);
  const navigate = useNavigate();

  const { cart, setCart } = useContext(CartContext);

  useEffect(() => {
    const promise = axios.get(
      `${process.env.REACT_APP_BACKEND_URI}/${params.itemType}/${params.itemId}`
    );
    promise.then((response) => {
      setItem(response.data);
      let itemCart = cart.find(
        (itemOnCart) => response.data.id === itemOnCart.id
      );
      if (itemCart) setQtde(itemCart.quantity);
    });
    promise.catch((error) => console.log("error", error));
  }, []);

  function handleBack() {
    navigate(`/${params.itemType}`);
  }

  function handleDisabled() {
    if (qtde === 0) return true;
    return false;
  }

  function addItemOnCart() {
    if (isItemAlreadySelected()) {
      const newItemList = removeItemFromCart();
      console.log(newItemList);
      setCart(newItemList);
    } else {
      setCart([...cart, { ...item, quantity: qtde }]);
    }
  }

  function removeItemFromCart() {
    setQtde(0);
    setItem((e) => {
      return { ...e, quantity: 0 };
    });

    return cart.filter((itemOnCart) => item.id !== itemOnCart.id);
  }

  function isItemAlreadySelected() {
    return cart.find((itemOnCart) => item.id === itemOnCart.id);
  }

  function disbledButtonAdd() {
    if (item && !isItemAlreadySelected() && qtde == 0) return true;
    return false;
  }

  return (
    <div className="ItemPage">
      {item ? (
        <ItemDetail
          name={item.name}
          description={item.description}
          price={item.price}
        />
      ) : (
        <div>Não há nada para exibir</div>
      )}

      <div className="quantidade">
        {!isItemAlreadySelected() ? (
          <div>
            <p>Quantidade desejada:</p>
            <p>{qtde}</p>
            <button
              disabled={handleDisabled()}
              onClick={() => setQtde(qtde - 1)}
            >
              -
            </button>
            <button onClick={() => setQtde(qtde + 1)}>+</button>
          </div>
        ) : (
          <div>
            <p>Quantidade:</p>
            <p>{qtde}</p>
          </div>
        )}
      </div>
      <div className="actions">
        <br />
        <button onClick={handleBack}>Voltar</button>
        <button disabled={disbledButtonAdd()} onClick={addItemOnCart}>
          {item && !isItemAlreadySelected() ? (
            <>Adicionar no carrinho</>
          ) : (
            <>Remover do carrinho</>
          )}
        </button>
      </div>
    </div>
  );
}
