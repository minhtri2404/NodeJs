import state from "./state";

const getters = {
    // lấy dữ liệu từ state
    products:state=>state.products,
    currentPage:state=> state.currentPage,
    itemsPerPage:state=>state.itemsPerPage,

    // Getter để lấy sản phẩm theo danh mục
    productsByCategory: (state) => (category) => {
        return state.products.filter(product => product.category === category);
    },

    // Getter để lấy sản phẩm theo bộ lộc giá
    productsByPrice: (state) => (priceFilter) => {
        return state.products.filter(product => {
            switch (priceFilter) {
                case 'under150k':
                    return product.price < 150000;
                case '150k-250k':
                    return product.price >= 150000 && product.price <= 250000;
                case '250k-350k':
                    return product.price > 250000 && product.price <= 350000;
                case '350k-500k':
                    return product.price > 350000 && product.price <= 500000;
                case 'above500k':
                    return product.price > 500000;
                default:
                    return true;  // Không lọc nếu không có bộ lọc giá
            }
        });
    },

    //getter để lấy sản phẩm theo danh sách được sắp xếp
    sortedProducts: (state) => (sortOption) => {
        const products = [...state.products]; // Tạo một bản sao của mảng sản phẩm để không thay đổi mảng gốc
        switch (sortOption) {
            case 'priceAsc':
                return products.sort((a, b) => a.price - b.price); // Giá tăng dần
            case 'priceDesc':
                return products.sort((a, b) => b.price - a.price); // Giá giảm dần
            case 'oldest':
                return products.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)); // Cũ nhất
            case 'newest':
                return products.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // Mới nhất
            default:
                return products;
        }
    },

    // lấy sản phẩm trong mảng theo index start - index end
    paginatedProducts(state) {
        const start = (state.currentPage - 1) * state.itemsPerPage;
        const end = start + state.itemsPerPage;
        return state.products.slice(start, end);
    },


    // tính tổng số trang
    totalPages(){
        return Math.ceil(state.products.length / state.itemsPerPage);     //tổng số trang (làm tròn)= ( độ dài mảng / sản phẩm trên 1 trang )
    },

    product() {
        const id = this.$route.params.id;
        console.log(this.products); // Kiểm tra dữ liệu trong Vuex
        return this.products ? this.products.find(product => product.id === parseInt(id)) : null;
    },

    totalAmount(state) {
        return state.cart.reduce((total, item) => total + item.price * item.quantity, 0);
    },

    totalQuantity(state) {
        return state.cart.reduce((total, item) => total + item.quantity, 0);
    }
}
export default getters;