function convertSupabaseDateToHumanReadable(date: string) {
	const parsedDate = new Date(date);
	const options = {
		year: 'numeric',
		month: 'numeric',
		day: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
		second: 'numeric',
	} as const;

	const formattedDate = new Intl.DateTimeFormat('en-US', options).format(parsedDate);
	return formattedDate;
}

function convertSupabaseDateToShortHumanReadable(date: string) {
	const parsedDate = new Date(date);
	const options = { year: 'numeric', month: 'numeric', day: 'numeric' } as const;

	const formattedDate = new Intl.DateTimeFormat('en-US', options).format(parsedDate);
	return formattedDate;
}

export { convertSupabaseDateToHumanReadable, convertSupabaseDateToShortHumanReadable };
