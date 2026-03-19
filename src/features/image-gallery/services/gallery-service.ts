import { getJson } from '@/core/api/http-client';
import { AppError } from '@/core/error/app-error';

import type { GalleryImage } from '../models/gallery-image';

interface GalleryResponse {
  images: GalleryImage[];
}

/** Retrieves gallery images from the API contract endpoint. */
export async function fetchGalleryImages(): Promise<GalleryImage[]> {
  try {
    const response = await getJson<GalleryResponse>('/picsum/v2/list');
    return response.images;
  } catch (error) {
    throw new AppError('Failed to load gallery images.', error);
  }
}
