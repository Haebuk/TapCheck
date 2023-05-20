import os
import time

from moralis import evm_api

MORALIS_API_KEY = os.environ.get("MORALIS_API_KEY")


def is_nft_owner(
    owners: list[str],
    user_wallet_addr: str,
) -> bool:
    for owner in owners:
        if owner == user_wallet_addr:
            return True
    return False


def get_nft_owners(nft_contract_addr: str) -> list[str]:
    params = {
        "address": nft_contract_addr,
        "chain": "avalanche",
        "format": "decimal",
        "limit": 100,
        "cursor": "",
        "normalizeMetadata": True,
    }
    res = evm_api.nft.get_nft_owners(
        api_key=MORALIS_API_KEY,
        params=params,
    )
    print(res.keys())
    cursor = res["cursor"]
    print(f"cursor: {cursor}")

    owners = []
    for r in res["result"]:
        owners.append(r["owner_of"])

    while cursor:
        params["cursor"] = cursor
        print(f"cursor: {cursor}")
        res = evm_api.nft.get_nft_owners(
            api_key=MORALIS_API_KEY,
            params=params,
        )
        cursor = res["cursor"]

        for r in res["result"]:
            owners.append(r["owner_of"])

        time.sleep(0.5)
    print(len(owners))
    return owners
