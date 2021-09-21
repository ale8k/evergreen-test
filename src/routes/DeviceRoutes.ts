import IRoute from "../interfaces/IRoute";
import { Router } from "express";
import DeviceController from "../controllers/DeviceController";

/**
 * Device related routes
 *
 * @author ale8k
 */
export default class DeviceRoutes implements IRoute {
    /**
     * Router instance
     */
    public readonly ROUTER: Router = Router();
    /**
     * Resource location
     */
    public readonly RESOURCE_LOC: string = "/devices";

    /**
     * Middleware & controller setup
     */
    constructor() {
        this.ROUTER.get(this.RESOURCE_LOC + "/", DeviceController.getAllDevices);
    }
}
