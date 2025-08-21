import { e2p } from "../services/authService";
import styles from "./Pagination.module.css";

function Pagination({ currentPage, data,  setCurrentPage }) {

  const totalPages = data?.totalPages || 1;
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className={styles.container}>
      {pages.map((page) => (
        <div>
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={currentPage === page ? styles.active : ""}
          >
            {e2p(page)}
          </button>
        </div>
      ))}
    </div>
  );
}

export default Pagination;
