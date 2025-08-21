import { RotatingLines } from "react-loader-spinner";
import Product from "../components/Product";
import AddProductForm from "../components/AddProductForm";
import ConfirmModal from "../components/ConfirmModal";
import Pagination from "../components/Pagination";
import styles from "./Dashboard.module.css";

import { useEffect, useReducer } from "react";
import { useSearchParams } from "react-router-dom";
import useDebounce from "../hooks/useDebounce";
import { useProducts } from "../hooks/useProducts";
import { e2p } from "../services/authService";
import {
  dashboardReducer,
  initialDashboardState,
} from "../hooks/dashboardReducer";

function Dashboard() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initial = initialDashboardState({
    page: Number(searchParams.get("page")) || 1,
    search: searchParams.get("search") || "",
    limit: 6,
  });

  const [state, dispatch] = useReducer(dashboardReducer, initial);
  const debouncedSearch = useDebounce(state.search, 300);

  const { data, isLoading, add, update, remove, removeMultiplieProducts } =
    useProducts({
      page: state.currentPage,
      limit: state.limit,
      search: debouncedSearch,
    });

  useEffect(() => {
    const params = {};
    if (state.currentPage > 1) params.page = state.currentPage;
    if (state.search) params.search = state.search;

    setSearchParams(params);
  }, [state.currentPage, state.search, setSearchParams]);

  return (
    <div className={styles.container}>
      <div className={styles.search}>
        <div className={styles.searchbox}>
          <img src="./search.svg" alt="search icon" />
          <input
            type="text"
            placeholder="جستجو کالا"
            value={state.search}
            onChange={(e) =>
              dispatch({ type: "SET_SEARCH", payload: e.target.value })
            }
          />
        </div>
        <div className={styles.line}></div>
        <div className={styles.profile}>
          <img src="./profile.png" alt="profile icon" />
          <div>
            <h4>میلاد اکبری</h4>
            <span>مدیر</span>
          </div>
        </div>
      </div>
      <div className={styles.middle}>
        <div className={styles.setting}>
          <img src="./setting.svg" alt="setting icon" />
          <h5>مدیریت کالا</h5>
          {state.selectedProducts.length > 1 && (
            <button
              className={styles.multidelete}
              onClick={() => dispatch({ type: "OPEN_CONFIRM_MULTIPLE" })}
            >
              حذف محصول ها
            </button>
          )}
        </div>

        <button onClick={() => dispatch({ type: "OPEN_FORM_CREATE" })}>
          افزودن محصول
        </button>
      </div>

      {state.showForm && (
        <AddProductForm
          onSubmit={(formData) => {
            const payload = {
              ...formData,
              price: Number(formData.price),
              quantity: Number(formData.quantity),
            };

            if (state.editingProduct) {
              update.mutate(
                { id: state.editingProduct.id, data: payload },
                {
                  onSuccess: () => {
                    dispatch({ type: "CLOSE_FORM" });
                  },
                }
              );
            } else {
              add.mutate(payload, {
                onSuccess: () => {
                  dispatch({ type: "CLOSE_FORM" });
                },
              });
            }
          }}
          onClose={() => dispatch({ type: "CLOSE_FORM" })}
          defaultValues={state.editingProduct || undefined}
        />
      )}

      <div className={styles.head}>
        <div>
          <span>انتخاب</span>
          <span>نام کالا</span>
          <span>موجودی</span>
          <span>قیمت</span>
          <span>شناسه کالا</span>
        </div>
      </div>
      <div className={styles.products}>
        {isLoading ? (
          <div className={styles.loader}>
            <RotatingLines strokeWidth="3" strokeColor="#0262c2" />
          </div>
        ) : data?.data?.length ? (
          data.data.map((item) => (
            <Product
              key={item.id}
              data={item}
              deleteHandler={(id) =>
                dispatch({ type: "OPEN_CONFIRM_DELETE", payload: id })
              }
              editHandler={(product) =>
                dispatch({ type: "OPEN_FORM_EDIT", payload: product })
              }
              toggleSelect={(id) =>
                dispatch({ type: "TOGGLE_SELECT", payload: id })
              }
              selected={state.selectedProducts.includes(item.id)}
            />
          ))
        ) : (
          <div className={styles.noproduct}>
            <p>محصولی یافت نشد!</p>
          </div>
        )}
        <div className={styles.pagination}>
          <Pagination
            currentPage={state.currentPage}
            data={data}
            limit={state.limit}
            setCurrentPage={(p) => dispatch({ type: "SET_PAGE", payload: p })}
          />
        </div>
      </div>

      {state.confirmDeleteId && (
        <ConfirmModal
          message="آیا از حذف این محصول مطمئنید؟"
          onConfirm={() => {
            remove.mutate(state.confirmDeleteId, {
              onSuccess: () => {
                dispatch({ type: "CLOSE_CONFIRM_DELETE" });
              },
            });
          }}
          onCancel={() => dispatch({ type: "CLOSE_CONFIRM_DELETE" })}
        />
      )}

      {state.confirmDeleteMultiple && (
        <ConfirmModal
          message={`${e2p(
            state.selectedProducts.length
          )} محصول انتخابی حذف شوند؟`}
          onConfirm={() =>
            removeMultiplieProducts.mutate(state.selectedProducts, {
              onSuccess: () => {
                dispatch({ type: "CLEAR_SELECTION" });
                dispatch({ type: "CLOSE_CONFIRM_MULTIPLE" });
              },
            })
          }
          onCancel={() => dispatch({ type: "CLOSE_CONFIRM_MULTIPLE" })}
        />
      )}
    </div>
  );
}

export default Dashboard;
