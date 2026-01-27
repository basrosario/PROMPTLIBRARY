/**
 * Praxis Library - Education Games Module
 * Quiz, Flashcard, and Prompting Challenge Games
 */

// ============================================
// QUIZ GAME CLASS
// ============================================
class QuizGame {
    constructor() {
        this.tier = null;
        this.questions = [];
        this.currentIndex = 0;
        this.score = 0;
        this.questionsPerSession = 5;
        this.answers = [];
    }

    async loadQuestions(tier) {
        this.tier = tier;
        this.currentIndex = 0;
        this.score = 0;
        this.answers = [];

        try {
            const response = await fetch(`../data/quiz-${tier}.json`);
            if (!response.ok) throw new Error('Failed to load questions');
            const data = await response.json();

            // Shuffle and select 5 random questions
            this.questions = this.shuffle([...data.questions]).slice(0, this.questionsPerSession);
            return true;
        } catch (error) {
            console.error('Error loading quiz questions:', error);
            return false;
        }
    }

    shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    getCurrentQuestion() {
        return this.questions[this.currentIndex];
    }

    submitAnswer(answerIndex) {
        const question = this.questions[this.currentIndex];
        const correct = question.correct === answerIndex;

        this.answers.push({
            question: question,
            selected: answerIndex,
            correct: correct
        });

        if (correct) {
            this.score += 20; // 20 points per question = 100 max
        }

        return {
            correct: correct,
            correctAnswer: question.correct,
            explanation: question.explanation,
            score: this.score
        };
    }

    nextQuestion() {
        this.currentIndex++;
        return this.currentIndex < this.questionsPerSession;
    }

    isComplete() {
        return this.currentIndex >= this.questionsPerSession;
    }

    getResults() {
        return {
            score: this.score,
            tier: this.tier,
            total: this.questionsPerSession,
            answers: this.answers,
            timestamp: Date.now()
        };
    }

    getTierLabel(tier) {
        const labels = {
            'elementary': 'Elementary',
            'middle': 'Middle School',
            'highschool': 'High School',
            'adult': 'College/Adult'
        };
        return labels[tier] || tier;
    }
}

// ============================================
// FLASHCARD GAME CLASS
// ============================================
class FlashcardGame {
    constructor() {
        this.tier = null;
        this.cards = [];
        this.currentIndex = 0;
        this.cardsPerSession = 5;
        this.isFlipped = false;
    }

    async loadCards(tier) {
        this.tier = tier;
        this.currentIndex = 0;
        this.isFlipped = false;

        try {
            const response = await fetch(`../data/flashcards.json`);
            if (!response.ok) throw new Error('Failed to load flashcards');
            const data = await response.json();

            // Get cards for selected tier and shuffle
            const tierCards = data[tier] || [];
            this.cards = this.shuffle([...tierCards]).slice(0, this.cardsPerSession);
            return true;
        } catch (error) {
            console.error('Error loading flashcards:', error);
            return false;
        }
    }

    shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    getCurrentCard() {
        return this.cards[this.currentIndex];
    }

    flip() {
        this.isFlipped = !this.isFlipped;
        return this.isFlipped;
    }

    resetFlip() {
        this.isFlipped = false;
    }

    nextCard() {
        if (this.currentIndex < this.cards.length - 1) {
            this.currentIndex++;
            this.isFlipped = false;
            return true;
        }
        return false;
    }

    prevCard() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            this.isFlipped = false;
            return true;
        }
        return false;
    }

    reshuffleCards() {
        this.cards = this.shuffle([...this.cards]);
        this.currentIndex = 0;
        this.isFlipped = false;
    }

    restart() {
        this.currentIndex = 0;
        this.isFlipped = false;
    }

    isLastCard() {
        return this.currentIndex >= this.cards.length - 1;
    }

    getTierLabel(tier) {
        const labels = {
            'elementary': 'Elementary',
            'middle': 'Middle School',
            'highschool': 'High School',
            'adult': 'College/Adult'
        };
        return labels[tier] || tier;
    }
}

