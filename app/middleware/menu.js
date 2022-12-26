const rolService = require("../services/rolService");

module.exports.getSidebarMenuMiddleware = function() {
    return async function(req, res, next) {
        try {
            const userData = req.session.user
            if (!userData) {
                return res.status(401).json({status: "error", message: "Unauthorized", code: 401});
            }
            const rolId = userData.rol.id;
            const menu = await rolService.getMenuByRol(rolId);
            req.session.menu = menu;
            return next();
        } catch (error) {
            console.error("An error occurred in middleware while fetching menu data");
            console.error(error.message);
            return res.status(500).json({status: error, message: "Internal server error", code: 500});
        }
    }
}