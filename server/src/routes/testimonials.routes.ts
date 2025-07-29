import { Router } from 'express';
import { getTestimonials,addTestimonial } from '../controller/testimonials.controller';
import verifyUser from '../mildware/verifyUser';

const testimonialsRouter = Router();

testimonialsRouter.get('/testimonials', getTestimonials);
testimonialsRouter.post('/testimonials', verifyUser, addTestimonial);

export default testimonialsRouter; 