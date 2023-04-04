import { Address, BigInt } from "@graphprotocol/graph-ts";
import { Account, Auction } from "../../generated/schema";

export function createAuction(
  contractAddress: Address,
  auctionCreator: Account,
  tokenId: BigInt,
  minimumBid: BigInt,
  currencyAddress: Address
): Auction {
  let id = contractAddress
    .toHexString()
    .concat("-")
    .concat(tokenId.toString());
  let auction = Auction.load(id);
  if (auction == null) {
    auction = new Auction(
      contractAddress
        .toHexString()
        .concat("-")
        .concat(tokenId.toString())
    );
    auction.auctionCreator = auctionCreator.id;
    auction.seller = auctionCreator.id;
    auction.contractAddress = contractAddress;
    auction.minimumBid = minimumBid;
    auction.tokenId = tokenId;
    auction.closingAmount;
    auction.currencyAddress = currencyAddress;
    auction.save();
  }

  return auction;
}

export function getAuction(contractAddress: Address, tokenId: BigInt): Auction | null {
  let id = contractAddress
    .toHexString()
    .concat("-")
    .concat(tokenId.toString());
  let auction = Auction.load(id);
  return auction;
}
