class ProductRepository {
  async getAllProducts() {
    throw "Unimplemented";
  }

  async getAllWithPaging(countPerPage, pageNumber) {
    throw "Unimplemented";
  }
}

const productRepository = new ProductRepository();
module.exports = productRepository;
