import styles from './RecommendationContainer.module.scss';
import RecommendationList from './RecommendationList';

function RecommendationContainer({ data }: { data: any[] }) {
	return (
		<div className={styles.container}>
			<p className={styles.subTitle}>추천 검색어</p>
			<ul className={styles.list}>
				{data.length === 0 ? (
					<p className={styles.nolist}>추천 검색어가 없습니다.</p>
				) : (
					data.map(listItem => <RecommendationList key={listItem.sickCd} listItem={listItem} />)
				)}
			</ul>
		</div>
	);
}

export default RecommendationContainer;
