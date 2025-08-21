
import { e2p } from "../services/authService";
import styles from "./Product.module.css";

function Product({ data, deleteHandler, editHandler, toggleSelect, selected }) {
  const { id, name, price, quantity } = data;

  const shortId = id.replace("-").slice(0, 20);
  return (
    <div className={styles.container}>
      <input
        type="checkbox"
        checked={selected}
        onChange={() => toggleSelect(id)}
      />
      <div className={styles.productinfo}>
        <div>
          <p>{name}</p>
        </div>
        <div>
          <p>{e2p(quantity)} عدد</p>
        </div>
        <div>
          <p>{e2p(price)} هزارتومان</p>
        </div>
        <div >
          <p>{shortId}</p>
        </div>
      </div>
      <div className={styles.action}>
        <button onClick={() => editHandler(data)}>
          <img src="./edit.svg" alt="edit icon" />
        </button>
        <button onClick={() => deleteHandler(id)}>
          <img src="./trash.svg" alt="trash icon" />
        </button>
      </div>
    </div>
  );
}

export default Product;
