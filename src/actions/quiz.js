import { formatingData, questionsTemplate } from '../helpers';
import { types } from '../types';

// Realiza la consulta a la api y coloca valores inciales
export const startGetDataAPI = () => {
  return async (dispatch) => {
    dispatch(loadingSpinner(true));

    try {
      const url = 'https://restcountries.com/v3.1/all';
      const response = await fetch(url);

      if (response.ok) {
        const result = await response.json();
        // console.log(result);

        const { tempAnswArr, tempCorrArr, type } = formatingData(result);
        // console.log(tempAnswArr, type, tempCorrArr);
        // Colocamos los datos en el state
        dispatch(setAnswersQuestions(tempCorrArr, tempAnswArr, type));
        dispatch(
          startFormatQuestionAndAnwers(0, type, tempCorrArr, tempAnswArr)
        );
        dispatch(errorAPI(false));
      } else {
        dispatch(errorAPI(true));
        console.log('error en el fetch no es 200');
      }
    } catch (error) {
      console.log(error);
      dispatch(errorAPI(true));
    } finally {
      dispatch(loadingSpinner(false));
    }
  };
};

// Realiza el cambio entre true y false con el fin de mostrar <Spinner/>
export const loadingSpinner = (flag) => ({
  type: types.loading,
  payload: flag,
});

// Realiza el cambio entre true y false con el fin de mostrar <Error404/>
export const errorAPI = (flag) => ({
  type: types.errorAPI,
  payload: flag,
});

// Realiza el cambio entre true y false con el fin de recargar la APP, volver a consultar la API
export const startTryAgain = (flag) => ({
  type: types.tryAgain,
  payload: flag,
});

// Coloca en el state 3 arreglos en de las respuestas correctas, el de las respuestas y el tipo de pregunta
const setAnswersQuestions = (correctArr, answersArr, typeQuestion) => ({
  type: types.arraysCountryQuiz,
  payload: {
    correctArr,
    answersArr,
    typeQuestion,
  },
});

// Sirve para mostrar el Boton de siguiente pregunta, esta en el componente <Question/>
export const startCheck = (flag) => ({ type: types.check, payload: flag });

// Reinicial el state a los valores por defecto
export const reset = () => ({ type: types.reset });

// Añade al valor de 1 a la variable allPoints
export const startAddPoints = () => ({ type: types.addPoints });

// Añade al valor de 1 a la variable count
export const startAddCount = () => ({ type: types.counter });

// Realiza el formateo de datos, dependiendo del tipo de pregunta, coloca el texto de la pregunata, la respuesta o respuestas, la respuesta correcta y el tipo de pregunta
export const startFormatQuestionAndAnwers = (
  count,
  typeQuestions,
  correctAnswer,
  answers
) => {
  return (dispatch) => {
    if (count === undefined) {
      dispatch(
        setActualQuestion({
          quest: '',
          answersQuest: [],
          correctAnswer: [],
          typeQ: '',
        })
      );
    } else {
      const objectQuest =
        typeQuestions[count] === 'currency' &&
        correctAnswer[count].currencies[0].name !== 'Dollar Unknow'
          ? {
              quest: `${answers[count][0].currencies[0].name} ${questionsTemplate.currency} ${correctAnswer[count].name}`,
              answers: answers[count][0].currencies[0].name,
              correctAnswer: correctAnswer[count],
              typeQ: 'currency',
            }
          : typeQuestions[count] === 'capital' && correctAnswer[count].capital
          ? {
              quest: `${correctAnswer[count].capital} ${questionsTemplate.capital} `,
              answers: answers[count],
              correctAnswer: correctAnswer[count],
              typeQ: 'capital',
            }
          : {
              quest: `${questionsTemplate.flag} `,
              answers: answers[count],
              correctAnswer: correctAnswer[count],
              typeQ: 'flag',
            };

      dispatch(
        setActualQuestion({
          quest: objectQuest.quest,
          answersQuest: objectQuest.answers,
          correctAnswer: objectQuest.correctAnswer,
          typeQ: objectQuest.typeQ,
        })
      );
    }
  };
};

// Coloca en el state la pregunta, las respuestas, la respuesta correcta y el tipo de pregunta
const setActualQuestion = ({ quest, answersQuest, correctAnswer, typeQ }) => ({
  type: types.actualQuestion,
  payload: { quest, answersQuest, correctAnswer, typeQ },
});
