import { onMounted, ref } from 'vue';
import type { Ref } from 'vue';

import type { GalleryImage } from '../models/gallery-image';
import { fetchGalleryImages } from '../services/gallery-service';

interface UseGalleryReturn {
  loading: Ref<boolean>;
  error: Ref<string | null>;
  images: Ref<GalleryImage[]>;
  load: () => Promise<void>;
}

/** Encapsulates gallery loading, error handling, and retry behavior for UI components. */
export function useGallery(): UseGalleryReturn {
  const loading = ref<boolean>(true);
  const error = ref<string | null>(null);
  const images = ref<GalleryImage[]>([]);

  async function load(): Promise<void> {
    loading.value = true;
    error.value = null;

    try {
      images.value = await fetchGalleryImages();
    } catch {
      error.value = 'error';
    } finally {
      loading.value = false;
    }
  }

  onMounted(async () => {
    await load();
  });

  return {
    loading,
    error,
    images,
    load,
  };
}
