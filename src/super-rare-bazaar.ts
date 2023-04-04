import { BigInt } from "@graphprotocol/graph-ts";
import {
  AcceptOffer,
  AuctionBid,
  AuctionSettled,
  CancelAuction,
  CancelOffer,
  NewAuction,
  OfferPlaced,
  OwnershipTransferred,
  SetSalePrice,
  Sold,
} from "../generated/SuperRareBazaar/SuperRareBazaar";
import { Account, Auction, Bid } from "../generated/schema";
import { getOrCreateAccount } from "./entities/account";
import { createAuction, getAuction } from "./entities/auction";

export function handleAcceptOffer(event: AcceptOffer): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let entity = ExampleEntity.load(event.transaction.from.toHex());

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (!entity) {
    entity = new ExampleEntity(event.transaction.from.toHex());

    // Entity fields can be set using simple assignments
    entity.count = BigInt.fromI32(0);
  }

  // BigInt and BigDecimal math are supported
  //entity.count = entity.count + BigInt.fromI32(1);

  // Entity fields can be set based on event parameters
  entity._originContract = event.params._originContract;
  entity._bidder = event.params._bidder;

  // Entities can be written to the store with `.save()`
  entity.save();

  // Note: If a handler doesn't require existing field values, it is faster
  // _not_ to load the entity from the store. Instead, create it fresh with
  // `new Entity(...)`, set the fields that should be updated and save the
  // entity back to the store. Fields that were not set or unset remain
  // unchanged, allowing for partial updates to be applied.

  // It is also possible to access smart contracts from mappings. For
  // example, the contract that has emitted the event can be connected to
  // with:
  //
  // let contract = Contract.bind(event.address)
  //
  // The following functions can then be called on this contract to access
  // state variables and other data:
  //
  // - contract.COLDIE_AUCTION(...)
  // - contract.NO_AUCTION(...)
  // - contract.SCHEDULED_AUCTION(...)
  // - contract.approvedTokenRegistry(...)
  // - contract.auctionBids(...)
  // - contract.auctionLengthExtension(...)
  // - contract.getAuctionDetails(...)
  // - contract.getSalePrice(...)
  // - contract.marketplaceSettings(...)
  // - contract.maxAuctionLength(...)
  // - contract.minimumBidIncreasePercentage(...)
  // - contract.networkBeneficiary(...)
  // - contract.offerCancelationDelay(...)
  // - contract.owner(...)
  // - contract.payments(...)
  // - contract.royaltyEngine(...)
  // - contract.royaltyRegistry(...)
  // - contract.spaceOperatorRegistry(...)
  // - contract.stakingRegistry(...)
  // - contract.superRareAuctionHouse(...)
  // - contract.superRareMarketplace(...)
  // - contract.tokenAuctions(...)
  // - contract.tokenCurrentOffers(...)
  // - contract.tokenSalePrices(...)
}

export function handleAuctionBid(event: AuctionBid): void {}

export function handleAuctionSettled(event: AuctionSettled): void {}

export function handleCancelAuction(event: CancelAuction): void {}

export function handleCancelOffer(event: CancelOffer): void {}

/*address indexed _contractAddress,
uint256 indexed _tokenId,
address indexed _auctionCreator,
address _currencyAddress,
uint256 _startingTime,
uint256 _minimumBid,
uint256 _lengthOfAuction*/

// adds a new auction to the state
export function handleNewAuction(event: NewAuction): void {
  let auctionCreator = getOrCreateAccount(event.params._auctionCreator);
  if (auctionCreator) {
    let auction = getAuction(event.params._contractAddress, event.params._tokenId);
    if (auction == null) {
      auction = createAuction(
        event.params._contractAddress,
        auctionCreator,
        event.params._tokenId,
        event.params._minimumBid,
        event.params._currencyAddress
      );
    }

    if (auction) {
      createAuctionSnapShot(auction, event.logIndex, event.block.timestamp);
    }
  }
}

export function handleOfferPlaced(event: OfferPlaced): void {}

export function handleSetSalePrice(event: SetSalePrice): void {}

export function handleSold(event: Sold): void {}