// ============================================
// PROMPT CHALLENGE CLASS
// ============================================
class PromptChallenge {
    constructor() {
        this.tier = null;
        this.challenge = null;
        this.challenges = [];
    }

    async loadChallenge(tier) {
        this.tier = tier;

        try {
            const response = await fetch(`../data/prompt-challenges.json`);
            if (!response.ok) throw new Error('Failed to load challenges');
            const data = await response.json();

            // Get challenges for selected tier
            this.challenges = data[tier] || [];

            // Select a random challenge
            if (this.challenges.length > 0) {
                this.challenge = this.challenges[Math.floor(Math.random() * this.challenges.length)];
                return true;
            }
            return false;
        } catch (error) {
            console.error('Error loading prompt challenges:', error);
            return false;
        }
    }

    getNewChallenge() {
        if (this.challenges.length > 1) {
            // Pick a different challenge
            let newChallenge;
            do {
                newChallenge = this.challenges[Math.floor(Math.random() * this.challenges.length)];
            } while (newChallenge.id === this.challenge.id && this.challenges.length > 1);
            this.challenge = newChallenge;
        }
        return this.challenge;
    }

    getCurrentChallenge() {
        return this.challenge;
    }

    scoreSubmission(prompt, response) {
        if (!this.challenge) return null;

        const scores = {
            clarity: this.scoreClarity(prompt),
            audience: this.scoreAudience(prompt, response),
            completeness: this.scoreCompleteness(response),
            quality: this.scoreQuality(prompt, response)
        };

        const total = Object.values(scores).reduce((sum, val) => sum + val, 0);

        return {
            breakdown: scores,
            total: total,
            tier: this.tier,
            challenge: this.challenge.title,
            timestamp: Date.now()
        };
    }

    scoreClarity(prompt) {
        let score = 0;
        const promptLower = prompt.toLowerCase();

        // Length checks
        if (prompt.length > 20) score += 5;
        if (prompt.length > 50) score += 5;
        if (prompt.length > 100) score += 3;

        // Contains question or instruction words
        const instructionWords = ['explain', 'describe', 'write', 'create', 'help', 'tell', 'show', 'list', 'give'];
        if (instructionWords.some(word => promptLower.includes(word))) score += 5;

        // Contains question mark or clear directive
        if (prompt.includes('?') || promptLower.includes('please')) score += 4;

        // Specificity indicators
        const specificWords = ['specifically', 'exactly', 'particular', 'focus', 'detail'];
        if (specificWords.some(word => promptLower.includes(word))) score += 3;

        return Math.min(score, 25);
    }

    scoreAudience(prompt, response) {
        let score = 0;
        const promptLower = prompt.toLowerCase();
        const responseLower = response.toLowerCase();

        // Mentions audience or context
        const audienceWords = ['student', 'teacher', 'beginner', 'expert', 'child', 'adult', 'grade', 'level', 'simple', 'advanced', 'professional'];
        if (audienceWords.some(word => promptLower.includes(word))) score += 10;

        // Mentions purpose or context
        const contextWords = ['for', 'because', 'need', 'trying to', 'working on', 'project', 'assignment', 'homework'];
        if (contextWords.some(word => promptLower.includes(word))) score += 8;

        // Response seems appropriately targeted
        if (response.length > 100) score += 4;
        if (!responseLower.includes('as an ai') && !responseLower.includes('i cannot')) score += 3;

        return Math.min(score, 25);
    }

    scoreCompleteness(response) {
        let score = 0;
        const responseLower = response.toLowerCase();
        const keywords = this.challenge.keywords || [];

        // Check for keyword coverage
        const foundKeywords = keywords.filter(kw => responseLower.includes(kw.toLowerCase()));
        const keywordRatio = keywords.length > 0 ? foundKeywords.length / keywords.length : 0.5;
        score += Math.round(keywordRatio * 15);

        // Response length indicates completeness
        if (response.length > 200) score += 3;
        if (response.length > 500) score += 4;
        if (response.length > 1000) score += 3;

        return Math.min(score, 25);
    }

