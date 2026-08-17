import type { RequestHandler } from 'express';
import * as journalService from '../services/journal.service.js';
import {
  createJournalEntrySchema,
  journalDateParamSchema,
  journalListQuerySchema,
  journalStatsQuerySchema,
} from '../schemas/journal.schema.js';
import { AppError } from '../middlewares/error.js';

export const listHandler: RequestHandler = async (req, res, next) => {
  try {
    const query = journalListQuerySchema.parse(req.query);
    const result = await journalService.listEntries(req.user!.id, query.page, query.limit);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

export const createHandler: RequestHandler = async (req, res, next) => {
  try {
    const parsed = createJournalEntrySchema.safeParse(req.body);
    if (!parsed.success) {
      const details = parsed.error.issues.map((i) => ({ field: i.path.join('.'), message: i.message }));
      throw new AppError(422, 'VALIDATION_ERROR', 'Données invalides.', details);
    }
    const entry = await journalService.createEntry(req.user!.id, parsed.data);
    res.status(201).json(entry);
  } catch (err) {
    next(err);
  }
};

export const getByDateHandler: RequestHandler = async (req, res, next) => {
  try {
    const { date } = journalDateParamSchema.parse(req.params);
    const entry = await journalService.getEntryByDate(req.user!.id, req.user!.id, date);
    res.status(200).json(entry);
  } catch (err) {
    next(err);
  }
};

export const updateByDateHandler: RequestHandler = async (req, res, next) => {
  try {
    const { date } = journalDateParamSchema.parse(req.params);
    const entry = await journalService.updateEntryByDate(req.user!.id, date, req.body);
    res.status(200).json(entry);
  } catch (err) {
    next(err);
  }
};

export const statsHandler: RequestHandler = async (req, res, next) => {
  try {
    const { range } = journalStatsQuerySchema.parse(req.query);
    const days = parseInt(range, 10);
    const stats = await journalService.getStats(req.user!.id, days);
    res.status(200).json(stats);
  } catch (err) {
    next(err);
  }
};

export const insightsHandler: RequestHandler = async (req, res, next) => {
  try {
    const insights = await journalService.getInsights(req.user!.id);
    res.status(200).json(insights);
  } catch (err) {
    next(err);
  }
};