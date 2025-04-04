<template>
  <header>
    <div class="container">
      <!-- Logo -->
      <div class="logo">
        <img :src="logo" alt="Jaystoree Logo" />
      </div>

      <!-- Navigation -->
      <nav>
        <ul>
          <li><router-link to="/">Trang Chủ</router-link></li>
          <li><router-link to="/menu">Menu</router-link></li>
          <li><router-link to="/tops">Tops</router-link></li>
          <li><router-link to="/about">About</router-link></li>
          <li><router-link to="/contact">Contact</router-link></li>
          <li><router-link to="/saleoff">Sale Off</router-link></li>
        </ul>
      </nav>

      <!-- Tài khoản -->
      <div class="account">
        <template v-if="user && user.username">
          Xin chào, {{ user.username }}
          <button @click="logout">Đăng Xuất</button>
        </template>
        <template v-else>
          <router-link to="/register">Đăng ký</router-link>
          <router-link to="/login">Đăng nhập</router-link>
        </template>
      </div>

      <!-- Giỏ hàng -->
      <div class="cta">
        <img :src="icon" alt="Shopping Cart Icon" />
        <router-link to="/cart">Giỏ hàng</router-link>
      </div>
    </div>
  </header>

  <!-- Nội dung các trang -->
  <router-view />
</template>


<script>
import logo from "@/assets/logo_jay.png";
import icon from "@/assets/icon/shopping-cart.png";
import eventBus from "@/eventBus";
export default {
  data() {
    return {
      user: JSON.parse(localStorage.getItem("currentUser")) || null,
      logo,
      icon,
    };
  },

  // nhận tín hiệu từ ComLogin để hiển thị user trong header
  created() {
    eventBus.on("loginSuccess", (user) => {
      this.user = user;
    });
  },

  beforeUnmount() {
    eventBus.off("loginSuccess"); // gỡ bỏ lắng nghe
  },

  methods: {
    logout() {
      localStorage.removeItem("currentUser");
      this.user = null;
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
/* Header */
header {
  background-color: #E3F2FD; /* Nền xanh nhạt */
  color: #1976D2; /* Chữ xanh đậm */
  padding: 15px 40px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Hiệu ứng bóng nhẹ */
  position: sticky;
  top: 0;
  z-index: 1000;
}

.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}

/* Logo */
.logo img {
  height: 70px;
}

/* Menu */
nav ul {
  list-style: none;
  display: flex;
  gap: 50px;
  padding: 0;
  margin: 0;
}

nav ul li {
  font-size: 16px;
  text-transform: uppercase;
}

nav ul li a {
  text-decoration: none;
  color: #1976D2; /* Chữ xanh đậm */
  transition: color 0.3s ease, transform 0.3s ease;
}

nav ul li a:hover {
  color: #64B5F6; /* Đổi sang xanh nhạt khi hover */
  transform: scale(1.1);
}

/* Tài khoản */
.account {
  display: flex;
  align-items: center;
  gap: 15px;
}

.account p {
  margin: 0;
  font-size: 14px;
  color: #333;
}

.account button {
  background-color: transparent;
  border: 1px solid #1976D2;
  color: #1976D2;
  padding: 5px 10px;
  font-size: 14px;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.account button:hover {
  background-color: #1976D2;
  color: #fff;
}

.account a {
  text-decoration: none;
  color: #1976D2;
  font-size: 14px;
  border: 1px solid #1976D2;
  padding: 5px 10px;
  border-radius: 4px;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.account a:hover {
  background-color: #1976D2;
  color: #fff;
}

/* Call to action */
.cta {
  display: flex;
  align-items: center;
  gap: 10px;
}

.cta img {
  height: 24px;
  width: 24px;
}

.cta a {
  text-decoration: none;
  color: #1976D2;
  font-size: 14px;
  transition: color 0.3s ease;
}

.cta a:hover {
  color: #64B5F6;
}

/* Responsive */
@media (max-width: 768px) {
  nav ul {
    flex-direction: column;
    gap: 10px;
  }

  .container {
    flex-wrap: wrap;
  }

  .cta {
    margin-top: 10px;
  }
}
</style>
