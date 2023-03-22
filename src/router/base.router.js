const Router = require('express');
const jwt = require('jsonwebtoken');
const SECRET_KEY = require('../constant/api.constant');

class BaseRouter {

    constructor() {
        this.router = Router();
        this.init();
    }

    init() { }

    getRouter() {
        return this.router;
    }

    applyCallbacks(callbacks) {
        return callbacks.map((callback) => async (...params) => {
            try {
                await callback.apply(this, params);
            } catch (error) {
                console.log(error);
                params[1].status(500).send(error);
            }
        });
    }

    handleAuthRoles(roles) {
        return async (req, res, next) => {
            if (roles[0] === 'PUBLIC') {
                return next();
            }
            const authHeader = req.headers.authorization;
            if (!authHeader) {
                return res.status(401).json({
                    error: 'Unauthorized request'
                });
            }
            const token = authHeader.split(' ')[1];
            const user = jwt.verify(token, SECRET_KEY);
            if (!roles.includes(`${user.role}`.toUpperCase())) {
                return res.status(403).json({
                    error: 'Access denied'
                });
            }
            req.user = user;
            next();
        }
    }

    get(path, roles, ...callbacks) {
        this.router.get(path, this.handleAuthRoles(roles), this.applyCallbacks(callbacks));
    }

    post(path, roles, ...callbacks) {
        this.router.post(path, this.handleAuthRoles(roles), this.applyCallbacks(callbacks));
    }

    put(path, roles, ...callbacks) {
        this.router.put(path, this.handleAuthRoles(roles), this.applyCallbacks(callbacks));
    }

    delete(path, roles, ...callbacks) {
        this.router.delete(path, this.handleAuthRoles(roles), this.applyCallbacks(callbacks));
    }
}

module.exports = BaseRouter;