export enum ClockInOutTypeEnum {
	CLOCK_IN = "CLOCK IN",
	PAUSE_OUT = "PAUSE OUT",
	PAUSE_IN = "PAUSE IN",
	CLOCK_OUT = "CLOCK OUT",
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ClockInOutTypeValues = () =>
	[...new Set(Object.values(ClockInOutTypeEnum))] as Array<ClockInOutTypeEnum>;
