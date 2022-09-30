const questions = [
    {
        question: "Кто главный валаеб на офисе? ",
        answers: ["Самый костлявый типок в мире", "Дима Сарафанюк", "Владелец серой шкоды 1.9tdi 2001 года", "Карась"],
        correct: 4,
    },
    {
        question: "Сколько часов Карась работает в день?",
        answers: [
            "Вообще не работает",
            "Работает, но только в гараже " +
            "со своей машиной",
            "Что значит работает? Вала ебу",
            "Пару минут выделяет",
        ],
        correct: 2,
    },
    {
        question: "Сколько он приносит конторе?",
        answers: [
            "На него затрат больше, чем он приносит",
            "Ровным счетом нихуя",
            "Две гривны в месяц",
            "Он еще как-то  умудряеться выносить что-то",
        ],
        correct: 1,
    },
    {
        question: "Что ему буде после контрольного колла?",
        answers: ["Премия", "Колл в очко", "Будет должен", "Ему пизда"],
        correct: 2,
    },
];


// Находим элементы
const headerContainer = document.querySelector('#header');
const listContainer = document.querySelector('#list');
const submitBtn = document.querySelector('#submit')

// переменная игры
let score = 0; // количество правильных ответов
let questionsIndex = 0; // текущий вопрос

// Очмстка HTML

clearPage();
showQuestions();
submitBtn.onclick = checkAnswer;

function clearPage() {
    headerContainer.innerHTML = '';
    listContainer.innerHTML = '';
}

function showQuestions() {
    // Вопрос

    const headerTemplate = `<h2 class="title">%title%</h2>`;
    const title = headerTemplate.replace('%title%', questions[questionsIndex]['question']);
    headerContainer.innerHTML = title;

    // Варианты ответов

    let answerNumber = 1;
    for (answerText of questions[questionsIndex]['answers']) {

        const questionsTemplate =
            `<li>
				<label>
					<input value="%number%" type="radio" class="answer" name="answer" />
					<span>%answer%</span>
				</label>
			</li>`;

        const answerHTML = questionsTemplate
                                            .replace('%answer%', answerText)
                                            .replace('%number%', answerNumber)

        listContainer.innerHTML += answerHTML;
        answerNumber++;
    }
}

function checkAnswer() {

    // Находим выбранную радио кнопку
    const checkedRadio = listContainer.querySelector('input[type = "radio"]:checked');

    // Если ответ не выбран - ничего не деоаем, выходим из функ-ции
    if (!checkedRadio) {
        submitBtn.blur();
        return
    }

    // Узнаем ответ верно  - увеличиваем счет
    const userAnswer = parseInt(checkedRadio.value);

    // Если ответилв ерно - увеличиваем счет
    console.log(userAnswer, questions[questionsIndex]['correct']);
    if  (userAnswer === questions[questionsIndex]['correct']) {
        score++;
    }
    console.log('score = ',score)

    if (questionsIndex !== questions.length  - 1) {
        console.log('это не последний вопрос')
        questionsIndex++;
        clearPage();
        showQuestions();
    } else {
        console.log('Это последний вопрос')
        clearPage();
        showResults();
    }
}
function showResults() {
    console.log('showResults started!');
    console.log(score)


    const resultsTemplate =
        `<h2 class="title">%title%</h2>\n' +
        <h3 class="summary">%message%</h3>\n' +
        <p class="result">%result%</p>
        `;
    let title, message;
    //Варианты заголовок и текста
    if (score === questions.length) {
        title = 'Поздравляем! 🤠🫢';
        message = 'Теперь вы знаете, кто самый главный валаеб! 👏👏'
    } else if ((score * 100) / questions.length >= 50) {
        title = 'Не плохой результат! 🤠';
        message = 'Подумай еще! 🕺';
    } else {
        title = 'Стоит еще раз проанализировать!👩‍🦯👩‍🦯'
        message = 'Пока вы не нашли главного валаеба!🙅‍♀️🙅'
    }

    // Результат
    let result  = `${score} из ${questions.length}`;

    // Финальный ответ
    const finalMessage = resultsTemplate
        .replace('%title', title)
        .replace('%message', message)
        .replace('%result', result)

    headerContainer.innerHTML = finalMessage;

    // Меняем кнопку на ИГРАТЬ СНОВА
    submitBtn.blur();
    submitBtn.innerText = 'Начать заново';
    submitBtn.onclick = () => history.go();

}

