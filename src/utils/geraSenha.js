import bcrypt from 'bcrypt';

async function gerarHash() {
  const hash = await bcrypt.hash('admin123', 10);
  console.log(hash);
}

gerarHash();