import React, {useEffect} from 'react'
import AccountSidebar from "../components/accounts/AccountSidebar";
import {useDispatch, useSelector} from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";
import {getOrderListByUser} from "../actions/OrderActions";
import {Link} from "react-router-dom";

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
const OrderScreen = (props) => {
    const dispatch = useDispatch()
    const { loading,error,orderList } = useSelector(state => state.getOrderListByUser)

    const calculateTotalPrice =(products)=>{
        return formatter.format(products.reduce((acc,curr) => acc + curr.product.price * curr.quantity,0))
    }

    useEffect(() => {
        dispatch(getOrderListByUser())
    }, [dispatch]);

    return (
    <div className={"order-screen"} style={ACCOUNT_SCREEN_STYLES}>
      <AccountSidebar active={"orders"}/>
        {
            loading || loading==null
                ?
                <div className="loader" style={{flexGrow:1, display:"flex",justifyContent:"center"}}><ClipLoader color={"#A7c080"} size={100} /></div>
                :
        <div className={"orders-manager"}  style={{flexGrow:1}}>
            <h3>Đơn hàng của tôi</h3>
            <table className={"order-table"}>
                <thead >
                <th >Mã đơn hàng</th>
                <th>Ngày mua</th>
                <th>Sản phẩm</th>
                <th>Tổng tiền</th>
                <th>Trạng thái đơn hàng</th>
                </thead>
                <tbody>
                {
                    orderList ? orderList.map(o =>(
                        <tr>
                            <td><Link to={`/account/orders/${o.order._id}`}>{ o.order._id }</Link></td>
                            <td>{new Date(o.order.createdAt).toLocaleDateString()}</td>
                            <td>{o.products[0].product.name}{" "}
                                {o.products.length > 1 ? `và ${o.products.length -1} sản phẩm khác`:"" } </td>
                            <td>{calculateTotalPrice(o.products)}</td>
                            <td>{o.order.status}</td>
                        </tr>
                    )):""
                }
                </tbody>
            </table>
        </div>}
    </div>
  )
}

export default OrderScreen

