// Require packages and define server related variables
const express = require('express')
const cors = require('cors');
const ethers  = require('ethers');
const query = require('./query');
const abi = require('./abi.json');

const app = express()
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(cors())
const port = 5000

app.get('/', (req, res) => {
    res.send('OK');
})

app.post('/crypto/payment', (req, res)=>{
    const {hash, orderId} = req.body;
    const provider = new ethers.providers.InfuraProvider('sepolia');
    console.log('su');
    provider.once(hash, (transaction) => {
        if(transaction.status==1)
            query.changeOrderStatus(orderId);
    })
    res.send({});
})

app.post('/crypto/nft', async(req, res)=>{
    const {addr, index} = req.body;
    const provider = new ethers.providers.InfuraProvider('maticmum');
    const signer = new ethers.Wallet(process.env.WALLET_PRIVATE_KEY, provider);
    const contract = new ethers.Contract(process.env.CONTRACT_ADDRESS , abi , signer);
    const nftLink = [
        'https://gateway.pinata.cloud/ipfs/QmQN34Q3bVfRUBPrtTAmwK23GAQScrUStxtvipk4FoqTXK/Jonathan_head.json',
        'https://gateway.pinata.cloud/ipfs/QmQN34Q3bVfRUBPrtTAmwK23GAQScrUStxtvipk4FoqTXK/Jonathan_left_hand.json',
        'https://gateway.pinata.cloud/ipfs/QmQN34Q3bVfRUBPrtTAmwK23GAQScrUStxtvipk4FoqTXK/Jonathan_left_foot.json',
        'https://gateway.pinata.cloud/ipfs/QmQN34Q3bVfRUBPrtTAmwK23GAQScrUStxtvipk4FoqTXK/Jonathan_right_hand.json',
        'https://gateway.pinata.cloud/ipfs/QmQN34Q3bVfRUBPrtTAmwK23GAQScrUStxtvipk4FoqTXK/Jonathan_right_foot.json',
        'https://gateway.pinata.cloud/ipfs/QmQN34Q3bVfRUBPrtTAmwK23GAQScrUStxtvipk4FoqTXK/Kevin_head.json',
        'https://gateway.pinata.cloud/ipfs/QmQN34Q3bVfRUBPrtTAmwK23GAQScrUStxtvipk4FoqTXK/Kevin_left_hand.json',
        'https://gateway.pinata.cloud/ipfs/QmQN34Q3bVfRUBPrtTAmwK23GAQScrUStxtvipk4FoqTXK/Kevin_left_foot.json',
        'https://gateway.pinata.cloud/ipfs/QmQN34Q3bVfRUBPrtTAmwK23GAQScrUStxtvipk4FoqTXK/Kevin_right_hand.json',
        'https://gateway.pinata.cloud/ipfs/QmQN34Q3bVfRUBPrtTAmwK23GAQScrUStxtvipk4FoqTXK/Kevin_right_foot.json',
        'https://gateway.pinata.cloud/ipfs/QmQN34Q3bVfRUBPrtTAmwK23GAQScrUStxtvipk4FoqTXK/Louis_head.json',
        'https://gateway.pinata.cloud/ipfs/QmQN34Q3bVfRUBPrtTAmwK23GAQScrUStxtvipk4FoqTXK/Louis_left_hand.json',
        'https://gateway.pinata.cloud/ipfs/QmQN34Q3bVfRUBPrtTAmwK23GAQScrUStxtvipk4FoqTXK/Louis_left_foot.json',
        'https://gateway.pinata.cloud/ipfs/QmQN34Q3bVfRUBPrtTAmwK23GAQScrUStxtvipk4FoqTXK/Louis_right_hand.json',
        'https://gateway.pinata.cloud/ipfs/QmQN34Q3bVfRUBPrtTAmwK23GAQScrUStxtvipk4FoqTXK/Louis_right_foot.json',
        'https://gateway.pinata.cloud/ipfs/QmQN34Q3bVfRUBPrtTAmwK23GAQScrUStxtvipk4FoqTXK/Sean_head.json',
        'https://gateway.pinata.cloud/ipfs/QmQN34Q3bVfRUBPrtTAmwK23GAQScrUStxtvipk4FoqTXK/Sean_left_hand.json',
        'https://gateway.pinata.cloud/ipfs/QmQN34Q3bVfRUBPrtTAmwK23GAQScrUStxtvipk4FoqTXK/Sean_left_foot.json',
        'https://gateway.pinata.cloud/ipfs/QmQN34Q3bVfRUBPrtTAmwK23GAQScrUStxtvipk4FoqTXK/Sean_right_hand.json',
        'https://gateway.pinata.cloud/ipfs/QmQN34Q3bVfRUBPrtTAmwK23GAQScrUStxtvipk4FoqTXK/Sean_right_foot.json',
        'https://gateway.pinata.cloud/ipfs/QmTRJnWmtC2Y4NfKZe3cBbNubhw5ZFWwnchebjz8CAogGu/Jonathan.json',
        'https://gateway.pinata.cloud/ipfs/QmTRJnWmtC2Y4NfKZe3cBbNubhw5ZFWwnchebjz8CAogGu/Kevin.json',
        'https://gateway.pinata.cloud/ipfs/QmTRJnWmtC2Y4NfKZe3cBbNubhw5ZFWwnchebjz8CAogGu/Louis.json',
        'https://gateway.pinata.cloud/ipfs/QmTRJnWmtC2Y4NfKZe3cBbNubhw5ZFWwnchebjz8CAogGu/Sean.json'
    ]
    try{
        contract.safeMint(addr, nftLink[index]);
    } catch(err){
        console.log(err);
    }
    res.send({status: 'success'});
})

app.listen(port, () => {
    console.log(`Express is running on http://localhost:${port}`)
})


