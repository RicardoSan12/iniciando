import background from '../image/background.png';
import iconFinish from '../image/finish.svg';
import iconQuiz from '../image/quiz.svg';
// export const images = {
// 	background,
// 	iconFinish,
// 	iconQuiz,
// };

const ALL_QUESTIONS = 5;
const ALL_ANSWERS = 4;

let number = 0;

// Objeto con los tipos de pregntas posibles
export const questionsTemplate = {
  capital: 'is capital of',
  flag: 'Which country does this flag belong to',
  currency: 'is the currency of',
};

// Numero de preguntas
// export const allQuestion = parseInt(import.meta.env.VITE_ALL_QUESTIONS);
export const allQuestion = parseInt(ALL_QUESTIONS);

// Numero de respuestas opcionales
// export const allAnwersOptions = parseInt(import.meta.env.VITE_ALL_ANSWERS);
export const allAnwersOptions = parseInt(ALL_ANSWERS);

// Devuelve el numero de pregunta que se usara en el quiz
const randomQuestion = (tamArr) => {
  const questions = [];
  while (questions.length < allQuestion) {
    number = parseInt(Math.random() * tamArr);
    if (!questions.includes(number)) {
      questions.push(number);
    }
  }
  return questions;
};

// Devuelve el patron de pregunta que se usara
const typeQuestion = () => {
  const keys = Object.keys(questionsTemplate);
  const typeQ = [];

  while (typeQ.length < allQuestion) {
    typeQ.push(keys[parseInt(Math.random() * keys.length)]);
  }
  return typeQ;
};

// Genera numeros aleatorios dependiendo del tipo de pregunta
// currency solo dos respuestas
// capital o flag genera 4 respuestas
// Estas respuestas las genera dependiendo del tamaño del arreglo questionsArr que depende del valor de allQuestion
// Devuelve dos arrays uno para las respuestas(un array con arrays) y otro para la respuestas correcta(un array con objetos)
const randomAnswers = (questionsArr, typeArr, tamAllQuestions) => {
  const correctArr = [];
  const answersArr = questionsArr.map((el, i) => {
    const answerArr = [];
    let answerOptions = [];
    answerOptions.push(el);
    correctArr.push(el);
    // console.log(typeArr[i] === 'capital' || typeArr[i] === 'flag');
    if (typeArr[i] === 'capital' || typeArr[i] === 'flag') {
      while (answerOptions.length < allAnwersOptions) {
        number = parseInt(Math.random() * tamAllQuestions);
        if (!answerOptions.includes(number)) answerOptions.push(number);
      }
      // console.log(answerOptions);
      const sortArr = sortAnswers(answerOptions);
      answerArr.push(...sortArr);
      answerOptions = [];
    } else {
      while (answerOptions.length < 2) {
        number = parseInt(Math.random() * tamAllQuestions);
        if (!answerOptions.includes(number)) answerOptions.push(number);
      }
      // answerArr.push(answerOptions);
      // console.log(answerOptions);
      const sortArr = sortAnswers(answerOptions);
      answerArr.push(...sortArr);
      answerOptions = [];
    }
    return answerArr;
  });

  return { answersArr, correctArr };
};

// Ordena las respuestas de nemor a mayor
const sortAnswers = (answersArr) => {
  return answersArr.sort((a, b) => a - b);
};

export const formatingData = (result) => {
  // Obtiene la posision de las preguntas
  const questionsArr = randomQuestion(result.length);
  // Obtiene el tipo de pregunta
  const type = typeQuestion();
  // Obtienen las respuestaas y el oreden de menor a mayor
  const randomAns = randomAnswers(questionsArr, type, result.length);
  const { correctArr, answersArr } = randomAns;

  // Genera las respuestas correctas dependiendo de los numeros que genero randomAnswers
  const tempCorrArr = [];
  correctArr.forEach((el) => {
    const tempObj = {
      capital: result[el]?.capital ? result[el]?.capital[0] : 'Unknow',
      currencies: result[el]?.currencies
        ? Object.values(result[el].currencies)
        : { name: 'Dollar Unknow' },
      flag: result[el]?.flags.svg ? result[el].flags.svg : 'Unknow',
      name: result[el]?.name.common,
    };
    tempCorrArr.push(tempObj);
  });

  // Genera las respuestas dependiendo de los nuemros que genero randomAnswers
  const tempAnswArr = [];
  answersArr.forEach((el) => {
    const tempArr = [];
    el.forEach((country) => {
      const tempObj = {
        capital: result[country]?.capital
          ? result[country]?.capital[0]
          : 'Unknow',
        currencies: result[country]?.currencies
          ? Object.values(result[country].currencies)
          : { name: 'Dollar Unknow' },
        flag: result[country]?.flags.svg
          ? result[country].flags.svg
          : 'Unknown',
        name: result[country]?.name.common,
      };
      tempArr.push(tempObj);
    });
    tempAnswArr.push(tempArr);
  });

  return { tempCorrArr, tempAnswArr, type };
};
