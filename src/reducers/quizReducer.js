import { types } from '../types';

const initialState = {
  answers: [],
  correctAnswer: [],
  typeQuestions: [],
  check: false,
  tryAgain: false,
  errorAPI: false,
  loading: false,
  allPoints: 0,
  count: 0,
  actualQuest: {
    quest: '',
    answersQuest: [],
    correctAnswer: {},
    typeQ: '',
  },
};
export const quizReducer = (state = initialState, action) => {
  switch (action.type) {
    // Se usa para visualizar el componente Spinner
    case types.loading:
      return {
        ...state,
        loading: action.payload,
      };

    // Se usa para visualizar el componente Error404
    case types.errorAPI:
      return {
        ...state,
        errorAPI: action.payload,
      };

    // Se usa para mostrar el boton de diguiente pregunta
    case types.check:
      return { ...state, check: action.payload };

    // Funciona en la primera carga de la aplicacion, y cuando s reinicia la app en el componente Result
    // rellena los arrays (respuestas correctas, respuestas y tipo de pregunta )
    case types.arraysCountryQuiz:
      const { correctArr, answersArr, typeQuestion } = action.payload;
      return {
        ...state,
        correctAnswer: correctArr,
        answers: answersArr,
        typeQuestions: typeQuestion,
      };

    // Sirve para volver a traer datos de la API y recargar el componente principal
    case types.tryAgain:
      return {
        ...state,
        tryAgain: action.payload,
      };

    // Sirve para incrementar el puntaje del usuario
    case types.addPoints:
      return { ...state, allPoints: state.allPoints + 1 };

    // Sirve para increntar el contador de preguntas
    case types.counter:
      return { ...state, count: state.count + 1 };

    // Coloca en el objeto actualQuest, los datos siguientes
    // Pregunta (texto)
    // Respuesta o respuestas
    // Respuesta correcta
    // Tipo de pregunta
    case types.actualQuestion:
      return {
        ...state,
        actualQuest: action.payload,
      };

    // Reinicia el state a su valor inicial
    case types.reset:
      return initialState;

    // Opcion por defecto
    default:
      return state;
  }
};
