<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Recupere os dados do formulário
    $nome = htmlspecialchars($_POST['nome']);
    $senha = htmlspecialchars($_POST['senha']);
    $email = htmlspecialchars($_POST['email']);

    // Dados de conexão com o banco de dados
    $servername = "localhost"; // ou o endereço do servidor do seu banco de dados
    $username = "root"; // usuário do banco de dados
    $password = ""; // senha do banco de dados
    $dbname = "formulario_db"; // nome do banco de dados

    // Crie a conexão
    $conn = new mysqli($servername, $username, $password, $dbname);

    // Verifique a conexão
    if ($conn->connect_error) {
        die("Conexão falhou: " . $conn->connect_error);
    }

    // Criptografe a senha
    $senha_hashed = password_hash($senha, PASSWORD_BCRYPT);

    // Prepare e execute a instrução SQL
    $stmt = $conn->prepare("INSERT INTO usuarios (nome, senha, email) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $nome, $senha_hashed, $email);

    if ($stmt->execute()) {
        echo "<h1>Dados salvos com sucesso!</h1>";
        echo "<p>Nome: " . $nome . "</p>";
        echo "<p>Email: " . $email . "</p>";
    } else {
        echo "Erro ao salvar os dados: " . $stmt->error;
    }

    // Feche a conexão
    $stmt->close();
    $conn->close();
} else {
    echo "Método de requisição inválido.";
}
