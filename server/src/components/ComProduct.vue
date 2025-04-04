<template>
  <main>
    <div class="menu">
      <div class="menu-carousel">
        <div class="menu-item">
          <router-link :to="{ name: 'ProductDetail', params: { id: product._id } }">
            <img
              :src="isExternalUrl(product.image) ? product.image : require(`@/assets/jaystoree_product/${product.image}`)"
              alt="Product Image"
            />
            <div class="menu-item-info">
              <h3>{{ product.name }}</h3>
              <p>{{ product.price }}<span class="currency">đ</span></p>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  props: ["product"],
  data() {
    return {
      id: this.product.id,
    };
  },
  methods: {
    isExternalUrl(url) {
      return url.startsWith("http://") || url.startsWith("https://");
    },
  },
};
</script>

<style scoped>
/* Bỏ gạch chân cho các liên kết */
.menu-item a {
  text-decoration: none;
}

/* Định dạng container chính của menu */
.menu {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
  padding: 20px;
}

/* Định dạng từng sản phẩm trong menu */
.menu-carousel {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); /* Chia thành các cột có độ rộng thay đổi */
  gap: 20px;
  padding: 20px;
  width: 100%;
}

.menu-item {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease-in-out;
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
}

/* Hiệu ứng hover cho mỗi sản phẩm */
.menu-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.15);
}

/* Định dạng hình ảnh sản phẩm */
.menu-item img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  transition: transform 0.3s ease;
}

/* Tạo hiệu ứng zoom cho hình ảnh khi hover */
.menu-item:hover img {
  transform: scale(1.1);
}

/* Định dạng phần thông tin của sản phẩm */
.menu-item-info {
  padding: 15px;
  flex-grow: 1;
}

/* Định dạng tiêu đề sản phẩm */
.menu-item-info h3 {
  font-size: 1.25rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

/* Định dạng mô tả sản phẩm */
.menu-item-info p {
  font-size: 1rem;
  color: #777;
  margin: 5px 0;
  height: 50px; /* Giới hạn độ cao của mô tả */
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Định dạng giá sản phẩm */
.menu-item-info p:last-child {
  font-size: 1.1rem;
  color: #e63946;
  font-weight: bold;
  margin-top: 10px;
}

.currency {
  text-decoration: underline;
  font-size: 1rem;
  font-weight: normal;
  color: #e63946;
  margin-left: 3px;
}
</style>