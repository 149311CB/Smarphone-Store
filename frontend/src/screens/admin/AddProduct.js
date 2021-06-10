import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import axios from "axios";
import {createProductAction, updateProductAction} from "../../actions/productActions";
import AdminSidebar from "../../components/accounts/AdminSidebar";
import ClipLoader from "react-spinners/ClipLoader";
import ConfirmActionModal from "../../components/modals/ConfirmActionModal";
import {getWarrantyListAction} from "../../actions/warrantyActions";
import {CREATE_PRODUCT_RESET} from "../../constants/ProductConstants";

const ACCOUNT_SCREEN_STYLES = {
  display: "flex",
  justifyContent: "space-between",
  width: "100%"
}
var formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'VND',
});
const AddProduct = ({location}) => {
  const dispatch = useDispatch()
  const history = useHistory()

  const {userInfo} = useSelector(state => state.userLogin)
  const {loading, warrantyList} = useSelector(state => state.getWarrantyList)
  const {loading: createLoading, error: createError, message} = useSelector(state => state.createProduct)

  const [name, setName] = useState()
  const [price, setPrice] = useState(0);
  const [model, setModel] = useState("");
  const [manufactor, setManufactor] = useState("");
  const [make, setMake] = useState("");
  const [backCam, setBackCam] = useState("");
  const [frontCam, setFrontCam] = useState("");
  const [display, setDisplay] = useState("");
  const [resolution, setResolution] = useState("");
  const [size, setSize] = useState("");
  const [chipset, setChipset] = useState("");
  const [gpu, setGpu] = useState("");
  const [charger, setCharget] = useState("");
  const [battery, setBattery] = useState("");
  const [simNumber, setSimNumber] = useState("");
  const [rom, setRom] = useState("");
  const [ram, setRam] = useState("");
  const [images, setImages] = useState([])
  const [localImages, setLocalImages] = useState([])
  const [uploading, setUploading] = useState(false)
  const [warranty, setWarranty] = useState("");
  const [isOpen,setIsOpen] = useState(false)
  const [countInStock, setCountInStock] = useState(0)

  const pushImage = (e) => {
    setImages([...images, e.target.value])
    setLocalImages([...localImages, e.target.value])
  }

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    setUploading(true)

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }

      const {data} = await axios.post('/api/upload', formData, config)
      setLocalImages([...localImages, data])

      setImages([...images, data])
      setUploading(false)
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }
  const submitHandler = (e) => {
    e.preventDefault()
    const createProduct = {
      name, price, model, manufactor, make, backCam, frontCam,
      display, resolution, size, chipset, gpu, charger, battery, simNumber, rom, ram,
      warranty, images, countInStock
    }
    dispatch(createProductAction(createProduct))
  }

  useEffect(() => {
      if(typeof loading == "undefined" && !warrantyList){
        dispatch(getWarrantyListAction())
      }else if(message === "Product created"){
        dispatch({type:CREATE_PRODUCT_RESET})
        setIsOpen(true)
      }
  }, [dispatch,message]);

  return (
    <>
      <div className={"product-details-screen"} style={ACCOUNT_SCREEN_STYLES}>
        {
          isOpen &&
        <ConfirmActionModal
            action={"Thêm sản phẩm thành công"}
            onConfirm={() => setIsOpen(false)}
            onClose={() => setIsOpen(false)}
            type={"danger"}
            color={"white"}
            go={"Hủy"}
        /> }
        <AdminSidebar active={"products"} />
        {
          loading || loading == null || createLoading
            ?
            <div className="loader"
              style={{flexGrow: 1, display: "flex", justifyContent: "center"}}>
              <ClipLoader color={"#A7c080"} size={100} />
            </div>
            :
            <div className={"product-manager"} style={{flexGrow: 1}}>
              <button className={"btn light-btn transparent nm"}
                style={{marginBottom: "0.6rem"}}
                onClick={() => history.push("/admin/products")}>Quay lại</button>
              <form onSubmit={submitHandler}>
                <div className={"form-group"}>
                  <label htmlFor={"product-name"}>
                    Tên sản phẩm
                                  </label>
                  <input id={"product-name"} type={"text"}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  {createError && createError.includes("name") && <div className={"form-error"}>Name is required</div>}
                </div>
                <div className={"form-group"}>
                  <label htmlFor={"product-price"}>
                    Giá thành
                                  </label>
                  <input id={"product-price"} type={"number"}
                    min="0"
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                  />
                  {createError && createError.includes("price") && <div className={"form-error"}>Price is required</div>}
                </div>
                <div className={"form-group"}>
                  <label htmlFor={"count-in-stock-input"}>Số lượng</label>
                  <input type={"number"}
                    min="0"
                    id={"count-in-tock-input"}
                    value={countInStock}
                    onChange={e => setCountInStock(e.target.value)} />
                </div>
                <div className={"form-group upload-image-form"}>
                  <label>Hình ảnh</label>
                  <input type={"text"}
                    placeholder={"Enter image url"}
                    value={images}
                    onChange={(e) => pushImage(e)} />
                  <input type={"file"}
                    id={"image-file"}
                    label={"Choose file"}
                    onChange={uploadFileHandler} />
                </div>
                <div className={"image-list-container"}>
                  {
                    localImages.map(i => (
                      <div>
                        <img src={i} />
                      </div>
                    ))
                  }
                </div>
                <div className={"form-group"}>
                  <label htmlFor={"product-model"}>
                    Model
                                  </label>
                  <input id={"product-model"} type={"text"}
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                  />
                  {createError && createError.includes("model") && <div className={"form-error"}>Model is required</div>}
                </div>
                <div className={"form-group"}>
                  <label htmlFor={"product-manufactor"}>
                    Nhà sản xuất
                                  </label>
                  <input id={"product-manufactor"} type={"text"}
                    value={manufactor}
                    onChange={e => setManufactor(e.target.value)}
                  />
                  {createError && createError.includes("manufactor") && <div className={"form-error"}>Manufactor is required</div>}
                </div>
                <div className={"form-group"}>
                  <label htmlFor={"product-make"}>
                    Nơi sản xuất
                                  </label>
                  <input id={"product-make"} type={"text"}
                    value={make}
                    onChange={e => setMake(e.target.value)}
                  />
                  {createError && createError.includes("manufactor") && <div className={"form-error"}>Maker is required</div>}
                </div>
                <div className={"form-group"}>
                  <label htmlFor={"product-backcam"}>
                    Camera sau
                                  </label>
                  <input id={"product-backcam"} type={"text"}
                    value={backCam}
                    style={{width: "50%"}}
                    onChange={e => setBackCam(e.target.value)}
                  />
                  {createError && createError.includes("manufactor") && <div className={"form-error"}>Back Camera is required</div>}
                </div>
                <div className={"form-group"}>
                  <label htmlFor={"product-frontcam"}>
                    Camera trước
                                  </label>
                  <input id={"product-frontcam"} type={"text"}
                    value={frontCam}
                    style={{width: "50%"}}
                    onChange={e => setFrontCam(e.target.value)}
                  />
                  {createError && createError.includes("manufactor") && <div className={"form-error"}>Front Camera is required</div>}
                </div>
                <div className={"form-group"}>
                  <label htmlFor={"product-display"}>
                    Công nghệ màn hình
                                  </label>
                  <input id={"product-display"} type={"text"}
                    value={display}
                    onChange={e => setDisplay(e.target.value)}
                  />
                  {createError && createError.includes("manufactor") && <div className={"form-error"}>Display is required</div>}
                </div>
                <div className={"form-group"}>
                  <label htmlFor={"product-display"}>
                    Độ phân giải
                                  </label>
                  <input id={"product-display"} type={"text"}
                    value={resolution}
                    onChange={e => setResolution(e.target.value)}
                  />
                  {createError && createError.includes("manufactor") && <div className={"form-error"}>Resolution is required</div>}
                </div>
                <div className={"form-group"}>
                  <label htmlFor={"product-size"}>
                    Kích thước màn hình
                                  </label>
                  <input id={"product-size"} type={"number"}
                    min="0"
                    step="any"
                    value={size}
                    onChange={e => setSize(e.target.value)}
                  />
                  {createError && createError.includes("manufactor") && <div className={"form-error"}>Size is required</div>}
                </div>
                <div className={"form-group"}>
                  <label htmlFor={"product-chipset"}>
                    Chipset
                                  </label>
                  <input id={"product-chipset"} type={"text"}
                    value={chipset}
                    onChange={e => setChipset(e.target.value)}
                  />
                  {createError && createError.includes("manufactor") && <div className={"form-error"}>Chipset is required</div>}
                </div>
                <div className={"form-group"}>
                  <label htmlFor={"product-gpu"}>
                    Gpu
                                  </label>
                  <input id={"product-gpu"} type={"text"}
                    value={gpu}
                    onChange={e => setGpu(e.target.value)}
                  />
                  {createError && createError.includes("manufactor") && <div className={"form-error"}>Gpu is required</div>}
                </div>
                <div className={"form-group"}>
                  <label htmlFor={"product-charger"}>
                    Cổng sạc
                                  </label>
                  <input id={"product-charger"} type={"text"}
                    value={charger}
                    onChange={e => setCharget(e.target.value)}
                  />
                  {createError && createError.includes("manufactor") && <div className={"form-error"}>Charger is required</div>}
                </div>
                <div className={"form-group"}>
                  <label htmlFor={"product-battery"}>
                    Pin
                                  </label>
                  <input id={"product-battery"} type={"text"}
                    value={battery}
                    onChange={e => setBattery(e.target.value)}
                  />
                  {createError && createError.includes("manufactor") && <div className={"form-error"}>Battery is required</div>}
                </div>
                <div className={"form-group"}>
                  <label htmlFor={"product-sim"}>
                    Số lượng sim
                                  </label>
                  <input id={"product-sim"} type={"number"}
                    min="0"
                    value={simNumber}
                    onChange={e => setSimNumber(e.target.value)}
                  />
                  {createError && createError.includes("manufactor") && <div className={"form-error"}>Sim number is required</div>}
                </div>
                <div className={"form-group"}>
                  <label htmlFor={"product-rom"}>
                    Rom
                                  </label>
                  <input id={"product-rom"} type={"number"}
                    min="0"
                    value={rom}
                    onChange={e => setRom(e.target.value)}
                  />
                </div>
                <div className={"form-group"}>
                  <label htmlFor={"product-ram"}>
                    Ram
                                  </label>
                  <input id={"product-ram"} type={"number"}
                    min="0"
                    value={ram}
                    onChange={e => setRam(e.target.value)}
                  />
                </div>
                <div className={"form-group"}>
                  <label htmlFor={"warranty-selector"}>
                    Loại bảo hành
                                  </label>
                  <select onChange={e => setWarranty(e.target.value)}>
                    {
                      warrantyList.map(w =>
                        <option value={w._id}>
                          {w.warrantyType} {w.time} tháng
                                              </option>
                      )
                    }
                  </select>
                </div>

                <button className={"btn primary-btn lg"}>Lưu</button>
              </form>
            </div>
        }
      </div>
    </>
  )
}

export default AddProduct

