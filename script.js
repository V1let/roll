const compliments = [
{ emoji: '🌸', text: 'Нежная' },
{ emoji: '💖', text: 'Любимая' },
{ emoji: '✨', text: 'Сияющая' },
{ emoji: '🌟', text: 'Звёздная' },
{ emoji: '🦋', text: 'Лёгкая' },
{ emoji: '🌷', text: 'Цветущая' },
{ emoji: '🍓', text: 'Сладкая' },
{ emoji: '🌈', text: 'Яркая' },
{ emoji: '💫', text: 'Волшебная' },
{ emoji: '🌺', text: 'Прекрасная' },
{ emoji: '🎀', text: 'Милая' },
{ emoji: '🌙', text: 'Загадочная' },
{ emoji: '☀️', text: 'Тёплая' },
{ emoji: '💎', text: 'Драгоценная' },
{ emoji: '🌹', text: 'Роскошная' },
{ emoji: '🍯', text: 'Медовая' },
{ emoji: '🦄', text: 'Единственная' },
{ emoji: '🌼', text: 'Солнечная' },
{ emoji: '💐', text: 'Чудесная' },
{ emoji: '🎀', text: 'Очаровательная' },
{ emoji: '🌻', text: 'Жизнерадостная' },
{ emoji: '💝', text: 'Обожаемая' },
{ emoji: '🫧', text: 'Воздушная' },
{ emoji: '🍭', text: 'Игривая' },
{ emoji: '🌷', text: 'Утончённая' },
{ emoji: '💗', text: 'Добрая' },
{ emoji: '🌸', text: 'Красивая' },
{ emoji: '✨', text: 'Ослепительная' },
{ emoji: '🦋', text: 'Грациозная' },
{ emoji: '🌟', text: 'Вдохновляющая' },
{ emoji: '💖', text: 'Неповторимая' },
{ emoji: '🌺', text: 'Элегантная' },
{ emoji: '🍓', text: 'Аппетитная' },
{ emoji: '🌈', text: 'Разноцветная' },
{ emoji: '💫', text: 'Чарующая' },
{ emoji: '🌹', text: 'Страстная' },
{ emoji: '🎀', text: 'Кокетливая' },
{ emoji: '🌙', text: 'Таинственная' },
{ emoji: '☀️', text: 'Лучезарная' },
{ emoji: '💎', text: 'Безупречная' },
{ emoji: '🦄', text: 'Сказочная' },
{ emoji: '🌼', text: 'Радостная' },
{ emoji: '💐', text: 'Восхитительная' },
{ emoji: '🌻', text: 'Обаятельная' },
{ emoji: '💝', text: 'Желанная' },
{ emoji: '🫧', text: 'Невесомая' },
{ emoji: '🍭', text: 'Озорная' }
];

const STORAGE_KEY = 'compliment_spin_data';

function getItemHeight() {
if (window.innerWidth <= 360) return 190;
if (window.innerWidth <= 480) return 200;
return 180;
}

function getTodayKey() {
const d = new Date();
return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function getSavedData() {
try {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : null;
} catch (e) {
  return null;
}
}

function saveSpinData(data) {
try {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
} catch (e) {}
}

const reels = [
document.getElementById('reel0'),
document.getElementById('reel1'),
document.getElementById('reel2')
];

function buildReel(reelEl, initialItem) {
reelEl.innerHTML = '';
const div = document.createElement('div');
div.className = 'reel-item';
div.innerHTML = `<div class="emoji">${initialItem.emoji}</div><div class="text">${initialItem.text}</div>`;
reelEl.appendChild(div);
reelEl.style.transform = 'translateY(0)';
}

const spinBtn = document.getElementById('spinBtn');
const subtitle = document.getElementById('subtitle');
const timerBox = document.getElementById('timerBox');
const timerValue = document.getElementById('timerValue');

function randomItem() {
return compliments[Math.floor(Math.random() * compliments.length)];
}

function spinReel(reelEl, finalItem, duration, delay) {
return new Promise(resolve => {
  setTimeout(() => {
    const itemH = getItemHeight();
    const spins = 5 + Math.floor(Math.random() * 4);
    const totalItems = spins;

    reelEl.innerHTML = '';
    for (let i = 0; i < totalItems - 1; i++) {
      const it = randomItem();
      const div = document.createElement('div');
      div.className = 'reel-item';
      div.innerHTML = `<div class="emoji">${it.emoji}</div><div class="text">${it.text}</div>`;
      reelEl.appendChild(div);
    }
    const finalDiv = document.createElement('div');
    finalDiv.className = 'reel-item';
    finalDiv.innerHTML = `<div class="emoji">${finalItem.emoji}</div><div class="text">${finalItem.text}</div>`;
    reelEl.appendChild(finalDiv);

    reelEl.style.transition = 'none';
    reelEl.style.transform = 'translateY(0)';

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const targetY = -(totalItems - 1) * itemH;
        reelEl.style.transition = `transform ${duration}ms cubic-bezier(0.25, 0.1, 0.25, 1)`;
        reelEl.style.transform = `translateY(${targetY}px)`;

        setTimeout(() => {
          reelEl.innerHTML = '';
          reelEl.appendChild(finalDiv);
          reelEl.style.transition = 'none';
          reelEl.style.transform = 'translateY(0)';

          reelEl.parentElement.style.transition = 'transform 0.15s';
          reelEl.parentElement.style.transform = 'translateY(-6px)';
          setTimeout(() => {
            reelEl.parentElement.style.transform = 'translateY(0)';
          }, 150);

          resolve();
        }, duration);
      });
    });
  }, delay);
});
}

