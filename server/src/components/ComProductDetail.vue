<template>
    <main class="product-detail-container">
        <div v-if="loading" class="loading">Loading...</div>
        <div v-if="!loading && product" class="product-content">

            <!-- Hình ảnh sản phẩm -->
            <div class="product-image">
                <img
                :src="isExternalUrl(product.image) ? product.image : require(`@/assets/jaystoree_product/${product.image}`)"
                alt="Product Image"
                />
            </div>

            <!-- Thông tin sản phẩm -->
            <div class="product-info">
                <h2 class="product-name">{{ product.name }}</h2>
                <p class="product-price">
                    <span v-if="product.discount" class="discount-price">
                        {{ formatPrice(product.price - product.discount) }}
                    </span>
                    <span v-if="product.discount" class="original-price">{{ formatPrice(product.price) }}</span>
                    <span v-else>{{ formatPrice(product.price) }}</span>
                </p>

                <!-- SKU và các thông tin khác -->
                <p class="product-description">{{ product.description }}</p>

                <!-- Chọn kích thước
                <div class="product-size">
                    <label for="size">Chọn kích thước: </label>
                    <select v-model="selectedSize" id="size">
                        <option v-for="size in product.size" :key="size" :value="size">
                            {{ size }}
                        </option>
                    </select>
                </div> -->

                <!-- Số lượng và nút thêm giỏ hàng -->
                <div class="product-actions">
                    <button class="add-to-cart" @click="addToCart(product)">THÊM VÀO GIỎ</button>
                </div>
            </div>
        </div>

        <!-- Nếu sản phẩm không tải được -->
        <div v-if="!loading && !product" class="error-message">Product Not Found</div>
    </main>
</template>


<script>
import axios from 'axios';
import { mapMutations } from 'vuex';

export default {
  name: "ComProductDetail",
  
  data() {
    return {
      product: null,
      loading: true,
      selectedSize: '', // Biến lưu trữ kích thước đã chọn
    };
  },

  methods: {
    ...mapMutations(['addToCart']),

    formatPrice(price) {
            return new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND',
            }).format(price);
        },

      // Thêm sản phẩm vào giỏ hàng với kích thước đã chọn
    addToCart(product) {
      
        // Tạo một đối tượng sản phẩm mới với thông tin về kích thước
        const cartItem = {
          ...product,
          selectedSize: this.selectedSize,  // Lưu kích thước đã chọn vào sản phẩm
          quantity: 1  // Đặt số lượng mặc định là 1
        };

        // Gọi mutation để thêm sản phẩm vào giỏ hàng
        this.$store.commit('addToCart', cartItem); // Gọi mutation addToCart từ Vuex
      
    },

    // lấy dữ liệu từ phía backend (cơ sở dữ liệu theo id)
    fetchProduct() {
      const id = this.$route.params.id; // Lấy id từ URL
      axios.get(`http://localhost:3000/api/products/${id}`)
        .then(response => {
          this.product = response.data;
          this.loading = false;
        })
        .catch(error => {
          console.error('Failed to fetch product: ', error);
          this.loading = false;
        });
    },

    isExternalUrl(url) {
      return url.startsWith("http://") || url.startsWith("https://");
    },


  },

  // Khi component đã được mount, thực hiện việc gọi API
  mounted() {
    this.fetchProduct();
  }
};
</script>

<style scoped>
.product-detail-container {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    background-color: #f8f8f8;
}

.product-content {
    display: flex;
    gap: 30px;
    max-width: 1000px;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    padding: 20px;
}

.product-image img {
    width: 100%;
    max-width: 400px;
    border-radius: 8px;
}

.product-info {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.product-name {
    font-size: 24px;
    font-weight: bold;
}

.product-price {
    font-size: 20px;
    color: #d32f2f;
    font-weight: bold;
}

.discount-price {
    color: #d32f2f;
}

.original-price {
    text-decoration: line-through;
    color: #777;
    margin-left: 10px;
}

.product-size select {
    padding: 5px;
    font-size: 16px;
}

.product-actions {
    display: flex;
    justify-content: center; /* Căn giữa theo chiều ngang */
    align-items: center;    /* Căn giữa theo chiều dọc */
    margin-top: 20px;       /* Khoảng cách trên */
}

.quantity-selector {
    display: flex;
    align-items: center;
    gap: 10px;
}

.quantity-selector button {
    background: #ddd;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
}

.add-to-cart {
    background-color: #d32f2f;
    color: white;
    border: none;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    border-radius: 4px;
    transition: background-color 0.3s;
}

.add-to-cart:hover {
    background-color: #b71c1c;
}
</style>
