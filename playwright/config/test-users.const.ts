import { TestUser } from '../models/test-user.interface';

export const testUser: TestUser = {
  username: 'testUser',
  password: 'TEST_USER_PASSWORD',
};

export const admin: TestUser = {
  username: 'admin',
  password: 'ADMIN_PASSWORD',
};

export const testUsers: TestUser[] = [testUser, admin];
