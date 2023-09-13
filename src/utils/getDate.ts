import React from 'react';

const getDate = (response: any, setDate: React.Dispatch<React.SetStateAction<string>>) => {
	const firstTimestamp = Object.keys(response.response)[0];
	const date = firstTimestamp.split(' ')[0].split('-');
	const convertedDate = date.join('-');
	setDate(`${convertedDate} 일자`);
};

export default getDate;
