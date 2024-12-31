const createTokenUser = (user) => {
  return { name: user.name, userId: user._id, role: user.role,customer_id:user.customer_id };
};

export default createTokenUser;
