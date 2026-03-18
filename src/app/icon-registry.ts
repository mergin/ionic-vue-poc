import { addIcons } from 'ionicons'
import { imagesOutline, languageOutline, partlySunnyOutline, peopleOutline } from 'ionicons/icons'

/** Registers all Ionicons used by app templates. */
export function registerAppIcons(): void {
  addIcons({
    'partly-sunny-outline': partlySunnyOutline,
    'images-outline': imagesOutline,
    'people-outline': peopleOutline,
    'language-outline': languageOutline,
  })
}
