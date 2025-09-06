# Backend Development Todo List

This document tracks progress and plans for the NestJS backend located in `backend/`.

## Context
- Project: Athy Sonic
- Repo: https://github.com/TadashiJei/Athy-Sonic
- Backend: `backend/`
- API Spec: `docs/openapi.yaml`
- Postman: `docs/athy.postman_collection.json`, `docs/athy.postman_environment.json`

## Progress Summary
- [x] Scaffold NestJS app (`backend/`) in strict mode
- [x] Start dev server locally on port 3000
- [x] OpenAPI spec expanded (SigV4, standardized errors, multipart, presign)
- [x] Postman collection and environment created
- [ ] Initial configuration management (dotenv, config module)
- [ ] Core S3 endpoints (Objects + Buckets)

In progress: CFG-001, API-001, API-002

## Milestones
- [x] M0 — Baseline setup: NestJS scaffold + dev server running
- [ ] M1 — Core S3 API: Objects (Put/Get/Head/Delete) and Buckets (ListObjectsV2)
- [ ] M2 — Auth & Security: JWT guard, RBAC hooks, SigV4 header validation proxy
- [ ] M3 — Multipart Uploads: initiate, upload part, complete, abort
- [ ] M4 — Metadata & Blockchain: Hardhat contract integration
- [ ] M5 — Storage Pipeline: fragmentation, AES-256 encryption, distribution, integrity
- [ ] M6 — Observability & Ops: logging, metrics, health checks, rate limiting
- [ ] M7 — Testing & CI: unit, integration, E2E, contract tests (≥80% coverage)
- [ ] M8 — Packaging & Deployment: Docker images, compose, env configs

## Backlog (Prioritized)
- [ ] CFG-001 — Add configuration management (dotenv, Nest config module) — High — Est: 2h
- [ ] API-001 — Implement `ObjectsController` (Put/Get/Head/Delete) — High — Est: 1d
- [ ] API-002 — Implement `BucketsController` (ListObjectsV2) — High — Est: 0.5d
- [ ] SEC-001 — JWT auth guard & roles scaffolding (RBAC) — High — Est: 1d
- [ ] SEC-002 — SigV4 header validation middleware (pass-through) — Medium — Est: 0.5d
- [ ] MPU-001 — Multipart operations (initiate, upload part, complete, abort) — High — Est: 1.5d
- [ ] BC-001 — Contract client service (FileRegistry, AccessControl) — Medium — Est: 1d
- [ ] STO-001 — Fragmentation (Reed-Solomon) & AES-256 encryption service — High — Est: 2d
- [ ] OBS-001 — Logging (winston/pino) & `/health` — Medium — Est: 0.5d
- [ ] TST-001 — Unit & integration tests for controllers/services — High — Est: 1d
- [ ] DOC-001 — Keep Postman collection in sync; add examples — Low — Est: 0.5d
- [ ] PKG-001 — Dockerfile + docker-compose (gateway, db) — Medium — Est: 1d

## Next Up (Suggested)
1. CFG-001 — Add configuration management (dotenv + `@nestjs/config`).
2. API-001 — Scaffold `ObjectsModule` with controller/service and wire minimal handlers aligned with `docs/openapi.yaml`.

## References
- `backend/src/` — NestJS source code
- `docs/openapi.yaml` — API contract
- `docs/athy.postman_collection.json` — Postman collection

---
Keep this document updated alongside `todolist.json` to reflect actual progress and plans.
