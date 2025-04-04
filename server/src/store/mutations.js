const mutations = {
  setCurrentPage(state, page) {
    state.currentPage = page;
  },

  // nhận dữ liệu từ action thông qua commit
  setProducts(state, products) {
    state.products = products;        //truyền danh sách sản phẩm vào state
  },

  // Thêm sản phẩm vào giỏ
  addToCart(state, product) {
    const existingProduct = state.cart.find(item => item.id === product.id && item.selectedSize === product.selectedSize);

    // nếu sản phẩm đã có trong giỏ hàng thì chỉ cần tăng sl
    if (existingProduct) {
      if (product.stock > existingProduct.quantity) {
        existingProduct.quantity++;
        product.stock--; // Giảm số lượng tồn kho
      } else {
        alert("Sản phẩm bạn chọn vượt quá tồn kho!");
      }
    }

    // nếu sản phẩm chưa có trong giỏ hàng thì push nó vào giỏ hàng
    else {
      if (product.stock > 0) {
        state.cart.push({ ...product, quantity: 1 });
        product.stock--; // Giảm số lượng tồn kho
      } else {
        alert("Sản phẩm bạn chọn đã hết hàng!");
      }
    }
  },

  // Giảm số lượng sản phẩm trong giỏ
  reduceItemQuantity(state, product) {
    const cartItem = state.cart.find(item => item.id === product.id);

    // nếu đã có trong giỏ hàng
    if (cartItem && cartItem.quantity > 1) {
      cartItem.quantity--;
      product.stock++; // Tăng số lượng tồn kho

    // nếu chưa có trong giỏ hàng
    } else {
      state.cart = state.cart.filter(item => item.id !== product.id);
    }
  },

  // Tăng số lượng sản phẩm trong giỏ
  increaseItemQuantity(state, product) {
    const cartItem = state.cart.find(item => item.id === product.id);
    if (cartItem) {
      if (product.stock > cartItem.quantity) {
        cartItem.quantity++;
        product.stock--; // Giảm số lượng tồn kho
      } else {
        alert("Sản phẩm bạn chọn vượt quá tồn kho!");
      }
    }
  },

  // Xóa tất cả sản phẩm trong giỏ hàng
  clearCart(state) {
    state.cart = [];
  },



}
export default mutations;