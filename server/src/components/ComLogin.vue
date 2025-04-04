<template>
  <div>
    <h2>Đăng nhập</h2>
    <input v-model="username" placeholder="Tên đăng nhập" />
    <input v-model="password" type="password" placeholder="Mật khẩu" />
    <button @click="login">Đăng nhập</button>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script>
import axios from "axios";
import eventBus from "@/eventBus";

export default {
  data() {
    return {
      username: "",
      password: "",
      error: "",
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post("http://localhost:3000/user/login", {
          username: this.username,
          password: this.password,
        });

        // Lấy dữ liệu phản hồi từ server
        const { token, user } = response.data;

        // Lưu token & user vào localStorage
        localStorage.setItem("token", token);
        localStorage.setItem("currentUser", JSON.stringify(user));

        // Phát tín hiệu đăng nhập thành công
        eventBus.emit("loginSuccess", user);

        // Chuyển hướng về trang chính
        this.$router.push("/");
      } catch (error) {
        // Xử lý lỗi nếu đăng nhập thất bại
        this.error =
          error.response?.data?.message || "Lỗi khi đăng nhập. Vui lòng thử lại!";
      }
    },
  },
};
</script>
<style scoped>
/* Căn giữa form đăng nhập */
div {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  background-color: #f7f7f7;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  text-align: center;
}

h2 {
  color: #333;
  margin-bottom: 20px;
}

/* Định dạng input */


/* Định dạng nút */
button {
  width: 100%;
  padding: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #45a049;
}

/* Định dạng thông báo lỗi */
p {
  color: #d9534f;
  font-size: 14px;
  margin-top: 10px;
}
</style>

