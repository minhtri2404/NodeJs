<template>
    <div class="checkout-container">
        <h2>THANH TOÁN ĐƠN HÀNG</h2>
        <div class="checkout-columns">

            <!-- Cột chi tiết giỏ hàng -->
            <div class="cart-details">
        <table style="width: 100%;" class="text-center table">
            <tr>
                <th>HÌNH</th>
                <th>Sản phẩm</th>
                <th>Số lượng</th>
                <th>Đơn giá</th>
                <th>Thành tiền</th>
            </tr>

            <tr v-for="item in cart" :key="item.id">
                <td>
                        <img
                            :src="isExternalUrl(item.image) ? item.image : require(`@/assets/jaystoree_product/${item.image}`)"
                            style="height: 100px; width: 100px;"
                            alt="Product Image"
                        />
                    </td>
                <td>{{ item.name }} - {{item.selectedSize}}</td>
                <td>{{ item.quantity }}</td>
                <td>{{ item.price }}</td>
                <td>{{ item.price * item.quantity }}</td>
            </tr>

            <tr>
                <td colspan="5"><strong>Tổng tiền: {{totalAmount}}</strong></td>
      
            </tr>
        </table>
        </div>

        <!-- Cột chi tiết thông tin khách hàng -->
            <div class="customer-info">
        <div class="form-group">
            <label>Tên người nhận:</label>
            <input v-model="customerInfo.name" type="text" class="form-control" required />

            <label>Email:</label>
            <input v-model="customerInfo.email" type="email" class="form-control" required />

            <label>Địa chỉ:</label>
            <input v-model="customerInfo.address" type="text" class="form-control" required />

            <label>Số điện thoại:</label>
            <input v-model="customerInfo.phone" type="tel" class="form-control" required />

            <label>Phương thức thanh toán:</label>
            <select v-model="customerInfo.paymentMethod" class="form-control">
                <option value="Chuyển khoản">Chuyển khoản</option>
                <option value="Tiền mặt">Tiền mặt</option>
            </select>
        </div>

        <!-- hoàn tất Thanh toán -->
        <button @click="completeOrder" class="btn btn-success mt-3">Hoàn tất đơn hàng</button>
    </div>
    </div>
    </div>
</template>

<script>
import axios from 'axios';
import { mapState, mapMutations } from 'vuex';

export default {
    data() {
        return { 
            totalAmount: this.$route.query.totalAmount || 0,   // lấy tổng tiền từ params
            customerInfo: {
                name: '',
                email: '',
                address: '',
                phone: '',
                paymentMethod: 'Tiền mặt',
            }
        };
    },

    computed:{
        ...mapState(['cart']),              // Kết nối với giỏ hàng từ Vuex
    },

    methods: {

        ...mapMutations(['clearCart']),      // sử dụng mutations để clear cart


        // phương thức thanh toán
        async completeOrder() {
            if (!this.customerInfo.name || !this.customerInfo.address || !this.customerInfo.phone) {
                alert("Vui lòng điền đầy đủ thông tin cá nhân.");
                return;
            }
            
            // Gửi yêu cầu thanh toán đến phía backend
            try {
                const response = await axios.post('http://localhost:3000/orders', {
                    customerInfo: this.customerInfo,
                    cartItems: this.cart,
                    totalAmount: this.totalAmount
                });

                console.log(response);  // Log đầy đủ response để xem chi tiết

                // Kiểm tra phản hồi từ backend
                if (response.data.success) {
                    alert("Đặt hàng thành công!");

                    // Reset giỏ hàng
                    this.clearCart();

                    // Điều hướng đến trang giỏ hàng (hoặc trang xác nhận)
                    this.$router.push({ name: 'Cart' });
                } else {
                    alert("Có lỗi xảy ra khi đặt hàng.");
                }
            } catch (error) {
                console.error('Lỗi khi gửi yêu cầu thanh toán', error);
                alert("Có lỗi xảy ra khi gửi yêu cầu thanh toán.");
            }
            
        },

        isExternalUrl(url) {
            return url.startsWith("http://") || url.startsWith("https://");
        },
    }
};
</script>


<style scoped>
.checkout-container {
    max-width: 1500px;
    margin: auto;
    padding: 20px;
}

.checkout-columns {
    display: flex;
    gap: 150px;
}

.cart-details, .customer-info {
    flex: 1;
}

.cart-details table {
    width: 100%;
    border-collapse: collapse;
}

.cart-details th, .cart-details td {
    padding: 10px;
    border: 1px solid #ddd;
}

.cart-details .product-image {
    height: 80px;
    width: 80px;
    object-fit: cover;
}

.total-amount {
    text-align: right;
    padding-top: 10px;
}

.customer-info .form-group {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.customer-info .form-group label {
    font-weight: bold;
    margin-bottom: 5px;
}

.customer-info .form-control {
    padding: 8px;
    border-radius: 4px;
    border: 1px solid #ccc;
}

.btn-success {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    font-weight: bold;
    margin-top: 20px;
}
</style>