    scoreQuality(prompt, response) {
        let score = 0;
        const responseLower = response.toLowerCase();

        // Response has structure
        if (response.includes('\n') || response.includes('•') || response.includes('-')) score += 5;
        if (response.includes('1.') || response.includes('1)') || response.includes('First')) score += 5;

        // Response seems substantive
        const sentences = response.split(/[.!?]+/).filter(s => s.trim().length > 10);
        if (sentences.length >= 3) score += 5;
        if (sentences.length >= 5) score += 5;

        // No obvious errors or refusals
        const errorIndicators = ['error', 'cannot', 'unable', 'sorry', "don't understand"];
        if (!errorIndicators.some(word => responseLower.includes(word))) score += 5;

        return Math.min(score, 25);
    }

    getScoreMessage(score) {
        if (score >= 90) return "Excellent! You're a prompting pro!";
        if (score >= 75) return "Great job! Your prompts are effective.";
        if (score >= 60) return "Good work! Keep practicing to improve.";
        if (score >= 40) return "Nice try! Review the tips and try again.";
        return "Keep practicing! Check the prompting tips below.";
    }

    getTierLabel(tier) {
        const labels = {
            'elementary': 'Elementary',
            'middle': 'Middle School',
            'highschool': 'High School',
            'adult': 'College/Adult'
        };
        return labels[tier] || tier;
    }
}

// ============================================
// LEADERBOARD FUNCTIONS
// ============================================
const Leaderboard = {
    STORAGE_KEY: 'praxis_leaderboard',

    getScores(gameType, tier) {
        const data = this.loadData();
        const key = `${gameType}_${tier}`;
        return (data[key] || []).slice(0, 10);
    },

    addScore(gameType, tier, score, initials) {
        const data = this.loadData();
        const key = `${gameType}_${tier}`;

        if (!data[key]) data[key] = [];

        // Sanitize initials
        const cleanInitials = initials.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 3) || 'AAA';

        data[key].push({
            initials: cleanInitials,
            score: score,
            timestamp: Date.now()
        });

        // Sort by score descending, keep top 100
        data[key].sort((a, b) => b.score - a.score);
        data[key] = data[key].slice(0, 100);

        this.saveData(data);

        // Return rank
        return data[key].findIndex(s => s.timestamp === data[key].find(x => x.initials === cleanInitials && x.score === score)?.timestamp) + 1;
    },

    loadData() {
        try {
            return JSON.parse(localStorage.getItem(this.STORAGE_KEY)) || {};
        } catch {
            return {};
        }
    },

    saveData(data) {
        try {
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
        } catch (e) {
            console.error('Failed to save leaderboard:', e);
        }
    }
};

// ============================================
// PAGE INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    // Detect which page we're on and initialize
    const path = window.location.pathname;

    if (path.includes('quiz.html')) {
        initQuizPage();
    } else if (path.includes('flashcards.html')) {
        initFlashcardsPage();
    } else if (path.includes('prompt-test.html')) {
        initPromptTestPage();
    } else if (path.includes('games/index.html') || path.endsWith('games/')) {
        initGamesHub();
    }
});

