import { describe, test } from "matchstick-as/assembly/index";
import { handleUpdatedGravatar, handleNewGravatar } from "../../src//entities/auction"

test(
  "Should throw an error",
  () => {
    throw new Error();
  },
  true
);

import { Gravatar } from "../../generated/schema"

beforeAll(() => {
  let gravatar = new Gravatar("0x0")
  gravatar.displayName = “First Gravatar”
  gravatar.save()
  ...
})

describe("When the entity does not exist", () => {
  test("it should create a new Gravatar with id 0x1", () => {
    ...
  })
})

describe("When entity already exists", () => {
  test("it should update the Gravatar with id 0x0", () => {
    ...
  })
})