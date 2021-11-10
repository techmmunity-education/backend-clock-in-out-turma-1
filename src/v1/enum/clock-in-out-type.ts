export enum ClockInOutTypeEnum {
	CLOCK_IN = "CLOCK_IN",
	PAUSE_OUT = "PAUSE_OUT",
	PAUSE_IN = "PAUSE_IN",
	CLOCK_OUT = "CLOCK_OUT",
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ClockInOutTypeValues = () =>
	[...new Set(Object.values(ClockInOutTypeEnum))] as Array<ClockInOutTypeEnum>;
