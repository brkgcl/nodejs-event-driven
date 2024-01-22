/**
 * 
 */

export interface RequestUserI {
  id: string;
  displayName: string;
  email: string;
  verified: boolean;
  pictures: string;
}

export const generateUserToSessionObject = (user:any) => {
    const data = {
      id: user._id.toHexString(),
      displayName: user.displayName,
      email: user.email.value,
      verified: user.email.verified,
      pictures: user.picture,
    };
    return data;
}