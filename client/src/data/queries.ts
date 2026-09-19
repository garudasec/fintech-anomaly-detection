/**
 * TanStack Query hooks. Components consume these; they never import mock data
 * or the repository directly, so swapping the repository for REST calls is
 * invisible to the UI.
 */
import { queryOptions, useQuery } from "@tanstack/react-query";

import * as repo from "./repository";
import type { TimeRange, Transaction, TransactionQuery } from "./types";

export const transactionsQuery = (q: TransactionQuery) =>
  queryOptions({ queryKey: ["transactions", q], queryFn: () => repo.getTransactions(q) });

export const transactionQuery = (id: string | null) =>
  queryOptions({
    queryKey: ["transaction", id],
    queryFn: () => repo.getTransaction(id!),
    enabled: !!id,
  });

export const relatedTransactionsQuery = (tx: Transaction | null | undefined) =>
  queryOptions({
    queryKey: ["related", tx?.transactionId],
    queryFn: () => repo.getRelatedTransactions(tx!),
    enabled: !!tx,
  });

export const userProfileQuery = (userId: string | null | undefined) =>
  queryOptions({
    queryKey: ["user", userId],
    queryFn: () => repo.getUserProfile(userId!),
    enabled: !!userId,
  });

export const anomaliesQuery = (q: repo.AnomalyQuery) =>
  queryOptions({ queryKey: ["anomalies", q], queryFn: () => repo.getAnomalies(q) });

export const anomalyForTransactionQuery = (id: string | null | undefined) =>
  queryOptions({
    queryKey: ["anomaly-for", id],
    queryFn: () => repo.getAnomalyForTransaction(id!),
    enabled: !!id,
  });

export const recentAnomaliesQuery = queryOptions({
  queryKey: ["anomalies", "recent"],
  queryFn: () => repo.getRecentAnomalies(6),
});

export const overviewMetricsQuery = queryOptions({
  queryKey: ["overview", "metrics"],
  queryFn: repo.getOverviewMetrics,
});

export const activityQuery = (range: TimeRange) =>
  queryOptions({ queryKey: ["activity", range], queryFn: () => repo.getActivitySeries(range) });

export const riskDistributionQuery = queryOptions({
  queryKey: ["risk-distribution"],
  queryFn: repo.getRiskDistribution,
});

export const analyticsQuery = queryOptions({ queryKey: ["analytics"], queryFn: repo.getAnalytics });

export const logsQuery = (q: repo.LogQuery) =>
  queryOptions({ queryKey: ["logs", q], queryFn: () => repo.getLogs(q) });

export { useQuery };
