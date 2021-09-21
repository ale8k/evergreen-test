/**
 * A devices commands
 */
export default class DeviceCommand {
    private _commandId: string;
    private _commandType: string;
    private _timeIssued: string;
    private _commandDurationMins: number;
    private _operationId: string;

    /**
     * Getter commandId
     * @return {string}
     */
	public get commandId(): string {
		return this._commandId;
	}

    /**
     * Getter commandType
     * @return {string}
     */
	public get commandType(): string {
		return this._commandType;
	}

    /**
     * Getter timeIssued
     * @return {string}
     */
	public get timeIssued(): string {
		return this._timeIssued;
	}


    /**
     * Getter commandDurationMins
     * @return {number}
     */
	public get commandDurationMins(): number {
		return this._commandDurationMins;
	}

    /**
     * Getter operationId
     * @return {string}
     */
	public get operationId(): string {
		return this._operationId;
	}
}
