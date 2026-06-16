const introSteps = [
  { text: "episode 1: the argument happened. reviews are mixed. producers are concerned.", button: "continue episode" },
  { text: "episode 2: boston is boiling and the AC unit has been promoted to relationship therapist.", button: "turn on AC" },
  { text: "episode 3: love island season 8 is queued. emotional debriefs are mandatory.", button: "begin recoupling" }
];

const choiceMessages = {
  love: { tv: "LOVE ISLAND S8", text: "love island debrief: we may be dramatic, but at least we are not getting dumped from the villa tonight." },
  ufc: { tv: "UFC BLOCKED", text: "ufc remote has been gently confiscated for emotional safety. peace has been restored to the living room." },
  ac: { tv: "AC UNIT FAN CAM", text: "the AC is now carrying this relationship on its tiny cold shoulders. thank you for your service." },
  jobs: { tv: "JOB APP MODE", text: "job app pep talk: we are both trying so hard. rejection emails are not stronger than us." },
  horror: { tv: "OBSESSION RECOVERY", text: "post-Obsession cuddle mode activated. suspicious hallway noises will be investigated tomorrow." }
};

const story = document.getElementById("story");
const mainButton = document.getElementById("main-button");
const choicePanel = document.getElementById("choice-panel");
const finalPanel = document.getElementById("final-panel");
const tvScreen = document.getElementById("tv-screen");
const ac = document.getElementById("ac");
const wind = document.getElementById("wind");
const openLetter = document.getElementById("open-letter");
const closeLetter = document.getElementById("close-letter");
const letterModal = document.getElementById("letter-modal");
const tinySurprise = document.getElementById("tiny-surprise");
const surpriseText = document.getElementById("surprise-text");

let step = 0;
let choicesClicked = new Set();

mainButton.addEventListener("click", () => {
  if (step < introSteps.length) {
    story.textContent = introSteps[step].text;
    mainButton.textContent = introSteps[step].button;

    if (step === 1) {
      ac.classList.add("on");
      wind.classList.remove("hidden");
    }

    step++;
    return;
  }

  mainButton.classList.add("hidden");
  choicePanel.classList.remove("hidden");
  story.textContent = "choose the tiny inside-joke comfort protocols one by one.";
});

document.querySelectorAll(".choice").forEach((button) => {
  button.addEventListener("click", () => {
    const selected = button.dataset.choice;
    const message = choiceMessages[selected];

    tvScreen.textContent = message.tv;
    story.textContent = message.text;
    button.disabled = true;
    button.textContent = "completed ♡";
    choicesClicked.add(selected);

    if (selected === "ac") {
      ac.classList.add("on");
      wind.classList.remove("hidden");
    }

    if (choicesClicked.size >= 5) {
      choicePanel.classList.add("hidden");
      finalPanel.classList.remove("hidden");
      story.textContent = "all protocols complete. the villa has cooled down.";
      document.querySelectorAll(".person").forEach((person) => {
        person.classList.add("happy");
        person.textContent = "♡";
      });
      tvScreen.textContent = "STILL YOUR TEAM";
    }
  });
});

openLetter.addEventListener("click", () => letterModal.classList.remove("hidden"));
closeLetter.addEventListener("click", () => letterModal.classList.add("hidden"));
letterModal.addEventListener("click", (event) => {
  if (event.target === letterModal) letterModal.classList.add("hidden");
});
tinySurprise.addEventListener("click", () => {
  surpriseText.classList.remove("hidden");
  tinySurprise.textContent = "villa certified ♡";
});
