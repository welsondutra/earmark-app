import { Image } from './styles';

export function Cover({ uri, size }: { uri: string | null; size: number }) {
  return <Image $size={size} source={uri ? { uri } : undefined} accessibilityIgnoresInvertColors />;
}
