import { NextResponse } from 'next/server';
import { getAllComponents } from '@/shared/utils/componentCatalog';

export async function GET() {
  try {
    const components = await getAllComponents();
    return NextResponse.json(components);
  } catch (error) {
    console.error('Failed to get components:', error);
    return NextResponse.json({ error: 'Failed to load components' }, { status: 500 });
  }
}