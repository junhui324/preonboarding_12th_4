import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './NotFound.module.scss';
import { ROUTES } from '../../constants/constants';

function NotFound() {
	const navigate = useNavigate();

	const handleClick = (e: React.MouseEvent) => {
		e.preventDefault();
		navigate(`${ROUTES.MAIN}`);
	};

	return (
		<div className={styles.container}>
			<div className={styles.statusContainer}>
				<div className={styles.status}>404</div>
				<div className={styles.status}>404</div>
			</div>
			<div className={styles.contentContainer}>
				<div className={styles.title}>현재 찾을 수 없는 페이지를 요청 하셨습니다.</div>
				<button className={styles.button} onClick={handleClick}>
					메인으로
				</button>
			</div>
		</div>
	);
}

export default NotFound;
