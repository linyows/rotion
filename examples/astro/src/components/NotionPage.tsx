import { Page } from 'rotion/ui';
import type { ListBlockChildrenResponseEx } from 'rotion';

interface NotionPageProps {
  blocks: ListBlockChildrenResponseEx;
}

export default function NotionPage({ blocks }: NotionPageProps) {
  return <Page blocks={blocks} />;
}
