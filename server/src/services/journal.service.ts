import { prisma } from '../lib/prisma.js';
import { AppError } from '../middlewares/error.js';


type EntryInput = {
  date?: string;
  humeur: number;
  energie: number;
  sommeil: number;
  anxiete: number;
  evenements?: string;
  gratitude?: string;
  activityIds?: number[];
};

function toDateOnly(d: Date | string): Date {
  const date = typeof d === 'string' ? new Date(d) : d;
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
}

function entryWhere(userId: number, date: Date) {
  return { userId_date: { userId, date } };
}

export async function listEntries(userId: number, page: number, limit: number) {
  const [items, total] = await Promise.all([
    prisma.journalEntry.findMany({
      where: { userId },
      orderBy: { date: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
      include: { activities: { include: { activity: true } } },
    }),
    prisma.journalEntry.count({ where: { userId } }),
  ]);
  return { items, total, page, limit, totalPages: Math.ceil(total / limit) };
}

export async function createEntry(userId: number, input: EntryInput) {
  const date = toDateOnly(input.date ?? new Date());
  const existing = await prisma.journalEntry.findUnique({ where: entryWhere(userId, date) });
  if (existing) {
    throw new AppError(409, 'ENTRY_ALREADY_EXISTS', 'Une entrée existe déjà pour cette date.');
  }


  return prisma.journalEntry.create({
    data: {
      userId,
      date,
      humeur: input.humeur,
      energie: input.energie,
      sommeil: input.sommeil,
      anxiete: input.anxiete,
      evenements: input.evenements,
      gratitude: input.gratitude,
      activities: input.activityIds?.length
        ? { create: input.activityIds.map((activityId) => ({ activityId })) }
        : undefined,
    },
    include: { activities: { include: { activity: true } } },
  });

}

export async function getEntryByDate(requesterId: number, ownerId: number, dateStr: string) {
  if (requesterId !== ownerId) {
    throw new AppError(403, 'FORBIDDEN', "Vous n'avez pas accès à cette entrée de journal.");
  }

  const entry = await prisma.journalEntry.findUnique({
    where: entryWhere(ownerId, toDateOnly(dateStr)),
    include: { activities: { include: { activity: true } } },
  });
  if (!entry) throw new AppError(404, 'NOT_FOUND', 'Entrée introuvable pour cette date.');
  return entry;
}

export async function updateEntryByDate(userId: number, dateStr: string, input: Partial<EntryInput>) {
  const date = toDateOnly(dateStr);

  const existing = await prisma.journalEntry.findUnique({ where: entryWhere(userId, date) });
  if (!existing) throw new AppError(404, 'NOT_FOUND', 'Entrée introuvable pour cette date.');

  const today = toDateOnly(new Date());
  if (date.getTime() !== today.getTime()) {
    throw new AppError(403, 'EDIT_WINDOW_CLOSED', 'Cette entrée ne peut plus être modifiée.');
  }

  return prisma.journalEntry.update({
    where: entryWhere(userId, date),
    data: {
      humeur: input.humeur,
      energie: input.energie,
      sommeil: input.sommeil,
      anxiete: input.anxiete,
      evenements: input.evenements,
      gratitude: input.gratitude,
    },
  });
}

export async function getStats(userId: number, rangeDays: number) {
  const since = new Date();
  since.setDate(since.getDate() - rangeDays);
  const where = { userId, date: { gte: since } };


  const [entries, agg] = await Promise.all([
    prisma.journalEntry.findMany({
      where,
      orderBy: { date: 'asc' },
      select: { date: true, humeur: true, energie: true, sommeil: true, anxiete: true },
    }),
    prisma.journalEntry.aggregate({
      where,
      _avg: { humeur: true, energie: true, sommeil: true, anxiete: true },
      _count: true,
    }),
  ]);

  return {
    range: `${rangeDays}d`,
    entryCount: agg._count,
    averages: agg._avg,
    series: entries,
  };
}

export async function getInsights(userId: number) {
  const since = new Date();
  since.setDate(since.getDate() - 30);

  const entries = await prisma.journalEntry.findMany({
    where: { userId, date: { gte: since } },
    orderBy: { date: 'asc' },
    select: { humeur: true, energie: true, anxiete: true, sommeil: true },
  });

  if (entries.length < 2) {
    return {
      observation: 'Pas encore assez de données pour une observation fiable. Continuez à remplir votre journal ',
      entryCount: entries.length,
    };
  }

  const mid = Math.floor(entries.length / 2);
  const first = entries.slice(0, mid);
  const second = entries.slice(mid);

  function avg(arr: typeof entries, key: 'humeur' | 'energie' | 'anxiete' | 'sommeil'): number {
    let sum = 0;
    for (const e of arr) sum += e[key];
    return sum / arr.length;
  }

  const humeurDelta = avg(second, 'humeur') - avg(first, 'humeur');
  const anxieteDelta = avg(second, 'anxiete') - avg(first, 'anxiete');
  const sommeilAvg = avg(entries, 'sommeil');

  let observation: string;
  if (humeurDelta > 0.5) {
    observation = 'Votre humeur montre une tendance à la hausse.';
  } else if (humeurDelta < -0.5) {
    observation = 'Votre humeur montre une tendance à la baisse .';
  } else if (anxieteDelta > 0.5) {
    observation = "Votre niveau d'anxiété a tendance à augmenter récemment.";
  } else if (sommeilAvg < 6) {
    observation = 'Votre sommeil moyen est en dessous de 6h sur la période ,cela peut affecter votre bien-être.';
  } else {
    observation = 'Vos indicateurs sont restés relativement stables sur la période.';
  }

  return { observation, entryCount: entries.length };
}