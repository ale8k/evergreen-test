import DeviceService from "../DeviceService";

/**
 * @author ale8k
 */
describe("DeviceService", () => {

    beforeAll(async () => {
        DeviceService.mockLoadDeviceData();
    });

    it("getAllDevices returns all devices asynchronously", (done) => {
        DeviceService.getAllDevices().then(data => {
            expect(data).toEqual(DeviceService.localDeviceCache);
            done();
        });
    });

    it("getDevicesByType filters devices correctly based on a given type", (done) => {
        DeviceService.getDevicesByType("heater").then(data => {
            data.forEach(device => {
                expect(device.deviceType).toStrictEqual("heater");
                done();
            });
        });
    });
});
