import { AppDataSource } from "./data-source";

async function testConnection() {
  try {
    await AppDataSource.initialize();
    console.log("✅ Conexão com PostgreSQL estabelecida");
    await AppDataSource.destroy();
  } catch (error) {
    console.error("❌ Erro na conexão:", error);
  }
}

testConnection();