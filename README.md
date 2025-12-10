# Quizzer – Task 3 Mini Project (ApexPlanet Internship)

Quizzer is a small, responsive web application built as part of **Task 3** of the ApexPlanet Web Development Internship.  
This project demonstrates three core concepts:

1. **Responsive design using CSS media queries**  
2. **An interactive JavaScript quiz with scoring & review**  
3. **Fetching data from a public API using `fetch()`**

The goal was to create a clean, functional mini-project that showcases practical frontend development skills.

---

## Features

### 1. Responsive Design  
All pages are fully responsive across mobile, tablet, and desktop.  
Layouts adjust using CSS Grid, Flexbox, and media queries to ensure readable typography and clean spacing on any device.

### 2. Interactive Quiz  
The quiz includes:
- Multiple questions  
- Option selection  
- Next/Previous navigation  
- Final score calculation  
- Detailed answer review  
- Progress indicator (Question X / Y)  
- Autosaving of user state using `localStorage`  

If the page reloads, the quiz resumes exactly where the user left off.

### 3. API Fetch Demo  
A simple API demo page fetches a **random joke** from a public API and displays:
- Loading state  
- Data / punchline  
- Error messaging (if the fetch fails)

This demonstrates basic asynchronous programming with `async/await` and error handling.

---

## Project Structure

Quizzer/
├── index.html        # Home page (intro + responsive layout)
├── quiz.html         # Interactive quiz functionality
├── api.html          # API fetch demo (random joke)
│
├── css/
│   └── style.css     # Shared styling + media queries
│
└── js/
    └── main.js       # Quiz logic, API fetch, and shared behaviors


---

## How It Works

### Quiz Logic
- All questions are defined in a JavaScript array.  
- User answers are tracked in an array and persisted to `localStorage`.  
- Navigation buttons update the current question.  
- On submit, the score is calculated and a detailed review is generated dynamically.

### API Fetch
- A button triggers a `fetch()` request to a public joke API.  
- Displays loading text while waiting for the response.  
- Handles network errors gracefully.

---

## Technologies Used
- **HTML5** – structure & content  
- **CSS3** – responsive design, layout, UI components  
- **JavaScript (ES6+)** – quiz logic, localStorage, DOM updates, fetch API  
- **No external frameworks**  
- 100% Vanilla JS & CSS

---

## How to Run the Project

1. Clone this repository:
   ```bash
   git clone https://github.com/vaiibhavz/Quizzer
   ```
2. Open any .html file directly in your browser.

3. No dependencies or build steps required.


## Acknowledgements
This project was created as part of the ApexPlanet Web Development Internship – Task 3, focusing on frontend fundamentals, responsiveness, and JavaScript interactivity.
