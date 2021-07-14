module.exports = options => {
    //back end validation
    return async function adminauth(ctx,next) {
        console.log("ctx.session.openId---"+ctx.session.openId)
        //console.log("ctx-----"+ctx)
        if(ctx.session.openId){
            await next()
        }else{
            ctx.body={data:"not login"}
        }
    }
}