function launchConfetti() {
const colors = ['#ff6ec4', '#ffd166', '#4facfe', '#ff4081', '#7873f5', '#fff'];
const shapes = ['circle', 'square'];
for (let i = 0; i < 60; i++) {
  const c = document.createElement('div');
  c.className = 'confetti';
  c.style.left = Math.random() * 100 + 'vw';
  c.style.background = colors[Math.floor(Math.random() * colors.length)];
  c.style.animationDuration = (2 + Math.random() * 2) + 's';
  c.style.animationDelay = Math.random() * 0.5 + 's';
  if (shapes[Math.floor(Math.random() * 2)] === 'circle') {
    c.style.borderRadius = '50%';
  }
  c.style.width = (6 + Math.random() * 8) + 'px';
  c.style.height = c.style.width;
  document.body.appendChild(c);
  setTimeout(() => c.remove(), 4500);
}
}

function formatTime(ms) {
if (ms < 0) ms = 0;
const totalSec = Math.floor(ms / 1000);
const h = Math.floor(totalSec / 3600);
const m = Math.floor((totalSec % 3600) / 60);
const s = totalSec % 60;
return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

function getNextMidnight() {
const now = new Date();
const next = new Date(now);
next.setHours(24, 0, 0, 0);
return next.getTime();
}

let timerInterval = null;

function startTimer() {
const update = () => {
  const remaining = getNextMidnight() - Date.now();
  timerValue.textContent = formatTime(remaining);
  if (remaining <= 0) {
    clearInterval(timerInterval);
    timerInterval = null;
    location.reload();
  }
};
update();
timerInterval = setInterval(update, 1000);
}

function applyLockedState() {
spinBtn.disabled = true;
spinBtn.textContent = '🔒 Уже прокручено';
subtitle.textContent = '💕 Возвращайся завтра за новой порцией комплиментов!';
timerBox.classList.add('visible');
startTimer();
}

function applyUnlockedState() {
spinBtn.disabled = false;
spinBtn.textContent = 'Прокрутить';
subtitle.textContent = '✨ Нажми и узнай свой комплимент ✨';
timerBox.classList.remove('visible');
}

const saved = getSavedData();
const todayKey = getTodayKey();

if (saved && saved.date === todayKey) {
reels.forEach((r, i) => {
  if (saved.results[i]) {
    buildReel(r, saved.results[i]);
  } else {
    buildReel(r, randomItem());
  }
});
applyLockedState();
} else {
const initial = [randomItem(), randomItem(), randomItem()];
reels.forEach((r, i) => buildReel(r, initial[i]));
    applyUnlockedState();
  }

  spinBtn.addEventListener('click', async () => {
    if (spinBtn.disabled) return;

    const currentTodayKey = getTodayKey();
    const currentSaved = getSavedData();

    if (currentSaved && currentSaved.date === currentTodayKey) {
      applyLockedState();
      return;
    }

    spinBtn.disabled = true;
    spinBtn.textContent = '🎰 Крутим...';
    subtitle.textContent = '✨ Крутим барабаны...';

    const results = [randomItem(), randomItem(), randomItem()];

    const p1 = spinReel(reels[0], results[0], 2000, 0);
    const p2 = spinReel(reels[1], results[1], 2600, 0);
    const p3 = spinReel(reels[2], results[2], 3200, 0);

    await Promise.all([p1, p2, p3]);

    saveSpinData({
      date: getTodayKey(),
      results: results
    });

    launchConfetti();

    subtitle.textContent = '💕 Возвращайся завтра за новой порцией комплиментов!';
    spinBtn.textContent = ' Уже прокручено';
    timerBox.classList.add('visible');
    startTimer();
  });
