function ConfirmModal({message , onConfirm , onCancel}) {
  return <div>
    <p>{message}</p>
    <div>
        <button onClick={onConfirm}>حذف</button>
        <button onClick={onCancel}>لغو</button>
    </div>
  </div>;
}

export default ConfirmModal;
