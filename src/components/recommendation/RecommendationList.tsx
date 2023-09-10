import styles from './RecommendationList.module.scss';
import SearchIcon from '../../assets/search.svg';

function RecommendationList({ listItem }: { listItem: any }) {
	return (
		<li className={styles.listItem}>
			<img src={SearchIcon} className={styles.searchIcon} alt="검색아이콘" />
			<p className={styles.text}>{listItem.sickNm}</p>
		</li>
	);
}

export default RecommendationList;
