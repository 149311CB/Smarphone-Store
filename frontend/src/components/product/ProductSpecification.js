import React from 'react'
import {useSelector} from 'react-redux'

const ProductSpecification = () => {
  const {loading, error, product} = useSelector(state => state.productDetail)
  return (
    <>
      {Object.keys(product).length > 0 ?
        <div className="specifications">
          <div className="indicator"></div>
          <h4>Thông tin chi tiết</h4>
          <div className="table-container">
            <table>
              <tbody>
                <tr>
                  <td className="left-col">Camera trước</td>
                  <td>{product.frontCam}</td>
                </tr>
                <tr>
                  <td className="left-col">Camera sau</td>
                  <td>{product.backCam}</td>
                </tr>
                <tr>
                  <td className="left-col">Màn hình</td>
                  <td>{product.display}</td>
                </tr>
                <tr>
                  <td className="left-col">Độ phân giải</td>
                  <td>{product.resolution}</td>
                </tr>
                <tr>
                  <td className="left-col">Kích thước màn hình</td>
                  <td>{product.size}</td>
                </tr>
                <tr>
                  <td className="left-col">Cổng sạc</td>
                  <td>{product.charger}</td>
                </tr>
                <tr>
                  <td className="left-col">Số lượng sim</td>

                  <td>{product.simNumber}</td>
                </tr>
                <tr>
                  <td className="left-col">Chipset</td>
                  <td>{product.chipset}</td>
                </tr>
                <tr>
                  <td className="left-col">Chip đồ họa</td>
                  <td>{product.gpu}</td>
                </tr>
                <tr>
                  <td className="left-col">Nhà sản xuất</td>
                  <td>{product.manufactor}</td>
                </tr>
                <tr>
                  <td className="left-col">Xuất xứ</td>
                  <td>{product.make}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        : ""}
    </>
  )
}

export default ProductSpecification

