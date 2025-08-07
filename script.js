document.addEventListener('DOMContentLoaded', () => {
    const startScreen = document.getElementById('start-screen');
    const quizScreen = document.getElementById('quiz-screen');
    const resultScreen = document.getElementById('result-screen');
    const startBtn = document.getElementById('start-btn');
    const restartBtn = document.getElementById('restart-btn');

    const questionContainer = document.getElementById('question-container');
    const minigameContainer = document.getElementById('minigame-container');
    const questionCounterText = document.getElementById('question-counter');
    const questionText = document.getElementById('question-text');
    const answerButtons = document.getElementById('answer-buttons');

    const heroMatchName = document.getElementById('hero-match-name');
    const heroMatchDescription = document.getElementById('hero-match-description');
    const userTraitsText = document.getElementById('user-traits');
    
    let currentQuestionIndex = 0;
    let userScores = {
        protective: 0,
        direct: 0,
        strategic: 0,
        analytical: 0,
        empathetic: 0,
        independent: 0,
        charismatic: 0,
        disciplined: 0,
        impulsive: 0,
        optimistic: 0,
        indirect: 0,
        tech_savvy: 0,
        leader: 0,
        unconventional: 0
    };

    const quizQuestions = [
        {
            type: 'personality',
            question: "A large public festival is happening. As a hero, what is your primary role in ensuring its safety?",
            answers: [
                { text: 'Patrol the perimeter, keeping a visible and reassuring presence.', traits: { protective: 1, disciplined: 1 } },
                { text: 'Stay in the command center, analyzing crowd flow for potential issues.', traits: { strategic: 1, analytical: 1 } },
                { text: 'Mingle with the crowd, ready to respond instantly if trouble starts.', traits: { direct: 1, charismatic: 1 } },
                { text: 'Set up defensive measures beforehand, anticipating every possibility.', traits: { strategic: 2, indirect: 1 } }
            ]
        },
        {
            type: 'personality',
            question: 'A young, newly Awakened individual is scared of their powers. How do you approach them?',
            answers: [
                { text: 'Show them how cool their powers can be to build their confidence.', traits: { optimistic: 1, charismatic: 1, impulsive: 1 } },
                { text: 'Offer structured, patient guidance and share your own experiences.', traits: { empathetic: 2, disciplined: 1, leader: 1 } },
                { text: 'Give them space but observe from a distance, ensuring they and others are safe.', traits: { protective: 1, indirect: 1 } },
                { text: 'Provide them with technical manuals and safe, controlled training scenarios.', traits: { analytical: 1, tech_savvy: 1 } }
            ]
        },
        {
            type: 'dilemma',
            question: "Your team is facing an unknown threat. What's your first priority?",
            answers: [
                { text: 'Engage directly to gauge its strength and weaknesses.', traits: { direct: 1, impulsive: 1 } },
                { text: 'Evacuate all civilians and establish a secure perimeter.', traits: { protective: 2, leader: 1 } },
                { text: 'Gather data. Information is the key to victory.', traits: { analytical: 2, strategic: 1 } },
                { text: 'Rally the team, boost morale, and formulate a quick plan together.', traits: { charismatic: 1, optimistic: 1, leader: 1 } }
            ]
        },
        {
            type: 'personality',
            question: 'What does the word "power" mean to you?',
            answers: [
                { text: 'A responsibility to protect those who cannot protect themselves.', traits: { protective: 1, empathetic: 1 } },
                { text: 'A tool to achieve a specific, necessary objective.', traits: { disciplined: 1, direct: 1 } },
                { text: 'A variable that must be understood and controlled.', traits: { analytical: 1, strategic: 1 } },
                { text: 'A chance to make a real, positive difference in the world.', traits: { optimistic: 1, charismatic: 1 } }
            ]
        },
        {
            type: 'minigame',
            game: 'memory',
            question: 'ARISA Cognitive Exercise: A sharp mind is a hero\'s greatest asset. Match the hero team symbols under pressure.'
        },
        {
            type: 'personality',
            question: 'You are offered a new piece of experimental tech for your suit. You...',
            answers: [
                { text: 'Immediately start tinkering with it to make it even better.', traits: { tech_savvy: 2, unconventional: 1 } },
                { text: 'Test it rigorously in a simulation before ever using it in the field.', traits: { disciplined: 1, analytical: 1 } },
                { text: 'Trust the engineers and incorporate it into your gear right away.', traits: { optimistic: 1, direct: 1 } },
                { text: 'Analyze if it truly fits your established fighting style and methods.', traits: { strategic: 1, independent: 1 } }
            ]
        },
        {
            type: 'personality',
            question: 'How do you prefer to end a confrontation?',
            answers: [
                { text: 'Decisively and quickly, with overwhelming action.', traits: { direct: 2, impulsive: 1 } },
                { text: 'By outsmarting the opponent, making them realize they have lost.', traits: { strategic: 2, indirect: 1 } },
                { text: 'With all parties safe and the threat neutralized without unnecessary damage.', traits: { protective: 2, empathetic: 1 } },
                { text: 'By creating a situation where the conflict was prevented from the start.', traits: { leader: 1, analytical: 1 } }
            ]
        },
         {
            type: 'dilemma',
            question: 'A mission is complete, and the media wants a statement. What is your move?',
            answers: [
                { text: 'Step up to the cameras. The public deserves to hear from us directly.', traits: { charismatic: 2, leader: 1 } },
                { text: 'Let the team leader or designated spokesperson handle it.', traits: { disciplined: 1, indirect: 1 } },
                { text: 'Send a pre-written statement through ARISA\'s press office.', traits: { strategic: 1, independent: 1 } },
                { text: 'Avoid the cameras. The results of the mission speak for themselves.', traits: { indirect: 2 } }
            ]
        },
        {
            type: 'personality',
            question: 'Which environment are you most comfortable operating in?',
            answers: [
                { text: 'On the front lines, in the thick of the action.', traits: { direct: 1, impulsive: 1 } },
                { text: 'In a support role, providing tactical aid and protection.', traits: { protective: 1, strategic: 1 } },
                { text: 'From a distance, analyzing the field and directing teammates.', traits: { analytical: 1, indirect: 1, leader: 1 } },
                { text: 'Working on my own, using my unique skills to flank the enemy.', traits: { independent: 1, unconventional: 1 } }
            ]
        },
        {
            type: 'personality',
            question: 'A complex problem requires a solution. You are most likely to:',
            answers: [
                { text: 'Break it down into smaller, manageable parts to analyze.', traits: { analytical: 2, strategic: 1 } },
                { text: 'Try a creative, out-of-the-box approach no one has considered.', traits: { unconventional: 2, impulsive: 1 } },
                { text: 'Rely on established, proven methods that guarantee stability.', traits: { disciplined: 2, protective: 1 } },
                { text: 'Collaborate with the team, believing a group solution is strongest.', traits: { charismatic: 1, empathetic: 1, leader: 1 } }
            ]
        }
    ];

    const heroProfiles = [
        { name: 'Aegis', traits: { protective: 2, disciplined: 2, leader: 2, charismatic: 1 }, description: "Your profile aligns with the 'Standard-Bearer.' You are calm, eloquent, and possess an unshakeable moral compass. Like Aegis, you are a natural leader who inspires trust and embodies the ideal of a protector, serving as a pillar of stability in uncertain times." },
        { name: 'Mosaic', traits: { analytical: 2, strategic: 2, indirect: 2, unconventional: 1 }, description: "Your profile aligns with the 'Cognitive Analyst.' You don't just face threats; you unravel them. Like Mosaic, your strength is in your intellect, seeing patterns and motives others miss. You bring clarity to chaos and solve problems with quiet, forensic precision." },
        { name: 'Battery', traits: { direct: 2, disciplined: 2, strategic: 1, unconventional: 1 }, description: "Your profile aligns with the 'Kinetic Specialist.' You are defined by brutal efficiency and containment. Like Battery, you understand that patience is a weapon. You store potential, wait for the perfect moment, and then end the fight with terrifying precision and speed." },
        { name: 'Downdraft', traits: { strategic: 2, indirect: 2, analytical: 1, tech_savvy: 1 }, description: "Your profile aligns with the 'Field Controller.' Your power is less about brute force and more about surgical control. Like Downdraft, you are a thinker who manipulates the battlefield itself, using intellect to disorient enemies and protect allies with subtle, tactical genius." },
        { name: 'Armory', traits: { disciplined: 2, protective: 2, strategic: 1, analytical: 1 }, description: "Your profile aligns with the 'Adaptive Tactician.' You are precise, controlled, and inaccessibly composed, a strategic cornerstone for your team. Like Armory, you believe that the right tool for the right moment is key, manifesting what is needed with focus and responsibility." },
        { name: 'Loop', traits: { unconventional: 2, strategic: 2, direct: 1, tech_savvy: 1 }, description: "Your profile aligns with the 'Temporal Strategist.' You don't just move fast; you manipulate time itself on a small scale. Like Loop, you are a clever and relentless strategist, using echoes of your past actions to outmaneuver opponents in ways they can't predict." },
        
        { name: 'Flashpoint', traits: { impulsive: 2, direct: 2, optimistic: 2 }, description: "Your profile aligns with the 'Kinetic Rocket.' You are impetuous, relentlessly optimistic, and full of boundless energy. Like Flashpoint, you are the first to charge in, turning danger into a challenge and inspiring your team with sheer, unadulterated confidence and momentum." },
        { name: 'Spoiler', traits: { indirect: 2, strategic: 2, analytical: 1, disciplined: 1 }, description: "Your profile aligns with the 'Silent Tactician.' You are the calm, quiet conscience of the team, speaking only when it matters. Like Spoiler, you are deliberate and observant, using your abilities to control the sensory field and ensure a mission's success with subtle, undeniable precision." },
        { name: 'Chisel', traits: { protective: 2, empathetic: 2, disciplined: 1 }, description: "Your profile aligns with the 'Steadfast Protector.' You are the definition of perseverance and humility. Like Chisel, your strength grows with your determination. You are the gentle giant who anchors the defensive line and supports your teammates without fail." },
        { name: 'Viceroy', traits: { charismatic: 2, strategic: 2, indirect: 1, leader: 1 }, description: "Your profile aligns with the 'Elegant Strategist.' You don't need to raise your voice to command a room. Like Viceroy, you are the team's master of debate and tactics, using grace and intellect to neutralize conflict with subtle, elegant control before it can even begin." },
        { name: 'Kinesis', traits: { tech_savvy: 2, optimistic: 1, direct: 1, unconventional: 1 }, description: "Your profile aligns with the 'Mobility Expert.' You are pure speed, powered by a love for technology. Like Kinesis, you are constantly innovating, upgrading equipment to make your team faster and more adaptable. You think fast, talk fast, and treat every challenge as a puzzle to be solved." },
        { name: 'Lockshot', traits: { disciplined: 2, analytical: 2, indirect: 1 }, description: "Your profile aligns with the 'Designated Marksman.' If your team is jazz, you are the metronome—steady, reserved, and unerringly precise. Like Lockshot, your focus is absolute. You believe actions speak louder than words and ensure your actions never, ever miss their mark." },

        { name: 'Seraphim', traits: { analytical: 3, leader: 2, protective: 1, empathetic: 1 }, description: "Your profile aligns with the 'Cognitive Oracle.' You don't just process information; you interpret probabilities and prevent disasters before they happen. Like Seraphim, you are a deeply empathetic and intelligent leader, guiding operations not just to victory, but to the best possible outcome for everyone involved." }
    ];

    startBtn.addEventListener('click', startQuiz);
    restartBtn.addEventListener('click', startQuiz);

    function startQuiz() {
        currentQuestionIndex = 0;
        userScores = Object.fromEntries(Object.keys(userScores).map(key => [key, 0]));
        resultScreen.classList.remove('active');
        startScreen.classList.remove('active');
        quizScreen.classList.add('active');
        showNextQuestion();
    }
    
    function showNextQuestion() {
        resetState();
        if (currentQuestionIndex >= quizQuestions.length) {
            return showResult();
        }

        const question = quizQuestions[currentQuestionIndex];
        questionCounterText.innerText = `Question ${currentQuestionIndex + 1} / ${quizQuestions.length}`;
        questionText.innerText = question.question;

        if (question.type === 'minigame') {
            questionContainer.style.display = 'none';
            minigameContainer.style.display = 'block';
            startMemoryGame();
        } else {
            questionContainer.style.display = 'block';
            minigameContainer.style.display = 'none';
            question.answers.forEach(answer => {
                const button = document.createElement('button');
                button.innerText = answer.text;
                button.classList.add('btn');
                button.addEventListener('click', () => selectAnswer(answer.traits));
                answerButtons.appendChild(button);
            });
        }
    }

    function resetState() {
        while (answerButtons.firstChild) {
            answerButtons.removeChild(answerButtons.firstChild);
        }
        minigameContainer.innerHTML = '';
    }

    function selectAnswer(traits) {
        for (const trait in traits) {
            if (userScores.hasOwnProperty(trait)) {
                userScores[trait] += traits[trait];
            }
        }
        currentQuestionIndex++;
        showNextQuestion();
    }
    
    function showResult() {
        quizScreen.classList.remove('active');
        resultScreen.classList.add('active');

        let bestMatch = null;
        let highestScore = -Infinity;

        heroProfiles.forEach(hero => {
            let score = 0;
            for (const trait in hero.traits) {
                if (userScores.hasOwnProperty(trait)) {
                    score += userScores[trait] * hero.traits[trait];
                }
            }

            if (score > highestScore) {
                highestScore = score;
                bestMatch = hero;
            }
        });
        
        const sortedUserTraits = Object.entries(userScores)
            .sort(([, a], [, b]) => b - a)
            .filter(([, score]) => score > 0)
            .slice(0, 3)
            .map(([trait]) => trait.charAt(0).toUpperCase() + trait.slice(1).replace('_', ' '));

        heroMatchName.innerText = bestMatch.name;
        heroMatchDescription.innerText = bestMatch.description;
        userTraitsText.innerText = sortedUserTraits.length > 0 ? sortedUserTraits.join(', ') : 'Balanced Profile';
    }

    function startMemoryGame() {
        let timer;
        let timeRemaining = 30;
        
        const symbols = ['🛡️', '🧠', '⚡', '🚀', '🌟', '🤫', '🛡️', '🧠', '⚡', '🚀', '🌟', '🤫'];
        symbols.sort(() => 0.5 - Math.random()); 

        minigameContainer.innerHTML = `
            <div id="timer">Time: ${timeRemaining}s</div>
            <div class="memory-grid" id="memory-grid"></div>
        `;
        
        const grid = document.getElementById('memory-grid');
        let flippedCards = [];
        let matchedPairs = 0;
        
        symbols.forEach(symbol => {
            const card = document.createElement('div');
            card.classList.add('memory-card');
            card.dataset.symbol = symbol;
            card.innerHTML = `
                <div class="card-face card-front"></div>
                <div class="card-face card-back">${symbol}</div>
            `;
            card.addEventListener('click', () => {
                if (flippedCards.length < 2 && !card.classList.contains('flipped') && !card.classList.contains('matched')) {
                    flipCard(card);
                }
            });
            grid.appendChild(card);
        });

        timer = setInterval(() => {
            timeRemaining--;
            document.getElementById('timer').innerText = `Time: ${timeRemaining}s`;
            if (timeRemaining <= 0) {
                endMemoryGame(false);
            }
        }, 1000);

        function flipCard(card) {
            card.classList.add('flipped');
            flippedCards.push(card);

            if (flippedCards.length === 2) {
                checkForMatch();
            }
        }

        function checkForMatch() {
            const [card1, card2] = flippedCards;
            if (card1.dataset.symbol === card2.dataset.symbol) {
                card1.classList.add('matched');
                card2.classList.add('matched');
                matchedPairs++;
                if (matchedPairs === symbols.length / 2) {
                    endMemoryGame(true);
                }
            } else {
                setTimeout(() => {
                    card1.classList.remove('flipped');
                    card2.classList.remove('flipped');
                }, 700);
            }
            flippedCards = [];
        }

        function endMemoryGame(success) {
            clearInterval(timer);           
            const traits = success ? { analytical: 1, strategic: 1 } : { impulsive: 1 };
            selectAnswer(traits);
        }
    }
});