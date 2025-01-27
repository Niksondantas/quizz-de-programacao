//Declarando variáveis
const question = document.querySelector("#question")
const answersBox = document.querySelector("#answers-box")
const quizzContainer = document.querySelector("#quizz-container")
const scoreContainer = document.querySelector("#score-container")
const letters = ["a", "b", "c", "d"]
let points = 0
let actualQuestion = 0

// Perguntas
const questions = [
  {
    "question": "PHP foi desenvolvido para qual fim?",
    "answers": [
      {
        "answer": "back-end",
        "correct": true
      },
      {
        "answer": "front-end",
        "correct": false
      },
      {
        "answer": "Sistema operacional",
        "correct": false
      },
      {
        "answer": "Banco de dados",
        "correct": false
      },
    ]
  },
  {
    "question": "Uma forma de declarar variável em JavaScript:",
    "answers": [
      {
        "answer": "$var",
        "correct": false
      },
      {
        "answer": "var",
        "correct": true
      },
      {
        "answer": "@var",
        "correct": false
      },
      {
        "answer": "#let",
        "correct": false
      },
    ]
  },
  {
    "question": "Qual o seletor de id no CSS?",
    "answers": [
      {
        "answer": "#",
        "correct": true
      },
      {
        "answer": ".",
        "correct": false
      },
      {
        "answer": "@",
        "correct": false
      },
      {
        "answer": "/",
        "correct": false
      },
    ]
  },
  {
    "question": "Qual a linguagem de marcação usada na construção de páginas web?",
    "answers": [
      {
        "answer": "HTML",
        "correct": true
      },
      {
        "answer": "CSS",
        "correct": false
      },
      {
        "answer": "JavaScript",
        "correct": false
      },
      {
        "answer": "PHP",
        "correct": false
      },
    ]
  },
  {
    "question": "O que significa a sigla SQL?",
    "answers": [
      {
        "answer": "Structured Query Language",
        "correct": true
      },
      {
        "answer": "Simple Query Language",
        "correct": false
      },
      {
        "answer": "System Query Language",
        "correct": false
      },
      {
        "answer": "Secure Query Language",
        "correct": false
      },
    ]
  },
  {
    "question": "Qual é a função do Git?",
    "answers": [
      {
        "answer": "Controle de versão de código",
        "correct": true
      },
      {
        "answer": "Hospedar sites",
        "correct": false
      },
      {
        "answer": "Editar imagens",
        "correct": false
      },
      {
        "answer": "Compilar código",
        "correct": false
      },
    ]
  }
];

//Substuição do quizz para a primeira pergunta
function init(){  
    //Cria a primeira pergunta  
    createQuestion(0)
}

//Criar uma pergunta
function createQuestion(i){
//Limpar a questão anterior
const oldButtons = answersBox.querySelectorAll("button")

oldButtons.forEach(function(btn){
    btn.remove()
})

//Altera o texto da pergunta
const questionText = question.querySelector("#question-text")
const questionNumber = question.querySelector("#question-number")

questionText.textContent = questions[i].question;
questionNumber.textContent = i + 1

//Insere as alternativas
questions[i].answers.forEach(function(answer, i){

  //Cria o template do botão do quizz
  const answerTemplate = document.querySelector(".answer-template").cloneNode(true)
  
  const letterBtn = answerTemplate.querySelector(".btn-letter")
  const answerText = answerTemplate.querySelector(".question-answer")

  letterBtn.textContent = letters[i]
  answerText.textContent = answer['answer']
  
  answerTemplate.setAttribute("correct-answer", answer["correct"])

  //Remover hide e template class
  answerTemplate.classList.remove("hide")
  answerTemplate.classList.remove("answer-template")

  //Inserir a alternativa na tela
  answersBox.appendChild(answerTemplate)

  //Inserir um evento de click no botão
  answerTemplate.addEventListener("click", function(){
    checkAnswer(this)
  })

})

//Incrementar o número da questão
actualQuestion++


}

//Verificando resposta do usuário
function checkAnswer(btn){

  //Seleciona todos os botões
  const buttons = answersBox.querySelectorAll("button")

  //Verifica se a resposta está correta e adiciona classes nos botões
  buttons.forEach(function(button){

    if(button.getAttribute("correct-answer") === "true"){

      button.classList.add("correct-answer")

      //Checa se o usuário acertou a pergunta
      if(btn === button){

        //Se acertou incrementa os pontos
        points++

      }
    }else{

      button.classList.add("wrong-answer")

    }

  })

  //Exibir próxima pergunta
  nextQuestion()

}

//Exibe a próxima pergunta do Quizz
function nextQuestion(){

  //Time para o usuário ver as respostas
  setTimeout(function(){
  
    //Verifica se ainda há perguntas
    if(actualQuestion >= questions.length){

      //Mensagem sucesso
      showSuccessMesage()
      return

    }

    createQuestion(actualQuestion)

  }, 1500)

}

//Exibe a tela final
function showSuccessMesage(){

  hideOrShowQuizz()

  //Trocar informações da tela de sucesso

  //Calcular score
  const score = ((points / questions.length) * 100).toFixed(2)

  const displayScore = document.querySelector("#display-score span")
  displayScore.textContent = score.toString()

  //Altera o número de perguntas corretas
  const correctAnswer = document.querySelector("#correct-answers")
  correctAnswer.textContent = points

  //Alterar o toatal de perguntas
  const totalQuestions = document.querySelector("#questions-qty")
  totalQuestions.textContent = questions.length

}

//Mostra ou esconde o score
function hideOrShowQuizz(){

  quizzContainer.classList.toggle("hide")
  scoreContainer.classList.toggle("hide")

}

//Reiniciar Quizz
const restartBtn = document.querySelector("#restart")

restartBtn.addEventListener("click", function(){

  //Zerar o jogo
  actualQuestion = 0
  points = 0
  hideOrShowQuizz()
  init()

})

//Chamando a inicialização do Quizz
init()