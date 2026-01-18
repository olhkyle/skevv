type TimePeriod = 'Morning' | 'Afternoon' | 'Evening' | 'Late Night';

const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

const greetingMap: Record<TimePeriod, string> = {
	Morning: 'Good Morning ☀️',
	Afternoon: 'Good Afternoon 🙂',
	Evening: 'Good Evening 🌙',
	'Late Night': 'Cheer up, Late Night ⭐️',
};

const getTimePeriodByTimezone = (timeZone: string, now: number = Date.now()): TimePeriod => {
	const hour = new Intl.DateTimeFormat('en-US', {
		timeZone,
		hour: 'numeric',
		hour12: false,
	})
		.formatToParts(new Date(now))
		.find(p => p.type === 'hour')!.value;

	const h = Number(hour);

	if (h >= 5 && h < 12) return 'Morning';
	if (h >= 12 && h < 18) return 'Afternoon';
	if (h >= 18 && h < 22) return 'Evening';
	return 'Late Night';
};

export { timezone, greetingMap, getTimePeriodByTimezone };
