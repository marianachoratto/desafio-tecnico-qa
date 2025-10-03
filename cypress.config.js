const { defineConfig } = require("cypress");
const { exec } = require("child_process");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:3001",
    setupNodeEvents(on, config) {
      on("task", {
        exec(command) {
          console.log("Executando comando no terminal:", command);
          try {
            const output = exec(command, { encoding: "utf-8" });
            console.log("Saída:", output);
            return output;
          } catch (error) {
            console.error("Erro ao executar comando:", error.stderr);
            throw new Error(
              `Falha ao executar comando: ${command}\n${error.stderr}`
            );
          }
        },
      });
    },
  },
});
