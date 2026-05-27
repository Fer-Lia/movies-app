import "./ErrorMessage.css";

export default function ErrorMessage({ message, onRetry }) {
  return (
    <div className="error-message">
      <p className="error-message__text">{message}</p>
      <button className="btn-primary" onClick={onRetry}>
        Reintentar
      </button>
    </div>
  );
}
