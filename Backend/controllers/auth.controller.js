import { User } from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import crypto from 'crypto';
import { generateTokenAndSetCookie } from '../Utils/generateTokenAndSetCookie.js';
import { sendVerificationEmail, sendWelcomeEmail, sendPasswordResetEmail, sendResetSuccessEmail } from '../mailtrap/emails.js';
import ErrorHandler from '../Utils/ErrorHandler.js';
import cloudinary from 'cloudinary';