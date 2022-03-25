
const Authorize = (path, status) => {
    return ((req, res, next) => {
        if(req.session.isLogin === status || (!req.session.isLogin && status === false)){
            next() // ทำงานต่อใน path ปัจจุบัน           
        }else{
            //res.cookie('flash_message', 'Please Login to access',{maxAge:3000})
            // redirect ไปยัง path ที่ต้องการตามที่ส่งค่ามา
            return res.redirect(path)      
        }
    })
}

module.exports = Authorize