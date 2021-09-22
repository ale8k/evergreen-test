import * as log from "loglevel";
import App from "../../App";
import supertest from "supertest";
import Device from "../../models/Device.model";
import fs from "fs";

/**
 * This test utilises [supertest]{@link https://www.npmjs.com/package/supertest}
 * and initialises the full server to perform the tests per test.
 *
 * @author ale8k
 */
describe("DeviceController", () => {
    let mockData: { devices: Device[] };

    beforeAll(async () => {
        log.setDefaultLevel("silent");
        mockData = JSON.parse(fs.readFileSync("./src/controllers/__tests__/data/test-data.json").toString());
    });

    it("/devices should return 200 OK, correct MIME type, and the correct data response (including whether it is wrapped in object)", done => {
        new App().setupServer().then(app => {
            const agent = supertest(app);
            agent.get("/devices")
                .expect(200)
                .expect("Content-Type", /json/)
                .then(res => {
                    expect(res.body.devices).toEqual(mockData.devices);
                    done();
                });
        });
    });

    it("/devices?lowerBounds=0&upperBounds=1 should return 200 OK, correct MIME type, and each power consumption should be in the range", done => {
        new App().setupServer().then(app => {
            const agent = supertest(app);
            agent.get("/devices?lowerBounds=0&upperBounds=1")
                .expect(200)
                .expect("Content-Type", /json/)
                .then(res => {
                    res.body.devices.forEach((device: Device) => {
                        expect(
                            device.deviceState.powerConsumptionInKilowatts === 0 || device.deviceState.powerConsumptionInKilowatts === 1
                        ).toBeTruthy();
                    });
                    done();
                });
        });
    });

    it("/devices?lowerBounds=1&upperBounds=0 should return 200 OK, correct MIME type, and return no devices as it is illogical to make such a request", done => {
        new App().setupServer().then(app => {
            const agent = supertest(app);
            agent.get("/devices?lowerBounds=1&upperBounds=0")
                .expect(200)
                .expect("Content-Type", /json/)
                .then(res => {
                    expect(res.body.devices).toEqual([]);
                    done();
                });
        });
    });

    it("/devices/heater gets all devices which match this type, returns a 200 OK response and the correct MIME type", done => {
        new App().setupServer().then(app => {
            const agent = supertest(app);
            agent.get("/devices/heater")
                .expect(200)
                .expect("Content-Type", /json/)
                .then(res => {
                    (res.body.devices as Device[]).forEach(device => {
                        expect(device.deviceType).toEqual("heater");
                    });
                    done();
                });
        });
    });

    it("/devices/heater?lowerBounds=0&upperBounds=1 gets all devices which match this type and have a power consumption within range, returns a 200 OK response and the correct MIME type", done => {
        new App().setupServer().then(app => {
            const agent = supertest(app);
            agent.get("/devices/heater?lowerBounds=0&upperBounds=1")
                .expect(200)
                .expect("Content-Type", /json/)
                .then(res => {
                    (res.body.devices as Device[]).forEach(device => {
                        expect(device.deviceType).toEqual("heater");
                        expect(
                            device.deviceState.powerConsumptionInKilowatts === 0 || device.deviceState.powerConsumptionInKilowatts === 1
                        ).toBeTruthy();
                    });
                    done();
                });
        });
    });

});
