const ResponseMessages = {
  auth: {
    register: `User register successfully`,
    login: `User login successfully`,
    logout: `User logout successfully`,
    changedPassword: `Password change successfully`,
  },
  user: {
    getAll: `Users fetched successfully`,
    get: `User fetched successfully`,
  },
} as const;

export { ResponseMessages };
