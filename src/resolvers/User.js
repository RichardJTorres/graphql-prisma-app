import getUserId from '../utils/getUserId';
import { Prisma } from 'prisma-binding';

const userIdFragment = 'fragment userId on User { id }';

const User = {
  email: {
    fragment: userIdFragment,
    resolve(parent, args, { request }, info) {
      const userId = getUserId(request, false);
      if (userId && userId === parent.id) {
        return parent.email;
      } else {
        return null;
      }
    },
  },
  posts: {
    fragment: userIdFragment,
    resolve(parent, args, { prisma, request }, info) {
      console.log(args);
      return prisma.query.posts({
        where: {
          author: {
            id: parent.id,
          },
          published: true,
        },
      });
    },
  },
};

export { User as default };
