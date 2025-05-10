module.exports.isLoggedIn=(req,res,next)=>{
    req.session.redirectUrl = req.originalUrl;
    if(!req.isAuthenticated()){
        req.flash("error","You must be logged in to create listing!");
        return res.redirect("/login");
    }
    next();
}
module.exports.saveredirectUrl=(req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl;
    }
    next();
}