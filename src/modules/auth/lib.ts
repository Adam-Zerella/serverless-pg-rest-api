// import JWT, { JwtPayload } from 'jsonwebtoken';

// import ApiError from '../error/lib';

// export interface Auth0JwtPayload extends JwtPayload {
//   email: string;
//   scope: string;
//   permissions: string[];
//   /**
//    * There is an Auth0 specific reason for this.
//    * @see https://auth0.com/docs/scopes/current/sample-use-cases#add-custom-claims-to-a-token
//    */
//   'https://example.com/email'?: string;
// }

// export async function verifyJWT(
//   token: string,
//   base64Secret: string,
// ): Promise<Auth0JwtPayload> {
//   return new Promise((resolve, reject) => {
//     JWT.verify(
//       token,
//       Buffer.from(base64Secret, 'base64'),
//       function (error, decodedJWT = {}) {
//         if (error) {
//           reject('AUTH_INVALID');

//           throw new ApiError('AUTH_INVALID', 'Check your access token');
//         }

//         const formattedEmail = decodedJWT['https://example.com/email'];

//         resolve({
//           ...decodedJWT,
//           email: formattedEmail,
//         } as Auth0JwtPayload);
//       },
//     );
//   });
// }
