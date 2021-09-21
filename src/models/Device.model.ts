import DeviceCommand from "./DeviceCommand.model";
import DeviceState from "./DeviceState.model";

/**
 * A transacted device
 */
export default class Device {
    private _deviceId: string;
    private _deviceType: string;
    private _deviceState: DeviceState;
    private _dateRegistered: string;
    private _commands: DeviceCommand[];

    public constructor(
        deviceId: string,
        deviceType: string,
        deviceTurnedOn: boolean,
        devicePowerConsumptionInKilowatts: number,
        commands: DeviceCommand[]
    ) {
        this._deviceId = deviceId;
        this._deviceType = deviceType;
        this._deviceState = new DeviceState(
            deviceTurnedOn,
            devicePowerConsumptionInKilowatts
        );
        this._commands = commands;
    }

    /**
     * Getter deviceId
     * @return {string}
     */
	public get deviceId(): string {
		return this._deviceId;
	}

    /**
     * Getter deviceType
     * @return {string}
     */
	public get deviceType(): string {
		return this._deviceType;
	}

    /**
     * Getter deviceState
     * @return {DeviceState}
     */
	public get deviceState(): DeviceState {
		return this._deviceState;
	}

    /**
     * Getter dateRegistered
     * @return {string}
     */
	public get dateRegistered(): string {
		return this._dateRegistered;
	}

    /**
     * Getter commands
     * @return {DeviceCommand[]}
     */
	public get commands(): DeviceCommand[] {
		return this._commands;
	}

}
