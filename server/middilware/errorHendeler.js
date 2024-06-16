const httperrors={
    Bad_Request:400,
    InvalidFormat: 403 ,
    Not_Found:404 ,
    Unauthorized: 401,
    Conflict:409,
    Invalid_input:422,
   Server_Error: 500  
}
const errorHandeler=(err,req,res,next)=>{
    const statusCode=res.statusCode ? res.statusCode : 500;  
    switch (statusCode) {
        case httperrors.Not_Found:
            res.json({titale:"Not Found" ,message:err.message, stackTrace:err.stack});
            break;
        case httperrors.Bad_Request:
            res.json({titale:"Bad Request" ,message:err.message, stackTrace:err.stack});
            break;
        case httperrors.Unauthorized:
            res.json({titale:"Unauthorized" ,message:err.message, stackTrace:err.stack});
            break; 
        case httperrors.InvalidFormat:
            res.json({titale:"InvalidFormat" ,message:err.message, stackTrace:err.stack});
            break;
              case httperrors.Conflict:
            res.json({titale:"Conflict" ,message:err.message, stackTrace:err.stack});
            break;
            case httperrors.Invalid_input:
            res.json({titale:"Invalid input" ,message:err.message, stackTrace:err.stack});
            break;  
        case httperrors.Server_Error:
            res.json({titale:"Server Error" ,message:err.message, stackTrace:err.stack});
            break;      
        default:
            res.json({message:err.message});
            break;
    }
}
module.exports=errorHandeler