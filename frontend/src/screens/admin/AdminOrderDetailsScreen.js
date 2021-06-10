import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {Link, useHistory} from "react-router-dom";
import {getOrderById, updateOrder} from "../../actions/OrderActions";
import AccountSidebar from "../../components/accounts/AccountSidebar";
import ClipLoader from "react-spinners/ClipLoader";
import ConfirmActionModal from "../../components/modals/ConfirmActionModal";
import AddRating from "../../components/AddRating";
import AdminSidebar from "../../components/accounts/AdminSidebar";

const ACCOUNT_SCREEN_STYLES = {
  display: "flex",
  justifyContent: "space-between",
  width: "100%"
}
var formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'VND',
});
const AdminOrderDetailsScreen = ({location}) => {
  const history = useHistory()
  const id = location.pathname.split("/")[3]
  const {loading, error, orderDetails} = useSelector(state => state.getOrderDetails)
  const {loading: updateStatusLoading, message} = useSelector(state => state.updateOrderStatus)
  const [product, setProduct] = useState()
  const [isOpen, setIsOpen] = useState(false);
  const [isCancelOpen, setCancelIsOpen] = useState(false);
  const dispatch = useDispatch()

  const onAddRating = (product) => {
    setProduct(product)
    setIsOpen(true)
  }

  const calculateOrderTotal = () => {
    return orderDetails.products.reduce((acc, curr) => acc + curr.product.price * curr.quantity, 0)
  }

  const cancelOrder = () => {
    dispatch(updateOrder("canceled", id))
    setCancelIsOpen(false)
  }
  const confirmOrder = (status) => {
    dispatch(updateOrder(status, id))
  }

  useEffect(() => {
    dispatch(getOrderById(id))
  }, [dispatch, message]);

  return (
    <div className={"order-details-screen"} style={ACCOUNT_SCREEN_STYLES}>
      <AdminSidebar active={"orders"} />
      {
        loading || loading == null || updateStatusLoading
          ?
          <div className="loader" style={{flexGrow: 1, display: "flex", justifyContent: "center"}}><ClipLoader color={"#A7c080"} size={100} /></div>
          :
          <div className={"order-details-manager"} style={{flexGrow: 1}}>
            <div className={"order-details-header"} >
              <button className={"btn light-btn nm transparent return-btn"}
                onClick={() => history.push("/admin/orders")}>Quay lại</button>
            </div>
            <div className={"order-body"} >
              {
                isCancelOpen ?
                  <ConfirmActionModal
                    confirm={true}
                    action={"hủy đơn hàng"}
                    onConfirm={cancelOrder}
                    onClose={() => setCancelIsOpen(false)}
                    type={"danger"}
                    color={"white"}
                    go={"Hủy"}
                  />
                  : ""
              }
              <p>Chi tiết đơn hàng <span style={{color: "#458588"}}>#{orderDetails.order._id} - </span>
                {orderDetails.order.status === "completed"
                  ? "Hoàn thành"
                  :
                  orderDetails.order.status === "waiting to confirm"
                    ? "Đang chờ xác nhận"
                    :
                      orderDetails.order.status === "paid"
                    ? "Đã thanh toán - Đang chờ xác nhận"
                          :
                    "Đã hủy"
                }</p>
              <div className={"order-details"}>
                <div className={"shipping-address"}>
                  <p>Địa chỉ người nhận</p>
                  <div className={"indicator"} />
                  <p>{orderDetails.order.shippingAddress}</p>
                </div>
                <div className={"payment-methods"}>
                  <p>Hình thức thanh toán</p>
                  <div className={"indicator"} />
                  <p>Thanh toán bằng {orderDetails.order.gateway === "none"
                    ? "tiền mặt"
                    :
                    orderDetails.order.gateway} </p>
                  {orderDetails.order.gateway === "paypal"
                    ? <p>email: {orderDetails.order.paidInfo}</p>
                    : ""}
                  {orderDetails.order.gateway === "stripe"
                    ?
                    <p>Thẻ {orderDetails.order.paidInfo.split(",")[0]}: **** **** **** {orderDetails.order.paidInfo.split(",")[1]}</p> : ""
                  }
                </div>
              </div>
              <div className={"product-list"}>
                <table>
                  <thead>
                    <th>Sản phẩm</th>
                    <th>Giá</th>
                    <th>Số lượng</th>
                    <th>Tổng tiền</th>
                  </thead>
                  <tbody>
                    {
                      orderDetails ? orderDetails.products.map(od => (
                        <tr>
                          <td>
                            <div className={"product-details"}>
                              <div><img src={od.product.images[0]} /></div>
                              <strong><Link to={`/details/${od.product._id}`} >{od.product.name}</Link></strong>
                            </div>
                          </td>
                          <td>{formatter.format(od.product.price)}</td>
                          <td>{od.quantity}</td>
                          <td>{formatter.format(od.quantity * od.product.price)}</td>
                        </tr>
                      )):""
                    }
                  </tbody>
                </table>
              </div>
              <div className={"order-summary"}>
                <div className={"cancel-order"}>
                  {orderDetails.order.status === "completed"
                    ?
                      ""
                      :
                      orderDetails.order.status === "canceled"
                      ? ""
                          :
                    <>
                      <button className={"btn primary-btn nm"}
                        style={{marginRight: "0.6rem"}}
                        onClick={() => confirmOrder("completed")}>
                        Xác nhận đơn hàng
                            </button>
                      <button className={"btn danger-btn white nm"}
                        onClick={() => setCancelIsOpen(true)}>Từ chối đơn hàng</button>
                    </>
                    }
                </div>
                <div className={"order-total"}>
                  <p>Tạm tính: {formatter.format(calculateOrderTotal())}</p>
                  <p>Phí vận chuyển: {formatter.format(orderDetails.order.shippingFee)}</p>
                  <strong><p>Tổng cộng: <span>{formatter.format(calculateOrderTotal() + orderDetails.order.shippingFee)}</span></p></strong>
                </div>
              </div>
              {product ? <AddRating image={product.images[0]} id={product._id} name={product.name} open={isOpen}
                onClose={() => setIsOpen(false)} /> : ""}
            </div>
          </div>}
    </div>
  )
}

export default AdminOrderDetailsScreen

