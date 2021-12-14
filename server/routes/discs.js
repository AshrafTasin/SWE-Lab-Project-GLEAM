import express, { Router } from 'express';
import { getDisc, createDiscs,getSingleDisc,discImage,deleteDisc , updateUpVoteDisc,updateDisc,getDiscImage} from '../controllers/discussions.js'
const router = express.Router();
import ckimage from '../middleware/ckimage.js';


router.get('/getDisc',getDisc);
router.post('/createDisc',createDiscs);
router.get('/:id',getSingleDisc);
router.post('/upload',ckimage,discImage);
router.get('/images/:id',getDiscImage);
router.delete('/:id',deleteDisc);
router.put('/:id',updateDisc);

router.put('/update/:id',updateUpVoteDisc);

export default router;