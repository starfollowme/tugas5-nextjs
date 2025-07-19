// app/api/items/[id]/route.ts

import { NextResponse } from 'next/server';
import { prisma } from '../../../../../lib/prisma';
type Params = { params: { id: string } };

// GET /api/items/:id
export async function GET(_req: Request, { params }: Params) {
  if (!params?.id) {
    return NextResponse.json({ error: 'Missing ID param' }, { status: 400 });
  }

  const item = await prisma.item.findUnique({ where: { id: params.id } });

  if (!item) {
    return NextResponse.json({ error: 'Item not found' }, { status: 404 });
  }

  return NextResponse.json(item);
}

// PATCH /api/items/:id
export async function PATCH(req: Request, { params }: Params) {
  if (!params?.id) {
    return NextResponse.json({ error: 'Missing ID param' }, { status: 400 });
  }

  const { title, content } = await req.json();

  if (!title || !content) {
    return NextResponse.json({ error: 'Missing title or content' }, { status: 400 });
  }

  const updated = await prisma.item.update({
    where: { id: params.id },
    data: { title, content },
  });

  return NextResponse.json(updated);
}

// DELETE /api/items/:id
export async function DELETE(_req: Request, { params }: Params) {
  if (!params?.id) {
    return NextResponse.json({ error: 'Missing ID param' }, { status: 400 });
  }

  await prisma.item.delete({ where: { id: params.id } });

  return NextResponse.json({ success: true });
}
