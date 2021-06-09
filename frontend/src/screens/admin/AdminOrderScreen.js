import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {deleteOrderByIdAction, getOrderList, getOrderListByUser} from "../../actions/OrderActions";
import AccountSidebar from "../../components/accounts/AccountSidebar";
import ClipLoader from "react-spinners/ClipLoader";
import {Link, useHistory} from "react-router-dom";
import AdminSidebar from "../../components/accounts/AdminSidebar";
import ConfirmActionModal from "../../components/modals/ConfirmActionModal";

const ACCOUNT_SCREEN_STYLES ={
  display:"flex",
  justifyContent:"space-between",
  width:"100%"
}
var formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'VND',
  //These options are needed to round to whole numbers if that's what you want.
  //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});

const AdminOrderScreen = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { loading,error,orderList } = useSelector(state => state.getOrderList)
  const {loading:deleteLoading,message} = useSelector(state => state.deleteOrderById)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [order,setOrder] =useState(0)

  const deleteProccess =(id)=>{
    setIsDeleteOpen(true)
    setOrder(id)
  }
  const confirmDelete=() =>{
    dispatch(deleteOrderByIdAction(order))
    setIsDeleteOpen(false)
  }

  const calculateTotalPrice =(products)=>{
    return formatter.format(products.reduce((acc,curr) => acc + curr.product.price * curr.quantity,0))
  }
  useEffect(() => {
    dispatch(getOrderList())
  }, [dispatch,message]);

  return (
      <div className={"order-screen"} style={ACCOUNT_SCREEN_STYLES}>
        <AdminSidebar active={"orders"}/>
        {

          loading || loading==null || deleteLoading
              ?
              <div className="loader" style={{flexGrow:1, display:"flex",justifyContent:"center"}}><ClipLoader color={"#A7c080"} size={100} /></div>
              :
              <div className={"orders-manager"}  style={{flexGrow:1}}>
                {
                  isDeleteOpen ?
                      <ConfirmActionModal action={"Xóa đơn hàng"}
                                          onConfirm={confirmDelete}
                                          onClose={() => setIsDeleteOpen(false)}
                                          type={"danger"}
                                          color={"white"}
                                          go={"Xóa"}
                      />
                      :""
                }
                <h3>Đơn hàng của tôi</h3>
                <table className={"order-table"}>
                  <thead >
                  <th >Mã đơn hàng</th>
                  <th>Email khách hàng</th>
                  <th>Ngày mua</th>
                  <th>Sản phẩm</th>
                  <th>Tổng tiền</th>
                  <th>Trạng thái đơn hàng</th>
                  <th/>
                  </thead>
                  <tbody>
                  {
                    orderList ? orderList.map(o =>(
                        <tr>
                          <td>{ o.order._id }</td>
                          <td>{o.order.user ? o.order.user.email:""}</td>
                          <td>{new Date(o.order.createdAt).toLocaleDateString()}</td>
                          <td>{o.products[0].product.name}{" "}
                            {o.products.length > 1 ? `và ${o.products.length -1} sản phẩm khác`:"" } </td>
                          <td>{calculateTotalPrice(o.products)}</td>
                          <td>{o.order.status}</td>
                          <td style={{width:"10%"}}>
                            <div className={"edit-delete-btns"}
                                 style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
                              <button className={"btn primary-btn nm"}
                                      onClick={() => history.push(`/admin/orders/${o.order._id}`)}>
                                <i className="far fa-edit"/>
                              </button>
                              <button className={"btn danger-btn white nm"}
                                      onClick={() => deleteProccess(o.order._id)}
                                      >
                                <i className="fas fa-trash"/>
                              </button>
                            </div>
                          </td>
                        </tr>
                    )):""
                  }
                  </tbody>
                </table>
              </div>}
      </div>
  )
}

export default AdminOrderScreen

