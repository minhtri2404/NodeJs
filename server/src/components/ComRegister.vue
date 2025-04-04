<template>
  <div class="register-form">
    <h2>Đăng ký tài khoản</h2>
    <form @submit.prevent="register">
      <div class="form-group">
        <label for="username">Tên đăng ký</label>
        <input v-model="username" id="username" type="text" placeholder="Nhập tên đăng ký" required />
      </div>
      
      <div class="form-group">
        <label for="password">Mật khẩu</label>
        <input v-model="password" id="password" type="password" placeholder="Nhập mật khẩu" required />
      </div>

      <div class="form-group">
        <label for="confirmPassword">Xác nhận mật khẩu</label>
        <input v-model="confirmPassword" id="confirmPassword" type="password" placeholder="Xác nhận mật khẩu" required />
      </div>

      <button type="submit">Đăng ký</button>
      
      <p v-if="error" class="error">{{ error }}</p>
      <p v-if="success" class="success">{{ success }}</p>
    </form>
  </div>
</template>


<script>
import axios from 'axios';

export default {
  data() {
    return {
      username: '',
      password: '',
      confirmPassword: '',
      error: '',
      success: ''
    };
  },
  methods: {
    async register() {
      this.error = '';
      this.success = '';

      if (this.password !== this.confirmPassword) {
        this.error = 'Mật khẩu đăng ký không khớp';
        return;
      }

      try {
        const response = await axios.post('http://localhost:3000/user/register', {
          username: this.username,
          password: this.password
        });

        this.success = response.data.message || 'Đăng ký thành công';
        this.username = '';
        this.password = '';
        this.confirmPassword = '';

        // Chuyển hướng đến trang đăng nhập
        setTimeout(() => {
          this.$router.push('/login');
        }, 1500);
      } catch (error) {
        this.error = error.response?.data?.message || 'Đăng ký thất bại';
      }
    }
  }
};
</script>

<style scoped>
.register-form {
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  font-weight: bold;
  color: #555;
  margin-bottom: 5px;
}

.form-group input {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
}

button {
  width: 100%;
  padding: 12px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #45a049;
}

.error {
  color: red;
  text-align: center;
  margin-top: 10px;
}

.success {
  color: green;
  text-align: center;
  margin-top: 10px;
}
</style>
