import styled from '@emotion/styled';
import React from 'react';

export const Error404 = () => {
	return (
		<Error>
			<h2>An error occurred, try again later</h2>
			<img
				src="https://images.unsplash.com/photo-1587720571453-61812666a128?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8c2FkJTIwaWNvbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=400&q=60"
				alt="error 404"
			/>
		</Error>
	);
};
const Error = styled.div`
	max-width: 50rem;
	width: 95%;
	margin: 0 auto;
	padding-top: 10rem;
	text-align: center;
	color: #fff;
	img {
		max-width: 100%;
		height: auto;
		border-radius: 2rem;
	}
`;