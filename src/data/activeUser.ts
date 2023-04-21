import { User } from '@/models/user';

type ActiveUser = User & { refreshToken: string };

const activeUsers: ActiveUser[] = [];

export default activeUsers;
