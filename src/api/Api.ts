import axios from 'axios';

const instance = axios.create({
	baseURL: `/mook`,
});

export const getData = async () => {
	try {
		const response = await instance.get(`/data.json`);
		return response.data;
	} catch (error) {
		console.error('데이터를 불러오는 중 오류 발생:', error);
		throw error;
	}
};
