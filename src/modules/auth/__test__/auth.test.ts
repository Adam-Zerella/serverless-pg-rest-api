// import { assert } from 'chai';

// // import ApiError from './../components/error';
// import { verifyJWT } from '@module/auth/lib';

// export default function () {
//   describe('JWT', () => {
//     it('Should throw if input JWT has expired.', async () => {
//       const expiredJWTBase64 = 'YQ==bad-jwt';
//       const fakeSecret = 'hunter2';

//       try {
//         await verifyJWT(expiredJWTBase64, fakeSecret);
//       } catch (err) {
//         assert.strictEqual(err, 'AUTH_INVALID');
//       }
//     });
//   });
// }
