import styles from './FilterButton.module.scss';
import React from 'react';

interface FilterButtonProps {
	uniqueIds: string[] | undefined;
	selectedID: string | null;
	setSelectedID: React.Dispatch<React.SetStateAction<string | null>>;
}

function FilterButton({ uniqueIds, selectedID, setSelectedID }: FilterButtonProps) {
	const handleIDSelect = (id: string) => {
		setSelectedID(id);
	};
	return (
		<div className={styles.filterButtons}>
			<button onClick={() => setSelectedID('')} className={styles.button}>
				해제
			</button>
			{uniqueIds
				? uniqueIds.map(id => (
						<button
							key={id}
							onClick={() => handleIDSelect(id)}
							className={selectedID === id ? styles.selectedButton : styles.button}
						>
							{id}
						</button>
				  ))
				: ''}
		</div>
	);
}

export default FilterButton;
