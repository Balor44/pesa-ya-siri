import app from './app';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🔐 Pesa Ya Siri is running`);
  console.log(`👉 http://localhost:${PORT}/health`);
});