import { RotatingLines } from "react-loader-spinner";
import {
  getProducts,
  addProduct,
  deleteProduct,
  updateProduct,
  deleteMultiplieProducts,
} from "../services/productService";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Product from "../components/Product";
import AddProductForm from "../components/AddProductForm";
import { useEffect, useState } from "react";
import styles from "./Dashboard.module.css";
import ConfirmModal from "../components/ConfirmModal";
import useDebounce from "../hooks/useDebounce";
import { useSearchParams } from "react-router-dom";
import Pagination from "../components/Pagination";

function Dashboard() {
  const [searchParams , setSearchParams] = useSearchParams();
  const queryClient = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [confirmDeleteMultiple, setConfirmDeleteMultiple] = useState(false);
  const [currentPage, setCurrentPage] = useState(Number(searchParams.get("page")) || 1);
  const [limit] = useState(6);
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [sort , setSort] = useState(searchParams.get("sort") || "")


  

  const debouncedSearch = useDebounce(search, 300);

  const { data, isLoading } = useQuery(
    ["products", currentPage, debouncedSearch , sort],
    () => getProducts(currentPage, limit, debouncedSearch, undefined, undefined, sort),
    {
      onError: (err) => {
        const message =
          err?.response?.data?.message ||
          err.message ||
          "مشکلی در دریافت محصولات پیش آمد";
        toast.error(message);
      },
    }
  );

  useEffect(()=>{
    const params = {};
    if(currentPage > 1) params.page = currentPage;
    if(search) params.search = search;
    if(sort) params.sort = sort;

    setSearchParams(params)
  },[currentPage, search,sort, setSearchParams])

  //--------------------------------------add product
  const mutation = useMutation(addProduct, {
    onSuccess: () => {
      toast.success("محصول با موفقیت اضافه شد");
      queryClient.invalidateQueries({ queryKey: ["products", currentPage] });
      setShowForm(false);
    },
    onError: (err) => {
      toast.error(
        err?.response?.data?.message || err.message || "خطا در افزودن محصول"
      );
    },
  });

  //-------------------------------delete product
  const deleteMutation = useMutation(deleteProduct, {
    onSuccess: () => {
      toast.success("محصول با موفقیت حذف شد!");
      queryClient.invalidateQueries({ queryKey: ["products", currentPage] });
    },
    onError: (err) => {
      toast.error(
        err?.response?.data?.message || err.message || "خطا در حذف محصول"
      );
    },
  });

  //--------------------------------EditProduct
  const updateMutation = useMutation(updateProduct, {
    onSuccess: () => {
      toast.success("محصول با موفقیت ویرایش شد");
      queryClient.invalidateQueries({ queryKey: ["products", currentPage] });
      setEditingProduct(null);
      setShowForm(false);
    },
    onError: (err) => {
      toast.error(
        err?.response?.data?.message || err.message || "خطا در ویرایش محصول"
      );
    },
  });

  //-------------------------------DeleteMultiplieProducts
  const deleteMultipleMutation = useMutation(deleteMultiplieProducts, {
    onSuccess: () => {
      toast.success("محصولات انتخابی باموفقیت حذف شدند!");
      setSelectedProducts([]);
      queryClient.invalidateQueries({ queryKey: ["products", currentPage] });
      setConfirmDeleteMultiple(false);
    },
    onError: (err) => {
      toast.error(
        err?.response?.data?.message || err.message || "خطا در حذف چند محصول"
      );
    },
  });

  const toggleSelectProduct = (id) => {
    setSelectedProducts((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.search}>
        <div className={styles.searchbox}>
          <img src="./search.svg" alt="search icon" />
          <input
            type="text"
            placeholder="جستجو کالا"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
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
        </div>
        <div>
          <select value={sort} onChange={(e)=> setSort(e.target.value)}>
            <option value="">مرتب سازی</option>
            <option value="price_asc">ارزان ترین</option>
            <option value="price_desc">گران ترین</option>
          </select>
        </div>
        <button
          onClick={() => {
            setShowForm(true);
            setEditingProduct(null);
          }}
        >
          افزودن محصول
        </button>
        {selectedProducts.length > 1 && (
          <button
            className={styles.multidelete}
            onClick={() => setConfirmDeleteMultiple(true)}
          >
            {selectedProducts.length}حذف انتخاب ها
          </button>
        )}
      </div>

      {showForm && (
        <AddProductForm
          onSubmit={(formData) => {
            const payload = {
              ...formData,
              price: Number(formData.price),
              quantity: Number(formData.quantity),
            };
            editingProduct
              ? updateMutation.mutate({
                  id: editingProduct.id,
                  productData: payload,
                })
              : mutation.mutate(payload);
          }}
          onClose={() => {
            setShowForm(false);
            setEditingProduct(null);
          }}
          defaultValues={editingProduct || undefined}
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
          <div>
            <RotatingLines strokeWidth="3" />
          </div>
        ) : data?.data?.length ? (
          data.data.map((item) => (
            <Product
              key={item.id}
              data={item}
              deleteHandler={(id) => setConfirmDeleteId(id)}
              editHandler={(product) => {
                setEditingProduct(product);
                setShowForm(true);
              }}
              toggleSelect={toggleSelectProduct}
              selected={selectedProducts.includes(item.id)}
            />
          ))
        ) : (
          <p>محصولی یافت نشد!</p>
        )}
           <div className={styles.pagination}>
        <Pagination currentPage={currentPage} data={data} limit={limit} setCurrentPage={setCurrentPage}/>
        </div>
     
     
      </div>
      {confirmDeleteId && (
        <ConfirmModal
          message="آیا از حذف این محصول مطمئنید؟"
          onConfirm={() => {
            deleteMutation.mutate(confirmDeleteId);
            setConfirmDeleteId(null);
          }}
          onCancel={() => setConfirmDeleteId(null)}
        />
      )}
      {confirmDeleteMultiple && (
        <ConfirmModal
          message={`${selectedProducts.length}محصول انتخابی حذف شوند؟`}
          onConfirm={() => deleteMultipleMutation.mutate(selectedProducts)}
          onCancel={() => setConfirmDeleteMultiple(false)}
        />
      )}
    </div>
  );
}

export default Dashboard;