// ============================================
// QUIZ PAGE INITIALIZATION
// ============================================
function initQuizPage() {
    const game = new QuizGame();

    // Elements
    const levelSelect = document.getElementById('level-select');
    const quizArea = document.getElementById('quiz-area');
    const resultsArea = document.getElementById('results-area');
    const ageCards = document.querySelectorAll('.age-card');

    // Quiz elements
    const progressFill = document.getElementById('progress-fill');
    const currentQ = document.getElementById('current-q');
    const questionText = document.getElementById('question-text');
    const optionsContainer = document.getElementById('options-container');
    const feedbackArea = document.getElementById('feedback-area');
    const feedbackIcon = document.getElementById('feedback-icon');
    const feedbackText = document.getElementById('feedback-text');
    const explanationText = document.getElementById('explanation-text');
    const nextBtn = document.getElementById('next-btn');
    const currentLevel = document.getElementById('current-level');

    // Results elements
    const finalScore = document.getElementById('final-score');
    const resultLevel = document.getElementById('result-level');
    const resultMessage = document.getElementById('result-message');
    const playAgainBtn = document.getElementById('play-again');
    const changeLevelBtn = document.getElementById('change-level');

    // Level selection
    ageCards.forEach(card => {
        card.addEventListener('click', async () => {
            const tier = card.dataset.tier;
            const success = await game.loadQuestions(tier);

            if (success) {
                levelSelect.hidden = true;
                quizArea.hidden = false;
                resultsArea.hidden = true;
                currentLevel.textContent = game.getTierLabel(tier);
                displayQuestion();
            }
        });
    });

    function displayQuestion() {
        const q = game.getCurrentQuestion();
        if (!q) return;

        // Update progress
        progressFill.style.width = `${((game.currentIndex) / game.questionsPerSession) * 100}%`;
        currentQ.textContent = game.currentIndex + 1;

        // Display question
        questionText.textContent = q.question;

        // Clear and create options
        optionsContainer.innerHTML = '';
        q.options.forEach((option, index) => {
            const btn = document.createElement('button');
            btn.className = 'quiz-option';
            btn.textContent = option;
            btn.addEventListener('click', () => selectAnswer(index));
            optionsContainer.appendChild(btn);
        });

        // Hide feedback
        feedbackArea.hidden = true;
        nextBtn.hidden = true;
    }

    function selectAnswer(index) {
        // Disable all options
        const options = optionsContainer.querySelectorAll('.quiz-option');
        options.forEach(opt => opt.disabled = true);

        // Submit answer
        const result = game.submitAnswer(index);

        // Show feedback
        options[index].classList.add(result.correct ? 'correct' : 'incorrect');
        if (!result.correct) {
            options[result.correctAnswer].classList.add('correct');
        }

        feedbackIcon.innerHTML = result.correct
            ? '<img src="../../assets/icons/SVG/checkmark.svg" alt="" class="local-icon icon-green">'
            : '<img src="../../assets/icons/SVG/cross.svg" alt="" class="local-icon icon-red">';
        feedbackText.textContent = result.correct ? 'Correct!' : 'Incorrect';
        feedbackText.className = 'feedback-text ' + (result.correct ? 'text-green' : 'text-red');
        explanationText.textContent = result.explanation;

        feedbackArea.hidden = false;
        nextBtn.hidden = false;
        nextBtn.textContent = game.currentIndex >= game.questionsPerSession - 1 ? 'See Results' : 'Next Question';
    }

    nextBtn?.addEventListener('click', () => {
        if (game.nextQuestion()) {
            displayQuestion();
        } else {
            showResults();
        }
    });

    function showResults() {
        const results = game.getResults();

        quizArea.hidden = true;
        resultsArea.hidden = false;

        finalScore.textContent = results.score;
        resultLevel.textContent = game.getTierLabel(results.tier);

        // Set message based on score
        if (results.score >= 80) {
            resultMessage.textContent = "Excellent work! You really know your AI concepts!";
        } else if (results.score >= 60) {
            resultMessage.textContent = "Good job! Keep learning to master AI literacy.";
        } else if (results.score >= 40) {
            resultMessage.textContent = "Nice effort! Try the flashcards to improve your knowledge.";
        } else {
            resultMessage.textContent = "Keep practicing! Check out the flashcards and study materials.";
        }
    }

    playAgainBtn?.addEventListener('click', async () => {
        const success = await game.loadQuestions(game.tier);
        if (success) {
            resultsArea.hidden = true;
            quizArea.hidden = false;
            displayQuestion();
        }
    });

    changeLevelBtn?.addEventListener('click', () => {
        resultsArea.hidden = true;
        levelSelect.hidden = false;
    });
}

