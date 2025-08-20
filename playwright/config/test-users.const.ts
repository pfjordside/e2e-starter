import { TestUser } from '../models/test-user.interface';

export const testUser: TestUser = {
  username: 'pkc',
  password: 'TEST_USER_PASSWORD',
};

export const admin: TestUser = {
  username: 'emsp_superuser',
  password: 'ADMIN_PASSWORD',
};

export const testUsers: TestUser[] = [testUser, admin];
