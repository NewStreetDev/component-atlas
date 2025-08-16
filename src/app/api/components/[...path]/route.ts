import { NextRequest, NextResponse } from 'next/server';
import { getComponentFiles } from '@/shared/utils/componentCatalog';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  try {
    const resolvedParams = await params;
    const relativePath = resolvedParams.path.join('/');
    const files = await getComponentFiles(relativePath);
    return NextResponse.json(files);
  } catch (error) {
    console.error('Failed to get component files:', error);
    return NextResponse.json({ error: 'Failed to load component files' }, { status: 500 });
  }
}