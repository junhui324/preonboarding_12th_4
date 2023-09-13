import { useEffect, useState } from 'react';
import { getData } from '../../api/Api';
import FilterButton from './FilterButton';
import styles from './TimeSeriesChart.module.scss';
import { COLOR } from '../../constants/constants';
import getDate from '../../utils/getDate';
import {
	ComposedChart,
	Bar,
	XAxis,
	YAxis,
	Tooltip,
	Legend,
	CartesianGrid,
	ResponsiveContainer,
	Area,
	Cell,
} from 'recharts';

function TimeSeriesChart() {
	const [chartData, setChartData] = useState<any[]>([]);
	const [uniqueIds, setUniqueIds] = useState<string[]>();
	const [selectedID, setSelectedID] = useState<string | null>(null);
	const [date, setDate] = useState('');

	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = async () => {
		try {
			const response = await getData();
			changeRechartsData(response);
		} catch (error) {
			console.error('데이터를 불러오지 못했습니다 : ', error);
		}
	};

	const changeRechartsData = (response: any) => {
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
		getDate(response, setDate);
	};

	const handleBarClick = (data: any) => {
		const clickedID = data.id;
		setSelectedID(clickedID);
	};

	return (
		<div>
			<FilterButton uniqueIds={uniqueIds} selectedID={selectedID} setSelectedID={setSelectedID} />
			<ResponsiveContainer width="100%" height={400}>
				<ComposedChart data={chartData}>
					<XAxis
						dataKey="timestamp"
						tick={{ fontSize: 14 }}
						label={{ value: `${date}`, position: 'insideBottomLeft', dx: -20, dy: 18 }}
					/>
					<CartesianGrid stroke={COLOR.WHITE_GRAY} />
					<Legend
						payload={[
							{ value: 'Area', type: 'line', color: COLOR.AREA },
							{ value: 'Bar', type: 'rect', color: COLOR.BAR },
							{ value: 'Selected  Bar', type: 'rect', color: COLOR.HIGHLIGHTED_BAR },
						]}
					/>
					<Tooltip content={<CustomTooltip />} />

					<Bar
						dataKey="value_bar"
						fill={COLOR.BAR}
						name="Bar"
						yAxisId="right"
						onClick={handleBarClick}
					>
						{chartData.map((entry, index) => (
							<Cell
								key={index}
								fill={entry.id === selectedID ? COLOR.HIGHLIGHTED_BAR : COLOR.BAR}
							/>
						))}
					</Bar>
					<YAxis yAxisId="right" orientation="right" stroke={COLOR.BAR} />
					<Area type="monotone" dataKey="value_area" fill={COLOR.AREA} name="Area" yAxisId="left" />
					<YAxis yAxisId="left" orientation="left" stroke={COLOR.AREA} domain={[0, 200]} />
				</ComposedChart>
			</ResponsiveContainer>
		</div>
	);
}

function CustomTooltip({ active, payload, label }: any) {
	if (active && payload && payload.length) {
		const data = payload[0].payload;
		return (
			<div className={styles.customTooltip}>
				<p className={styles.label}>{`${label}`}</p>
				<p className={styles.id}>{`ID: ${data.id}`}</p>
				<p className={styles.area}>{`Area: ${data.value_area}`}</p>
				<p className={styles.bar}>{`Bar: ${data.value_bar}`}</p>
			</div>
		);
	}

	return null;
}

export default TimeSeriesChart;
