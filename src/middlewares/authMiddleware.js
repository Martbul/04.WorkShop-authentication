const jwt = require('../lib/jwt');
const {SECRET} = require('../constants')

exports.auth = async (req,res,next)=>{
    const token = req.cookies['auth']
console.log({token});
    if(token){
    
    try {
        const decodedToken = await jwt.verify(token,SECRET)
        req.user = decodedToken;

        res.locals.user = decodedToken;
        res.locals.isAuthenticated = true;


        next()
    } catch (error) {
        console.log({error});
        res.clearCookie('auth')
        res.redirect('/users/login')
    }
}else{
       next(); 
    }

    
}


//if user is not athenticated , he can not access URLs with that middleware
//because non authenticated users can not see add cube button but they can time the route in the URL
//with that that URL is blocked for them and it redirects them to login page


//hidden buttons dosen't mean that anyone can't access the routes, you need to block the couse anyone can type them in URL
exports.isAuth = (req, res, next) => {
    if (!req.user) {
        return res.redirect('/users/login')
    }

    next()

}