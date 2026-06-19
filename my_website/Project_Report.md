# GoPro Combined Approach — Project Report

**Repository:** `gopro-combined-approach`  
**Purpose:** Unified natural-language video search and montage platform for GoPro user media libraries  
**Last updated:** June 2026  

---

## Table of contents

1. [Executive summary](#1-executive-summary)
2. [Vision and goals](#2-vision-and-goals)
3. [What we set out to build](#3-what-we-set-out-to-build)
4. [What we achieved](#4-what-we-achieved)
5. [High-level architecture](#5-high-level-architecture)
6. [Repository layout](#6-repository-layout)
7. [The two search pipelines](#7-the-two-search-pipelines)
8. [Orchestrator and routing](#8-orchestrator-and-routing)
9. [Text-profile pipeline (deep dive)](#9-text-profile-pipeline-deep-dive)
10. [Embedding storyboard pipeline (deep dive)](#10-embedding-storyboard-pipeline-deep-dive)
11. [Catalog and user scoping](#11-catalog-and-user-scoping)
12. [VVS vector search and indexes](#12-vvs-vector-search-and-indexes)
13. [Metadata grounding and location softening](#13-metadata-grounding-and-location-softening)
14. [Stitch, trim, and Lyria music](#14-stitch-trim-and-lyria-music)
15. [FastAPI backend](#15-fastapi-backend)
16. [React web UI](#16-react-web-ui)
17. [Authentication and access control](#17-authentication-and-access-control)
18. [GCS, clip playback, and signed URLs](#18-gcs-clip-playback-and-signed-urls)
19. [Audit logging](#19-audit-logging)
20. [Offline data pipelines](#20-offline-data-pipelines)
21. [Video compression](#21-video-compression)
22. [Evaluation and batch testing](#22-evaluation-and-batch-testing)
23. [Deployment (local, staging, production)](#23-deployment-local-staging-production)
24. [Configuration and environment variables](#24-configuration-and-environment-variables)
25. [Models reference](#25-models-reference)
26. [Known issues and limitations](#26-known-issues-and-limitations)
27. [Development history (recent commits)](#27-development-history-recent-commits)
28. [Open items and future work](#28-open-items-and-future-work)
29. [How to run locally](#29-how-to-run-locally)
30. [Glossary](#30-glossary)

---

## 1. Executive summary

**GoPro Combined Approach** is a self-contained monorepo that unifies two previously separate GoPro video-AI systems into one product:

| Upstream project | Role in combined app |
|------------------|----------------------|
| **gopro-text-embedding-approach** | **Text-profile montage** — broad compilations, thematic reels, multi-sub-query search + stitch |
| **gopro-embedding** | **Embedding storyboard** — specific events, trips, sessions via multi-round VVS moment search + narrative story |

A **Gemini-powered router** decides which pipeline to use for each user query. A **React UI** and **FastAPI API** expose both paths behind a single “GoPro combined search” experience. Eight pilot users’ media libraries are searchable, each scoped by catalog user ID.

The system runs locally for development, and on **Google Cloud Run** for staging and production, with clips stored in **GCS**, vector search via **Vertex AI Vector Search (VVS)**, and final videos optionally uploaded back to GCS with signed playback URLs.

---

## 2. Vision and goals

### Business problem

GoPro users capture thousands of short action clips. Finding and assembling meaningful “story” videos from that library using natural language (“Create a surf highlight reel”, “Show my trip to Portugal in 2023”) requires:

1. **Semantic search** over segmented video metadata and embeddings
2. **Intelligent routing** — some queries are broad montages; others are specific personal events
3. **Assembly** — ordering clips, trimming, stitching, optional background music
4. **Per-user isolation** — each pilot user’s catalog must not leak into another’s results
5. **A usable UI** — search, review clips, edit selection, confirm, download final MP4

### Technical goals

- **Self-contained repo** — no runtime dependency on sibling `gopro-embedding` or `gopro-text-embedding-approach` repos; vendored copies under `approaches/`
- **Committed demo data** — 8 users’ segment JSON, unified VVS manifest, video profiles checked into git
- **Unified orchestration** — one API, one UI, one router
- **Production-ready Cloud Run** — OAuth allowlist, GCS signing, audit logs, batch eval harness
- **Offline extensibility** — documented paths to ingest new users, compress video, rebuild VVS indexes

---

## 3. What we set out to build

### Phase 1 — Combine pipelines

- Vendor both approaches into `approaches/text_embedding/` and `approaches/embedding/`
- Build `orchestrator/` with Gemini router and thin adapters
- Expose `POST /api/query` that routes and runs search
- Basic React UI to submit queries and show results

### Phase 2 — Full video output

- Text path: search → Gemini clip sequencing → ffmpeg stitch → optional Lyria music
- Embedding path: multi-round tool loop → story text → compile MP4 → trim → Lyria
- SSE streaming for long-running stitch/storyboard jobs
- GCS upload of final outputs with signed URLs

### Phase 3 — Production hardening

- Google OAuth + email allowlist on `/api/*`
- Catalog user scoping end-to-end (search, API response, clip URLs)
- Clip selection / deselection UI for both pipelines
- Background auto-preview stitch while user edits selection
- Audit logging (`RUN_AUDIT`) to Cloud Logging
- Cloud Run staging + production deploy scripts
- Eval baseline: 8 users × 10 story-idea queries against Cloud Run

### Phase 4 — Search quality improvements

- Text-profile v3 with tag-based video-profile global context
- Metadata grounding (location, time-of-day, year) from Gemini-extracted filters
- **Location filter softening** — fallback when strict VVS location filters return 0 hits (Audrey Paris night case)
- **Temporal softening** — do not hard-fail segments missing `hour` when `time_of_day` is inferred
- Similarity displayed as **percentage** in UI for both pipelines

---

## 4. What we achieved

### Working product

| Capability | Status |
|------------|--------|
| Combined search UI (local + Cloud Run) | ✅ |
| Auto Gemini routing (text vs embedding) | ✅ |
| Force pipeline override in UI | ✅ |
| 8 catalog users with strict scoping | ✅ |
| Text-profile v3 search + sub-queries | ✅ |
| Embedding storyboard with video valve | ✅ |
| Clip review, edit, reorder, deselect (both paths) | ✅ |
| ffmpeg stitch + Gemini post-stitch trim | ✅ |
| Lyria background music mux | ✅ |
| GCS signed clip URLs + proxy fallback | ✅ |
| Google OAuth on staging/prod | ✅ |
| RUN_AUDIT structured logging | ✅ |
| Cloud Run batch eval harness | ✅ |
| Offline ingestion + compression tooling | ✅ |
| Location/temporal search softening | ✅ (recent) |

### Eval baseline (Cloud Run, 72/80 OK jobs)

From `eval/Analysis_cloudrun_story_ideas_baseline.md`:

- **75%** of auto-routed jobs → `text_profile`; **25%** → `embedding`
- Median final video: **36s** (text), **60s** (embedding)
- **33%** of OK outputs &lt;30s final duration (often post-stitch trim)
- **2** hard `no_clips` failures; **3** client timeouts mid-stitch

---

## 5. High-level architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                     React UI (web/)                              │
│  Catalog picker · Auto/force pipeline · Music toggle · Auth      │
└────────────────────────────┬────────────────────────────────────┘
                             │ HTTPS (Bearer ID token)
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                   FastAPI (api/app.py)                           │
│  /api/query · /api/stitch-video (SSE) · /api/embedding-storyboard│
│  /api/clip* · /api/catalog-users · auth middleware               │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                  Orchestrator (orchestrator/)                    │
│  router.py (Gemini) → runner.py → text_profile | embedding       │
└──────────────┬──────────────────────────────┬───────────────────┘
               │                              │
               ▼                              ▼
┌──────────────────────────┐    ┌──────────────────────────────────┐
│ approaches/text_embedding │    │ approaches/embedding              │
│ v3 search · sequencing    │    │ storyboard_loop · vvs_search      │
│ stitch · Lyria · trim     │    │ compile · trim · Lyria            │
└──────────────┬───────────┘    └──────────────┬───────────────────┘
               │                              │
               └──────────────┬───────────────┘
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  Vertex AI Vector Search (VVS)  ·  Gemini (LLM + embed)         │
│  GCS (pilot segments, outputs)  ·  ffmpeg  ·  Lyria             │
└─────────────────────────────────────────────────────────────────┘
```

### Request lifecycle (typical text-profile query)

1. User selects catalog (e.g. `audrey_houalla`) and enters query
2. UI calls `POST /api/route-preview` (optional) or goes straight to `POST /api/query`
3. Router returns `text_profile` with confidence
4. `run_profile_search` (v3) runs: extract filters → VP global context → plan sub-queries → VVS segment search per sub-query
5. UI shows hits grouped by sub-query; user enters **Edit** mode, adjusts selection
6. User confirms → `POST /api/stitch-video` (SSE)
7. Gemini sequences clips → ffmpeg concat → Gemini trim → Lyria music → GCS upload
8. UI plays final MP4 via `/api/output-video`

---

## 6. Repository layout

```
gopro-combined-approach/
├── approaches/                    # Vendored upstream pipelines
│   ├── text_embedding/            # Montage path (config, utils, data)
│   └── embedding/                 # Storyboard path (agents, scripts)
├── orchestrator/                  # Router, runners, batch, audit log
├── api/                           # FastAPI app + auth middleware
├── web/                           # React + Vite UI
├── config/                        # corpus_user_id_mapping.json
├── data/                          # Local batch outputs, eval artifacts
├── data_ingestion/                # Offline: metadata → splits → VVS index
├── video_compression/               # Offline: large MP4 → ≤1.5 GB chunks
├── eval/                          # Question sets + baseline analysis
├── deploy/                        # Cloud Run deploy helpers
├── scripts/                       # install_deps, eval, deploy, sync vendor
├── Dockerfile                     # Multi-stage: Node UI + Python runtime
├── pyproject.toml                 # Python package (orchestrator)
├── README.md
└── Project_Report.md              # This document
```

### Key committed data files

| Path | Purpose |
|------|---------|
| `config/corpus_user_id_mapping.json` | 8 users: `catalog_id`, `user_id` (UUID), `user_slug` |
| `approaches/text_embedding/data/corpus_users/*.json` | Per-user segment metadata (format3) |
| `approaches/text_embedding/data/video_profile_all_users_le15g.json` | Video-level profiles for v3 VP search |
| `approaches/embedding/data/cache/vvs_manifests/vvs_manifest_all_user_unified_full.json` | Unified segment manifest (~126k segments) |

---

## 7. The two search pipelines

### Text-profile (`text_profile`)

**Best for:** Broad compilations, cross-activity reels, thematic montages without pinning to one specific trip or date.

**Flow:**
1. Extract metadata filters from query (location, time, activity, etc.)
2. Build **global context** from video profiles (v3: tag-based VP VVS search)
3. Gemini plans **sub-queries** in narrative order
4. For each sub-query: VVS segment search with user_id restrict + optional grounding filters
5. Return grouped hits → UI → user edits → stitch

**Default method:** `v3` (`query_augmentation_search_v3.py`)

### Embedding storyboard (`embedding`)

**Best for:** Specific events, trips, sessions, “find my videos from X trip”, narrative arcs with a clear occasion.

**Flow:**
1. Gemini **tool loop** — repeatedly calls `search_moments` with refined queries
2. Each search hits unified text (or multimodal) VVS index with `user_id` filter
3. Gemini writes **story text** with footer `CLIP1…CLIPN` datapoint IDs
4. **Video valve** selects variable clip count (2–16) from story
5. Download pilot segments → ffmpeg compile → trim → Lyria

**Default backend:** `text` VVS (multimodal optional via UI toggle)

### Router tie-break

When ambiguous, router prompt says: **“When in doubt, prefer embedding.”** In practice, story-idea eval set skews **75% text_profile** because many prompts are montage-style.

---

## 8. Orchestrator and routing

### Files

| File | Role |
|------|------|
| `orchestrator/router.py` | Gemini JSON routing: `text_profile` \| `embedding` |
| `orchestrator/runner.py` | `run_orchestrated_query()` dispatches to pipeline adapters |
| `orchestrator/pipelines/text_profile.py` | Wraps v1/v2/v3 search |
| `orchestrator/pipelines/embedding_storyboard_full.py` | Full embedding path to MP4 |
| `orchestrator/bootstrap.py` | Sets `sys.path`, env defaults, repo roots |
| `orchestrator/catalog_map.py` | Catalog slug → VVS `user_id` |
| `orchestrator/vvs_deployments.py` | Resolves segment/VP deployment JSON paths |
| `orchestrator/batch_auto_videos.py` | Parallel batch runner (local in-process) |
| `orchestrator/run_audit_log.py` | Structured `RUN_AUDIT` JSON logging |

### Router behavior

- **Model:** `GOPRO_ROUTER_MODEL` (default `gemini-2.5-flash`)
- **Retries:** `GOPRO_ROUTER_RETRIES` (default 3)
- **Force override:** UI/API `force_pipeline=text_profile|embedding` skips Gemini
- **No heuristic fallback** — router failure raises `RouterError` (transient Gemini errors can block Auto mode)
- **Disable:** `GOPRO_ROUTER_DISABLE_GEMINI=1` forces error unless pipeline forced

### Routing prompt distinction (simplified)

| Signal | Typical route |
|--------|---------------|
| “My trip to Portugal 2023”, “senior night basketball” | embedding |
| “Surf highlight reel”, “winter sports reel mixing skiing and snowboarding” | text_profile |
| “Find those Niagara Falls videos” | embedding |
| “Paris night montage with fireworks” | text_profile (but may need soft location fallback) |

---

## 9. Text-profile pipeline (deep dive)

### Search versions

| Version | File | Global context strategy |
|---------|------|-------------------------|
| **v1** | `query_augmentation_search.py` | User profile JSON only |
| **v2** | `query_augmentation_search_v2.py` | Direct VP VVS search on raw query |
| **v3** | `query_augmentation_search_v3.py` | Gemini **tags** → parallel VP VVS queries per tag → merge |

**v3 is the production default** (`text_method: "v3"` in API).

### v3 pipeline steps (`run_profile_search`)

1. **`extract_filters(client, query)`** — Gemini structured output → `MetadataFilters` (city, country, year, month, day, season, time_of_day, setting_type, energy, emotion, etc.)
2. **`fetch_global_context_tags`** — VP VVS search with optional location restricts; tag parallel search; merge profiles
3. **`filter_profiles_by_relevance`** — Gemini relevance gate on VP matches
4. **`local_profiles_matching_location_soft`** — text-based location rescue (Paris in one-liner when `city` null)
5. **`plan_sub_queries`** — Gemini plans 1–8 sub-queries using user profile + global context
6. **`resolve_segment_object_id_allowlist`** — optional cap to VP object IDs when grounding active
7. **`run_one_subquery`** (parallel) — per sub-query:
   - Merge temporal filters from main query + sub-query
   - Build VVS token/numeric filters (`user_id`, `country`, `city`, `capture_ts`)
   - Embed enriched query text → `find_neighbors` on unified segment index
   - **Location fallback:** if &lt; N hits, re-query user-scoped only + soft location ranking
   - Post-filter: confidence threshold, temporal strict, catalog object_id allowlist
8. Return `{ sections, sub_queries, timings, search_filters, global_context_profiles }`

### Confidence threshold

Cosine distance cutoff **`0.48`** — neighbors with distance &gt; 0.48 are discarded. Similarity shown in UI as `(1 - distance) × 100%`.

### Clip sequencing (`utils/clip_sequencing.py`)

After search, **Gemini** orders selected clip IDs into a narrative sequence with:
- Per-clip trim suggestions (`start_time`, `end_time`)
- Captions for montage review UI

User can **Edit** order/selection before **Confirm & stitch**.

### User profile

Per-catalog `user_profile_metadata.json` under `approaches/text_embedding/data/{catalog}/` — describes the user’s typical activities, locations, style. Used in sub-query planning.

---

## 10. Embedding storyboard pipeline (deep dive)

### Core module

`approaches/embedding/agents/gopro_url_agent/storyboard_loop.py`

### Stages (SSE events)

| Stage | Description |
|-------|-------------|
| `search` | Tool-loop round: Gemini emits `search_moments` call |
| `story` | Final narrative + footer clip IDs |
| `download` | Fetch pilot MP4s from GCS |
| `stitch` / `compile` | ffmpeg filter-concat |
| `post_stitch_trim` | Gemini watches stitched video, trims |
| `lyria` | Background music generation + mux |
| `done` | Final paths, signed URLs, timings |
| `error` | Failure message |

### Tool loop

- Gemini receives user query + catalog context
- Calls **`search_moments`** with natural-language search strings
- `vvs_search.py` executes against text or multimodal VVS index
- **`video_valve=true`** (default): variable clip count, soft 2–4 minute target
- **`embedding_max_results`** caps hits per search (default 15 in UI)

### Regenerate

`POST /api/embedding-regenerate` — user edits selected clips in UI → re-run story + compile without re-searching.

### Temporal coherence warning

If selected clips span multiple recording days for an “event” story, `_temporal_coherence_warning()` flags it in logs/UI context.

---

## 11. Catalog and user scoping

### Eight pilot users

From `config/corpus_user_id_mapping.json`:

| Display name | catalog_id | user_id (UUID prefix) |
|--------------|------------|------------------------|
| Abraham Kislevitz | `abraham_kislevitz` | `eef1dc3e-…` |
| Audrey Houalla | `audrey_houalla` | `712ec8dc-…` |
| Cedric Fernandes | `cedric_fernandes` | `990a2738-…` |
| Dan Larsen | `dan_larsen` | `5de69416-…` |
| Guillaume Oules | `guillaume` | `5b1b9bbf-…` |
| Juan Manuel Vieira Posada | `juan_vieira_posada` | `eda9bdd7-…` |
| Pablo Lema | `pablo_lema` | `da1785d7-…` |
| Ralph McEntagart | `ralph_mcentagart` | `61c3b82c-…` |

### Scoping layers

1. **API validation** — `require_catalog_user()` returns 400 on unknown catalog (no silent default)
2. **VVS restricts** — `user_id` namespace token on every segment/VP query
3. **Datapoint ID prefix** — unified index IDs formatted as `{user_id}_{object_id}_{segment_id}`
4. **Post-filter** — `filter_hits_to_user()`, `_scope_text_result_to_catalog()` in API
5. **Clip URLs** — `_lookup_segment_meta(catalog_slug, clip_id)` resolves metadata per catalog

### Aliases

Legacy aliases: `user1` → `guillaume`, `user2` → `dan_larsen` (avoid in new code; use catalog_id).

---

## 12. VVS vector search and indexes

### Unified text segment index (primary)

| Property | Value |
|----------|-------|
| Deployment JSON | `approaches/embedding/scripts/text/deployments/vvs_deployment_text_all_user_unified.json` |
| Also referenced | `approaches/text_embedding/config/vvs_deployment.json` |
| Deployed index ID | `all_user_text_unified` |
| Embedding model | `gemini-embedding-001` (768 dimensions) |
| Corpus scale | ~**126,885** segments, ~**31,791** videos |
| Manifest | `approaches/embedding/data/cache/vvs_manifests/vvs_manifest_all_user_unified_full.json` |
| Materialize bucket | `gopro-sample-media-staging-splits` |

**Segment clip path pattern:**
```
gs://gopro-sample-media-staging-splits/{user_uuid}/{object_id}/pilot_segments/seg_{N}.mp4
```

### Video profile index (v3 global context)

| Property | Value |
|----------|-------|
| Deployment JSON | `approaches/text_embedding/config/vvs_video_profile_deployment.json` |
| Deployed index ID | `gopro_video_profiles_all_users` |
| Metadata JSON | `approaches/text_embedding/data/video_profile_all_users_le15g.json` |

VP index includes `city`, `country`, `user_id` restriction namespaces (segment index does **not** index city/country on all datapoints — motivator for location softening).

### Multimodal index (optional)

| Property | Value |
|----------|-------|
| Deployment | `vvs_deployment_multimodal_smoke1000.json` (smoke scale, not full corpus) |
| Model | `gemini-embedding-2-preview` (3072-d) |
| Env override | `VVS_MULTIMODAL_DEPLOYMENT_FILE` |

### Manifest bootstrap

- Committed in repo for demo
- `./scripts/ensure_vvs_manifest.sh` if missing
- Cloud Run: `scripts/cloudrun_entrypoint.sh` downloads from `VVS_MANIFEST_GCS_URI` at startup

---

## 13. Metadata grounding and location softening

### What grounding means

When Gemini extracts **location** (`city`, `country`) or **time** (`year`, `time_of_day`, etc.) from a query, v3 applies **strict filters**:

1. **VVS index restricts** at query time (token filters for country/city; numeric for capture timestamp)
2. **Post-search strict gates** on manifest rows (`segment_matches_temporal_strict`, location strict)

### The Audrey Paris problem (why softening was needed)

Query: *“Create a beautiful Paris night montage with fireworks and Eiffel Tower lights.”*

- Filters extracted: `night · Paris, France`
- Audrey’s fireworks/Eiffel content exists in **descriptions** but many segments have **`city=null`, `hour=null`**
- Strict VVS `city=Paris` + `country=France` → **0 neighbors** (segment index lacks those tokens)
- Strict `time_of_day=night` with `hour=null` → **all segments fail** post-filter

### Location softening (commit `c1792a8`)

Implemented in:
- `approaches/text_embedding/utils/search/metadata_filtered_search.py`
- `approaches/text_embedding/utils/search/query_augmentation_search_v3.py`

| Mechanism | Behavior |
|-----------|----------|
| `profile_matches_location_soft` / `segment_matches_location_soft` | Match structured fields OR place names in one-liner/description/tags (“Parisian” → Paris) |
| `local_profiles_matching_location_soft` | Scan local VP JSON for soft matches → merge into allowlist |
| VP search fallback | If strict location VVS returns nothing → retry user-scoped VP search without location restrict |
| Segment search fallback | If location VVS under-fills → re-query user-scoped + rank soft location matches higher (−0.04 effective distance) |
| `include_location=False` on `build_*_vvs_filters` | User-only token restricts for fallback pass |

### Temporal softening

- `time_of_day` strict check **only enforced when `hour` is present** on segment/profile
- Missing `hour` no longer hard-fails (semantic “night” in description can still match via embedding similarity)
- Text hints (“fireworks”, “illuminated”, “night”) get small ranking bonus when hour missing

---

## 14. Stitch, trim, and Lyria music

### Pipeline order (both approaches)

```
ffmpeg stitch/compile  →  Gemini post-stitch trim  →  Lyria music mux
```

Lyria target duration is derived from **post-trim** video length.

### ffmpeg stitch (text path)

- Normalize each clip to 1920×1080 @ 30fps
- Concat with `ffmpeg`
- **180s runtime cap** on ordered clips before trim
- Downloads from GCS materialize bucket

### Gemini post-stitch trim

**File:** `utils/postprocessing/post_stitch_gemini_trim.py`

| Env var | Default | Role |
|---------|---------|------|
| `POST_STITCH_GEMINI_TRIM` | `1` (on) | Enable/disable |
| `POST_STITCH_MAX_KEEP_S` | 120 | Max seconds to keep |
| `POST_STITCH_MIN_KEEP_S` | 50 | Soft minimum target |
| `GEMINI_POST_STITCH_MODEL` | falls back to `GEMINI_TEXT_MODEL` | Model |
| `POST_STITCH_INLINE_VIDEO_MAX_BYTES` | 12 MB | Inline video to Gemini vs GCS URI |

**Known issue:** Default trim is aggressive — baseline shows **30/72** OK jobs lost &gt;50% stitched duration; extreme case 101s → 1.1s.

### Lyria background music

**File:** `utils/postprocessing/lyria_final_music.py`

| Property | Value |
|----------|-------|
| Model selection | ≤30s → `lyria-3-clip-preview`; &gt;30s → `lyria-3-pro-preview` |
| Pro max duration | `_LYRIA_PRO_MAX_S = 184.0` (~3 min cap) |
| Clip max | `_LYRIA_CLIP_MAX_S = 30.0` |
| Prompt model | `LYRIA_GEMINI_PROMPT_MODEL` or `GEMINI_TEXT_MODEL` |

**Known issue:** Lyria often returns audio **1–8s shorter** than requested → ffmpeg loop pad → audible seam/cutoff (~52% of analyzed jobs in diagnosis batch).

---

## 15. FastAPI backend

**File:** `api/app.py` (~2700 lines)

### Endpoints

| Method | Route | Purpose |
|--------|-------|---------|
| GET | `/api/auth/config` | Public OAuth client ID |
| GET | `/api/health` | Manifest, GCS signing, auth summary, catalogs |
| POST | `/api/route-preview` | Router only |
| POST | `/api/query` | Route + execute search |
| GET | `/api/catalog-users` | List catalogs |
| GET | `/api/clip-url` | Signed or proxy URL for one clip |
| POST | `/api/clip-urls` | Batch clip URLs (max 200) |
| GET | `/api/segment-clip-url` | Pilot signed URL or trim fallback |
| GET | `/api/segment-clip` | Redirect/stream segment clip |
| HEAD/GET | `/api/clip` | GCS proxy with Range 206 support |
| POST | `/api/stitch-video` | SSE text-profile stitch pipeline |
| POST | `/api/embedding-storyboard` | SSE embedding full pipeline |
| POST | `/api/embedding-regenerate` | SSE re-story from edited clips |
| HEAD/GET | `/api/output-video` | Final MP4 (local or GCS redirect) |
| * | `/` | Static React `web/dist` |

### Key request fields (`QueryRequest`)

- `query`, `catalog_user`, `force_pipeline`, `text_method` (v1/v2/v3)
- `num_neighbors`, `embedding_max_results`, `embedding_backend` (text/multimodal)
- `capture_ts_gte`, `capture_ts_lte` (optional VVS time window)

---

## 16. React web UI

**Stack:** React 18 + Vite + TypeScript  
**Main file:** `web/src/App.tsx` (~2500 lines)  
**Auth:** `web/src/AuthGate.tsx`, `web/src/auth.ts`

### Features

| Feature | Description |
|---------|-------------|
| Catalog picker | Loads from `/api/catalog-users` |
| Pipeline mode | Auto (route-preview) / force text / force embedding |
| Embedding backend | Text vs multimodal toggle |
| Background music | Checkbox → `include_background_music` |
| Health banner | API, manifest, GCS playback mode |
| Routing display | Shows Gemini decision + confidence before search |
| Text profile results | Sub-query sections, similarity %, timestamps, location |
| Search filter banner | Extracted temporal/location filters (v3) |
| Edit mode | Reorder, deselect, add clips from search hits (text path) |
| Montage review | Gemini sequencing → confirm stitch |
| Background auto-stitch | Preview video while user edits (`output_suffix: '_auto'`) |
| Embedding stepper | Search → Story → Compile → Post-process |
| Embedding edit | Reorder/deselect → Generate new video |
| Video playback | `id_token` query param for `<video src>`; silent token refresh |

### Dev proxy

Vite dev server (5174) proxies `/api` → `localhost:8010`.

---

## 17. Authentication and access control

**File:** `api/auth.py`

### Design

- Cloud Run deployed **`--allow-unauthenticated`** so static UI loads
- **`/api/*`** gated except `/api/health` and `/api/auth/config`
- Validates Google **ID token** (JWT): signature, audience, expiry, `email_verified`
- Email must be on **allowlist** or match **`AUTH_ALLOWED_HD`** hosted domain

### Allowlist sources

- `AUTH_ALLOWLIST_EMAILS` (comma-separated)
- `AUTH_ALLOWLIST_JSON` / `AUTH_ALLOWLIST_FILE`
- Example: `approaches/text_embedding/config/auth_allowlist.json`

### Staging allowlist includes

Searce team emails, pilot GoPro user emails (`goules@gopro.com`, `dlarsen@gopro.com`, etc.), compute SA for batch jobs.

### Browser video endpoints

`/api/output-video`, `/api/clip`, `/api/segment-clip` accept `?id_token=` for `<video>` elements that cannot send `Authorization` header.

### Batch automation auth

`scripts/eval/cloudrun_auth.py`:
1. `X-GoPro-Batch-Key` file (if `GOPRO_BATCH_API_KEY` deployed)
2. gcloud ADC (workbench VM service account)
3. Browser ID token file / `GOPRO_ID_TOKEN` env

### Local dev

If `OAUTH_CLIENT_ID` unset → auth middleware is **no-op** (open API).

---

## 18. GCS, clip playback, and signed URLs

### Buckets

| Bucket | Role |
|--------|------|
| `gopro-sample-media-staging-splits` | Pilot segment MP4s (materialized) |
| `gopro-combined-ui-outputs` | Final stitched outputs (prod) |
| `gopro-combined-ui-outputs` + prefix `outputs-staging` | Staging finals |

### Signing

**File:** `approaches/text_embedding/config/gcs_signing.py`

Resolution order:
1. `GCS_SIGNING_CREDENTIALS_JSON` (inline)
2. `GCS_SIGNING_KEY_B64` (Cloud Run env at deploy)
3. Local file `streamlit-gcs-signing.json` (gitignored)

Cloud Run embeds signing key at deploy to avoid **32 MiB proxy response cap** on large clips.

### Playback modes

- **`signed_url`** — direct GCS HTTPS (preferred)
- **`proxy`** — stream via `/api/clip` when signing unavailable

---

## 19. Audit logging

**File:** `orchestrator/run_audit_log.py`

Structured JSON emitted to stderr with prefix **`RUN_AUDIT`** → Cloud Logging.

### Event types

| Event | When |
|-------|------|
| `user_query` | `/api/query` received |
| `text_profile_search` | Text search completed (sub-queries, hits, filters) |
| `vvs_search` | Embedding tool-loop search round |
| `storyboard_final` | Story text + footer clip IDs |
| `compiled_clips` | Final clip list for stitch |
| `text_stitch_sequence` | Gemini sequencing output |
| `run_summary` | End-of-run consolidated record |

### Query user errors

`scripts/eval/query_user_audit_errors.py` — filter Cloud Logging by `user_email`.

---

## 20. Offline data pipelines

**Folder:** `data_ingestion/`  
**KT doc:** `data_ingestion/KT.md`

### Three-stage pipeline

```
Raw MP4 (GCS)
  → ingest/metadata/segment_videos.py     (Gemini semantic segmentation)
  → ingest/video_splits/pilot_split_upload_gcs.py  (ffmpeg → pilot segments)
  → text/vvs_index_corpus.py              (embed + upsert VVS)
  → Combined app search
```

### Prerequisites

- Sources &gt;1.5 GB must pass through **`video_compression/`** first
- GPMF metadata for capture timestamps: `shared/gopro_metadata_csv.py`

### Multimodal index

`data_ingestion/multimodal/vvs_index_corpus_multimodal.py` — separate embedding model/dimensions.

---

## 21. Video compression

**Folder:** `video_compression/`

Large GoPro source files must be ≤1.5 GB for Gemini inline processing.

| Subfolder | Purpose |
|-----------|---------|
| `workbench/` | Interactive compression scripts |
| `gce_batch/` | Fleet compression on GCE VMs |
| `chunked_video/` | Split → process → merge pipeline |

---

## 22. Evaluation and batch testing

### Question sets

| File | Description |
|------|-------------|
| `eval/questions/all_user_story_ideas_eval_queries.json` | 8 users × 10 queries |
| `eval/questions/all_user_eval_queries_v2.json` | 8 users × 12 queries |
| `All User Queries - all_user_story_ideas_successful_queries.csv` | 78 successful story ideas with output paths |

### Batch scripts

| Script | Purpose |
|--------|---------|
| `scripts/eval/run_parallel_auto_batch.py` | Local parallel batch with auto router |
| `scripts/eval/run_cloudrun_batch.py` | HTTP batch against deployed Cloud Run |
| `scripts/eval/cloudrun_batch_client.py` | Query + SSE stitch/storyboard client |
| `scripts/eval/analyze_cloudrun_batch.py` | Aggregate `batch_summary.json` stats |
| `scripts/eval/launch_workbench_cloudrun_v2.sh` | Nohup launcher on workbench VM |
| `scripts/eval/launch_staging_all_user_csv_batch.sh` | All CSV queries against staging |

### Baseline metrics (reference)

See `eval/Analysis_cloudrun_story_ideas_baseline.md` — use for branch comparison when changing trim, search, or sequencing.

---

## 23. Deployment (local, staging, production)

### Local

```bash
./scripts/install_deps.sh
cp .env.example .env   # configure GCP
source .venv/bin/activate
uvicorn api.app:app --reload --port 8010
cd web && npm run dev   # :5174
```

### Staging

| Property | Value |
|----------|-------|
| Script | `scripts/deploy/cloud_run_staging.sh` |
| Service | `gopro-combined-approach-staging` |
| URL | https://gopro-combined-approach-staging-535746249078.us-central1.run.app/ |
| GCS prefix | `outputs-staging` |
| Allowlist | Searce + pilot GoPro emails |

### Production

| Property | Value |
|----------|-------|
| Script | `scripts/deploy/cloud_run_combined.sh` |
| Service | `gopro-combined-approach` |
| URL | https://gopro-combined-approach-535746249078.us-central1.run.app/ |

### Container spec

- **16 GiB RAM, 8 vCPU**, gen2, **concurrency=1**, timeout 3600s
- Multi-stage **Dockerfile**: Node builds UI → Python 3.12 + ffmpeg runtime
- Entrypoint: `scripts/cloudrun_entrypoint.sh`

---

## 24. Configuration and environment variables

See `.env.example` and `README.md` for full list. Critical groups:

### GCP

`GOOGLE_CLOUD_PROJECT`, `GOOGLE_CLOUD_LOCATION`, `GOOGLE_GENAI_USE_VERTEXAI`, `GOOGLE_APPLICATION_CREDENTIALS`

### Repo roots

`GOPRO_TEXT_EMBEDDING_ROOT`, `GOPRO_EMBEDDING_ROOT`, `GOPRO_COMBINED_ROOT`

### LLM (different vars per step!)

`GEMINI_TEXT_MODEL`, `GEMINI_MODEL`, `GOPRO_ROUTER_MODEL`, `GEMINI_POST_STITCH_MODEL`, `LYRIA_GEMINI_PROMPT_MODEL`

### VVS

`VVS_MANIFEST_LOCAL_PATH`, `VVS_DEPLOYMENT_FILE`, `VVS_MULTIMODAL_DEPLOYMENT_FILE`, `VVS_MANIFEST_GCS_URI`

### Output

`GCS_OUTPUT_BUCKET`, `GCS_OUTPUT_PREFIX`, `OUTPUT_VIDEOS_DIR`, `CLIP_CACHE_DIR`, `OUTPUT_DELETE_LOCAL_AFTER_UPLOAD`

### Auth

`OAUTH_CLIENT_ID`, `AUTH_ALLOWLIST_EMAILS`, `AUTH_ALLOWED_HD`, `GOPRO_BATCH_API_KEY` (optional batch automation)

---

## 25. Models reference

### Generation (Gemini LLM)

| Step | Env var | Default |
|------|---------|---------|
| Router | `GOPRO_ROUTER_MODEL` | gemini-2.5-flash |
| Text search/planning | `GEMINI_TEXT_MODEL` | gemini-2.5-flash |
| Embedding storyboard | `GEMINI_MODEL` | gemini-2.5-flash |
| Post-stitch trim | `GEMINI_POST_STITCH_MODEL` | gemini-2.5-flash |
| Lyria prompt | `LYRIA_GEMINI_PROMPT_MODEL` | gemini-2.5-flash |

### Embeddings (VVS — do not change without re-indexing)

| Index | Model | Dimensions |
|-------|-------|------------|
| Text segments | gemini-embedding-001 | 768 |
| Multimodal | gemini-embedding-2-preview | 3072 |

### Audio (Lyria)

| Duration | Model |
|----------|-------|
| ≤30s | lyria-3-clip-preview |
| &gt;30s | lyria-3-pro-preview (max ~184s) |

---

## 26. Known issues and limitations

### Search / retrieval

- **Strict grounding + sparse metadata** → 0 hits (mitigated by location/temporal softening, not fully solved)
- **Segment VVS lacks city/country on many datapoints** — location restrict at index level can return empty
- **`no_clips` failures** — e.g. Juan queries in baseline when filters too narrow
- **Low recall** — e.g. pablo_q05 with only 4 clips

### Post-stitch trim

- **Largest quality issue** in baseline — removes 50%+ duration on many jobs
- No hard minimum kept duration enforced
- Prompt biases toward short “highlight reel” feel

### Lyria music

- Often composes **shorter** than target → loop seam audible
- 184s Pro cap limits long montages

### Operational

- **Cloud Run concurrency=1** — one long job blocks instance
- **Router has no fallback** — Gemini outage = Auto mode fails
- **Client timeouts** on long stitches (audrey_q08, cedric_q07, guillaume_q05 in baseline)
- **Rate limits** on batch runs (429 / quota)
- **Multimodal index** smoke-scale only

### Auth

- Local batch against staging requires OAuth token or batch key + deploy
- Log viewer IAM needed for `RUN_AUDIT` analysis

---

## 27. Development history (recent commits)

| Commit | Summary |
|--------|---------|
| `d4b5e6e` | Pilot GoPro emails + Searce team on staging OAuth allowlist |
| `c1792a8` | Location filter softening (Audrey Paris 0-hit fix) |
| `de7059c` | Similarity % display for both pipelines |
| `f5e9884` | Text profile UI parity with embedding (edit mode, grid) |
| `83cba1b` | Strict catalog user_id scoping fix |
| `980970f` | Clip selection UI, timestamps, audit logging, GCS playback |
| `7563fe4` | Data ingestion pipeline, eval harness, docs |
| `5ec83ea` | Video compression logic |
| `7630a94` | GCS upload at stitch compile stage |
| `9f84755` | Gemini routing + show route decision in UI |
| `850d2e4` | Fix empty footer_ids crash in embedding story |

---

## 28. Open items and future work

| Item | Priority |
|------|----------|
| Tune or disable aggressive post-stitch trim | High |
| Lyria retry / crossfade loop on short audio | Medium |
| Backfill city/country/hour on segment metadata + re-index VVS | High |
| Batch key auth deploy for unattended staging eval | Medium |
| Router heuristic fallback on Gemini failure | Medium |
| Full multimodal index at corpus scale | Low |
| Complete staging all-user CSV batch run | In progress |
| KT documentation (Word → markdown; import had XML issues) | Ongoing |

---

## 29. How to run locally

```bash
cd gopro-combined-approach
./scripts/install_deps.sh
cp .env.example .env
# Edit .env: GOOGLE_CLOUD_PROJECT, credentials, GEMINI_TEXT_MODEL, GEMINI_MODEL

source .venv/bin/activate
uvicorn api.app:app --reload --port 8010

# Separate terminal:
cd web && npm install && npm run dev
# Open http://localhost:5174
```

**Without OAuth configured:** API is open locally.  
**With OAuth:** set `OAUTH_CLIENT_ID` + allowlist; UI shows Google sign-in.

**GCS clip preview locally:** requires `GCS_SIGNING_CREDENTIALS` or gcloud ADC with bucket read + proxy mode.

---

## 30. Glossary

| Term | Meaning |
|------|---------|
| **VVS** | Vertex AI Vector Search (Matching Engine) |
| **VP** | Video profile — one JSON record per source video with tags, one-liner, location |
| **Segment** | Short semantic slice of a video (~few seconds) with description + metadata |
| **Datapoint ID** | VVS row key, usually `{user_id}_{object_id}_{segment_idx}` |
| **Pilot segment** | Pre-cut MP4 clip in GCS for fast stitch |
| **Materialize bucket** | GCS bucket holding pilot segment files |
| **Catalog** | Named user scope (`guillaume`, `audrey_houalla`, …) |
| **Grounding** | Applying extracted location/time filters to restrict search |
| **Video valve** | Embedding path logic for variable final clip count |
| **SSE** | Server-Sent Events — streaming progress for long jobs |
| **Lyria** | Google’s music generation model used for background tracks |
| **GPMF** | GoPro metadata format — capture timestamps, GPS |
| **RUN_AUDIT** | Structured JSON audit log marker in Cloud Logging |

---

*This report documents the repository as of June 2026. For operational runbooks see `README.md`, `data_ingestion/KT.md`, and `eval/Analysis_cloudrun_story_ideas_baseline.md`.*
