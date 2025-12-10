document.addEventListener('DOMContentLoaded', () => {

  const QUIZ_DATA = [
    {
      q: 'Which keyword declares a block-scoped variable in modern JavaScript?',
      options: ['var', 'let', 'function', 'constant'],
      answer: 1
    },
    {
      q: 'What does DOM stand for?',
      options: ['Document Object Model', 'Data Object Model', 'Display Object Model', 'Document Oriented Model'],
      answer: 0
    },
    {
      q: 'Which method converts a JavaScript object to a JSON string?',
      options: ['JSON.parse()', 'JSON.stringify()', 'JSON.toString()', 'Stringify()'],
      answer: 1
    },
    {
      q: 'Which array method creates a new array with the results of calling a provided function on every element?',
      options: ['filter()', 'forEach()', 'map()', 'reduce()'],
      answer: 2
    },
    {
      q: 'Which HTML attribute is used to reference an external JavaScript file?',
      options: ['href', 'src', 'link', 'rel'],
      answer: 1
    }
  ];

  // Quiz DOM elements
  const qText = document.getElementById('qText');
  const optionsWrap = document.getElementById('options');
  const prevBtn = document.getElementById('prevQ');
  const nextBtn = document.getElementById('nextQ');
  const submitBtn = document.getElementById('submitQuiz');
  const resultArea = document.getElementById('resultArea');
  const scoreText = document.getElementById('scoreText');
  const reviewList = document.getElementById('reviewList');
  const retryBtn = document.getElementById('retry');

  // State
  let currentIndex = 0;
  const answers = new Array(QUIZ_DATA.length).fill(null);

  function renderQuestion(index) {
    if (!qText) return;
    const item = QUIZ_DATA[index];

    // Animation reset
    qText.classList.remove('animate-enter');
    optionsWrap.classList.remove('animate-enter');
    void qText.offsetWidth; // trigger reflow

    qText.classList.add('animate-enter');
    optionsWrap.classList.add('animate-enter');

    qText.textContent = `Q${index + 1}. ${item.q}`;
    optionsWrap.innerHTML = '';

    item.options.forEach((opt, i) => {
      const div = document.createElement('label');
      div.className = 'option';
      div.setAttribute('role', 'listitem');

      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = 'quiz_option'; 
      radio.value = i;
      radio.checked = answers[index] === i;

      const span = document.createElement('span');
      span.textContent = opt;

      div.appendChild(radio);
      div.appendChild(span);
      optionsWrap.appendChild(div);
    });

    prevBtn.disabled = index === 0;
    nextBtn.disabled = index === QUIZ_DATA.length - 1;
    if (resultArea) resultArea.hidden = true;
  }

  function checkCompletion() {
    const allAnswered = answers.every(a => a !== null);
    if (submitBtn) submitBtn.disabled = !allAnswered;
  }

  checkCompletion();

  if (optionsWrap) {
    optionsWrap.addEventListener('change', (e) => {
      if (e.target.matches('input[type="radio"]')) {
        answers[currentIndex] = parseInt(e.target.value, 10);
        checkCompletion();
      }
    });
  }

  prevBtn && prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
      renderQuestion(currentIndex);
    }
  });

  nextBtn && nextBtn.addEventListener('click', () => {
    if (currentIndex < QUIZ_DATA.length - 1) {
      currentIndex++;
      renderQuestion(currentIndex);
    }
  });

  submitBtn && submitBtn.addEventListener('click', () => {
    let score = 0;
    for (let i = 0; i < QUIZ_DATA.length; i++) {
      if (answers[i] === QUIZ_DATA[i].answer) score++;
    }

    if (scoreText) scoreText.textContent = `${score} / ${QUIZ_DATA.length} correct`;
    if (resultArea) resultArea.hidden = false;

    if (reviewList) {
      reviewList.innerHTML = '';
      QUIZ_DATA.forEach((q, i) => {
        const div = document.createElement('div');
        div.className = 'review-item';
        const your = (answers[i] === null) ? 'No answer' : q.options[answers[i]];
        const correct = q.options[q.answer];
        div.innerHTML = `<strong>Q${i + 1}.</strong> ${q.q}
          <div style="margin-top:6px">Your answer: <em>${your}</em></div>
          <div>Correct: <em>${correct}</em></div>`;
        reviewList.appendChild(div);
      });
    }

    resultArea && resultArea.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  retryBtn && retryBtn.addEventListener('click', () => {
    currentIndex = 0;
    for (let i = 0; i < answers.length; i++) answers[i] = null;
    checkCompletion();
    renderQuestion(currentIndex);
    resultArea.hidden = true;
  });

  if (qText) renderQuestion(currentIndex);


  /* ============================
     API FETCH DEMO (Random Joke)
     ============================ */

  const fetchJokeBtn = document.getElementById('fetchJokeBtn');
  const jokeArea = document.getElementById('jokeArea');

  async function fetchJoke() {
    if (!jokeArea) return;
    jokeArea.textContent = 'Loading...';
    jokeArea.classList.remove('animate-enter');

    try {
      const res = await fetch('https://official-joke-api.appspot.com/random_joke', { cache: 'no-store' });
      if (!res.ok) throw new Error('Network response was not ok');
      const data = await res.json();

      jokeArea.textContent = `${data.setup} — ${data.punchline}`;
      jokeArea.classList.add('animate-enter');
    } catch (err) {
      jokeArea.textContent = 'Failed to fetch a joke. Try again.';
      console.error('Fetch error:', err);
    }
  }

  fetchJokeBtn && fetchJokeBtn.addEventListener('click', fetchJoke);

  if (jokeArea && fetchJokeBtn) {
  }

});
