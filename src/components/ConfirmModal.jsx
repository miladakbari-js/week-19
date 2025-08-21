import styles from "./ConfirmModal.module.css"

function ConfirmModal({ message, onConfirm, onCancel }) {
  return (
    <div className={styles.overlay}>
    <div className={styles.modal}>

    <div className={styles.container}>
      <img src="./close.svg" alt="close icon" />
      <p>{message}</p>
      <div className={styles.control}>
        <button onClick={onConfirm} style={{backgroundColor:"#F43F5E", color:"#fff"}}>حذف</button>
        <button onClick={onCancel}>لغو</button>
      </div>
    </div>
    </div>
    </div>
  );
}

export default ConfirmModal;
