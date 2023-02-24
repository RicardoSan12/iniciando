import styled from '@emotion/styled';
import { useDispatch, useSelector } from 'react-redux';
import { startAddPoints, startCheck } from '../actions/quiz';

export const Answer = ({
	correct,
	letter,
	text,
	textSelect,
	correctText,
	setTextSelect,
}) => {
	const { check } = useSelector((state) => state.quiz);
	const dispatch = useDispatch();

	// Sirve para realizar el agregar un punto si es correcta la respuesta y para dar estilos a la respuesta seleccionada
	const handleClick = () => {
		if (!check) {
			dispatch(startCheck(true));
			setTextSelect(text);
			if (correctText === text) {
				dispatch(startAddPoints());
			}
		}
	};

	return (
		<Conatainer
			onClick={handleClick}
			className={`${check && correct ? 'correct' : ''} ${
				check && !correct && textSelect === text ? 'incorrect' : ''
			} ${!check ? 'hover' : ''}`}
		>
			{/* Muestra una letra entre A y D en caso de que sea True o False no lo muestra */}
			{text === 'True' || text === 'False' ? <></> : <p className="letter">{letter}</p>}
			<p>{text}</p>

			{check && correct && (
				<span className="material-icons-outlined icon correct">check_circle</span>
			)}
			{/* En caso que la respuesta sea incorrecta y que solo sea la que selecciono el usuario agrega el icono de un tache  */}
			{check && !correct && textSelect === text && (
				<span className="material-icons-outlined icon incorrect">cancel</span>
			)}
		</Conatainer>
	);
};
const Conatainer = styled.div`
	display: flex;
	align-items: center;
	padding-left: 1rem;
	padding-right: 1rem;
	border-radius: 0.75rem;
	color: #6066d0cc;
	border: 1px solid #6066d0cc;
	margin-bottom: 1rem;
	transition: all 0.3s ease-out;
	.letter {
		flex-basis: 10%;
	}
	&:hover.hover {
		background-color: #f9a826;
		border: 1px solid #f9a826;
		cursor: pointer;
		color: #fff;
	}
	.icon {
		flex: 1;
		text-align: right;
	}
	&.incorrect {
		background-color: #ea8282;
		border-color: #ea8282;
		color: #fff;
	}
	&.correct {
		background-color: #60bf88;
		border-color: #60bf88;
		color: #fff;
	}
`;