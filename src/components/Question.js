import styled from '@emotion/styled';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startAddCount, startCheck } from '../actions/quiz';
import { images } from '../helpers';
import { Answer } from './Answer';

export const Question = () => {
  const [textSelect, setTextSelect] = useState('');
  const letters = ['A', 'B', 'C', 'D'];
  const dispatch = useDispatch();
  const { check, actualQuest } = useSelector((state) => state.quiz);
  const { quest, answersQuest, correctAnswer, typeQ } = actualQuest;

  // Sirve para refrescar las props de componentes superiores, con esto se cambia a la siguiente pregunta
  const handleNextQuest = () => {
    dispatch(startCheck(false));
    dispatch(startAddCount());
  };

  return (
    <>
      <Quest>{quest}</Quest>
      <Icono src={images.iconQuiz} alt="icon quiz" />
      {typeQ === 'flag' && (
        <Image src={correctAnswer.flag} alt={correctAnswer.name} />
      )}

      {/* Dependiendo del tipo de pregunta las respuestas varian, por ejemplo hay preguntas con opciones(4 repuestas) y de verdadero o falso*/}
      {typeQ === 'currency' ? (
        // Divisas
        <>
          <Answer
            text="True"
            letter="A"
            correct={answersQuest === correctAnswer.currencies[0].name}
            correctText={
              answersQuest === correctAnswer.currencies[0].name
                ? 'True'
                : 'False'
            }
            setTextSelect={setTextSelect}
            textSelect={textSelect}
          />
          <Answer
            text="False"
            letter="B"
            correct={answersQuest !== correctAnswer.currencies[0].name}
            correctText={
              answersQuest !== correctAnswer.currencies[0].name
                ? 'False'
                : 'True'
            }
            setTextSelect={setTextSelect}
            textSelect={textSelect}
          />
        </>
      ) : (
        // typeQ === 'capital' || typeQ ==="flag" ?
        // Capitales y Banderas
        answersQuest.map((option, i) => (
          <Answer
            key={`${i}-${option.name}`}
            text={option.name}
            letter={letters[i]}
            correct={correctAnswer.name === option.name}
            correctText={correctAnswer.name}
            setTextSelect={setTextSelect}
            textSelect={textSelect}
          />
        ))
      )}

      {/* Check sirve como bandera para mostrar o no el boton de Next o siguiente pregunta  */}
      <Button onClick={handleNextQuest} className={check ? 'show' : ''}>
        Next
      </Button>
    </>
  );
};

const Quest = styled.h2`
	color: #2f527b;
`;
const Button = styled.button`
	padding: 1.25rem 2rem;
	color: #fff;
	cursor: pointer;
	background-color: #f9a826;
	border-radius: 0.75rem;
	border: none;
	display: block;
	margin-left: auto;
	margin-right: 0;
	font-size: 1.12rem;
	visibility: hidden;
	&.show {
		visibility: visible;
	}
`;
const Icono = styled.img`
	width: 10rem;
	height: auto;
	position: absolute;
	top: -10%;
	right: 0;
`;

const Image = styled.img`
	max-width: 6.25rem;
	height: auto;
	margin-bottom: 1rem;
	/* border: 1px solid #000; */
	filter: drop-shadow(0px 4px 24px rgba(0, 0, 0, 0.1));
`;
