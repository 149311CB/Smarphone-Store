- **specs**(specifications): <ins>_id</ins>,rom, ram, manufactor,  name, model, make, backCam, frontCam, gpu, chipset, display, resolution, size, simNumber, battery, charger, warantyId, price,images,createAt
    - 

- **users**: <ins>_id</ins>, firstName,lastName, phoneNumber, email, gender, birthday, password,role,createAt

- **addresses**: <ins>_id</ins>, userId, receiverFistName,receiverLastName, receiverPhone, city, district, ward, addressDetail, addressType, isPrimary,createAt

- **order**: <ins>_id</ins>, userId, subTotal, paymentId, addressId, createAt

- **orderDetail**: <ins>_id</ins>, orderId, specId, quantity,total, createAt

- **paymentMethod**: <ins>_id</ins>, userId, paymentType, provider,createdAt

- **payment**:<ins>_id</ins>, paymentMethodId, paymentAmount,paymentAt

- **discount**: <ins>_id</ins>, discountType, discountPercent, minPrice,manufactor, paymentMethodId, discountStart, activeTime,createAt

- **ratings**: <ins>_id</ins>, userId, specId, rating, comment, createAt

- Khi người dùng tiến hành đăng ký, hệ thống sẽ lấy email do người dùng nhập vào và đối chiếu dữ liệu trong bảng `users`, trong trương hợp tìm thấy email trùng với email nhập vào, hệ thống sẽ thông báo lỗi ra màn hình, nếu không, hệ thống sẽ lưu thông tin người dùng vào bảng `user` và gửi email xác nhận về địa chỉ email của người dùng

- Khi người dùng thêm một sản phẩm vào giỏ hàng, hệ thống sẽ lưu thông tin sản phẩm, số lượng của sản phẩm đó cùng với thông tin người dùng vào `local storage`

- Khi người dùng nhấn vào nút `Tiến hành thanh toán`, hệ thống sẽ kiểm tra địa chỉ chính trong bảng `Addresses` và sử dụng địa chỉ đó để làm địa chỉ giao hàng, trường hợp người dùng không có địa chỉ giao hàng chính hoặc chọn thêm địa chỉ giao hàng, hệ thống sẽ lưu thông tin địa chỉ mới vào bảng `Addresses`. Tiếp đó, hệ thống sẽ kiểm tra thông tin thanh toán mặc định của người dùng và sẽ sử dụng phương thức thanh toán bằng tiền mặt nếu như người dùng không có phương thức thanh toán mặc định khác, khi người dùng thêm phương thức thanh toán, hệ thống sẽ lưu kiểu thanh toán và nhà cung cấp(nếu có) vào bảng `paymentMethods`, sau khi nhấn nút đặt mua, hệ thống sẽ lưu thông tin đơn hàng vào bảng `orders` cùng với id của người dùng, sau đó lưu chi tiết đơn hàng(sản phẩm, số lượng) vào bảng `orderDetails` cùng với id đơn hàng. Khi một giao dịch của đơn hàng thành công, hệ thống sẽ lưu thông tin thanh toán cùng với số tiền giao dịch vào bảng `payment`

- Khi người dùng tiến hành đánh giá sản phẩm, hệ thống sẽ vào bảng `order` có chứa id người dùng và kiểm tra liệu người dùng đã mua sản phẩm đó chưa, nếu người dùng đã mua sản phẩm, hệ thống sẽ cho phép người dùng đánh giá và lưu đánh giá của người dùng vào bảng `ratings`