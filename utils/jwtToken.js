// Create Token and saving in cookie
//send token is function  has user object status code and response
const sendToken = (user, statusCode, res) => {
  //getJWTtoken function is in user model schema and called here
  const token = user.getJWTToken();

  // options for cookie
  //it has 2 value expires means when token expires 
  //http means token can be access through http not through javascript so it is more secure
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  //so response me sabse phle status func status code bhejega
  //agla function cookie() call and generate cookie jiska nam hai token with
  //help of jwt token and options
  //then at last json func call and send success ,user ,cookie jiska nam hai token 
  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user,
    token,
  });
};

module.exports = sendToken;
