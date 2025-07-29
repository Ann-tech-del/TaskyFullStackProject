import { Request, Response } from 'express';
import { client } from '../config/prismaConfig';


export const getTestimonials = async (req: Request, res: Response) => {
  try {
    const testimonials = await client.testimonial.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            username: true,
            avatar: true,
          },
        },
      },
    });
    res.status(200).json({ testimonials });
  } catch (e) {
    res.status(500).json({ message: 'Failed to fetch testimonials.' });
  }
};


export const addTestimonial = async (req: Request, res: Response) => {
  try {
    const { message } = req.body;
    const userId = req.user.id;
    if (!message || message.trim().length < 10) {
      return res.status(400).json({ message: 'Testimonial is too short.' });
    }
    const testimonial = await client.testimonial.create({
      data: {
        userId,
        message,
      },
    });
    res.status(201).json({ testimonial });
  } catch (e) {
    res.status(500).json({ message: 'Failed to add testimonial.' });
  }
}; 