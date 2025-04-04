import axios from "axios";

const actions = {
    async fetchProducts({commit}) {
      try {
        // gọi api lấy danh sách sản phẩm
        const response = await axios.get(`http://localhost:3000/api/products`);
        const products = response.data;     // lấy dữ liệu từ API
        
        // gửi dữ liệu sản phẩm đến mutation thông qua commit
        commit('setProducts', products)
      } catch (error) {
        console.error("Lỗi, không thể lấy dữ liệu",error);
        
      }

    },

    
}
export default actions;