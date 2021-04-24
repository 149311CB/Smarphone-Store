- **Specs**(specifications): <ins>_id</ins>,romId, ramId, manufactorId, discountId, name, model, make, backCam, frontCam, gpu, chipset, display, resolution, size, simNumber, battery, charger, warantyId, price

- **Users**: <ins>_id</ins>, fullName, phoneNumber, email, sex, birthday, password

- **Addresses**: <ins>_id</ins>, userId, receiverName, receiverPhone, city, district, subDistrict, addressDetail, addressType, isPrimary

- **PaymentMethod**: <ins>_id</ins>, userId, paymentType, provider

- **CartItems**: <ins>_id</ins>, specId, quantity, createAt

- **Order**: <ins>_id</ins>, userId, total, paymentMethod, addressId, createAt, isPaid

- **OrderDetail**: <ins>_id</ins>, orderId, specId, quantity, createAt

- **Discount**: <ins>_id</ins>, discountType, discountPercent, minPrice, paymentMethodId, discountStart, activeTime

- **Ratings**: <ins>_id</ins>, userId, specId, rating, comment

- Khi người dùng thêm một sản phẩm vào giỏ hàng, hệ thống sẽ lưu thông tin sản phẩm, số lượng của sản phẩm đó cùng với thông tin người dùng vào `local storage` sau đó lưu vào bảng `cartItems`

- Khi người dùng nhấn vào nút `Tiến hành thanh toán`, hệ thống sẽ kiểm tra địa chỉ chính trong bảng `Addresses` và sử dụng địa chỉ đó để làm địa chỉ giao hàng, trường hợp người dùng không có địa chỉ giao hàng chính hoặc chọn thêm địa chỉ giao hàng, hệ thống sẽ lưu thông tin địa chỉ mới vào bảng `Addresses`. Tiếp đó, hệ thống sẽ kiểm tra thông tin thanh toán mặc định của người dùng và sẽ sử dụng phương thức thanh toán bằng tiền mặt nếu như người dùng không có phương thức thanh toán mặc định, khi người dùng thêm phương thức thanh toán, hệ thống sẽ lưu kiểu thanh toán và nhà cung cấp(nếu có) vào bảng `paymentMethods`, sau khi nhấn nút đặt mua, hệ thống sẽ lưu thông tin đơn hàng vào bảng `orders` cùng với id của người dùng, sau đó lưu chi tiết đơn hàng(sản phẩm, số lượng) vào bảng `orderDetails` cùng với id đơn hàng.

- Khi người dùng tiến hành đánh giá sản phẩm, hệ thống sẽ vào bảng `order` có chứa id người dùng và kiểm tra liệu người dùng đã mua sản phẩm đó chưa, nếu người dùng đã mua sản phẩm, hệ thống sẽ cho phép người dùng đánh giá và lưu đánh giá của người dùng vào bảng `ratings`