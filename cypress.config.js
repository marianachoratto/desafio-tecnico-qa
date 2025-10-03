const { defineConfig } = require("cypress");
const { exec } = require("child_process"); // Importe aqui!

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:3001",
    setupNodeEvents(on, config) {
      on("task", {
        // Defina a tarefa com o nome "exec"
        exec(command) {
          console.log("Executando comando no terminal:", command);
          try {
            // Executa o comando e retorna o stdout como string
            const output = exec(command, { encoding: "utf-8" });
            console.log("Saída:", output);
            return output;
          } catch (error) {
            console.error("Erro ao executar comando:", error.stderr);
            // Lança o erro para que o teste do Cypress falhe
            throw new Error(
              `Falha ao executar comando: ${command}\n${error.stderr}`
            );
          }
        },
      });
    },
  },
});
