// app/api/items/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

export async function GET() {
  const items = await prisma.item.findMany({ orderBy: { createdAt: 'desc' } });
  return NextResponse.json(items);
}

export async function POST(request: Request) {
  const { title, content } = await request.json();
  if (!title || !content) return NextResponse.json({ error: 'Missing data' }, { status: 400 });
  const item = await prisma.item.create({ data: { title, content } });
  return NextResponse.json(item);
}