// ============================================
// FLASHCARDS PAGE INITIALIZATION
// ============================================
function initFlashcardsPage() {
    const game = new FlashcardGame();

    // Elements
    const levelSelect = document.getElementById('level-select');
    const flashcardArea = document.getElementById('flashcard-area');
    const resultsArea = document.getElementById('results-area');
    const ageCards = document.querySelectorAll('.age-card');

    // Flashcard elements
    const flashcard = document.getElementById('flashcard');
    const cardFront = document.getElementById('card-front');
    const cardBack = document.getElementById('card-back');
    const currentCard = document.getElementById('current-card');
    const totalCards = document.getElementById('total-cards');
    const currentLevel = document.getElementById('current-level');

    // Control buttons
    const prevBtn = document.getElementById('prev-card');
    const flipBtn = document.getElementById('flip-card');
    const nextBtn = document.getElementById('next-card');
    const shuffleBtn = document.getElementById('shuffle-cards');
    const restartBtn = document.getElementById('restart-cards');
    const changeLevelBtn = document.getElementById('change-level');

    // Results elements
    const cardsStudied = document.getElementById('cards-studied');
    const sessionLevel = document.getElementById('session-level');
    const studyAgainBtn = document.getElementById('study-again');
    const tryQuizBtn = document.getElementById('try-quiz');

    // Level selection
    ageCards.forEach(card => {
        card.addEventListener('click', async () => {
            const tier = card.dataset.tier;
            const success = await game.loadCards(tier);

            if (success) {
                levelSelect.hidden = true;
                flashcardArea.hidden = false;
                resultsArea.hidden = true;
                currentLevel.textContent = game.getTierLabel(tier);
                totalCards.textContent = game.cards.length;
                displayCard();
            }
        });
    });

    function displayCard() {
        const card = game.getCurrentCard();
        if (!card) return;

        cardFront.textContent = card.front;
        cardBack.textContent = card.back;
        currentCard.textContent = game.currentIndex + 1;

        // Reset flip state
        flashcard.classList.remove('flipped');
        game.resetFlip();

        // Update button states
        prevBtn.disabled = game.currentIndex === 0;
        nextBtn.textContent = game.isLastCard() ? 'Complete' : 'Next';
    }

    function flipCard() {
        game.flip();
        flashcard.classList.toggle('flipped');
    }

    // Event listeners
    flashcard?.addEventListener('click', flipCard);
    flipBtn?.addEventListener('click', flipCard);

    // Keyboard support
    document.addEventListener('keydown', (e) => {
        if (flashcardArea?.hidden) return;

        if (e.code === 'Space') {
            e.preventDefault();
            flipCard();
        } else if (e.code === 'ArrowRight') {
            if (game.isLastCard()) {
                showComplete();
            } else {
                game.nextCard();
                displayCard();
            }
        } else if (e.code === 'ArrowLeft') {
            game.prevCard();
            displayCard();
        }
    });

    prevBtn?.addEventListener('click', () => {
        game.prevCard();
        displayCard();
    });

    nextBtn?.addEventListener('click', () => {
        if (game.isLastCard()) {
            showComplete();
        } else {
            game.nextCard();
            displayCard();
        }
    });

    shuffleBtn?.addEventListener('click', () => {
        game.reshuffleCards();
        displayCard();
    });

    restartBtn?.addEventListener('click', () => {
        game.restart();
        displayCard();
    });

    changeLevelBtn?.addEventListener('click', () => {
        flashcardArea.hidden = true;
        levelSelect.hidden = false;
    });

    function showComplete() {
        flashcardArea.hidden = true;
        resultsArea.hidden = false;
        cardsStudied.textContent = game.cards.length;
        sessionLevel.textContent = game.getTierLabel(game.tier);
    }

    studyAgainBtn?.addEventListener('click', async () => {
        const success = await game.loadCards(game.tier);
        if (success) {
            resultsArea.hidden = true;
            flashcardArea.hidden = false;
            displayCard();
        }
    });

    tryQuizBtn?.addEventListener('click', () => {
        window.location.href = 'quiz.html';
    });
}

