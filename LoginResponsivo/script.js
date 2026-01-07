document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('.login-card');
  const password = document.getElementById('password');
  const feedback = document.getElementById('passwordFeedback');
  const strengthBar = document.getElementById('passwordStrength');
  const showBtn = document.querySelector('.show-pw');

  function scorePassword(pw) {
    let score = 0;
    if (!pw) return score;
    if (pw.length >= 8) score++;
    if (/[a-z]/.test(pw) && /[A-Z]/.test(pw)) score++;
    if (/[0-9]/.test(pw)) score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++;
    return score; // 0..4
  }

  function updateFeedback() {
    const pw = password.value;
    const score = scorePassword(pw);
    if (!pw) {
      feedback.textContent = '';
      strengthBar.style.width = '0%';
      strengthBar.className = 'strength-bar';
      return;
    }

    if (score <= 1) {
      feedback.textContent = 'Senha fraca — use 8+ caracteres com letras e números.';
      strengthBar.className = 'strength-bar strength-weak';
    } else if (score === 2 || score === 3) {
      feedback.textContent = 'Senha média — adicionar caracteres especiais aumenta a segurança.';
      strengthBar.className = 'strength-bar strength-medium';
    } else {
      feedback.textContent = 'Senha forte.';
      strengthBar.className = 'strength-bar strength-strong';
    }
  }

  password.addEventListener('input', updateFeedback);

  showBtn.addEventListener('click', function () {
    const showing = password.type === 'text';
    password.type = showing ? 'password' : 'text';
    showBtn.setAttribute('aria-pressed', String(!showing));
    const icon = showBtn.querySelector('.eye-icon');
    icon.style.opacity = showing ? '0.5' : '1';
  });
  showBtn.querySelector('.eye-icon').style.opacity = '0.5';

  form.addEventListener('submit', function (e) {
    const pw = password.value || '';
    const score = scorePassword(pw);
    if (score < 2) {
      e.preventDefault();
      feedback.textContent = 'Senha insuficiente. Use pelo menos 8 caracteres, misture letras e números.';
      password.focus();
    }
  });
});
