import test from "@playwright/test";
import { TestUser } from "../models/test-user.interface";

export async function actAs(user: TestUser) {
  test.use({ storageState: `playwright/.auth/${user.username}.json` });
}