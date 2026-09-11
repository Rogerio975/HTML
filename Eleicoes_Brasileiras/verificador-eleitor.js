function calcularIdade(nascimento) {
  const hoje = new Date();
  const nasc = new Date(nascimento + 'T00:00:00');
  let idade = hoje.getFullYear() - nasc.getFullYear();
  const m = hoje.getMonth() - nasc.getMonth();
  if (m < 0 || (m === 0 && hoje.getDate() < nasc.getDate())) {
    idade--;
  }
  return idade;
}

document.getElementById('formulario-eleitor').addEventListener('submit', function(event) {
  event.preventDefault();

  const dataNascimento = document.getElementById('dataNascimento').value;
  const brasileiro = document.getElementById('brasileiro').checked;
  const alfabetizado = document.getElementById('alfabetizado').checked;
  const conscrito = document.getElementById('conscrito').checked;
  const resultadoDiv = document.getElementById('resultado');

  if (!dataNascimento) {
    resultadoDiv.style.display = 'block';
    resultadoDiv.innerHTML = `
      <div class="result-box nao">
        <div class="result-title">⚠️ Informe a data de nascimento</div>
        <div class="result-desc">É necessário preencher a data para calcular a idade.</div>
      </div>`;
    return;
  }

  const idade = calcularIdade(dataNascimento);
  const razoes = [];
  let status = 'pode';
  let tituloTexto = '';
  let descTexto = '';

  if (!brasileiro) {
    status = 'nao';
    tituloTexto = '❌ Não pode votar';
    descTexto = 'Apenas brasileiros natos ou naturalizados podem votar nas eleições brasileiras.';
    razoes.push({ ok: false, texto: 'Nacionalidade estrangeira impede o alistamento eleitoral no Brasil.' });
  } else if (idade < 16) {
    status = 'nao';
    tituloTexto = '❌ Não pode votar ainda';
    descTexto = `Com ${idade} anos, a idade mínima de 16 anos ainda não foi atingida.`;
    razoes.push({ ok: false, texto: 'Idade mínima para alistamento e voto: 16 anos.' });
  } else if (conscrito) {
    status = 'nao';
    tituloTexto = '❌ Não pode votar durante o serviço militar';
    descTexto = 'Conscritos durante o serviço militar obrigatório são inalistáveis e não podem votar nesse período.';
    razoes.push({ ok: false, texto: 'Conscritos (soldados, marinheiros, aeronautas e outros em serviço militar obrigatório) não podem se alistar nem votar enquanto durar o serviço.' });
  } else {
    if (idade >= 18 && idade <= 70 && alfabetizado) {
      status = 'pode';
      tituloTexto = '✅ Pode votar — Voto obrigatório';
      descTexto = `Com ${idade} anos, alfabetizado(a) e dentro da faixa de 18 a 70 anos, o voto é obrigatório.`;
      razoes.push({ ok: true, texto: 'Idade entre 18 e 70 anos.' });
      razoes.push({ ok: true, texto: 'Alfabetizado(a).' });
      razoes.push({ ok: true, texto: 'Nacionalidade brasileira confirmada.' });
    } else {
      status = 'facultativo';
      tituloTexto = '✅ Pode votar — Voto facultativo';
      descTexto = `Com ${idade} anos, o voto é facultativo (não obrigatório).`;
      razoes.push({ ok: true, texto: 'Nacionalidade brasileira confirmada.' });

      if (idade >= 16 && idade < 18) {
        razoes.push({ ok: true, texto: 'Jovens de 16 e 17 anos: voto facultativo.' });
      }
      if (idade > 70) {
        razoes.push({ ok: true, texto: 'Maiores de 70 anos: voto facultativo.' });
      }
      if (!alfabetizado) {
        razoes.push({ ok: true, texto: 'Pessoas analfabetas: voto facultativo (mesmo entre 18 e 70 anos).' });
      }
    }
  }

  resultadoDiv.style.display = 'block';
  resultadoDiv.innerHTML = `
    <div class="result-box ${status}">
      <div class="result-title">${tituloTexto}</div>
      <div class="result-desc">${descTexto}</div>
      <ul class="reasons">
        ${razoes.map(r => `<li><span class="bullet">${r.ok ? '✔️' : '✖️'}</span><span>${r.texto}</span></li>`).join('')}
      </ul>
    </div>
  `;
});