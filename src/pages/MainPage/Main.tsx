import styles from './Main.module.scss';
import RecommendationContainer from '../../components/recommendation/RecommendationContainer';
import useInput from '../../hooks/useInput';

function Main() {
	const [input, inputValueChange] = useInput('');

	return (
		<div className={styles.container}>
			<div className={styles.searchBar}>
				<input
					className={styles.input}
					type="text"
					placeholder="질환명을 입력해주세요."
					onChange={inputValueChange}
					value={input}
				/>
				<button className={styles.btn}>검색</button>
			</div>
			{input !== '' && <RecommendationContainer data={[]} />}
		</div>
	);
}

export default Main;
