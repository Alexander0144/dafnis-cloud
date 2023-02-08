const productosRepository = require("../repository/productosRepository");
const _ = require("lodash");
const Op = require("sequelize").Op;

class ProductosService {
  async getAllProductos(req, res) {
    try {
      if (!req.session || !req.session.user || !req.session.user.id) {
        throw new Error("Invalid session data or JWT");
      }

      const _where = req.query && req.query.where ? req.query.where : {};

      const parsedWhere = this.parseWhereProductos(_where);

      const productos = await productosRepository.getAllProductos(parsedWhere);

      return res.status(200).json({
        status: "success",
        message: "success",
        code: 200,
        data: productos,
      });
    } catch (error) {
      console.error(
        "Productos Service: An error occurred while fetching products"
      );
      console.error(error.message);
      return res.status(500).json({
        status: "error",
        message: error.message,
        error: "Internal server error",
        code: 500,
      });
    }
  }

  async getProductoById(req, res) {
    try {
      if (!req.session || !req.session.user || !req.session.user.id) {
        throw new Error("Invalid session data or JWT");
      }

      const idParam = req.params.id;

      if (!idParam) {
        return res.status(400).json({
          status: "error",
          error: "Bad Request",
          message: "No se proporcionó un Id valido",
          code: 400,
        });
      }

      const productId = parseInt(idParam);

      const productoDb = await productosRepository.getPrudctoById(productId);

      if (
        _.isNil(productoDb) ||
        _.isUndefined(productoDb) ||
        _.isEmpty(productoDb)
      ) {
        return res.status(404).json({
          status: "error",
          error: "Not Found",
          message: "No se encontro el producto con el Id especificado",
          code: 404,
        });
      }

      return res.status(200).json({
        status: "success",
        message: "Producto encontrado",
        data: productoDb,
        code: 200,
      });
    } catch (error) {
      console.error(
        "Productos Service: An error occurred while fetching product data by Id"
      );
      console.error(error.message);
      return res.status(500).json({ error: error.message });
    }
  }

  async createProducto(req, res) {
    try {
      if (!req.session || !req.session.user || !req.session.user.id) {
        return res.status(401).json({
          status: "error",
          error: "Unauthorized",
          message: "Petición no autorizada",
          code: 401,
        });
      }

      const requestUserId = parseInt(req.session.user.id);

      const body = req.body;

      const { nombreProducto, precioUnitario, descripcion } = body;

      if (!nombreProducto) {
        return res.status(400).json({
          status: "error",
          error: "Bad Request",
          message: "Proporcione un nombre válido",
          code: 400,
        });
      }

      if (!(_.isNumber(precioUnitario) && precioUnitario >= 0)) {
        return res.status(400).json({
          status: "error",
          error: "Bad Request",
          message: "Proporcione un precio unitario",
          code: 400,
        });
      }

      const latestProductoByClave =
        await productosRepository.getLatestByClave();

      const PRODUCTO_PREFIX = "PROD";

      let numClaveProducto = 1;

      if (latestProductoByClave) {
        const previousNumberSuffix = parseInt(
          latestProductoByClave.clave_producto.split("-").pop()
        );
        numClaveProducto = previousNumberSuffix + 1;
      }

      const newProducto = {
        clave_producto: `${PRODUCTO_PREFIX}-${numClaveProducto}`,
        nombre_producto: nombreProducto,
        descripcion: descripcion || "",
        estatus_activo: true,
        precio_unitario: precioUnitario,
        creado_por_id: requestUserId,
        editado_por_id: requestUserId,
      };

      const newProductoResponse = await productosRepository.createProducto(
        newProducto
      );
      const message = "Nuevo producto creado con Id: " + newProductoResponse.id;

      return res.status(201).json({
        status: "success",
        message: message,
        data: newProductoResponse,
        code: 201,
      });
    } catch (error) {
      console.error(
        "Productos Service: An error occurred while creating a new product"
      );
      console.error(error.message);
      return res.status(500).json({
        status: "error",
        message: error.message,
        error: "Internal server error",
        code: 500,
      });
    }
  }

  async handleUpdateProducto(req, res) {
    try {
      const body = req.body;

      const requestUserId = parseInt(req.session.user.id);

      const { id, nombre_producto, precio_unitario, descripcion } = body;

      if (!id || !nombre_producto || !precio_unitario) {
        res.status(400).json({
          status: "error",
          error: "Bad request",
          message: "Verifique que los valores capturados sean correctos",
          code: 400,
        });
      }

      const idParam = parseInt(id);
      const precioUnitarioParam = parseFloat(precio_unitario);

      const productDb = await productosRepository.getPrudctoById(idParam);

      if (!productDb) {
        return res.status(404).json({
          status: "error",
          error: "Not Found",
          message: "No se encontro el producto con el Id especificado",
          code: 404,
        });
      }

      await productDb.update({
        nombre_producto: nombre_producto,
        descripcion: descripcion || "",
        precio_unitario: precioUnitarioParam,
        editado_por_id: requestUserId,
      });

      return res.status(200).json({
        status: "success",
        message: "Producto actualizado exitosamente",
        data: {
          id: productDb.id,
          clave: productDb.clave_producto,
        },
        code: 200,
      });
    } catch (error) {
      console.error(
        "Productos Service: An error occurred while updating product"
      );
      console.error(error.message);
      return res.status(500).json({
        status: "error",
        message: error.message,
        error: "Internal server error",
        code: 500,
      });
    }
  }

  async handleDeleteProducto(req, res) {
    try {
      if (!req.session || !req.session.user || !req.session.user.id) {
        throw new Error("Invalid session data or JWT");
      }

      const idParam = req.params.id;

      if (!idParam) {
        return res.status(400).json({
          status: "error",
          error: "Bad Request",
          message: "No se proporciono un Id valido",
          code: 400,
        });
      }

      const productId = parseInt(idParam);

      //        IMPORTANT
      // TODO: Add validations for relationships constraints before deleting

      await productosRepository.deleteProductoById(productId);

      return res.status(200).json({
        status: "success",
        message: "Producto eliminado",
        data: "Ok",
        code: 200,
      });
    } catch (error) {
      console.error(
        "Productos Service: An error occurred while deleting a product"
      );
      console.error(error.message);
      return res.status(500).json({
        status: "error",
        message: error.message,
        error: "Internal server error",
        code: 500,
      });
    }
  }

  parseWhereProductos(whereParam) {
    let myWhere = {};
    if (
      _.isNull(whereParam) ||
      _.isUndefined(whereParam) ||
      _.isEmpty(whereParam)
    ) {
      return myWhere;
    }
    try {
      const whereParamObj =
        typeof whereParamObj === "string"
          ? JSON.parse(whereParam)
          : { ...whereParamObj };

      for (key in whereParamObj) {
        if (typeof whereParamObj[key] === "object") {
          if (
            whereParamObj[key].hasOwnProperty("like") ||
            whereParamObj[key].hasOwnProperty("$like")
          ) {
            const likeParamValue =
              whereParamObj[key]["like"] || whereParamObj[key]["$like"];

            myWhere[key] = {
              [Op.like]: `%${likeParamValue}%`,
            };
          }
        } else {
          myWhere[key] = whereParamObj[key];
        }
      }

      return myWhere;
    } catch (error) {
      console.error("Productos Service: Error in Where structure");
      console.error(error.message);
      return {};
    }
  }
}

const productosService = new ProductosService();
module.exports = productosService;
