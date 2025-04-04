<template>
    <footer>
         <div class="footer-container">
             <div class="footer-column">
                 <h5>THÔNG TIN MÓN ĂN</h5>
                 <p>Món: Bánh Xèo</p>
                 <p>Đặc điểm: Món ăn truyền thống, giòn, thơm, ngon</p>
                 <p>Nguyên liệu: Bột gạo, tôm, thịt ba chỉ, rau sống, nước mắm chua ngọt</p>
             </div>
             <div class="footer-column">
                 <h5>CHÍNH SÁCH</h5>
                 <ul>
                     <li><a href="#">Chính sách sử dụng món ăn</a></li>
                     <li><a href="#">Hướng dẫn thưởng thức món ăn</a></li>
                     <li><a href="#">Phương thức thanh toán</a></li>
                     <li><a href="#">Chính sách giao nhận - vận chuyển</a></li>
                     <li><a href="#">Chính sách đổi và bảo hành món ăn</a></li>
                 </ul>
             </div>
             <div class="footer-column">
                 <h5>THÔNG TIN LIÊN HỆ</h5>
                 <p>Nhà hàng: Bánh Xèo Ngon</p>
                 <p>Số điện thoại: 0935297000 (10h -18h)</p>
                 <p>Website: banhxegon.vn</p>
                 <p>Email: info@banhxegon.vn</p>
             </div>
 
             <div class="footer-column">
                 <h5>THEO DÕI CHÚNG TÔI TRÊN MẠNG XÃ HỘI</h5>
                 <ul>
                     <li><a href="https://www.facebook.com/banhxegon" target="_blank" rel="noopener noreferrer">Facebook</a></li>
                     <li><a href="https://www.instagram.com/banhxegon/" target="_blank" rel="noopener noreferrer">Instagram</a></li>
                 </ul>
             </div>
         </div>
     </footer>
 </template>
 

<script>
export default {

}
</script>

<style scoped>
.footer-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: flex-start;
    background-color: #E3F2FD; /* Nền xanh nhạt */
    color: #1976D2; /* Chữ xanh đậm */
    padding: 30px 40px;
    gap: 20px;
    border-top: 2px solid #64B5F6; /* Đường kẻ xanh nhạt trên cùng */
}

.footer-column {
    flex: 1 1 calc(25% - 20px);
    min-width: 200px;
    text-align: left;
}

.footer-column h4 {
    font-size: 18px;
    margin-bottom: 15px;
    color: #1976D2; /* Chữ xanh đậm */
    text-transform: uppercase;
    border-bottom: 1px solid #64B5F6; /* Đường kẻ xanh nhạt dưới tiêu đề */
    padding-bottom: 5px;
}

.footer-column p,
.footer-column ul li {
    font-size: 14px;
    margin-bottom: 10px;
    line-height: 1.6;
    color: #333; /* Chữ xám đậm dễ đọc */
}

.footer-column ul {
    list-style-type: none;
    padding: 0;
}

.footer-column ul li a {
    text-decoration: none;
    color: #1976D2; /* Chữ xanh đậm */
    transition: color 0.3s ease;
}

.footer-column ul li a:hover {
    color: #64B5F6; /* Đổi sang xanh nhạt khi hover */
}

.footer-column:last-child ul {
    display: flex;
    gap: 10px;
}

.footer-column:last-child ul li a {
    color: #1976D2; /* Màu xanh đậm mặc định */
    font-size: 16px;
    transition: color 0.3s ease, transform 0.3s ease;
}

.footer-column:last-child ul li a:hover {
    color: #64B5F6; /* Xanh nhạt khi hover */
    transform: scale(1.1);
}

.footer-container p {
    color: #333; /* Chữ xám đậm */
    text-align: left;
}

@media (max-width: 768px) {
    .footer-container {
        flex-direction: column;
        gap: 30px;
    }
}
</style>
