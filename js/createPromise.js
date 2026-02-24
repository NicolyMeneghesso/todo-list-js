// Função para fazer requisições HTTP (GET, POST, PUT, DELETE)
export function createPromise(method, url, data = null) {
  return new Promise(function (resolve, reject) {
    // Cria objeto XMLHttpRequest
    const xhr = new XMLHttpRequest()

    // Configura a requisição
    xhr.open(method, url)

    // Define headers (tipo de conteúdo)
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8")

    // Envia a requisição (com ou sem dados)
    xhr.send(data ? JSON.stringify(data) : null)

    // Quando resposta chegar
    xhr.onload = function () {

      // Verifica se foi sucesso (2xx) ou erro (4xx, 5xx)
      if (xhr.status >= 200 && xhr.status < 300) {
        // Sucesso: converte JSON em objeto JavaScript
        const response = JSON.parse(xhr.responseText)
        resolve(response)
      } else {
          reject(Error("Erro na requisição"))
      }
    }
  })
}
