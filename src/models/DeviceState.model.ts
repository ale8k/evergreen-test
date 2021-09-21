/**
 * A devices state
 */
export default class DeviceState {
    private _turnedOn: boolean;
    private _powerConsumptionInKilowatts: number;

    public constructor(
        turnedOn: boolean,
        powerConsumptionInKilowatts: number
    ) {
        this._turnedOn = turnedOn;
        this._powerConsumptionInKilowatts = powerConsumptionInKilowatts;
    }

    /**
     * Getter turnedOn
     * @return {boolean}
     */
	public get turnedOn(): boolean {
		return this._turnedOn;
    }

    /**
     * Getter powerConsumptionInKilowatts
     * @return {number}
     */
	public get powerConsumptionInKilowatts(): number {
		return this._powerConsumptionInKilowatts;
	}

}
