import styled from '@emotion/styled';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { startFormatQuestionAndAnwers } from '../actions/quiz';
import { allQuestion } from '../helpers';
import { Question } from './Question';
import { Result } from './Result';

export const ContainerQuestion = () => {
	const { answers, correctAnswer, typeQuestions, count } = useSelector(
		(state) => state.quiz
	);
	const dispatch = useDispatch();

	// Si existe count o si es 0 coloca en el state los valores del contador, el tipo de pregunta, la respuesta correcta y las respuestas
	// Esto lo realizara dependiendo del numero que tienen el archivo  .env en la variable VITE_ALL_QUESTIONS
	useEffect(() => {
		if (count || count === 0) {
			dispatch(
				startFormatQuestionAndAnwers(count, typeQuestions, correctAnswer, answers)
			);
		}
	}, [count]);

	return (
		<ContainerComponent>
			<Title>Country Quiz</Title>
			<ContainerQuest>{count === allQuestion ? <Result /> : <Question />}</ContainerQuest>
		</ContainerComponent>
	);
};
const Title = styled.h1`
	color: #fff;
	font-weight: 700;
	text-transform: uppercase;
	margin-bottom: 5rem;
	margin-top: 0;
	text-align: center;
	@media (min-width: 500px) {
		margin-bottom: 2rem;
		text-align: left;
	}
`;

const ContainerQuest = styled.article`
	background-color: #fff;
	max-width: 50rem;
	position: relative;
	padding: 2rem;
	border-radius: 1.5rem;
`;

const ContainerComponent = styled.section`
	max-width: 37rem;
	width: 95%;
	margin: 0 auto;
	padding: 3rem 0; //6.5rem 0
`;