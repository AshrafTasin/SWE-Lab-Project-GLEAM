import jwt from 'jsonwebtoken';

const auth = (req,res,next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const isGoogleAuth = token.length > 500;     

        let decodedData;

        if(token && !isGoogleAuth){
            decodedData = jwt.verify(token,'secretString');
            req.userId = decodedData?.id;
        }else{
            decodedData = jwt.decode();
            req.userId = decodedData?.sub;
        }

        next();

    } catch (error) {
        console.log(error);
    }
};


export default auth;