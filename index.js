const {
  Connection,
  PublicKey,
  clusterApiUrl,
  Keypair,
  LAMPORTS_PER_SOL,
  Transaction,
  Account,
} = require("@solana/web3.js");

const newPair = new Keypair();
const publicKey = new PublicKey(newPair._keypair.publicKey).toString();
const secretKey = newPair._keypair.secretKey;

const getWalletBalance = async () => {
  try {
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
    const wallet = await Keypair.fromSecretKey(secretKey);
    const walletBalance = await connection.getBalance(
      new PublicKey(wallet.publicKey)
    );
    console.log(`=> For wallet address ${publicKey}`);
    console.log(
      `\tWallet balance: ${parseInt(walletBalance) / LAMPORTS_PER_SOL}SOL`
    );
  } catch (error) {
    console.error(error);
  }
};

const airDropSol = async () => {
  try {
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
    const wallet = await Keypair.fromSecretKey(secretKey);
    console.log("Airdropping 2 SOL");
    const fromAirdropSignature = await connection.requestAirdrop(
      new PublicKey(wallet.publicKey),
      2 * LAMPORTS_PER_SOL
    );
    await connection.confirmTransaction(fromAirdropSignature);
  } catch (error) {
    console.error(error);
  }
};

const driver = async () => {
  await getWalletBalance();
  await airDropSol();
  await getWalletBalance();
};

driver();
