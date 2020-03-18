function echo(output: Array<string | null>, args: string): void {
	const div = document.createElement('div');
	div.innerText = args;
	div.innerText.split('\\n').forEach(
		(line: string) => output.push(line)
	);
}

export default echo;