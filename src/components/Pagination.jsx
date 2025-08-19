import styles from "./Pagination.module.css";

function Pagination({ currentPage, data, limit, setCurrentPage }) {
  console.log(data?.totalPages);
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
            {page}
          </button>
        </div>
      ))}
    </div>
  );
}

export default Pagination;
