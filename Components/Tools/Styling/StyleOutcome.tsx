/** @format */

export default function StyleOutcome(outcome: string) {
	if (outcome == 'Carried') {
		const styled = (
			<h2
				style={{
					color: 'green',
					fontStyle: 'italic',
				}}>
				CARRIED
			</h2>
		);
		return styled;
	}
	if (outcome == 'Lost') {
		const styled = <h2 style={{ color: 'red', fontStyle: 'italic' }}>LOST</h2>;
		return styled;
	}
	if (outcome == 'Tá') {
		const styled = <h2 style={{ color: 'green', fontStyle: 'italic' }}>YES</h2>;
		return styled;
	}
	if (outcome == 'Níl') {
		const styled = <h2 style={{ color: 'red', fontStyle: 'italic' }}>NO</h2>;
		return styled;
	}
	if (outcome == 'Staon') {
		const styled = (
			<h2 style={{ color: 'yellow', fontStyle: 'italic' }}>ABSTAINED</h2>
		);

		return styled;
	}
}
