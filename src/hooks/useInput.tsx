import { useState, ChangeEventHandler } from 'react';

function useInput(initialValue: string): [string, ChangeEventHandler<HTMLInputElement>] {
	const [input, setInput] = useState(initialValue);

	const inputValueChange: ChangeEventHandler<HTMLInputElement> = e => {
		setInput(e.target.value);
	};

	return [input, inputValueChange];
}

export default useInput;
