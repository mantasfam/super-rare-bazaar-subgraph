import { Address, BigInt } from "@graphprotocol/graph-ts";

import { Account, Auction, Bid } from "../../generated/schema";

export function getOrCreateBid(
  bidder: Account,
  tokenId: BigInt,
  amount: BigInt,
  auction: Auction
): Bid {
  let id = bidder.address
    .toHex()
    .concat("-")
    .concat(tokenId.toString());
  let bid = Bid.load(id);
  if (bid == null) {
    bid = new Bid(
      bidder.address
        .toHex()
        .concat("-")
        .concat(tokenId.toString())
    );
    bid.bidder = bidder.id;
    bid.amount = amount;
    bid.auction = auction.id;
    bid.tokenId = tokenId;
    bid.save();
  }
  return bid;
}
