import styles from './Main.module.scss';
import TimeSeriesChart from '../../components/TimeSeriesChart/TimeSeriesChart';

function Main() {
	return (
		<div className={styles.container}>
			<TimeSeriesChart></TimeSeriesChart>
		</div>
	);
}

export default Main;
