import React, {useEffect, useState} from 'react'
import AdminSidebar from "../../components/accounts/AdminSidebar";
import {useDispatch, useSelector} from "react-redux";
import {deleteProductAction, listProducts} from "../../actions/productActions";
import {productListReducer} from "../../reducers/ProductReducer";
import {useHistory} from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import ConfirmActionModal from "../../components/modals/ConfirmActionModal";
import Paginations from "../../components/Paginations";

const ACCOUNT_SCREEN_STYLES = {
  display: "flex",
  justifyContent: "space-between",
  width: "100%"
}
var formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'VND',
});

const AdminProductsScreen = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const {loading, error, current, products} = useSelector(state => state.productList)
  const {loading: deleteLoading, error: deleteError, message} = useSelector(state => state.deleteProduct)
  const [product, setProduct] = useState(0)

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const deleteProccess = (id) => {
    setIsDeleteOpen(true)
    setProduct(id)
  }

  const confirmDelete = () => {
    dispatch(deleteProductAction(product))
    setIsDeleteOpen(false)
    history.push("/admin/products")
  }

  useEffect(() => {
    dispatch(listProducts({}, currentPage))
  }, [dispatch, currentPage, message]);

  return (
    <div className={"products-screen"} style={ACCOUNT_SCREEN_STYLES}>
      <AdminSidebar active={"products"} />
      {
        loading || loading == null || deleteLoading
          ?
          <div className="loader" style={{flexGrow: 1, display: "flex", justifyContent: "center"}}><ClipLoader color={"#A7c080"} size={100} /></div>
          :
          <div className={"products-manager"} style={{flexGrow: 1}}>

            {
              isDeleteOpen ?
                <ConfirmActionModal
                  confirm={true}
                  action={"Xóa sản phẩm"}
                  onConfirm={confirmDelete}
                  onClose={() => setIsDeleteOpen(false)}
                  type={"danger"}
                  color={"white"}
                  go={"Xóa"}
                />
                : ""
            }
            <div style={{display: "flex", justifyContent: "space-between"}}>
              <h3>Danh sách sản phẩm</h3>
              <button className={"btn primary-btn lg"}
                onClick={() => history.push(`/admin/products/new`)}>Thêm</button>
            </div>
            <table className={"product-table"} style={{marginBottom: "1.2rem"}}>
              <thead >
                <th>ID</th>
                <th>Hình ảnh</th>
                <th>Tên sản phẩm</th>
                <th>Giá</th>
                <th>Thương hiệu</th>
                <th />
              </thead>
              <tbody>
                {
                  products.specs.map(p => (
                    <tr>
                      <td>{p._id}</td>
                      <td>
                        <div style={{width: "100px"}}>
                          <img src={p.images[0]} style={{width: "100%"}} />
                        </div>
                      </td>
                      <td>{p.name}</td>
                      <td>{formatter.format(p.price)}</td>
                      <td>{p.manufactor}</td>
                      <td>
                        <div className={"edit-delete-btns"}
                          style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                          <button className={"btn primary-btn nm"}
                            onClick={() => history.push(`/admin/products/details/${p._id}`)}>
                            <i className="far fa-edit" />
                          </button>
                          <button className={"btn danger-btn white nm"} onClick={() => deleteProccess(p._id)}>
                            <i className="fas fa-trash" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
            <Paginations total={products.total}
              setcurrentpage={setCurrentPage}
              currentpage={currentPage} />
          </div>
      }
    </div>
  )
}

export default AdminProductsScreen
