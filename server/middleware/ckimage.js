import multiparty from 'connect-multiparty';

const ckimage=multiparty({uploadDir:'./uploaded'});

export default ckimage;