import { percentAmount, generateSigner, signerIdentity, createSignerFromKeypair, Umi, Signer } from '@metaplex-foundation/umi'
import { TokenStandard, createAndMint} from '@metaplex-foundation/mpl-token-metadata'
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import { mplCandyMachine } from "@metaplex-foundation/mpl-candy-machine";
import  "@solana/web3.js";
import { PublicKey, Transaction, sendAndConfirmTransaction, Connection, clusterApiUrl, Keypair } from '@solana/web3.js';
import secret from './guideSecretEffectiveAIUG.json';

const umi = createUmi('https://api.mainnet-beta.solana.com');

const userWallet = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(secret));
const userWalletSigner = createSignerFromKeypair(umi, userWallet);

const metadata = {
    name: "ACC",
    symbol: "ACC",
    uri: "https://quicknode.quicknode-ipfs.com/ipfs/QmTMLs7A59xpqK2fgcea2guJnkbhkchakJBovsCdu5MwiM",
};

const mint = generateSigner(umi);
umi.use(signerIdentity(userWalletSigner));
umi.use(mplCandyMachine())

const mintAndRevokeAuthority = async () => {

createAndMint(umi, {
    mint,
    authority: umi.identity,
    name: metadata.name,
    symbol: metadata.symbol,
    uri: metadata.uri,
    sellerFeeBasisPoints: percentAmount(0),
    decimals: 8,
    amount: 1000000000_00000000,
    tokenOwner: userWallet.publicKey,
    tokenStandard: TokenStandard.Fungible,
    }).sendAndConfirm(umi).then(() => {
    console.log("Successfully minted 1 billion tokens (", mint.publicKey, ")");
});

}

mintAndRevokeAuthority();

// Guarantee fixed supply

// spl-token authorize ${token_address} mint --disable
// spl-token authorize ${token_address} freeze --disable
