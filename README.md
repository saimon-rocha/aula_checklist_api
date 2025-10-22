🛠 Sobre o .sequelizerc
.sequelizerc é um arquivo de configuração que informa ao Sequelize CLI onde estão (ou devem ser criadas) as pastas de:
Configurações (config)
Models (models)
Migrations (migrations)
Seeders (seeders)
O `.sequelizerc não cria pastas sozinho.
Quando tu roda um comando tipo npx sequelize model:generate, o Sequelize usa o .sequelizerc e cria as pastas automaticamente se elas não existirem.

🚀 Boas práticas
Instalar o sequelize-cli localmente (em vez de global) para evitar conflitos de versões entre projetos.
Usar npx para rodar comandos locais sem precisar instalar nada no sistema todo.