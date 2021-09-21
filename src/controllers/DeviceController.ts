import { Request, Response } from "express";
import DeviceService from "../services/DeviceService";
import { INTERNAL_ERROR_TEXT } from "../constants";

/**
 * Device controller
 *
 * @author ale8k
 */
export default class DeviceController {
    /**
     * Gets all devices
     *
     * @param {Request} req the users request obj
     * @param {Response} res our res obj
     */
    public static getAllDevices(req: Request, res: Response): void {
        DeviceService.getAllDevices().then(data => {
            res.send(data);

        }).catch(e => {
            res.status(500).send(`${INTERNAL_ERROR_TEXT}${e.message.toString() === "" ? "Error contained no message" : e.message}`);
        });

    }

}
