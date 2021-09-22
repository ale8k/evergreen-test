import { Request, Response } from "express";
import DeviceService from "../services/DeviceService";
import { BAD_REQUEST_TEXT, INTERNAL_ERROR_TEXT } from "../constants";
import Device from "../models/Device.model";

/**
 * Device controller
 *
 * @author ale8k
 */
export default class DeviceController {
    /**
     * Gets all devices
     *
     * Optionally can look for query params to filter the response by power consumption:
     *  - [lowerBounds] lower power consumption bounds
     *  - [upperBounds] upper power consumption bounds
     *
     * @param {Request} req the users request obj
     * @param {Response} res our res obj
     */
    public static getAllDevices(req: Request, res: Response): void {
        DeviceService.getAllDevices()
            .then(data => {
                if (DeviceController.queryingForPowerBounds(req)) {
                    DeviceController.sendFilteredDevicesByPower(
                        data,
                        req.query.lowerBounds as string,
                        req.query.upperBounds as string ,
                        res
                    );
                } else {
                    res.send(DeviceController.wrapDeviceResponse(data));
                }
            })
            .catch(e => {
                res.status(500).send(
                    `${INTERNAL_ERROR_TEXT}${e.message.toString() === "" ? "Error contained no message" : e.message}`
                );
            });
    }

    /**
     * Gets all devices by a specific type
     *
     * Optionally can look for query params to filter the response by power consumption:
     *  - [lowerBounds] lower power consumption bounds
     *  - [upperBounds] upper power consumption bounds
     *
     * @param {Request} req the users request obj
     * @param {Response} res our res obj
     */
    public static getAllDevicesByType(req: Request, res: Response): void {
        if (req.params.type) {
            DeviceService.getDevicesByType(req.params.type)
                .then(data => {
                    if (DeviceController.queryingForPowerBounds(req)) {
                        DeviceController.sendFilteredDevicesByPower(
                            data,
                            req.query.lowerBounds as string,
                            req.query.upperBounds as string ,
                            res
                        );
                    } else {
                        res.send(DeviceController.wrapDeviceResponse(data));
                    }
                })
                .catch(e => {
                    res.status(500).send(
                        `${INTERNAL_ERROR_TEXT}${e.message.toString() === "" ? "Error contained no message" : e.message}`
                    );
                });
        } else {
            res.status(418).send(BAD_REQUEST_TEXT + " Query parameter of 'type' is missing. ");
        }
    }

    /**
     * Encapsulate repeatable logic in a convient func when sending filtered devices by power
     *
     * Note: do not worry about failed parses, when evaluating a NaN to a NaN/num conditionally
     * it is always false
     *
     * @param data - The device array to filter upon
     * @param lower - our lower bounds
     * @param upper  - our higher bounds
     * @param res - the response object
     */
    private static sendFilteredDevicesByPower(data: Device[], lower: string, upper: string, res: Response): void {
        DeviceService.getDeviceInPowerRange(
            data,
            Number.parseInt(lower),
            Number.parseInt(upper)
        ).then(filteredDevices => {
            res.send(
                DeviceController.wrapDeviceResponse(filteredDevices)
            );
        });
    }

    /**
     *
     * @param resp
     * @returns {Object} returns the wrapped response
     *
     * TODO: make DTO for response object and update this function to construct
     * an actual instance
     */
    private static wrapDeviceResponse(resp: Device[]): Object {
        return {
            devices: resp
        };
    }

    /**
     * Predicates whether or not the request for power consumption range
     *
     * @param param0
     * @returns whether or not the request is providing power range query params
     */
    private static queryingForPowerBounds({ query }: Request): boolean {
        try {
            if (query.lowerBounds && query.upperBounds) {
                return true;
            }
            return false;
        } catch (_) {
            return false;
        }
    }
}