// ============================================
// PROMPT TEST PAGE INITIALIZATION
// ============================================
function initPromptTestPage() {
    const game = new PromptChallenge();

    // Elements
    const levelSelect = document.getElementById('level-select');
    const promptArea = document.getElementById('prompt-area');
    const resultsArea = document.getElementById('results-area');
    const ageCards = document.querySelectorAll('.age-card');

    // Challenge elements
    const currentLevel = document.getElementById('current-level');
    const challengeTitle = document.getElementById('challenge-title');
    const challengeObjective = document.getElementById('challenge-objective');
    const hintsArea = document.getElementById('hints-area');
    const hintsList = document.getElementById('hints-list');
    const showHintsBtn = document.getElementById('show-hints');

    // Input elements
    const userPrompt = document.getElementById('user-prompt');
    const aiResponse = document.getElementById('ai-response');
    const copyPromptBtn = document.getElementById('copy-prompt');
    const submitBtn = document.getElementById('submit-challenge');
    const newChallengeBtn = document.getElementById('new-challenge');
    const changeLevelBtn = document.getElementById('change-level-prompt');

    // Results elements
    const totalScore = document.getElementById('total-score');
    const scoreMessage = document.getElementById('score-message');
    const rubricItems = document.getElementById('rubric-items');
    const reviewPrompt = document.getElementById('review-prompt');
    const reviewResponse = document.getElementById('review-response');
    const tryAnotherBtn = document.getElementById('try-another');
    const backToHubBtn = document.getElementById('back-to-hub');

    // Level selection
    ageCards.forEach(card => {
        card.addEventListener('click', async () => {
            const tier = card.dataset.tier;
            const success = await game.loadChallenge(tier);

            if (success) {
                levelSelect.hidden = true;
                promptArea.hidden = false;
                resultsArea.hidden = true;
                currentLevel.textContent = game.getTierLabel(tier);
                displayChallenge();
            }
        });
    });

    function displayChallenge() {
        const challenge = game.getCurrentChallenge();
        if (!challenge) return;

        challengeTitle.textContent = challenge.title;
        challengeObjective.textContent = challenge.objective;

        // Reset inputs
        userPrompt.value = '';
        aiResponse.value = '';
        hintsArea.hidden = true;

        // Setup hints
        hintsList.innerHTML = '';
        challenge.hints.forEach(hint => {
            const li = document.createElement('li');
            li.textContent = hint;
            hintsList.appendChild(li);
        });
    }

    showHintsBtn?.addEventListener('click', () => {
        hintsArea.hidden = !hintsArea.hidden;
        showHintsBtn.innerHTML = hintsArea.hidden
            ? '<img src="../../assets/icons/SVG/info.svg" alt="" class="local-icon icon-grey"> Show Hints'
            : '<img src="../../assets/icons/SVG/info.svg" alt="" class="local-icon icon-grey"> Hide Hints';
    });

    copyPromptBtn?.addEventListener('click', () => {
        if (userPrompt.value) {
            navigator.clipboard.writeText(userPrompt.value).then(() => {
                copyPromptBtn.innerHTML = '<img src="../../assets/icons/SVG/checkmark.svg" alt="" class="local-icon icon-green"> Copied!';
                setTimeout(() => {
                    copyPromptBtn.innerHTML = '<img src="../../assets/icons/SVG/clipboard.svg" alt="" class="local-icon icon-white"> Copy Prompt';
                }, 2000);
            });
        }
    });

    submitBtn?.addEventListener('click', () => {
        const prompt = userPrompt.value.trim();
        const response = aiResponse.value.trim();

        if (!prompt) {
            alert('Please write a prompt first.');
            return;
        }
        if (!response) {
            alert('Please paste the AI response.');
            return;
        }

        const results = game.scoreSubmission(prompt, response);
        showResults(results, prompt, response);
    });

    function showResults(results, prompt, response) {
        promptArea.hidden = true;
        resultsArea.hidden = false;

        totalScore.textContent = results.total;
        scoreMessage.textContent = game.getScoreMessage(results.total);

        // Display rubric breakdown
        rubricItems.innerHTML = '';
        const rubricLabels = {
            clarity: 'Clarity',
            audience: 'Audience',
            completeness: 'Completeness',
            quality: 'Quality'
        };

        Object.entries(results.breakdown).forEach(([key, value]) => {
            const item = document.createElement('div');
            item.className = 'rubric-item';
            item.innerHTML = `
                <span class="rubric-label">${rubricLabels[key]}</span>
                <div class="rubric-bar">
                    <div class="rubric-fill" style="width: ${(value / 25) * 100}%"></div>
                </div>
                <span class="rubric-score">${value}/25</span>
            `;
            rubricItems.appendChild(item);
        });

        // Show submission review
        reviewPrompt.textContent = prompt;
        reviewResponse.textContent = response.length > 500 ? response.substring(0, 500) + '...' : response;
    }

    newChallengeBtn?.addEventListener('click', () => {
        game.getNewChallenge();
        displayChallenge();
    });

    changeLevelBtn?.addEventListener('click', () => {
        promptArea.hidden = true;
        levelSelect.hidden = false;
    });

    tryAnotherBtn?.addEventListener('click', async () => {
        const success = await game.loadChallenge(game.tier);
        if (success) {
            resultsArea.hidden = true;
            promptArea.hidden = false;
            displayChallenge();
        }
    });

    backToHubBtn?.addEventListener('click', () => {
        window.location.href = 'index.html';
    });
}

