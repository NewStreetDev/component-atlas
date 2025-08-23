import { NextResponse } from 'next/server';
import { getAllTemplates } from '@/shared/utils/templateCatalog';

export async function GET() {
  try {
    const templates = await getAllTemplates();
    return NextResponse.json(templates);
  } catch (error) {
    console.error('Failed to get templates:', error);
    return NextResponse.json({ error: 'Failed to load templates' }, { status: 500 });
  }
}