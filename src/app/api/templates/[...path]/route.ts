import { NextRequest, NextResponse } from 'next/server';
import { getTemplateFiles } from '@/shared/utils/templateCatalog';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  try {
    const { searchParams } = new URL(request.url);
    const templateId = searchParams.get('templateId');
    
    const pathSegments = (await params).path;
    const relativePath = pathSegments.join('/');
    
    const files = await getTemplateFiles(relativePath, templateId || undefined);
    return NextResponse.json(files);
  } catch (error) {
    console.error('Failed to get template files:', error);
    return NextResponse.json({ error: 'Failed to load template files' }, { status: 500 });
  }
}