// ============================================
// GAMES HUB INITIALIZATION
// ============================================
function initGamesHub() {
    const ageCards = document.querySelectorAll('.age-card');
    const leaderboardTabs = document.querySelectorAll('.lb-tab');
    const lbBody = document.getElementById('lb-body');

    // Store selected tier
    let selectedTier = localStorage.getItem('praxis_selected_tier') || null;

    // Highlight selected tier
    if (selectedTier) {
        ageCards.forEach(card => {
            if (card.dataset.tier === selectedTier) {
                card.classList.add('selected');
            }
        });
    }

    // Level selection
    ageCards.forEach(card => {
        card.addEventListener('click', () => {
            ageCards.forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
            selectedTier = card.dataset.tier;
            localStorage.setItem('praxis_selected_tier', selectedTier);
            updateLeaderboard();
        });
    });

    // Leaderboard tabs
    let currentGame = 'quiz';

    leaderboardTabs?.forEach(tab => {
        tab.addEventListener('click', () => {
            leaderboardTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            currentGame = tab.dataset.game;
            updateLeaderboard();
        });
    });

    function updateLeaderboard() {
        if (!lbBody) return;

        const tier = selectedTier || 'middle';
        const scores = Leaderboard.getScores(currentGame, tier);

        if (scores.length === 0) {
            lbBody.innerHTML = '<tr><td colspan="4" class="lb-empty">Be the first to set a high score!</td></tr>';
            return;
        }

        const tierLabels = {
            'elementary': 'Elementary',
            'middle': 'Middle',
            'highschool': 'High School',
            'adult': 'Adult'
        };

        lbBody.innerHTML = scores.map((score, index) => `
            <tr>
                <td>${index + 1}</td>
                <td>${score.initials}</td>
                <td>${score.score}</td>
                <td>${tierLabels[tier] || tier}</td>
            </tr>
        `).join('');
    }

    // Initial load
    updateLeaderboard();
}
