import styled from '@emotion/styled';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { reset, startTryAgain } from '../actions/quiz';
import { allQuestion, images } from '../helpers';

export const Result = () => {
	const dispatch = useDispatch();
	const { allPoints } = useSelector((state) => state.quiz);

	// Reinicia el state y permite que se vulva a hacer la peticion al API
	const handleReset = () => {
		dispatch(reset());
		dispatch(startTryAgain(true));
	};

	return (
		<Container>
			<img src={images.iconFinish} alt="Icon Finish" />
			<Title>Results</Title>
			<Percentage>
				You have <span>{(allPoints / allQuestion) * 100} %</span> correct answers
			</Percentage>
			<Button onClick={handleReset}>Try again</Button>
		</Container>
	);
};

const Container = styled.div`
	display: flex;
	justify-content: center;
	flex-direction: column;
	align-items: center;
	min-height: 18.7rem;
`;
const Title = styled.h2`
	color: #1d355d;
	margin-bottom: 0;
`;
const Percentage = styled.p`
	color: #1d355d;
	span {
		color: #60bf88;
		font-size: 1.6rem;
		font-weight: 700;
	}
`;
const Button = styled.button`
	color: #1d355d;
	border: 0.1rem solid #1d355d;
	border-radius: 0.75rem;
	padding: 1rem 2rem;
	cursor: pointer;
	transition: color 0.3s ease-out, background-color 0.3s ease-out;
	&:hover {
		background-color: #1d355d;
		color: #fff;
	}
`;