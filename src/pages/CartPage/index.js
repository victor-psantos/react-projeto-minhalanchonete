import { useContext, useState } from "react";
import axios from "axios";
import CartContext from "../../contexts/CartContext";

import "./CartPage.css";
import { useNavigate } from "react-router-dom";

export default function CartPage() {
  const { cart, setCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [email, setEmail] = useState("");
  const [cep, setCep] = useState("");
  const [address, setAddress] = useState("");
  const [numberAddress, setNumberAddress] = useState("");
  const [complement, setComplement] = useState("");
  const [district, setDistrict] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const order = {
      name,
      date,
      email,
      cep,
      address,
      numberAddress,
      complement,
      district,
      city,
      state,
      items: cart,
    };

    const promise = axios.post(
      `${process.env.REACT_APP_BACKEND_URI}/orders`,
      order
    );
    promise.then((response) => {
      alert("Pedido Confirmado!");
      setName("");
      setAddress("");
      setEmail("");
      setDate("");
      setCep("");
      setNumberAddress("");
      setComplement("");
      setDistrict("");
      setCity("");
      setState("");
      setCart([]);
      navigate("/");
    });
    promise.catch((erro) => {
      alert("Erro ao registrar pedido!");
      console.log("error", erro);
    });
  }

  function getDataAddress() {
    if (cep.length === 8) {
      const promise = axios.get(
        `${process.env.REACT_APP_BACKEND_BUSCA_CEP}/${cep}/json/`
      );
      promise.then((response) => setCompleteAddress(response.data));
      promise.catch((erro) => console.log("error", erro));
    }
  }

  function setCompleteAddress(data) {
    setAddress(data.logradouro);
    setCity(data.localidade);
    setDistrict(data.bairro);
    setState(data.uf);
  }

  function getTotalValueCart() {
    let totalValue = 0;
    cart.map((item) => {
      totalValue += item.price * item.quantity;
    });
    return totalValue.toFixed(2);
  }

  function disbledButtonCompra() {
    if (
      cart.length === 0 ||
      !name ||
      !email ||
      !date ||
      !address ||
      !numberAddress
    )
      return true;
    return false;
  }

  function disableDadosEntrega() {
    let classe = "dadosEntrega";
    if (cart.length === 0) classe = "dadosEntrega disabledDados";

    return classe;
  }

  function getTableCart() {
    return (
      <table className="tableCart">
        <thead>
          <tr>
            <th>Item</th>
            <th>Quantidade</th>
            <th>Valor</th>
            <th>Valor Total</th>
          </tr>
        </thead>
        <tbody>
          {cart.length > 0 ? (
            cart.map((item) => (
              <tr>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td> R$ {item.price.toFixed(2)}</td>
                <td> R$ {(item.price * item.quantity).toFixed(2)}</td>
              </tr>
            ))
          ) : (
            <tr>Não há itens selecionados</tr>
          )}
        </tbody>
      </table>
    );
  }

  return (
    <div className="CartPage">
      <h1>Carrinho de compras:</h1>
      <div className="Cart">{getTableCart()}</div>
      <div className="valorTotal">
        <h2>Valor Total do carrinho: {getTotalValueCart()}</h2>
      </div>
      <div className={disableDadosEntrega()}>
        <h1>Dados de entrega:</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Nome: </label>
            <input
              name="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></input>
          </div>
          <div>
            <label htmlFor="email">Email: </label>
            <input
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </div>
          <div>
            <label htmlFor="date">Data de Nascimento: </label>
            <input
              name="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            ></input>
          </div>
          <div>
            <label htmlFor="cep">CEP: </label>
            <input
              name="cep"
              type="text"
              value={cep}
              onChange={(e) => setCep(e.target.value)}
              onBlur={getDataAddress}
            ></input>
          </div>
          <div>
            <label htmlFor="address">Endereço: </label>
            <input name="address" type="text" value={address} disabled></input>
          </div>
          <div>
            <label htmlFor="numberAddress">Numero: </label>
            <input
              name="numberAddress"
              type="text"
              value={numberAddress}
              onChange={(e) => setNumberAddress(e.target.value)}
            ></input>
          </div>
          <div>
            <label htmlFor="complement">Complemento: </label>
            <input
              name="complement"
              type="text"
              value={complement}
              onChange={(e) => setComplement(e.target.value)}
            ></input>
          </div>
          <div>
            <label htmlFor="district">Bairro: </label>
            <input
              name="district"
              type="text"
              value={district}
              disabled
            ></input>
          </div>
          <div>
            <label htmlFor="city">Cidade: </label>
            <input name="city" type="text" value={city} disabled></input>
          </div>
          <div>
            <label htmlFor="state">Estado: </label>
            <input name="state" type="text" value={state} disabled></input>
          </div>
          <div className="divBtnCompra">
            <button
              className="btnCompra"
              type="submit"
              disabled={disbledButtonCompra()}
            >
              Confirmar compra
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
