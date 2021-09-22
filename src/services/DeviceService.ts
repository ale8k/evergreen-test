import fs from "fs";
import Device from "../models/Device.model";

/**
 * Gathers device data from local cache
 *
 * @class
 * @author ale8k
 */
export default class DeviceService {
    /**
     * An in memory store of the devices, obviously in real time we would CRON (A-2)
     * for the devices, but for the purpose of this test just on startup is fine
     */
    private static _localDeviceCache: Device[];

    public static get localDeviceCache(): Device[] {
        return DeviceService._localDeviceCache;
    }

    public static set localDeviceCache(value: Device[]) {
        DeviceService._localDeviceCache = value;
    }

    public static mockLoadDeviceData(): void {
        DeviceService.localDeviceCache = JSON.parse(fs.readFileSync("./data/data.json").toString());
    }

    /**
     * Gets ALL devices from local cache
     *
     * @async
     * @param {string} collectionName collection name
     * @returns {Promise<Device[]>} an array of the given devices
     */
    public static async getAllDevices(): Promise<Device[]> {
        return DeviceService.localDeviceCache;
    }

    /**
     * Gets all devices of a particular type
     *
     * @param {string} type device type
     * @returns {Promise<Device[]>} an array of devices filtered by type
     */
    public static async getDevicesByType(type: string): Promise<Device[]> {
        return DeviceService.localDeviceCache.filter(
            device => device.deviceType.toLowerCase() === type.toLowerCase()
        );
    }

    /**
     * Gets all devices in a certain power range
     *
     * Note: additional behaviour is that it will sort numerically based on power consumption
     * to reduce processing power for upstream service
     *
     * @param {number} lowerBounds
     * @param {number} upperBounds
     * @returns {Promise<Device[]>} an array of devices within the range bounds of power
     */
    public static async getDeviceInPowerRange(devices: Device[], lowerBounds: number, upperBounds: number): Promise<Device[]> {
        if (lowerBounds > upperBounds) {
            return [];
        }
        return devices.filter(
            ({ deviceState }) => DeviceService.isInRange(deviceState.powerConsumptionInKilowatts, lowerBounds, upperBounds)
        ).sort((deviceA, deviceB) => deviceA.deviceState.powerConsumptionInKilowatts - deviceB.deviceState.powerConsumptionInKilowatts);
    }

    /**
     * It does infact includes the number presented in the bounds
     *
     * @param val the value to test
     * @param lower our upper bounds
     * @param higher our lower bounds
     * @returns a bool declaring if the number is in the range between the provided high/lower
     */
    private static isInRange(val: number, lower: number, higher: number): boolean {
        return (val >= lower && val <= higher);
    }
}
