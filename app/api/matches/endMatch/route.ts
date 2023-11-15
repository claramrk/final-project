import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { putEndMatch } from '../../../../database/matches';
import { Match } from '../../../../migrations/00015-createTableMatches';

export type MatchEndBodyPut =
  | {
      matchEnd: Match;
    }
  | {
      errors: { message: string | number }[];
    };

const matchEndSchema = z.object({
  id: z.number(),
  terminationResponse: z.string(),
  statusInternal: z.string(),
});

export async function PUT(
  request: NextRequest,
): Promise<NextResponse<MatchEndBodyPut>> {
  //  Get the user data from the request
  const body = await request.json();

  // Validate the user data
  const result = matchEndSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      { errors: [{ message: 'error ending match' }] },
      { status: 403 },
    );
  }

  const updatedMatchEnd = await putEndMatch(
    result.data.id,
    result.data.terminationResponse,
    result.data.statusInternal,
  );

  if (!updatedMatchEnd) {
    return NextResponse.json(
      { errors: [{ message: 'error ending match' }] },
      { status: 403 },
    );
  }

  return NextResponse.json({
    matchEnd: updatedMatchEnd,
  });
}
