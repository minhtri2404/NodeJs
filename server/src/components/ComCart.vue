<template>
    <div>
        <div class="modal-content">
            <h2>GIỎ HÀNG</h2>
            <table style="width: 100%;" class="text-center table">
                <tr>
                    <th>HÌNH</th>
                    <th>SẢN PHẨM</th>
                    <th>Đơn giá</th>
                    <th></th>
                    <th>Số lượng</th>
                    <th></th>
                    <th>Tiền</th>
                    <th></th>
                </tr>
                <tr v-for="item in cart" :key="item.id">
                    <td>
                        <img
                            :src="isExternalUrl(item.image) ? item.image : require(`@/assets/jaystoree_product/${item.image}`)"
                            style="height: 100px; width: 100px;"
                            alt="Product Image"
                        />
                    </td>
                    <td class="align-middle">{{ item.name }} - {{item.selectedSize}}</td>
                    <td class="align-middle">{{ item.price }}</td>
                    <td class="align-middle"><button class="btn btn-danger" @click="reduce(item)">-</button></td>
                    <td class="align-middle">{{ item.quantity }}</td>
                    <td class="align-middle"><button class="btn btn-danger" @click="increase(item)">+</button></td>
                    <td class="align-middle">{{ item.price * item.quantity }}</td>
                </tr>
                <tr>
                    <th></th>
                    <th></th>
                    <th>Tổng tiền: {{ totalAmount }}</th>
                    <th></th>
                    <th>Tổng số lượng: {{ totalQuantity }}</th>
                    <th><button class="btn btn-danger" @click="clearCart">Xóa hết</button></th>
                    <th><button class="btn btn-danger" @click="placeOrder">ĐẶT HÀNG</button></th>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex';

export default {
    data() {
        return {};
    },
    
    computed: {
        ...mapState(['cart']), // Kết nối với giỏ hàng từ Vuex
        ...mapGetters(['totalAmount', 'totalQuantity']), // Kết nối các getters tính tổng tiền và tổng số lượng
    },

    methods: {
        ...mapMutations(['reduceItemQuantity', 'increaseItemQuantity', 'clearCart']), // Kết nối với mutations
        
        reduce(item) {
            this.reduceItemQuantity(item);
        },
        
        increase(item) {
            this.increaseItemQuantity(item);
        },

        placeOrder() {
            if (this.cart.length === 0) {
                alert("Giỏ hàng của bạn trống.");
                return;
            }

            this.$router.push({
                path: '/order',
                query: { cart: JSON.stringify(this.cart), totalAmount: this.totalAmount }
            });
        },

        isExternalUrl(url) {
            return url.startsWith("http://") || url.startsWith("https://");
        },
    }
};
</script>

<style>
/* Thêm các style nếu cần */
</style>