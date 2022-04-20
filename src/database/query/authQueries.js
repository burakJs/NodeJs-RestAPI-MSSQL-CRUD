export const AuthQueries = {
  register: 'INSERT INTO Users VALUES (@user_name,@user_password)',
  isUserExists:
    'SELECT COUNT(*) AS UserCount FROM Users WHERE user_name = @user_name',
  login:
    'SELECT * FROM Users WHERE user_name = @user_name AND user_password = @user_password',
};
