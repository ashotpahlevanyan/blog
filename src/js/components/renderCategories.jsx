import React from 'react';

function renderCategories(categories) {
	return categories &&
		categories.split('\,')
			.map((category, index) => {
				category = category.trim();
				return <span
					key={index}
					className="badge badge-primary category">
				    {category}
				    </span>
			});
}

export default renderCategories;

