export default function ItemDetail(props) {
  const { name, price, description } = props;

  return (
    <div className="ItemDetail">
      <div className="item">
        <h2>{name}</h2>
        <p>Descrição: {description}</p>
        <p>Valor: R$ {price.toFixed(2)}</p>
      </div>
    </div>
  );
}
