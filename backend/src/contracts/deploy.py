import solcx
from web3 import Web3, HTTPProvider

temp_file = solcx.compile_files(
    "tapcheck.sol",
    output_values=["abi", "bin"],
    # solc_version='0.8.19'
)


abi = temp_file["tapcheck.sol:TapCheck"]["abi"]
bytecode = temp_file["tapcheck.sol:TapCheck"]["bin"]

# 1. Add imports

# 2. Add the Web3 provider logic here:
provider_rpc = {
    "gas": "http://gasrelay-202305-mvnkrv-nlb-71ce073c82f4c5a7.elb.ap-northeast-2.amazonaws.com:9876/rpc-sync",
    "evm": "http://aops-custom-202305-2crvsg-nlb-1d600174371701f9.elb.ap-northeast-2.amazonaws.com:9650/ext/bc/XpX1yGquejU5cma1qERzkHKDh4fsPKs4NttnS1tErigPzugx5/rpc",
}
web3 = Web3(HTTPProvider(provider_rpc["evm"]))  # Change to correct network

# 3. Create address variable
account_from = {
    "private_key": "f24249882e134400a8de1c76fbaa7f505675ec7c295310d0ffbe44b804bc577e",
    "address": "0x03B8658a0D43C32fcF954B00a2037b4C7a300Ac1",
}

print(f'Attempting to deploy from account: { account_from["address"] }')

# 4. Create contract instance
contract_ = web3.eth.contract(abi=abi, bytecode=bytecode)

# 5. Build constructor tx
construct_txn = contract_.constructor(5).build_transaction(
    {
        "from": account_from["address"],
        "nonce": web3.eth.get_transaction_count(account_from["address"]),
    }
)

# 6. Sign tx with PK
tx_create = web3.eth.account.sign_transaction(
    construct_txn, account_from["private_key"]
)

# 7. Send tx and wait for receipt
tx_hash = web3.eth.send_raw_transaction(tx_create.rawTransaction)
tx_receipt = web3.eth.wait_for_transaction_receipt(tx_hash)

print(f"Contract deployed at address: { tx_receipt.contractAddress }")
