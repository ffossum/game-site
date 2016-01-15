class User extends Object {}

export function getUser(id) {
  return new Promise((resolve, reject) => {
    const user = users[id];
    if (user) {
      resolve(user);
    } else {
      reject('User not found');
    }
  });
}

const qwer = new User();
qwer.id = 'qwer-id';
qwer.name = 'qwer';
qwer.email = 'qwer@game.com';
qwer.avatar = 'ef6634d3846ac94eb0598ed93d577285';
qwer.password = '$2a$10$UemDKpXA3ceaTyrKdbgf3uQTqVxNvXUoiXdHoq9iV497RxZXvTv0q';

const asdf = new User();
asdf.id = 'asdf-id';
asdf.name = 'asdf';
asdf.email = 'asdf@game.com';
asdf.avatar = '75732fe563c5f3a7211d2986384e0b61';
asdf.password = '$2a$10$I.3GXDmHmivbHtM7JJUWVuz3WjQvuW893xgZ2xYopqNlZuNdCSvVO';

const zxcv = new User();
zxcv.id = 'zxcv-id';
zxcv.name = 'zxcv';
zxcv.email = 'zxcv@game.com';
zxcv.avatar = '891ce729b455bfb01f89633f3d7aecd8';
zxcv.password = '$2a$10$MZl4dEyrVf3ZX1UvqPiGxu4FRpc6kVd6SctrkHlOgEo4d7fGSrbtu';

const users = {
  'qwer-id': qwer,
  'asdf-id': asdf,
  'zxcv-id': zxcv
};

export default {
  users
};
