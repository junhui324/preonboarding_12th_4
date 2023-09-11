import React, { useEffect, useState } from 'react';
import { getData } from '../../api/Api';
import styles from './TimeSeriesChart.module.scss';
import {
	ComposedChart,
	Line,
	Bar,
	XAxis,
	YAxis,
	Tooltip,
	Legend,
	CartesianGrid,
	ResponsiveContainer,
	Area,
} from 'recharts';

function TimeSeriesChart() {
	const [chartData, setChartData] = useState<any[]>([]);
	const [uniqueIds, setUniqueIds] = useState<string[]>();
	const [selectedID, setSelectedID] = useState<string | null>(null);

	useEffect(() => {
		async function fetchData() {
			try {
				const response = await getData();
				const newChartData = Object.keys(response.response).map(timestamp => ({
					timestamp,
					value_area: response.response[timestamp].value_area,
					value_bar: response.response[timestamp].value_bar,
					id: response.response[timestamp].id,
				}));

				newChartData.forEach(entry => {
					entry.timestamp = new Date(entry.timestamp).toLocaleTimeString();
				});

				const uniqueIds = [...new Set(newChartData.map(data => data.id))];

				setChartData(newChartData);
				setUniqueIds(uniqueIds);
			} catch (error) {
				console.error('데이터를 불러오는 중 오류 발생:', error);
			}
		}

		fetchData();
	}, []);

	const handleIDSelect = (id: string) => {
		setSelectedID(id);
	};

	const renderBars = () => {
		return chartData.map((data, index) => (
			<Bar
				key={index}
				dataKey="value_bar"
				fill={selectedID && selectedID === data.id ? '#ff0000' : '#82ca9d'}
				opacity={1}
				name="Bar"
				yAxisId="right"
			/>
		));
	};

	console.log(selectedID);

	return (
		<div>
			<div className={styles.filterButtons}>
				{uniqueIds
					? uniqueIds.map(id => (
							<button
								key={id}
								onClick={() => handleIDSelect(id)}
								className={selectedID === id ? styles.selectedButton : ''}
							>
								{id}
							</button>
					  ))
					: ''}
			</div>
			<ResponsiveContainer width="100%" height={400}>
				<ComposedChart data={chartData}>
					<XAxis dataKey="timestamp" />
					<CartesianGrid strokeDasharray="3 3" />
					<Legend
						payload={[
							{ value: 'Area', type: 'rect', color: '#8884d8' },
							{ value: 'Bar', type: 'rect', color: '#82ca9d' },
							{ value: 'Highlighted Bar', type: 'rect', color: '#ff0000' },
						]}
					/>
					<Tooltip content={<CustomTooltip />} />
					<Area type="monotone" dataKey="value_area" fill="#8884d8" name="Area" yAxisId="left" />
					<YAxis yAxisId="left" orientation="left" stroke="#8884d8" domain={[0, 'auto']} />
					{/* <Bar dataKey="value_bar" fill="#82ca9d" name="Bar" yAxisId="right" /> */}
					{renderBars()}
					<YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
				</ComposedChart>
			</ResponsiveContainer>
		</div>
	);
}

function CustomTooltip({ active, payload }: any) {
	if (active && payload && payload.length) {
		const data = payload[0].payload;
		return (
			<div className={styles.customTooltip}>
				<p className={styles.id}>{`ID: ${data.id}`}</p>
				<p className={styles.area}>{`Area: ${data.value_area}`}</p>
				<p className={styles.bar}>{`Bar: ${data.value_bar}`}</p>
			</div>
		);
	}

	return null;
}

export default TimeSeriesChart;
