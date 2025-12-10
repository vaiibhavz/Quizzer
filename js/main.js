document.addEventListener('DOMContentLoaded', () => {

  /* ============================
     INTERACTIVE QUIZ (improved)
     - Adds progress indicator
     - Persists answers & index in localStorage
     ============================ */

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

  // DOM refs
  const qText = document.getElementById('qText');
  const optionsWrap = document.getElementById('options');
  const prevBtn = document.getElementById('prevQ');
  const nextBtn = document.getElementById('nextQ');
  const submitBtn = document.getElementById('submitQuiz');
  const resultArea = document.getElementById('resultArea');
  const scoreText = document.getElementById('scoreText');
  const reviewList = document.getElementById('reviewList');
  const retryBtn = document.getElementById('retry');
  const progressEl = document.getElementById('progress');

  // State: try to load from localStorage
  const QUIZ_STATE_KEY = 'quizzer_state_v1';
  let stored = null;
  try { stored = JSON.parse(localStorage.getItem(QUIZ_STATE_KEY)); } catch (e) { stored = null; }

  let currentIndex = (stored && Number.isFinite(stored.currentIndex)) ? stored.currentIndex : 0;
  const answers = (stored && Array.isArray(stored.answers) && stored.answers.length === QUIZ_DATA.length)
    ? stored.answers.slice()
    : new Array(QUIZ_DATA.length).fill(null);

  function persistState() {
    try {
      localStorage.setItem(QUIZ_STATE_KEY, JSON.stringify({ currentIndex, answers }));
    } catch (e) {
      // localStorage might be blocked; fail silently
      console.warn('Could not persist quiz state', e);
    }
  }

  function updateProgress() {
    if (!progressEl) return;
    progressEl.textContent = `Question ${currentIndex + 1} / ${QUIZ_DATA.length}`;
  }

  function renderQuestion(index) {
    if (!qText) return;
    const item = QUIZ_DATA[index];
    qText.textContent = `Q${index + 1}. ${item.q}`;
    optionsWrap.innerHTML = '';

    item.options.forEach((opt, i) => {
      const id = `q${index}_opt${i}`;
      const div = document.createElement('label');
      div.className = 'option';
      div.setAttribute('role', 'listitem');

      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = `q${index}`;
      radio.id = id;
      radio.value = i;
      radio.checked = answers[index] === i;

      radio.addEventListener('change', () => {
        answers[index] = i;
        persistState();
      });

      const span = document.createElement('span');
      span.textContent = opt;

      div.appendChild(radio);
      div.appendChild(span);

      // clicking the label selects the radio (useful for touch)
      div.addEventListener('click', (e) => {
        if (e.target.tagName.toLowerCase() !== 'input') {
          radio.checked = true;
          answers[index] = i;
          persistState();
        }
      });

      optionsWrap.appendChild(div);
    });

    prevBtn.disabled = index === 0;
    nextBtn.disabled = index === QUIZ_DATA.length - 1;

    updateProgress();
    // hide result area while answering
    if (resultArea) resultArea.hidden = true;
  }

  // Controls
  prevBtn && prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
      renderQuestion(currentIndex);
      persistState();
    }
  });

  nextBtn && nextBtn.addEventListener('click', () => {
    if (currentIndex < QUIZ_DATA.length - 1) {
      currentIndex++;
      renderQuestion(currentIndex);
      persistState();
    }
  });

  submitBtn && submitBtn.addEventListener('click', () => {
    // Score calculation
    let score = 0;
    for (let i = 0; i < QUIZ_DATA.length; i++) {
      if (answers[i] === QUIZ_DATA[i].answer) score++;
    }

    if (scoreText) scoreText.textContent = `${score} / ${QUIZ_DATA.length} correct`;
    if (resultArea) resultArea.hidden = false;

    // Build review
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

    // scroll to result
    resultArea && resultArea.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  retryBtn && retryBtn.addEventListener('click', () => {
    currentIndex = 0;
    for (let i = 0; i < answers.length; i++) answers[i] = null;
    persistState();
    renderQuestion(currentIndex);
    resultArea.hidden = true;
  });

  // Initialize quiz (if on page)
  if (qText) {
    // If stored answers exist, pre-check radios after rendering
    renderQuestion(currentIndex);
  }


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
