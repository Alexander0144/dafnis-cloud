const Producto = require("../models/Producto");

class ProductosRepository {

  async getAllProductos(customWhereParam) {
    let customWhere = {};
    if (customWhereParam) {
      customWhere = customWhereParam;
    }
    const productos = await Producto.findAll({
      where: {
        ...customWhere
      }
    });

    return productos;
  }

  async getAllProductosActive(customWhereParam) {
    let customWhere = {};
    if (customWhereParam) {
      customWhere = customWhereParam;
    }
    const productos = await Producto.findAll({
      where: {
        "estatus_activo": true,
        ...customWhere
      }
    });

    return productos;
  }

  async getLatestByClave() {
    const productos = await Producto.findAll({
      order: [['clave_producto', 'DESC']],
      limit : 10
    });

    let producto = null;
    if (productos && productos.length) {
      producto = productos[0];
    }

    return producto;
  }


  async getPrudctoById(productoId) {
    const producto = await Producto.findByPk(productoId);
    return producto;
  }

  async getAllWithPaging(countPerPage, pageNumber) {
    throw "Unimplemented";
  }

  async createProducto(productoData) {
    const newProducto = await Producto.create(productoData);
    return newProducto;
  }

  async deleteProductoById(productoId) {
    await Producto.destroy({
      where: {
        id: productoId,
      }
    });
  }
}

const productosRepository = new ProductosRepository();
module.exports = productosRepository;
