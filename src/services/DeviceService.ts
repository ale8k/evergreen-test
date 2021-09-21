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
     * @returns {Promise<T>} an array of the given documents
     */
    public static async getAllDevices(): Promise<Device[]> {
        return DeviceService.localDeviceCache;
    }

}
