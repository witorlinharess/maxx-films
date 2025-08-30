// Lógica para o modal
const loginModal = document.getElementById('loginModal');
const closeBtn = document.querySelector('.close-btn');
const loginForm = document.getElementById('loginForm');

// Verifica o status de login no localStorage e atualiza a UI.
function checkLoginStatus() {
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  const loggedInUser = localStorage.getItem('username');
  const loginArea = document.getElementById('loginArea');
  
  // Limpa o conteúdo da área de login para evitar duplicações
  loginArea.innerHTML = '';

  if (isLoggedIn === 'true' && loggedInUser) {
    // Se o usuário estiver logado, exibe o nome e um botão de logout
    const userDisplay = document.createElement('p');
    userDisplay.textContent = `Olá, ${loggedInUser}!`;
    userDisplay.className = 'mr-4 text-gray-300';
    loginArea.appendChild(userDisplay);
    
    const logoutBtn = document.createElement('button');
    logoutBtn.id = 'logoutBtn';
    logoutBtn.textContent = 'Sair';
    logoutBtn.className = 'bg-red-600 px-4 py-2 rounded font-semibold hover:bg-red-700 transition';
    loginArea.appendChild(logoutBtn);
    
    logoutBtn.addEventListener('click', () => {
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('username');
      checkLoginStatus(); // Atualiza a UI para o estado de "deslogado"
    });
  } else {
    // Se não estiver logado, exibe o botão de login
    const loginBtn = document.createElement('button');
    loginBtn.id = 'loginBtn';
    loginBtn.textContent = 'Login';
    loginBtn.className = 'bg-[#5F81F0] px-4 py-2 rounded font-semibold hover:bg-blue-700 transition';
    loginArea.appendChild(loginBtn);
    
    // Adiciona o evento de clique para abrir o modal
    loginBtn.addEventListener('click', () => {
      loginModal.style.display = 'flex';
    });
  }
}

// Lógica para o modal: o evento de clique para abrir o modal agora está dentro da função checkLoginStatus
// Isso garante que ele seja anexado corretamente ao botão de login, seja na primeira carga da página ou após o logout.

closeBtn.addEventListener('click', () => {
  loginModal.style.display = 'none';
});

// Fecha o modal ao clicar fora dele
window.addEventListener('click', (event) => {
  if (event.target === loginModal) {
    loginModal.style.display = 'none';
  }
});

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  // Lógica de autenticação simples:
  // Em um projeto real, essa validação seria feita em um servidor.
  // Aqui, usamos um usuário e senha fixos para demonstração.
  if (username === 'admin' && password === '123') {
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('username', username);
    loginModal.style.display = 'none';
    checkLoginStatus(); // Atualiza a UI após o login
  } else {
    // Em vez de usar alert(), que é bloqueante, vamos usar um pop-up customizado
    // ou apenas uma mensagem no console para fins de debug.
    console.error('Usuário ou senha incorretos.');
  }
});

// Chama a função para verificar o status de login assim que a página carrega
checkLoginStatus();

// A partir daqui, você pode adicionar a lógica para a API do TMDB e outras funcionalidades
// de filmes.
