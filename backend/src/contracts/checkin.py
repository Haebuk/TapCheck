import os
from web3 import Web3, HTTPProvider

EVM_CHAIN_RPC_URL = os.getenv("EVM_CHAIN_RPC_URL")
GAS_RELAYER_RPC_URL = os.getenv("GAS_RELAYER_RPC_URL")
TRUSTED_FORWARDER_CONTRACT_ADDRESS = os.getenv("TRUSTED_FORWARDER_CONTRACT_ADDRESS")
DOMAIN_NAME = os.getenv("DOMAIN_NAME")
DOMAIN_VERSION = os.getenv("DOMAIN_VERSION")
TYPE_NAME = os.getenv("TYPE_NAME")
TYPE_SUFFIX_DATA = os.getenv("TYPE_SUFFIX_DATA")

def init():
    web3 = Web3(HTTPProvider(EVM_CHAIN_RPC_URL))
    print(web3)


def checkin(wallet, event_id):
    return f"checkin wallet: {wallet}, event_id: {event_id}"


if __name__ == "__main__":
    init()
