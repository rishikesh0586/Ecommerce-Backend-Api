// Create Token and saving in cookie
//send token is function  has user object status code and response
const sendToken = (user, statusCode, res) => {
  //getJWTtoken function is in user model schema and called here
  const token = user.getJWTToken();
  // options for cookie
  //it has 2 value expires means when token expires 
  //http means token can be access through http not through javascript so it is more secure
  const options = {
    expires: new Date(Date.now()+5*24*60*60*1000
    ),
    httpOnly: true
  };

  
  try {
    res.status(statusCode).cookie("token", token, options).json({
      success: true,
      user,
      token,
    });
  
}catch{
  console.log("error in cookie setting");
}
  

};

module.exports = sendToken;
